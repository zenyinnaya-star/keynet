# cuts an object out of a photo using GrabCut and saves it as a cropped transparent PNG
import sys
import cv2
import numpy as np

SRC = sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\User\Downloads\ChatGPT Image Aug 4, 2026, 08_47_27 AM.png"
OUT_PREVIEW = sys.argv[2] if len(sys.argv) > 2 else r"C:\Users\User\Desktop\keynext\scripts\preview_cutout.png"
OUT_FINAL = sys.argv[3] if len(sys.argv) > 3 else r"C:\Users\User\Desktop\keynext\public\hero-headphones.png"

img = cv2.imread(SRC)
h, w = img.shape[:2]

mask = np.zeros((h, w), np.uint8)
bgd_model = np.zeros((1, 65), np.float64)
fgd_model = np.zeros((1, 65), np.float64)

margin_x = int(w * 0.03)
margin_y = int(h * 0.03)
rect = (margin_x, margin_y, w - 2 * margin_x, h - 2 * margin_y)

# tells GrabCut the subject is roughly inside this rectangle, everything outside it is background
cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 8, cv2.GC_INIT_WITH_RECT)

mask2 = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype("uint8")

# Clean up the mask: close small holes, open small noise, then feather edges.
kernel = np.ones((7, 7), np.uint8)
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, kernel, iterations=2)
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_OPEN, kernel, iterations=1)

# Keep only the largest connected component (the headphones), drop stray blobs.
num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(mask2, connectivity=8)
if num_labels > 1:
    largest = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    mask2 = np.where(labels == largest, 255, 0).astype("uint8")

alpha = cv2.GaussianBlur(mask2, (7, 7), 0)

b, g, r = cv2.split(img)
rgba = cv2.merge([b, g, r, alpha])
cv2.imwrite(OUT_PREVIEW, rgba)

# Crop tightly to the non-transparent bounding box with a bit of padding.
ys, xs = np.where(alpha > 10)
pad = 20
x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, w)
y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, h)
cropped = rgba[y0:y1, x0:x1]
cv2.imwrite(OUT_FINAL, cropped)

print("mask fg pixels:", int((mask2 == 255).sum()), "/", h * w)
print("cropped size:", cropped.shape)
