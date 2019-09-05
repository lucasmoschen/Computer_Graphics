# -*- coding: utf8 -*-


# I have used this script to convert tiff images into png. 
import os, sys
from PIL import Image

for infile in os.listdir("images-tiff"):
    f, e = os.path.splitext(infile)
    outfile = f + ".png"
    if infile != outfile:
        Image.open("images-tiff/"+infile).save("images-png/"+outfile)

