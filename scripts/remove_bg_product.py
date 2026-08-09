import sys
import cv2
import numpy as np

SRC = sys.argv[1]
OUT = sys.argv[2]
TOL = int(sys.argv[3]) if len(sys.argv) > 3 else 14

img = cv2.imread(SRC, cv2.IMREAD_COLOR)
h, w = img.shape[:2]

# Product photos here sit on a flat near-white studio background, so instead
# of GrabCut (tuned for portraits in remove_bg_portrait.py) we flood-fill
# from every edge/corner: any near-white region connected to the border is
# background, anything it can't reach (the product itself, even where the
# product is white) stays foreground.
seed_points = [
    (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
    (w // 2, 0), (0, h // 2), (w - 1, h // 2), (w // 2, h - 1),
]

bg_mask = np.zeros((h, w), np.uint8)
for seed in seed_points:
    flood_mask = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(
        img.copy(),
        flood_mask,
        seed,
        0,
        loDiff=(TOL, TOL, TOL),
        upDiff=(TOL, TOL, TOL),
        # FIXED_RANGE compares every candidate pixel back to the original seed
        # color, not its already-filled neighbor -- without it, a flood fill
        # "walks" across smooth gradients (e.g. a white product on a white
        # background) one small step at a time and eats the product itself.
        flags=4 | cv2.FLOODFILL_MASK_ONLY | cv2.FLOODFILL_FIXED_RANGE | (255 << 8),
    )
    bg_mask = cv2.bitwise_or(bg_mask, flood_mask[1:-1, 1:-1])

fg_mask = cv2.bitwise_not(bg_mask)

close_kernel = np.ones((5, 5), np.uint8)
fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, close_kernel, iterations=2)
open_kernel = np.ones((3, 3), np.uint8)
fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_OPEN, open_kernel, iterations=1)

num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(fg_mask, connectivity=8)
if num_labels > 1:
    largest = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    fg_mask = np.where(labels == largest, 255, 0).astype("uint8")

alpha = cv2.GaussianBlur(fg_mask, (3, 3), 0)

b, g, r = cv2.split(img)
rgba = cv2.merge([b, g, r, alpha])

ys, xs = np.where(alpha > 10)
pad = 15
cx0, cx1 = max(xs.min() - pad, 0), min(xs.max() + pad, w)
cy0, cy1 = max(ys.min() - pad, 0), min(ys.max() + pad, h)
cropped = rgba[cy0:cy1, cx0:cx1]
cv2.imwrite(OUT, cropped)

print("fg pixels:", int((fg_mask == 255).sum()), "/", h * w, "-> cropped", cropped.shape)
