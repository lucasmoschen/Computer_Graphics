#importing modules of interest
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import os
from histogram_equalization import HistogramEqualization as HistEq

#open the images of interest

im1 = Image.open("images-png/img1.png")

k = 0

for file in os.listdir("images-png"):
    im = Image.open("images-png/" + file)
    image = HistEq(im)
    image.saveMatch(im1,"images-hist-match/"+str(k)+".png")
    k += 1
    print(k)