var t0 = 0;
 
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

function firstDraw(t){
  
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

function draw() {
  background(0);
  drawLines();
  t = millis() - t0;
  firstDraw(t);
}