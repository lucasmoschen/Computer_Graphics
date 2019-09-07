processingImage = function(img,division,title,measures){
	
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
	for (let i = 0; i < 256; i++){
		red[i] = 4*red[i]/imgData.length;
		green[i] = 4*green[i]/imgData.length;
		blue[i] = 4*blue[i]/imgData.length;	
	}

	//cálculo da média 
	var mean = 0;
	var max = 0;
	var a = 0;
	var x_mean = Array(256).fill(0);
	var y_mean = Array(256).fill(0);
	for(let i = 0; i < 256; i++){
		mean += i*red[i];
		if (red[i] > max) {max = red[i];}
		if (i > 0){x_mean[i] = x_mean[i-1] + 1;}
	};
	y_mean[parseInt(mean)] = max;
	
	histogram(x,red,division,title,measures,x_mean,y_mean)
};

histogram = function(x,color,division,title,measure,x_mean = 0,y_mean = 0){
	var trace = {type: "bar", x: x, y: color,
		marker: {
			color: "#FFFFFF",
			line: {width: 0.5}
		},
		name: "cores"
	};
	
	if (x_mean != 0 && y_mean != 0){
		var mean = {type: "bar", x: x_mean, y: y_mean,
			marker: {
				color: "FF0000",
				line: {width: 0.5}
			},
			name: "média"
		};
		
		var data = [trace,mean];
	}else{var data = [trace];}

	var layout = {title: title, font: {size: 14},
		width: measure[0],
		height: measure[1],
		margin: {l: measure[2], r: measure[3], b: measure[4], t: measure[5]}
	};

	hist = document.getElementById(division);
	Plotly.newPlot(hist,data,layout,{responsive:false});
};

eq_histogram = function(img,verificador,transformation = 0){
	
	var red = new Array(256).fill(0)
	var green = new Array(256).fill(0);
	var blue = new Array(256).fill(0);
	
	// fazendo a contagem das cores

	for (let i = 0; i < img.data.length; i+=4){
		red[img.data[i]] += 1;
		green[img.data[i + 1]] += 1;
		blue[img.data[i + 2]] += 1;
	};
	
	if (transformation == 0){
		transformation = new Array(256).fill(0);
	}
	
	red[0] = 4*red[0]/img.data.length;
	green[0] = 4*green[0]/img.data.length;
	blue[0] = 4*blue[0]/img.data.length;
	transformation[0] = red[0];
	
	for (let i = 1; i < red.length; i++){
		red[i] = 4*red[i]/img.data.length;
		green[i] = 4*green[i]/img.data.length;
		blue[i] = 4*blue[i]/img.data.length;
		transformation[i] = red[i] + transformation[i-1];
	}
	if (verificador == 1){
		for(let i = 0; i < img.data.length;i+=4){
			img.data[i] = 256*transformation[img.data[i]];
			img.data[i+1] = 256*transformation[img.data[i+1]];
			img.data[i+2] = 256*transformation[img.data[i+2]];
		}
	}
};

hist_matching = function(img,imgRef,measures){
	
	var color = new Array(256).fill(0);
	var x = new Array(256).fill(0);
	
	for (let i = 1; i < x.length;i++){x[i] = x[i-1]+1;}
	
	var transformation = new Array(256).fill(0);
	var transformation2 = new Array(256).fill(0);
	
	eq_histogram(img,0,transformation);	
	eq_histogram(imgRef,0,transformation2);
	
	var  errOld = 1;
	var j = 0; 
	for (let i = 0; i <img.data.length;i+=4){
		errOld = 1;
		for (j = 0; j < transformation.length; j++){
			err = Math.abs(transformation2[j] - transformation[img.data[i]]);
			if (err >= errOld){break;}
			errOld = err;
		}
		img.data[i] = j - 1 
		img.data[i+1] = j - 1
		img.data[i+2] = j - 1
		j = 0;
		color[img.data[i]] += 1;
	}
	histogram(x,color,"histogram_matching3","Result Histogram",measures);
}