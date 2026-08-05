import sys
import cv2
import numpy as np

SRC = sys.argv[1]
OUT = sys.argv[2]
MARGIN_PCT = float(sys.argv[3]) if len(sys.argv) > 3 else 0.02

img = cv2.imread(SRC)
h, w = img.shape[:2]

mask = np.zeros((h, w), np.uint8)
bgd_model = np.zeros((1, 65), np.float64)
fgd_model = np.zeros((1, 65), np.float64)

margin_x = int(w * MARGIN_PCT)
margin_y = int(h * MARGIN_PCT)
rect = (margin_x, margin_y, w - 2 * margin_x, h - 2 * margin_y)

cv2.grabCut(img, mask, rect, bgd_model, fgd_model, 10, cv2.GC_INIT_WITH_RECT)

mask2 = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype("uint8")

kernel = np.ones((5, 5), np.uint8)
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, kernel, iterations=2)
mask2 = cv2.morphologyEx(mask2, cv2.MORPH_OPEN, kernel, iterations=1)

num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(mask2, connectivity=8)
if num_labels > 1:
    largest = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    mask2 = np.where(labels == largest, 255, 0).astype("uint8")

alpha = cv2.GaussianBlur(mask2, (5, 5), 0)

b, g, r = cv2.split(img)
rgba = cv2.merge([b, g, r, alpha])

ys, xs = np.where(alpha > 10)
pad = 15
x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, w)
y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, h)
cropped = rgba[y0:y1, x0:x1]
cv2.imwrite(OUT, cropped)

print("fg pixels:", int((mask2 == 255).sum()), "/", h * w, "-> cropped", cropped.shape)
