import cv2
import numpy as np

class AnnotateImage:
    def __init__(self, image):
        self.image = cv2.resize(image, (700, int(image.shape[0] * (700 / image.shape[1]))))
        self.circles = []
        self.counter = 0
        self.circle_data = {}  # Dictionary to store circle information
        self.window_name = 'Multiple Circles on Image'
        cv2.namedWindow(self.window_name)
        cv2.setMouseCallback(self.window_name, self.mouse_callback)
        while True:
            image_copy = self.image.copy()  # Create a copy of the image
            cv2.putText(image_copy, f'Count: {self.counter}', (20, 40), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2)
            cv2.imshow(self.window_name, image_copy)
            key = cv2.waitKey(1)
            if self.counter > 15:
                break
            if key == 27:
                break
            elif key == 13:
                self.counter += 1

    def mouse_callback(self, event, x, y, flags, param):
        if event == cv2.EVENT_LBUTTONDOWN:
            self.circles.append((x, y))
            if len(self.circles) % 3 == 0 and len(self.circles) >= 3:
                center, _ = cv2.minEnclosingCircle(np.array(self.circles[-3:]))
                radius = int(np.linalg.norm(np.array(self.circles[-3]) - np.array(center)))
                cv2.circle(self.image, (int(center[0]), int(center[1])), radius, (0, 255, 0), 2)
                
                # Store circle information in the dictionary
                self.circle_data[self.counter] = {'center': center, 'radius': radius}
                self.counter += 1

# Example usage
image_path = "C://Users//Alexandre//Documents//APPPP//superpool//Vision//Table8Balls_H.png"
image = cv2.imread(image_path)

circle_drawer = AnnotateImage(image)

print(circle_drawer.circle_data)
