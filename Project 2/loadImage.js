//Adding image 

var canvasBcell = document.getElementById("Bcell");
var ctxBcell = canvasBcell.getContext("2d");

var imageCell = new Image();

imageCell.crossOrigin = '';

imageCell.onload = function() {
    ctxBcell.drawImage(imageCell,100,0,500,500);
    imageData = ctxBcell.getImageData(100,0,500,500);
    hist = histogram(imageData);
    return hist;
};

imageCell.src = "118.png"