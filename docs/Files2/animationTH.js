var t0 = 0;
var inicial_points = [0,1/4*256,1/2*256,3/4*256,255];
var inicial_points_old = [...inicial_points];
var indice = 0;
var p = 0;
var end = false;

function restart(){

  t0 = 0;
  inicial_points = [0,1/4*256,1/2*256,3/4*256,255];
  inicial_points_old = [...inicial_points];
  indice = 0;
  p = 0;
  end = false;
  hist = imageCell2.onload();

  t0 = millis();
  loop();
}
 
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
  if(t <= 12000){
    explain1 = "Depois, marcamos n pontos para dividir o histograma em n + 1 partes." 
    explain2 = "Neste caso, marcam-se três pontos uniformemente."
  }
  else if(end){
    explain1 = "Agora, este é o fim!"
    explain2 = "Observe o resultado!"
  }
  else{
    explain1 = "Calcula-se a média ponderada a cada dois pontos. Marcaremos" 
    explain2 = "os pontos nessas posições e repetimos esse processo até a convergência."
  }
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
  text(explain2,250,470);
}

function meanCalculation(p1,p2){
  let mean = 0;
  let div = 0;
  for(let i = p1; i < p2 + 1;i++){
    mean += i*hist[i];
    div += hist[i];
  }
  mean = mean/div;
  return mean;  
}

function meanDraw(t){

  height = hist[p + Math.floor((t-12000)/30)]*350/max(hist);
  strokeWeight(4);
  stroke(50,200,100);
  fill(50,200,100);
  rect(400/256*(p + Math.floor((t-12000)/30)) + 50,400 - height,400/256 - 1,height);

  textSize(10);
  strokeWeight(1);
  stroke(255);
  fill(255);
  if(indice == 0){
    text("Point 1: " + Math.round(meanCalculation(inicial_points[0],p + Math.floor((t-12000)/30))).toString(),90,20);
    text("Point 2: " + Math.round(meanCalculation(inicial_points[1],inicial_points[3])).toString(),90,40);7
    text("Point 3: " + Math.round(meanCalculation(inicial_points[2],inicial_points[4])).toString(),90,60);
  }
  else if(indice == 1){
    text("Point 1: " + Math.round(meanCalculation(inicial_points[0],inicial_points[2])).toString(),90,20);
    text("Point 2: " + Math.round(meanCalculation(inicial_points[1],p + Math.floor((t-12000)/30))).toString(),90,40);
    text("Point 3: " + Math.round(meanCalculation(inicial_points[2],inicial_points[4])).toString(),90,60);
  }
  else{
    text("Point 1: " + Math.round(meanCalculation(inicial_points[0],inicial_points[2])).toString(),90,20);
    text("Point 2: " + Math.round(meanCalculation(inicial_points[1],inicial_points[3])).toString(),90,40);
    text("Point 3: " + Math.round(meanCalculation(inicial_points[2],p + Math.floor((t-12000)/30))).toString(),90,60);
  }

  if(abs(p + Math.floor((t-12000)/30) - inicial_points[indice + 2])<=1){
    indice += 1;
    p = inicial_points[indice];
    t0 = millis() - 12000;
    if (indice == inicial_points.length - 2){
      p = 0;
      indice = 0;
      let dif = 0;
      for(let i = 1; i < inicial_points.length-1; i++){
        inicial_points[i] = Math.round(meanCalculation(inicial_points_old[i-1],inicial_points_old[i+1]));
        dif += Math.abs(inicial_points[i] - inicial_points_old[i]);
      }
      if(dif <= 6){
        end = true;
      }
      inicial_points_old = [...inicial_points];
    }
  }

}

function draw() {
  t = millis() - t0;
  background(0);
  drawLines();
  if (t <= 5000){
    histogramDraw(t);
  }
  else if (t <= 12000){
    pointsDraw(t);
  }
  else if(!end){
    pointsDraw(t);
    meanDraw(t);
  }
  else{
    pointsDraw(t);
    transform(inicial_points);
    noLoop();
  }
}