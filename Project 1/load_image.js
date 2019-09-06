//iniciating the imagea
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
	processingImage(img1_data,"cell1",title);	
};

second_cell.onload = function() {
	ctx.drawImage(second_cell, 650, 0, 600, 600);
	img2_data = ctx.getImageData(650,0,600,600);
	var title = "Histogram of grey colors - Second Cell B";
	processingImage(img2_data,"cell2",title);
};

first_cell.src = "https://i.ibb.co/1K04DTr/img1.png";
second_cell.src = "https://i.ibb.co/mJCpHf4/img2.png";