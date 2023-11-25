import cv2
import numpy as np
import os

def resize_image(image, width=700):
  return cv2.resize(image, (width, int(image.shape[0] * (width / image.shape[1]))))

def show_image(image, title='Image', width=700):
    # Display the image
    cv2.imshow(title, resize_image(image))
    cv2.waitKey(0)
    cv2.destroyAllWindows()


folder_path = "images/"
print("number of files: " + str(len(os.listdir(folder_path))))

for filename in os.listdir(folder_path):
    if filename.endswith(('.jpg', '.jpeg', '.png')):
        # Load the image
        image_path = folder_path + filename
        image = cv2.imread(image_path)

        ## PROCESS IMAGE

        # Création d'une fenêtre OpenCV
        cv2.namedWindow('image')

        # Création des trackbars pour ajuster les valeurs HSV
        cv2.createTrackbar('H Min', 'image', 0, 180, lambda *args: None)
        cv2.createTrackbar('H Max', 'image', 180, 180, lambda *args: None)
        cv2.createTrackbar('S Min', 'image', 0, 255, lambda *args: None)
        cv2.createTrackbar('S Max', 'image', 174, 255, lambda *args: None)
        cv2.createTrackbar('V Min', 'image', 0, 255, lambda *args: None)
        cv2.createTrackbar('V Max', 'image', 255, 255, lambda *args: None)

        # Lecture d'une image de test (remplacez ceci par votre image de billard)
        img = cv2.imread("Table8Balls_H.png")
        img = resize_image(img)
        imgCopy = resize_image(img)

        while True:
          imgCopy = img.copy()
          # Convertir l'image en HSV
          hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

          # Obtenir les valeurs actuelles des trackbars pour HSV
          h_min = cv2.getTrackbarPos('H Min', 'image')
          h_max = cv2.getTrackbarPos('H Max', 'image')
          s_min = cv2.getTrackbarPos('S Min', 'image')
          s_max = cv2.getTrackbarPos('S Max', 'image')
          v_min = cv2.getTrackbarPos('V Min', 'image')
          v_max = cv2.getTrackbarPos('V Max', 'image')

          # Définir la plage HSV à filtrer
          lower_hsv = np.array([h_min, s_min, v_min])
          upper_hsv = np.array([h_max, s_max, v_max])

          # Appliquer le masque HSV
          mask_hsv = cv2.inRange(hsv, lower_hsv, upper_hsv)
          result_hsv = cv2.bitwise_and(img, img, mask=mask_hsv)


          edges = cv2.Canny(mask_hsv, 50, 150, apertureSize=3)
          lines = cv2.HoughLines(edges, 1, np.pi / 180, 150)

          if lines is not None:
              # Iterate through each line detected
            for line in lines:
              rho, theta = line[0]
              a = np.cos(theta)
              b = np.sin(theta)
              x0 = a * rho
              y0 = b * rho
              x1 = int(x0 + 1000 * (-b))
              y1 = int(y0 + 1000 * (a))
              x2 = int(x0 - 1000 * (-b))
              y2 = int(y0 - 1000 * (a))

              # Draw lines on the original image (img)
              cv2.line(imgCopy, (x1, y1), (x2, y2), (0, 0, 255), 2)


          # Afficher l'image HSV et l'image RGB côte à côte
          display = np.hstack((imgCopy, result_hsv))
          cv2.imshow('image', display)

          # Sortir de la boucle si 'q' est pressé
          if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        cv2.destroyAllWindows()
