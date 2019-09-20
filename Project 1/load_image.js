// I initiate with two images of cells. 

var canvasBW = document.getElementById("black_white_image");
var canvasBW2 = document.getElementById("black_white_image2");

var ctxBW = canvasBW.getContext("2d");
var ctxBW2 = canvasBW2.getContext("2d");

var imageBW = new Image();
var imageBW2 = new Image();

imageBW.crossOrigin = '';
imageBW2.crossOrigin = '';

imageBW.onload = function() {
	ctxBW.drawImage(imageBW,0,0,600,400);
	imgBW_data = ctxBW.getImageData(0,0,600,400);
	var title = "Histograma das folhas";
	var measures = [700,420,50,10,50,50];  //it serves as a parameter to create a histogram 
	processingImage(imgBW_data, "bw_histogram", title,measures);  //here I do the processingImage. It does the histogram's count
};

imageBW2.onload = function() {
	ctxBW2.drawImage(imageBW2,0,0,600,400);
	imgBW_data2 = ctxBW2.getImageData(0,0,600,400);
	var title = "Histograma das montanhas";
	var measures = [700,420,50,10,50,50];
	processingImage(imgBW_data2, "bw_histogram2", title,measures);
};

imageBW.src = "https://d.wattpad.com/story_parts/396812486/images/159ab54e60541a85107225027536.jpg";
imageBW2.src = "https://images.pexels.com/photos/1146642/pexels-photo-1146642.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

// Now a Initiate the images to show the problem. 
 
var canvasInicial = document.getElementById("cells_inicial"); 
var ctx = canvasInicial.getContext("2d");

var first_cell = new Image();
var second_cell = new Image();

first_cell.crossOrigin = '';
second_cell.crossOrigin = '';


//call the first B cell image 
first_cell.onload = function (){
	//draw the image
	ctx.drawImage(first_cell,0,0,600,600);
	img1_data = ctx.getImageData(0,0,600,600);
	//processing the information to generate the data
	var title = "Histogram of grey colors - First Cell B";
	var measures = [600,300,50,10,50,50];
	processingImage(img1_data,"cell1",title,measures);	
};

second_cell.onload = function() {
	ctx.drawImage(second_cell, 650, 0, 600, 600);
	img2_data = ctx.getImageData(650,0,600,600);
	var title = "Histogram of grey colors - Second Cell B";
	var measures = [600,300,50,10,50,50];
	processingImage(img2_data,"cell2",title,measures);
};

first_cell.src = "https://i.ibb.co/1K04DTr/img1.png";
second_cell.src = "https://i.ibb.co/mJCpHf4/img2.png";

//first transformation with histogram equalization

var canvasTrans = document.getElementById("first_equalization");
var ctxTrans = canvasTrans.getContext("2d");

var cellTrans1 = new Image();
var cellTrans2 = new Image();
var cellTrans3 = new Image();
var cellTrans4 = new Image();

cellTrans1.crossOrigin = '';
cellTrans2.crossOrigin = '';
cellTrans3.crossOrigin = '';
cellTrans4.crossOrigin = '';

cellTrans1.onload = function() {
	
	ctxTrans.drawImage(cellTrans1, 0,0, 300, 300);

	var cellTransOut = new Image();
	cellTransOut = ctxTrans.getImageData(0,0, 300, 300);

	eq_histogram(cellTransOut,1); //this function calculates the histograma. With the verificador == 1, we change the data.  
		
	ctxTrans.putImageData(cellTransOut, 0, 300);	
}
cellTrans2.onload = function() {
	
	ctxTrans.drawImage(cellTrans2, 300,0, 300, 300);
	
	var cellTransOut = new Image();
	cellTransOut = ctxTrans.getImageData(300,0, 300, 300);
	
	eq_histogram(cellTransOut,1);
	
	ctxTrans.putImageData(cellTransOut, 300, 300);	
}

