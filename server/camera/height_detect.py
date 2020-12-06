from scipy.spatial import distance as dist
from imutils import perspective
from imutils import contours
import numpy as np
import argparse
import imutils
import cv2

def midpoint(ptA, ptB):
	return ((ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5)

def detectHeight(image_path, height): 
    # Load image
    image = cv2.imread(image_path)
    #gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) # Converts to grayscale
    #gray = cv2.GaussianBlur(image, (7, 7), 0) # Blur image slightly

    # Perform edge detection
    edged = cv2.Canny(image, 50, 100)

    # Perform dilation and erosion to close gaps between object edges
    edged = cv2.dilate(edged, None, iterations=1)
    edged = cv2.erode(edged, None, iterations=1)

    # Find contours in edge map
    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)

    # Sort the contours from left-to-right
    (cnts, _) = contours.sort_contours(cnts)

    pixelsPerMetric = None

    heights = []

    # Loop over each contour
    for c in cnts:
        # Ignore if the contour is not sufficiently large
        if cv2.contourArea(c) < 100:
            continue
        
        # Compute rotated bounding box of contour
        orig = image.copy()
        box = cv2.minAreaRect(c)
        box = cv2.cv.BoxPoints(box) if imutils.is_cv2() else cv2.boxPoints(box)
        box = np.array(box, dtype="int")
        
        # Order the points in the contour such that they appear
        # in top-left, top-right, bottom-right, and bottom-left order, 
        box = perspective.order_points(box)
        
        # Unpack the ordered bounding box, then compute the midpoint
        # between the top-left and top-right coordinates and
        # the midpoint between bottom-left and bottom-right coordinates
        (tl, tr, br, bl) = box
        (tltrX, tltrY) = midpoint(tl, tr)
        (blbrX, blbrY) = midpoint(bl, br)

        # Compute the midpoint between the top-left and top-right points
        # and the midpoint between the top-right and bottom-right
        (tlblX, tlblY) = midpoint(tl, bl)
        (trbrX, trbrY) = midpoint(tr, br)

        # Compute the Euclidean distance between the midpoints
        dA = dist.euclidean((tltrX, tltrY), (blbrX, blbrY))
        dB = dist.euclidean((tlblX, tlblY), (trbrX, trbrY))
        
        # If the pixels per metric has not been initialized, then
        # compute it as the ratio of pixels to centimetres
        if pixelsPerMetric is None:
            pixelsPerMetric = dA / height
        
        # Compute the size of the object
        dimA = dA / pixelsPerMetric # height
        dimB = dB / pixelsPerMetric # width

        heights.append(dimA)

        """
        # Draw outline of the rotated bounding box
        cv2.drawContours(orig, [box.astype("int")], -1, (0, 255, 0), 2)
        
        # Loop over the points and draw them
        for (x, y) in box:
            cv2.circle(orig, (int(x), int(y)), 5, (0, 0, 255), -1)
        
        # Draw the midpoints on the image
        cv2.circle(orig, (int(tltrX), int(tltrY)), 5, (255, 0, 0), -1)
        cv2.circle(orig, (int(blbrX), int(blbrY)), 5, (255, 0, 0), -1)
        cv2.circle(orig, (int(tlblX), int(tlblY)), 5, (255, 0, 0), -1)
        cv2.circle(orig, (int(trbrX), int(trbrY)), 5, (255, 0, 0), -1)

        # Draw lines between the midpoints
        cv2.line(orig, (int(tltrX), int(tltrY)), (int(blbrX), int(blbrY)),
            (255, 0, 255), 2)
        cv2.line(orig, (int(tlblX), int(tlblY)), (int(trbrX), int(trbrY)),
            (255, 0, 255), 2)

        # Draw the object sizes on the image
        cv2.putText(orig, "{:.1f}cm".format(dimA),
            (int(tltrX - 15), int(tltrY - 10)), cv2.FONT_HERSHEY_SIMPLEX,
            0.65, (255, 255, 255), 2)
        cv2.putText(orig, "{:.1f}cm".format(dimB),
            (int(trbrX + 10), int(trbrY)), cv2.FONT_HERSHEY_SIMPLEX,
            0.65, (255, 255, 255), 2)

        # Show the output image
        cv2.imshow("Image", orig)
        cv2.waitKey(0)"""

    # Currently returns height of tallest object (excluding first item)
    return max(heights[1:])

print('height: ' + str(detectHeight(sys.argv[1], sys.argv[2])))





"""
# Argument parsing for testing
# Command is python file.py --image image-path.png --height height-num
ap = argparse.ArgumentParser()
ap.add_argument("-i", "--image", required=True,
	help="path to the input image")
ap.add_argument("-ht", "--height", type=float, required=True,
	help="height of the left-most object in the image (in cm)")
args = vars(ap.parse_args())
"""