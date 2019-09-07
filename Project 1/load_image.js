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
	var title = "Histogram";
	var measures = [700,420,50,10,50,50];
	processingImage(imgBW_data, "bw_histogram", title,measures);
};

imageBW2.onload = function() {
	ctxBW2.drawImage(imageBW2,0,0,600,400);
	imgBW_data2 = ctxBW2.getImageData(0,0,600,400);
	var title = "Histogram";
	var measures = [700,420,50,10,50,50];
	processingImage(imgBW_data2, "bw_histogram2", title,measures);
};

imageBW.src = "https://d.wattpad.com/story_parts/396812486/images/159ab54e60541a85107225027536.jpg";
imageBW2.src = "https://images.pexels.com/photos/1146642/pexels-photo-1146642.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

//iniciating the image
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