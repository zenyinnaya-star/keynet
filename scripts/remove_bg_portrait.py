# like remove_bg.py, but for portraits: lets you mark specific face/torso/background anchor boxes
# instead of relying on a single bounding rectangle, for more control over tricky shots
import sys
import cv2
import numpy as np

SRC = sys.argv[1]
OUT = sys.argv[2]
MARGIN_PCT = float(sys.argv[3]) if len(sys.argv) > 3 else 0.02
# Remaining args: groups of 4 floats "cx,cy,w,h" (fractions of image size),
# each a small safely-interior box to anchor as certain foreground.
ANCHOR_ARGS = sys.argv[4:]

img = cv2.imread(SRC)
h, w = img.shape[:2]

bgd_model = np.zeros((1, 65), np.float64)
fgd_model = np.zeros((1, 65), np.float64)

margin_x = int(w * MARGIN_PCT)
margin_y = int(h * MARGIN_PCT)

mask = np.full((h, w), cv2.GC_BGD, np.uint8)
mask[margin_y : h - margin_y, margin_x : w - margin_x] = cv2.GC_PR_FGD


def anchor(cx_pct, cy_pct, w_pct, h_pct, label=cv2.GC_FGD):
    """Mark a small box as certain foreground (or background, if label is
    GC_BGD) -- used both to anchor the real subject and to explicitly
    exclude other people/objects that would otherwise confuse GrabCut."""
    bw, bh = int(w * w_pct), int(h * h_pct)
    cx, cy = int(w * cx_pct), int(h * cy_pct)
    x0, x1 = max(cx - bw // 2, 0), min(cx + bw // 2, w)
    y0, y1 = max(cy - bh // 2, 0), min(cy + bh // 2, h)
    mask[y0:y1, x0:x1] = label


if ANCHOR_ARGS:
    # each arg is "cx,cy,w,h", optionally prefixed "bg:" to mark it as background instead of foreground
    for spec in ANCHOR_ARGS:
        is_bg = spec.startswith("bg:")
        values = [float(v) for v in (spec[3:] if is_bg else spec).split(",")]
        anchor(*values, label=cv2.GC_BGD if is_bg else cv2.GC_FGD)
else:
    # sensible defaults for a centered portrait photo
    anchor(0.5, 0.30, 0.16, 0.12)  # face
    anchor(0.5, 0.80, 0.22, 0.14)  # torso / shirt

# GC_INIT_WITH_MASK uses our hand-marked regions instead of a single bounding box
cv2.grabCut(img, mask, None, bgd_model, fgd_model, 12, cv2.GC_INIT_WITH_MASK)

mask2 = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype("uint8")

# A larger closing kernel fills small interior holes (stray gaps at hairline,
# collar, fingers) that the color model got briefly wrong on, without eating
# into the true silhouette edge, followed by a light opening to drop noise.
close_kernel = np.ones((21, 21), np.uint8)
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, close_kernel, iterations=2)
open_kernel = np.ones((5, 5), np.uint8)
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_OPEN, open_kernel, iterations=1)

num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(mask2, connectivity=8)
if num_labels > 1:
    largest = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    mask2 = np.where(labels == largest, 255, 0).astype("uint8")

alpha = cv2.GaussianBlur(mask2, (5, 5), 0)

b, g, r = cv2.split(img)
rgba = cv2.merge([b, g, r, alpha])

ys, xs = np.where(alpha > 10)
pad = 15
cx0, cx1 = max(xs.min() - pad, 0), min(xs.max() + pad, w)
cy0, cy1 = max(ys.min() - pad, 0), min(ys.max() + pad, h)
cropped = rgba[cy0:cy1, cx0:cx1]
cv2.imwrite(OUT, cropped)

print("fg pixels:", int((mask2 == 255).sum()), "/", h * w, "-> cropped", cropped.shape)
