#importing modules of interest
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt
import os
from histogram_equalization import HistogramEqualization as HistEq
from scipy import stats

#open the images of interest to make the histogram matching 

#im1 = Image.open("images-png/img1.png")
#
#k = 0
#
#for file in os.listdir("images-png"):
#    im = Image.open("images-png/" + file)
#    image = HistEq(im)
#    image.saveMatch(im1,"images-hist-match/"+str(k)+".png")
#    k += 1

def betaDiscreteDistribution(a,b):
    #indice é um valor ente 0 e 255, inclusive. 
    X = stats.beta(a,b)
    shades = 1/512*np.ones(256)
    for i in range(256):
        #discretizo tomando a média do valor final e inicial do intervalo
        shades[i] = shades[i]*(X.pdf((i+1)/256) + X.pdf(i/256))
    return shades
 
#saving by the beta distribution
 
im1 = Image.open("images-hist-match/50.png")
image = HistEq(im1)
image.drawHistogram()

a = np.zeros(256)
a[0:100] = 0
#a[70:130] = 85
a[100:175] = 128
a[175:255] = 255

matrix = image.matrix_colors.copy()
for i in range(len(matrix)):
    for j in range(len(matrix[i])):
        matrix[i][j] = a[matrix[i][j]]
i = Image.fromarray(matrix)
i.show()
        

#image.saveMatch(betaDiscreteDistribution(1,1),"img1.png",1)
#image.saveMatch(betaDiscreteDistribution(5,5),"img2.png",1)
#image.saveMatch(betaDiscreteDistribution(8,3),"img3.png",1)
#image.saveMatch(betaDiscreteDistribution(1.75,1.75),"img4.png",1)
#stats.probplot(stats.beta(1,1), plot = plt)
#stats.probplot(stats.beta(5,5), plot = plt)
#stats.probplot(stats.beta(8,3), plot = plt)
#stats.probplot(stats.beta(1.75,1.75), plot = plt)