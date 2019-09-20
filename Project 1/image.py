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
 
# im1 = Image.open("images-hist-match/40.png")
# image = HistEq(im1)
 
#image.saveMatch(betaDiscreteDistribution(1,1),"img1.png",1)
#image.saveMatch(betaDiscreteDistribution(5,5),"img2.png",1)
#image.saveMatch(betaDiscreteDistribution(8,3),"img3.png",1)
#image.saveMatch(betaDiscreteDistribution(1.75,1.75),"img4.png",1)

#distBeta = stats.beta(10,2)
#x = np.linspace(0,1,256)
#fig, ax = plt.subplots(1,1)
#ax.plot(x, distBeta.pdf(x)) 
#plt.show()

im1 = Image.open("images-hist-match/118.png")
image = HistEq(im1)
colors = image.histogram()
image.threshold("images-other/th1.png")

im2 = Image.open("images-hist-match/119.png")
image2 = HistEq(im2)
colors2 = image2.histogram()
image2.threshold("images-other/th2.png")