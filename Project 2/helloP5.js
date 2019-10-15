var press = 0;
var t0 = 0;
var indice = 0; //uso para montar a função acumulada
var indice2 = 0;

function initial(){
  press = 0;
  t0 = millis();
  hist = imageCell.onload();
  indice = 0;
  indice2 = 0;
  calculate();
}

function next(){
  press += 1;
  t0 = millis();
  if(press == 3){calculate();}
}

function previous(){
  t0 = millis();
  indice = 0;
  indice2 = 0;
  if(press == 0){return;}
  else if (press == 1 || press == 2) {hist = imageCell.onload();}
  else if (press == 4) {calculate();}
  press -= 1;
}

//processing.js

function setup() { 
  var canvas = createCanvas(500, 500);
  canvas.parent('processing');
}

function drawLines(){
  fill(255);
  textSize(20);
  strokeWeight(0.1)
  textAlign(CENTER);
  text("Histogram Matching",250,40)
  textSize(10)
  strokeWeight(0.01)
  if (press != 4 && press != 5){text("255",440,420);}
  
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

var hist = imageCell.onload();

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

function secondDraw(t){
  
  if (t <= 1500){
    for(let i = 0; i < 256; i++){
      height = hist[i]*350/max(hist);
      stroke(100*i/255,200*i/255,255*i/255);
      rect(400/256*(i+1) + 50,400 - height,400/256 - 1,height);
    }
  }else{
    if(t%3 == 0 && indice < 255){
      indice += 1;
      hist[indice] = hist[indice] + hist[indice-1];
    }
    for(let i = 0; i < 256; i++){
      height = hist[i]*350/max(hist);
      if(i <= indice){
        stroke(200,100,50);
      }
      else{
        stroke(100*i/255,200*i/255,255*i/255);
      }
      rect(400/256*(i+1) + 50,400 - height,400/256 - 1,height);
    } 
  }
  explain1 = "Depois, calculamos o histograma acumulado, isto é, o valor" 
  explain2 = "da cor k será o somatório dos valores das cores menores ou iguais."
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
  text(explain2,250,470);
}

function thirdDraw(t){
  for(let i = 0; i < 256; i++){
    height = hist[i]*350/max(hist);
    stroke(200,100,50,255 - t/10);
    fill(255,255,255,255 - t/10);
    rect(400/256*(i+1) + 50,400 - height,400/256 - 1,height);
  }
  explain1 = "Na próxima etapa, utilizarei a distribuição Beta como referência," 
  explain2 = "mas você pode escolher qualquer distribuição. Escolha alfa e beta."
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
  text(explain2,250,470);
}

function fourthDraw(t){
  if(t <= 2800){
    for(let i = 0; i < 256; i++){
      height = betaDist[i]*350/max(betaDist);
      if(t<=2500){
        height = height*t/2500;//crescimento do histograma
        stroke(100*i/255,200*i/255,255*t/2500*i/255);
      }else{
        stroke(100*i/255,200*i/255,255*i/255);
      }
      rect(400/256*(i+1) + 50,400 - height,400/256 - 1,height);
    }    
  }
  else{
    if(t%3 == 0 && indice2 < 255){
      indice2 += 1;
      betaDist[indice2] = betaDist[indice2] + betaDist[indice2-1];
    }
    for(let i = 0; i < 256; i++){
      height = betaDist[i]*350/max(betaDist);
      if(i <= indice2){
        stroke(200,100,50);
      }
      else{
        stroke(100*i/255,200*i/255,255*i/255);
      }
      rect(400/256*(i+1) + 50,400 - height,400/256 - 1,height);
    } 
  }

  explain1 = "Calcumos o histograma da nossa distribuição beta, discretizando-a. " 
  explain2 = "Depois calculamos o histograma acumulado, da mesma forma que antes. "
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
  text(explain2,250,470);
}

function fifthDraw(t){
  textSize(10)
  strokeWeight(0.01)
  if(t<=3000){
    maxi = 255*t/3000;
    text("255",440,420);
  }else if(t<=4000){
    maxi = 255;
    text("255",440,420);
  }else{
    maxi = 0;
    last = max(50,255-(t-4000)/10);
    for(let i = 0; i < last;i++){
      maximum1 = max(hist.slice(0,1 + Math.ceil(last)));
      maximum2 = max(betaDist.slice(0,1 + Math.ceil(last)));
      maximum = max(maximum1,maximum2);
      height = hist[i]*350/maximum;
      height2 = hist[i+1]*350/maximum;
      strokeWeight(4);
      stroke(200,100,50);
      line(400/Math.ceil(last)*i + 50, 400 - height,400/Math.ceil(last)*(i+1) + 50,400 - height2);
      betaHeight = betaDist[i]*350/maximum;
      betaHeight2 = betaDist[i+1]*350/maximum;
      strokeWeight(4);
      stroke(50,200,100);
      line(400/Math.ceil(last)*i + 50, 400 - betaHeight,400/Math.ceil(last)*(i+1) + 50,400 - betaHeight2);  
    }
    stroke(255);
    strokeWeight(0.01);
    text(Math.ceil(last),440,420);
  }
  for(let i = 0; i < maxi; i++){
    height = hist[i]*350/max(hist);
    height2 = hist[i+1]*350/max(hist);
    strokeWeight(4);
    stroke(200,100,50);
    line(400/256*i + 50, 400 - height,400/256*(i+1) + 50,400 - height2); 
    betaHeight = betaDist[i]*350/max(betaDist);
    betaHeight2 = betaDist[i+1]*350/max(betaDist);
    strokeWeight(4);
    stroke(50,200,100);
    line(400/256*i + 50, 400 - betaHeight,400/256*(i+1) + 50,400 - betaHeight2);  
  }

  explain1 = "Essas são as funções de distribuição acumulada. A vermelha é " 
  explain2 = "a distribuição de nossa imagem e a verde a distribuição de referência."
  strokeWeight(1);
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
  text(explain2,250,470);
}

function sixthDraw(t){
  if(t <= 3000){
    for(let i = 0; i < 51;i++){
      maximum1 = max(hist.slice(0,51));
      maximum2 = max(betaDist.slice(0,51));
      maximum = max(maximum1,maximum2);
      height = hist[i]*350/maximum;
      height2 = hist[i+1]*350/maximum;
      strokeWeight(4);
      stroke(200,100,50);
      line(400/50*i + 50, 400 - height,400/50*(i+1) + 50,400 - height2);
      betaHeight = betaDist[i]*350/maximum;
      betaHeight2 = betaDist[i+1]*350/maximum;
      strokeWeight(4);
      stroke(50,200,100);
      line(400/50*i + 50, 400 - betaHeight,400/50*(i+1) + 50,400 - betaHeight2);  
    }
    stroke(255);
    strokeWeight(0.01);
    text("50",440,420);
  }else{

  }

  explain1 = "Nesse momento, o matching de cores é feito." 
  explain2 = "Cores com mesmo histograma são referenciados."
  strokeWeight(1);
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
  text(explain2,250,470);
}

function draw() {
  background(0);
  drawLines();
  if(press == 0){
    let t = millis() - t0;
    firstDraw(t);    
  }
  else if(press == 1){
    let t = millis() - t0;
    secondDraw(t);
  }
  else if(press == 2){
    let t = millis() - t0;
    thirdDraw(t);
  }
  else if(press == 3){
    let t = millis() - t0;
    fourthDraw(t);
  }
  else if(press == 4){
    t = millis() - t0;
    fifthDraw(t);
  }
  else if(press == 5){
    t = millis() - t0;
    sixthDraw(t);
  }
}