try{
	//white and black images
	var canvasBW = document.getElementById("black_white_image");
	var canvasBW2 = document.getElementById("black_white_image2");
	
	var ctxBW = canvasBW.getContext("2d");
	var ctxBW2 = canvasBW2.getContext("2d");
	
	var imageBW = new Image();
	var imageBW2 = new Image();
	
	imageBW.crossOrigin = '';
	imageBW2.crossOrigin = '';
	
	imageBW.onload = function() {
		ctxBW.drawImage(imageBW,0,0,500,300);
		imgBW_data = ctxBW.getImageData(0,0,500,300);
		var title = "Histograma das folhas";
		meas = [550,300,100,10,50,50];  //it serves as a parameter to create a histogram 
		processingImage(imgBW_data, "bw_histogram", title,meas);  //here I do the processingImage. It does the histogram's count
	};
	
	imageBW2.onload = function() {
		ctxBW2.drawImage(imageBW2,0,0,500,300);
		imgBW_data2 = ctxBW2.getImageData(0,0,500,300);
		var title = "Histograma das montanhas";
		meas = [550,300,100,10,50,50];
		processingImage(imgBW_data2, "bw_histogram2", title,meas);
	};
	
	imageBW.src = "../Files1/img/black-white.jpg"
	imageBW2.src = "../Files1/img/black-white-2.jpg";
	
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
		ctx.drawImage(first_cell,0,0,500,500);
		img1_data = ctx.getImageData(0,0,500,500);
		//processing the information to generate the data
		var title = "Histogram of grey colors - First Cell B";
		var measures = [500,300,50,10,50,50];
		processingImage(img1_data,"cell1",title,measures);	
	};
	
	second_cell.onload = function() {
		ctx.drawImage(second_cell, 550, 0, 500, 500);
		img2_data = ctx.getImageData(550,0,500,500);
		var title = "Histogram of grey colors - Second Cell B";
		var measures = [500,300,50,10,50,50];
		processingImage(img2_data,"cell2",title,measures);
	};
	
	first_cell.src = "../Files1/img/img1.png";
	second_cell.src = "../Files1/img/img2.png";
	
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
	
	cellTrans1.src = "../Files1/img/img1.png";
	cellTrans2.src = "../Files1/img/img2.png";
	cellTrans3.src = "../Files1/img/img3.png";
	cellTrans4.src = "../Files1/img/img4.png";
	
}
catch(err){
	console.log(err);
}
// histogram matching with the problem image. 
try{
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

		meas = [600,450,50,10,75,75];
		
		processingImage(cellMatchOut,"histogram_matching1","Reference Histogram", meas);
	}

	cellMatch2.onload = function() {
		
		ctxMat2.drawImage(cellMatch2,0,0,500,500);
		ctxMat3.drawImage(cellMatch3,0,0,500,500);
		
		cellMatchOut = ctxMat2.getImageData(0,0,500,500);
		cellMatchRef = ctxMat3.getImageData(0,0,500,500);
		
		meas2 = [600,450,50,10,75,75];
		processingImage(cellMatchOut,"histogram_matching2","Current Histogram", meas2);
		
		hist_matching(cellMatchOut,cellMatchRef,meas2);  //here we do the matching. 
		ctxMat3.putImageData(cellMatchOut,0,0);
	}

	cellMatch1.src = "../Files1/img/img1.png";
	cellMatch2.src = "../Files1/img/img2.png";
	cellMatch3.src = "../Files1/img/img1.png";

	// Beta Distribution 

	var canvasBeta = document.getElementById("beta-distribution")
	var ctxBeta = canvasBeta.getContext("2d")

	var cellImages = ["bimg1.png","bimg2.png","bimg3.png","bimg4.png"]
	var betaImages = ["img1-beta.png","img2-beta.png","img3-beta.png","img4-beta.png"]

	for(let i = 0; i < 4; i++){
		let cell = new Image();
		cell.onload = function(){
			ctxBeta.drawImage(cell,i*300,0,300,300);
		}
		cell.src = "../Files1/img/"+cellImages[i];
		
		let beta = new Image();
		beta.onload = function(){
			ctxBeta.drawImage(beta,i*300,300,300,300);
		}
		beta.src = "../Files1/img/"+betaImages[i];
	}

	//Adding image for demonstration

	var canvasBcell = document.getElementById("Bcell");
	var ctxBcell = canvasBcell.getContext("2d");

	var imageCell = new Image();

	imageCell.crossOrigin = '';

	imageCell.src = "../Files2/118.png";

	//imageCell.src = "https://i.ibb.co/MkJS4GP/118.png"

	imageCell.onload = function() {
		ctxBcell.drawImage(imageCell,100,0,500,500);
		imageData = ctxBcell.getImageData(100,0,500,500);
		hist = histogramMade(imageData);
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
}
catch(err){
	console.log(err);
}

try{
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
		cell.src = "../Files1/img/"+cellImages[i];
		
		let th = new Image();
		
		th.onload = function(){
			ctxTh.drawImage(th,600,i*600,600,600);
		}
		th.src = "../Files1/img/"+thImages[i];
	}

}catch(err){
	console.log(err)
}