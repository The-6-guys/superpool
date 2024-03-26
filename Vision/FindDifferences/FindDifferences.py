import cv2



class FindBalls:
  def __init__(self, imageRefPath, imageToAnalysePath, padding=50, minSide=10, maxSide=100):
    self.imageRefPath       = imageRefPath
    self.imageToAnalysePath = imageToAnalysePath
    self.padding            = padding
    self.minSide            = minSide
    self.maxSide            = maxSide
    self.imageRef           = None
    self.imageToAnalyse     = None
    self.imageRefGray       = None
    self.imageToAnalyseGray = None
    self.diff               = None


  def ManipulateImages(self):
    # Read images
    self.imageRef       = cv2.imread(self.imageRefPath)
    self.imageToAnalyse = cv2.imread(self.imageToAnalysePath)

    # Add padding if necessary
    self.imageRef       = cv2.copyMakeBorder(self.imageRef,       self.padding, self.padding, self.padding, self.padding, cv2.BORDER_CONSTANT)
    self.imageToAnalyse = cv2.copyMakeBorder(self.imageToAnalyse, self.padding, self.padding, self.padding, self.padding, cv2.BORDER_CONSTANT)

    # Convert images to grayscale
    self.imageRefGray       = cv2.cvtColor(self.imageRef,       cv2.COLOR_BGR2GRAY)
    self.imageToAnalyseGray = cv2.cvtColor(self.imageToAnalyse, cv2.COLOR_BGR2GRAY)


  def FindDifferences(self):
    # Call Manipulate Images
    self.ManipulateImages()

    # Compute absolute difference
    self.diff = cv2.absdiff(self.imageRefGray, self.imageToAnalyseGray)
    
    # Find contours
    contours, _ = cv2.findContours(self.diff, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    maxSideDimension = 0
    centerX = []
    centerY = []

    # Draw rectangles around the contours
    for contour in contours:
      x, y, w, h = cv2.boundingRect(contour)

      if w >= self.minSide and h >= self.minSide and w <= self.maxSide and h <= self.maxSide:
        #cv2.rectangle(self.imageToAnalyse, (x, y), (x + w, y + h), (0, 0, 255), 2)

        maxSideDimension = max(maxSideDimension, w, h)

        # Calculate center coordinates
        centerX.append(x + w // 2)
        centerY.append(y + h // 2)
    
    print("Center ([x], [y]):", centerX, ",", centerY)
    print("Maximum Side Dimension:", maxSideDimension)

    return centerX, centerY, maxSideDimension


  def SaveImages(self):
    # Call Find Differences
    centerX, centerY, maxSideDimension = self.FindDifferences()

    # Take the center (x,y) of each rectangle and save an image with a width of maxSideDimension and a height of maxSideDimension
    for i, (x, y) in enumerate(zip(centerX, centerY)):
      xStart  = max(0,                            x - maxSideDimension // 2)
      yStart  = max(0,                            y - maxSideDimension // 2)
      xEnd    = min(self.imageToAnalyse.shape[1], x + maxSideDimension // 2)
      yEnd    = min(self.imageToAnalyse.shape[0], y + maxSideDimension // 2)

      # Crop the regions from imageToAnalyse
      croppedImage = self.imageToAnalyse[yStart:yEnd, xStart:xEnd]

      print(f"Cropped Image {i} Dimensions:", croppedImage.shape)
      
      # Save the cropped images
      cv2.imwrite(f"CroppedImage_{i}.jpg", croppedImage)



if __name__ == "__main__":
  image1 = "C://Users//Alexandre//Documents//APPPP//superpool//Vision//FindDifferences//image1.jpg"
  image2 = "C://Users//Alexandre//Documents//APPPP//superpool//Vision//FindDifferences//image2.jpg"
  findBalls = FindBalls(image1, image2, padding=50, minSide=10, maxSide=100)
  
  # To find the center of the balls and the max width and height
  findBalls.FindDifferences()

  # To save all the balls individually with the same size
  findBalls.SaveImages()
