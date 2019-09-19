#importing modules of interest
from PIL import Image
import numpy as np
import matplotlib.pyplot as plt


class HistogramEqualization:
    '''
    All you need to do a Image Processing with histogram matching. You can do histogram, you can drawHistogram,
    you can do the histogram equalization and the histogram matching, with other image. You only need 
    a pillow image. 
    '''

    def __init__(self,image):
        self.matrix_colors = np.array(image)
        self.x = [i for i in range(256)]
         
    def histogram(self, color_matrix = 0):
        if color_matrix is 0: 
            color_matrix = self.matrix_colors
        colors = np.zeros(256)
        for i in color_matrix:
            for j in i:
                colors[j] += 1
        total = sum(colors)
        colors = 1/total*colors
        return colors
       
    def drawHistogram(self):
        x = np.linspace(0,255,256)
        colors = self.histogram()
        plt.bar(x, colors, color = "grey", linewidth = 2)
        plt.show()
        
    def histogramEqual(self, hist = 0):
        if hist is 0: 
            hist = self.histogram()
        colors = hist;
        T = np.zeros(256)
        T[0] = colors[0]
        for i in range(1,len(colors)):
            T[i] = T[i-1] + colors[i]
        return T
        
    def histogramMatch(self,refImage,hist=0):
        #histogram is an indicator if refImage is an histogram. 
        if hist == 1: G = self.histogramEqual(refImage)
        else: 
            refMatrix = np.array(refImage)
            G = self.histogramEqual(self.histogram(refMatrix))
        T = self.histogramEqual()
        matching = np.zeros(256)
        for i in range(len(matching)):
            errOld = 1
            for j in range(len(G)):
                err = abs(G[j] - T[i])
                if err > errOld: 
                    break
                errOld = err
                if j == len(G) - 1: j = j + 1
            matching[i] = j - 1
        newColor = np.copy(self.matrix_colors)
        for k in range(len(newColor)):
             newColor[k] = matching[newColor[k]]
        return newColor
        
    def showMatch(self,refImage,hist=0):
        newColor = self.histogramMatch(refImage,hist)
        img = Image.fromarray(newColor)
        img.show()
        
    def saveMatch(self,refImage,fileName,hist=0):
        newColor = self.histogramMatch(refImage,hist)
        img = Image.fromarray(newColor)
        img.save(fileName)
        print("File "+fileName+" saved.")