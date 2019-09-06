processingImage = function(img,division,title){
	
	//I iniciate the colors. However, when the image is grey,
	//they are iqual. 
	var red = new Array(256).fill(0)
	var green = new Array(256).fill(0);
	var blue = new Array(256).fill(0);
	var x = new Array(256).fill(0);
	
	for (let i = 1; i < 256; i++){
		x[i] = x[i-1] + 1;
	};
	
	// fazendo a contagem das cores
	var imgData = img.data;
	for (let i = 0; i < imgData.length; i+=4){
		red[imgData[i]] += 1;
		green[imgData[i + 1]] += 1;
		blue[imgData[i + 2]] += 1;
	};
	
	//cálculo da média 
	var mean = 0;
	var total = 0;
	var maximal = 0;
	var x_mean = Array(256).fill(0);
	var y_mean = Array(256).fill(0);
	for(let i = 0; i < 256; i++){
		mean += i*red[i];
		total += red[i];
		if (red[i] > maximal){maximal = red[i];}
		if (i > 0){x_mean[i] = x_mean[i-1] + 1;}
	};
	mean = mean/total;
	y_mean[parseInt(mean)] = maximal;
	
	histogram(x,red,division,title,x_mean,y_mean)
};

histogram = function(x,color,division,title,x_mean,y_mean){
	var trace = {type: "bar", x: x, y: color,
		marker: {
			color: "#FFFFFF",
			line: {width: 0.5}
		},
		name: "cores"
	};
	
	var mean = {type: "bar", x: x_mean, y: y_mean,
		marker: {
			color: "FF0000",
			line: {width: 0.5}
		},
		name: "média"
	};
	
	var data = [trace,mean];
	var layout = {title: title, font: {size: 14}};

	hist = document.getElementById(division);
	Plotly.newPlot(hist,data,layout,{responsive:false});
};

