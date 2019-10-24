//Adding image 

var canvasBcell = document.getElementById("Bcell");
var ctxBcell = canvasBcell.getContext("2d");

var imageCell = new Image();

imageCell.crossOrigin = '';

imageCell.src = "118.png"

imageCell.onload = function() {
    ctxBcell.drawImage(imageCell,100,0,500,500);
    imageData = ctxBcell.getImageData(100,0,500,500);
    hist = histogram(imageData);
    return hist;
};

histogramMatch = function(matching){
    imageData = ctxBcell.getImageData(100,0,500,500);
    for(let i = 0; i < imageData.data.length; i+=4){
        imageData.data[i] = matching[imageData.data[i]];
        imageData.data[i+1] = matching[imageData.data[i+1]];
        imageData.data[i+2] = matching[imageData.data[i+2]]; 
    }
    ctxBcell.putImageData(imageData,100,0);
}

var canvasBcell2 = document.getElementById('Bcell2');
var ctxBcell2 = canvasBcell2.getContext('2d');

var imageCell2 = new Image();

imageCell2.src = "118.png";

imageCell.onload = function() {
    ctxBcell2.drawImage(imageCell2,100,0,500,500);
    imageData = ctxBcell2.getImageData(100,0,500,500);
    hist = histogram(imageData);
    return hist;
};