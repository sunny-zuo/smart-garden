from PIL import Image, ImageStat
import cv2
import time



#ignore me - just taking a photo with windows
# initialize the camera
#cam = cv2.VideoCapture(0)   # 0 -> index of camera
#time.sleep(0.05)
#s, img = cam.read()
#if s:    # frame captured without any errors
        #cv2.namedWindow("cam-test")
        #cv2.imshow("cam-test",img)
        #cv2.waitKey(0)
        #cv2.destroyWindow("cam-test")
#    cv2.imwrite("hello.jpg",img) #save image


#returns value between 0 and 255
def brightness( im_file ):
   im = Image.open(im_file).convert('L')
   stat = ImageStat.Stat(im)
   return stat.rms[0]

print(brightness("hello.jpg"))