var t0 = 0;
var inicial_points = [0,1/4*256,1/2*256,3/4*256,255]
 
//processing.js

function setup() { 
  var canvas = createCanvas(500, 500);
  canvas.parent('processing2');
}

function drawLines(){
  fill(255);
  textSize(20);
  strokeWeight(0.1)
  textAlign(CENTER);
  text("Thresholding",250,40)
  textSize(10)
  strokeWeight(0.01)
  text("255",440,420);

  strokeWeight(1);
  stroke(355,255,255);  
  line(50,50,50,400);   //vertical
  line(50,400,450,400); //(x0,y0) -> (x1,y1) horizontal
  line(50,50,45,55);    // flecha
  line(50,50,55,55);
  line(450,395,450,405) //marcador 255
  textSize(12);
  text("h",40,45);
}

var hist = imageCell2.onload();

function histogramDraw(t){
  
  for(let i = 0; i < 256; i++){
    height = hist[i]*350/max(hist);
    if(t<=2500){
      height = height*t/2500;//crescimento do histograma
      stroke(100*i/255,200*i/255,255*t/2500*i/255);
    } 
    else{
      stroke(100*i/255,200*i/255,255*i/255);
    }
    rect(400/256*(i+1) + 50,400 - height,400/256 - 1,height);
  }
  explain1 = "Primeiro, nós montamos o histograma das 256 cores da" 
  explain2 = "imagem em tons de cinza selecionada e normalizamos os valores."
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
  text(explain2,250,470);
}

function pointsDraw(t){
  
  for(let i = 0; i < 256; i++){
    height = hist[i]*350/max(hist);
    if (t <= 8500){
      stroke(100*i/255,200*i/255,255*i/255);
    }
    else{
      strokeWeight(1);
      for(let j = 0; j < inicial_points.length;j++){
        if(i < inicial_points[j]){
          stroke(inicial_points[j],inicial_points[j],inicial_points[j]);
          fill(inicial_points[j],inicial_points[j],inicial_points[j]);
          break;
        }
      }
    }
    rect(400/256*(i+1) + 50,400 - height,400/256 - 1,height);
  }
  if(t >= 6000){
    for(let i = 0; i < inicial_points.length; i ++){
      stroke(200,50,50);
      strokeWeight(8);
      point(400/256*inicial_points[i] + 50,400);
      strokeWeight(1);
      rect(400/256*inicial_points[i] + 50,Math.max(50,400 + (6000 - t)*3/20),400/256-1,Math.min(350,(t - 6000)*3/20));
    }
  }

  explain1 = "Depois, marcamos n pontos para dividir o histograma em n + 1 partes." 
  explain2 = "Neste caso, marcam-se três pontos uniformemente."
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
  text(explain2,250,470);
}

function draw() {
  t = millis() - t0;
  background(0);
  drawLines();
  if (t <= 5000){
    histogramDraw(t);
  }
  else if (t <= 50000){
    pointsDraw(t);
  }
  else{
    pointsDraw(t);
  }
}