var canvasOriginal = document.getElementById("imagemOriginal");
var ctxOriginal = canvasOriginal.getContext("2d");

var imgOriginal = new Image();
var imgOut = new Image();

imgOriginal.crossOrigin = '';
imgOut.crossOrigin = '';

	
var red = new Array(256).fill(0)
var green = new Array(256).fill(0);
var blue = new Array(256).fill(0);
var x = new Array(256).fill(0);

imgOriginal.onload = function (){
	
	ctxOriginal.drawImage(imgOriginal,0,0,512,512);
	
	imgOut = ctxOriginal.getImageData(0,0,512,512);
	
	var imgDataOut = imgOut;
	
	for (let i = 0; i < imgOut.data.length; i += 4) {
		imgOut.data[i] = 255 - imgOut.data[i];
		imgOut.data[i+1] = 255 - imgOut.data[i+1];
		imgOut.data[i+2] = 255- imgOut.data[i+2];
	}
	
	ctxOriginal.putImageData(imgOut, 512, 0);
	
	for (let i = 1; i < 256; i++){
		x[i] = x[i-1] + 1;
	}

	for (let i = 0; i < imgDataOut.data.length; i+=4){
		red[imgDataOut.data[i]] += 1;
		green[imgDataOut.data[i + 1]] += 1;
		blue[imgDataOut.data[i + 2]] += 1;
	};
	
	var trace1 = {
		type: "bar",
		x: x,
		y: red,
		marker: {
			color: "#FF0000",
			line: {width: 0.5}
		}
	};
	
	var data = [trace1];
	var layout = {title: "Histogram of the grey colors", font: {size: 18}};

	hist = document.getElementById("histogram1");
	Plotly.newPlot(hist,data,layout,{responsive:true});
};

imgOriginal.src = "https://i.ibb.co/1K04DTr/img1.png";

