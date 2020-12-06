import socket
import time
import picamera
#import cv2
#import os


#camera = cv2.VideoCapture(0)
#time.sleep(0.05)
camera = picamera.PiCamera()
camera.resolution = (640, 480)
camera.framerate = 24

server_socket = socket.socket()
server_socket.bind(('0.0.0.0', 8000)) #ip address should be [raspi_address]:8000
server_socket.listen(0)

# Accept a single connection and make a file-like object out of it
connection = server_socket.accept()[0].makefile('wb')
try:
    camera.start_recording(connection, format='h264') #this stuff just streams the cam for 120 secs
    camera.wait_recording(300)
    camera.stop_recording()
finally:
    connection.close()
    server_socket.close()