cellTrans3.onload = function() {
	
	ctxTrans.drawImage(cellTrans3, 600,0, 300, 300);
	
	var cellTransOut = new Image();
	cellTransOut = ctxTrans.getImageData(600,0, 300, 300);
	
	eq_histogram(cellTransOut,1);
	
	ctxTrans.putImageData(cellTransOut, 600, 300);	
}
cellTrans4.onload = function() {
	
	ctxTrans.drawImage(cellTrans4, 900,0, 300, 300);
	
	var cellTransOut = new Image();
	cellTransOut = ctxTrans.getImageData(900,0, 300, 300);
	
	eq_histogram(cellTransOut,1);
	
	ctxTrans.putImageData(cellTransOut, 900, 300);	
}

cellTrans1.src = "https://i.ibb.co/1K04DTr/img1.png";
cellTrans2.src = "https://i.ibb.co/mJCpHf4/img2.png";
cellTrans3.src = "https://i.ibb.co/jzsvMwg/img3.png";
cellTrans4.src = "https://i.ibb.co/xMfrGT4/img4.png";

// histogram matching with the problem image. 

var canvasMatching1 = document.getElementById("imagesMatching1");
var canvasMatching2 = document.getElementById("imagesMatching2");
var canvasMatching3 = document.getElementById("imagesMatching3");

var ctxMat1 = canvasMatching1.getContext("2d");
var ctxMat2 = canvasMatching2.getContext("2d");
var ctxMat3 = canvasMatching3.getContext("2d");

var cellMatch1 = new Image();
var cellMatch2 = new Image();
var cellMatch3 = new Image();

cellMatch1.crossOrigin = '';
cellMatch2.crossOrigin = '';
cellMatch3.crossOrigin = '';

cellMatch1.onload = function() {
	// we just put the image and draw here 
	ctxMat1.drawImage(cellMatch1,0,0,500,500);
	
	cellMatchOut = ctxMat1.getImageData(0,0,500,500);

	var measures = [800,500,50,10,50,50];
	
	processingImage(cellMatchOut,"histogram_matching1","Reference Histogram", measures);
}

cellMatch2.onload = function() {
	
	ctxMat2.drawImage(cellMatch2,0,0,500,500);
	ctxMat3.drawImage(cellMatch3,0,0,500,500);
	
	cellMatchOut = ctxMat2.getImageData(0,0,500,500);
	cellMatchRef = ctxMat3.getImageData(0,0,500,500);
	
	var measures = [800,500,50,10,50,50];
	processingImage(cellMatchOut,"histogram_matching2","Current Histogram", measures);
	
	hist_matching(cellMatchOut,cellMatchRef,measures);  //here we do the matching. 
	ctxMat3.putImageData(cellMatchOut,0,0);
}

cellMatch1.src = "https://i.ibb.co/1K04DTr/img1.png";
cellMatch2.src = "https://i.ibb.co/mJCpHf4/img2.png";
cellMatch3.src = "https://i.ibb.co/1K04DTr/img1.png";

// Beta Distribution 

var canvasBeta = document.getElementById("beta-distribution")
var ctxBeta = canvasBeta.getContext("2d")

var cellImages = ["img1.png","img2.png","img3.png","img4.png"]
var betaImages = ["img1-beta.png","img2-beta.png","img3-beta.png","img4-beta.png"]

for(let i = 0; i < 4; i++){
	let cell = new Image();
	cell.onload = function(){
		ctxBeta.drawImage(cell,i*300,0,300,300);
	}
	cell.src = "images-other/"+cellImages[i];
	
	let beta = new Image();
	beta.onload = function(){
		ctxBeta.drawImage(beta,i*300,300,300,300);
	}
	beta.src = "images-other/"+betaImages[i];
}

// Thresholding 

var canvasTh = document.getElementById("thresholding")
var ctxTh = canvasTh.getContext("2d")

cellImages = ["118.png", "119.png"]
var thImages = ["th1.png", "th2.png"]

for(let i = 0; i < 2; i++){
	let cell = new Image();
	cell.onload = function(){
		ctxTh.drawImage(cell,0,i*600,600,600);
	}
	cell.src = "images-hist-match/"+cellImages[i];
	
	let th = new Image();
	
	th.onload = function(){
		ctxTh.drawImage(th,600,i*600,600,600);
	}
	th.src = "images-other/"+thImages[i];
}