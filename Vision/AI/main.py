
#DÉTECTION
#(16x4)	Confiance	Position X	Position Y	Rayon

#CLASSIFICATION
#(16x16)		Boule #1	Boule #2	...	Boule #16
#Boule #1
#Boule #2
#...
#Boule #16


import argparse
import os

import numpy as np
import torch
import torch.optim as optim
from torchvision import transforms
from Models import DetectionNetwork

from Dataset import ConveyorSimulator
from Metrics import AccuracyMetric, MeanAveragePrecisionMetric, SegmentationIntersectionOverUnionMetric
from Visualizer import Visualizer


NUMBER_OF_BALL = 16
CONFIDENCE_THRESHOLD = 0.5
CLASS_PROBABILITY_THRESHOLD = 0.5


class CnnTrainer():
  def __init__(self, args):
    self.args = args
    # Initialisation de pytorch
    useCuda = args.use_gpu and torch.cuda.is_available()
    self.device = torch.device("cuda" if useCuda else "cpu")
    seed = np.random.rand()
    torch.manual_seed(seed)
    self.transform = transforms.Compose([transforms.ToTensor()])
    
    # Generation des "path"
    self.dirPath = os.path.dirname(__file__)
    self.trainDataPath = os.path.join(self.dirPath, "data", "training")
    self.testDataPath = os.path.join(self.dirPath, "data", "test")
    self.weightsPath = os.path.join(self.dirPath, "weights", "task_" + self.args.task + "_best.pt")

    # Initialisation du model et des classes pour l"entraînement
    self.model = self.CreateModel().to(self.device)
    self.criterion = self.CreateCriterion()

    print("Model : ")
    print(self.model)
    print("\nNumber of parameters in the model : ", sum(p.numel() for p in self._model.parameters()))


  def CreateModel(self):
    return DetectionNetwork(3, NUMBER_OF_BALL*7)


  def CreateCriterion(self):
    pass


  def CreateMetric(self):
    return MeanAveragePrecisionMetric(3, INTERSECTION_OVER_UNION_THRESHOLD)



  def Test(self):
    pass


  def Train(self):
    pass

  
  def TrainBatch(self, model, criterion, metric, optimizer, image, segmentation_target, boxes, class_labels):
    pass


  def TestBatch(self, model, criterion, metric, image, segmentation_target, boxes, class_labels):
    pass


  
if __name__ == '__main__':
  raw_args = ['--mode', 'test',
              '--epochs', '100',
              '--lr', '0.001']

  #  Settings
  parser = argparse.ArgumentParser(description='Conveyor CNN')
  parser.add_argument('--mode', choices=['train', 'test'], help='The script mode', required=True)
  parser.add_argument('--batch_size', type=int, default=32, help='Batch size for training and testing (default: 32)')
  parser.add_argument('--epochs', type=int, default=20, help='number of epochs for training (default: 20)')
  parser.add_argument('--lr', type=float, default=4e-4, help='learning rate used for training (default: 4e-4)')
  parser.add_argument('--use_gpu', action='store_true', help='use the gpu instead of the cpu')
  parser.add_argument('--early_stop', type=int, default=25,
                      help='number of worse validation loss before quitting training (default: 25)')

  args = parser.parse_args(raw_args)

  conv = CnnTrainer(args)

  if args.mode == 'train':
    print('\n--- Training mode ---\n')
    conv.train()
  elif args.mode == 'test':
    print('\n--- Testing mode ---\n')
    conv.test()
