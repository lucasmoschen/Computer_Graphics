var press = 0;
var t0 = 0;
var cumHist = new Array(256); //histogram cumulative.
var cumBetaDist = new Array(256); 

//sixth function
var matching = new Array(256); //array com as cores e suas cores após o matching
var error = 1; //indica o erro entre a diferença das distribuições
var curMatch = 0; //o valor atual da cor referência que será o match
var curColor = 0; //o valor atual da cor

function initial(){
  press = 0;
  hist = imageCell.onload();
  cumHist = cumulative(hist);
  error = 1;
  curColor = 0;
  curMatch = 0;
  doit();
  t0 = millis();
  loop();
}

function next(){

  if (press == 0){
    cumHist = cumulative(hist);
  }
  else if (press == 2){
    calculate();
  }
  else if (press == 4){
    matching = calcMatching(cumHist,cumBetaDist);
    curColor = 0;
    curMatch = 0;
    error = 1;
  }

  press += 1;
  t0 = millis();

  if(press == 8){
    loop();
  }
  else if(press == 9){
    press = 8;
    loop();
  }
}

function previous(){
  if (press == 0){
    press = 1;
  }
  else if (press == 4){
    calculate();
  }
  else if (press == 6){
    error = 1;
    curMatch = 0;
    curColor = 0;
  }

  press -= 1;
  t0 = millis();

  if(press == 6){
    hist = imageCell.onload();
    loop();
  }
  if(press == 7){
    hist = imageCell.onload();
    press = 6;
    loop();
  }
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
    maximum1 = max(hist.slice(Math.ceil(256*(t - 1500)/6000),256));
    maximum2 = max(cumHist.slice(0,Math.ceil(256*(t - 1500)/6000)));
    maximum = max(maximum1,maximum2);
    for(let i = 0; i < 256*(t - 1500)/6000;i++){
      height = cumHist[i]*350/maximum;
      stroke(200,100,50)
      rect(400/256*(i+1) + 50,400 - height,400/256 - 1,height);
    }
    for(let i = Math.ceil(256*(t - 1500)/6000);i < 256; i++){
      height = hist[i]*350/maximum;
      stroke(100*i/255,200*i/255,255*i/255);
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
    height = cumHist[i]*350/max(cumHist);
    stroke(200,100,50,255 - t/20);
    fill(255,255,255,255 - t/20);
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
    maximum1 = max(betaDist.slice(Math.ceil(256*(t - 2800)/6000),256));
    maximum2 = max(cumBetaDist.slice(0,Math.ceil(256*(t - 2800)/6000)));
    maximum = max(maximum1,maximum2);
    for(let i = 0; i < 256*(t - 2800)/6000;i++){
      height = cumBetaDist[i]*350/maximum;
      stroke(200,100,50)
      rect(400/256*(i+1) + 50,400 - height,400/256 - 1,height);
    }
    for(let i = Math.ceil(256*(t - 2800)/6000);i < 256; i++){
      height = betaDist[i]*350/maximum;
      stroke(100*i/255,200*i/255,255*i/255);
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
      maximum1 = max(cumHist.slice(0,1 + Math.ceil(last)));
      maximum2 = max(cumBetaDist.slice(0,1 + Math.ceil(last)));
      maximum = max(maximum1,maximum2);
      height = cumHist[i]*350/maximum;
      height2 = cumHist[i+1]*350/maximum;
      strokeWeight(4);
      stroke(200,100,50);
      line(400/Math.ceil(last)*i + 50, 400 - height,400/Math.ceil(last)*(i+1) + 50,400 - height2);
      betaHeight = cumBetaDist[i]*350/maximum;
      betaHeight2 = cumBetaDist[i+1]*350/maximum;
      strokeWeight(4);
      stroke(50,200,100);
      line(400/Math.ceil(last)*i + 50, 400 - betaHeight,400/Math.ceil(last)*(i+1) + 50,400 - betaHeight2);  
    }
    stroke(255);
    strokeWeight(0.01);
    text(Math.ceil(last),440,420);
  }
  for(let i = 0; i < maxi; i++){
    height = cumHist[i]*350/max(cumHist);
    height2 = cumHist[i+1]*350/max(cumHist);
    strokeWeight(4);
    stroke(200,100,50);
    line(400/256*i + 50, 400 - height,400/256*(i+1) + 50,400 - height2); 
    betaHeight = cumBetaDist[i]*350/max(cumBetaDist);
    betaHeight2 = cumBetaDist[i+1]*350/max(cumBetaDist);
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
  if(t<=3000){
    maximum1 = max(cumHist.slice(0,51));
    maximum2 = max(cumBetaDist.slice(0,51));
    maximum = max(maximum1,maximum2);
    for(let i = 0; i < 50;i++){
      height = cumHist[i]*350/maximum;
      height2 = cumHist[i+1]*350/maximum;
      strokeWeight(4);
      stroke(200,100,50);
      line(400/50*i + 50, 400 - height,400/50*(i+1) + 50,400 - height2);
      betaHeight = cumBetaDist[i]*350/maximum;
      betaHeight2 = cumBetaDist[i+1]*350/maximum;
      strokeWeight(4);
      stroke(50,200,100);
      line(400/50*i + 50, 400 - betaHeight,400/50*(i+1) + 50,400 - betaHeight2);  
    }
    explain1 = "Nesse momento, o matching de cores é feito." 
    explain2 = "Cores com mesmo histograma são referenciados."
    textSize(10);
    stroke(255);
    strokeWeight(0.01);
    text("50",440,420);
  }else{
    if(curColor != 256){
      maxi = max(50,curMatch,curColor);
      if (maxi == 50){
        times = 5;
      }else{times = 2;}
        if(t%times == 0){
          errorOld = error;
          error = Math.abs(cumBetaDist[curMatch]-cumHist[curColor]);
          if(error > errorOld){
            if(maxi == 50){
              curMatch = -1;
            }else{
              curMatch -= 2;
            }
            error = 1;
            curColor += 1
          }
          curMatch += 1;
          if(curMatch == 256){
            curColor = 256;
          }
        }
        maximum1 = max(cumHist.slice(0,maxi+1));
        maximum2 = max(cumBetaDist.slice(0,maxi+1));
        maximum = max(maximum1,maximum2);
        for(let i = 0; i < maxi;i++){
          height = cumHist[i]*350/maximum;
          height2 = cumHist[i+1]*350/maximum;
          strokeWeight(4);
          stroke(200,100,50);
          line(400/maxi*i + 50, 400 - height,400/maxi*(i+1) + 50,400 - height2);
          betaHeight = cumBetaDist[i]*350/maximum;
          betaHeight2 = cumBetaDist[i+1]*350/maximum;
          strokeWeight(4);
          stroke(50,200,100);
          line(400/maxi*i + 50, 400 - betaHeight,400/maxi*(i+1) + 50,400 - betaHeight2);  
        }
        strokeWeight(3);
        stroke(200,50,50);
        line(400/maxi*curColor + 50, 400 - cumHist[curColor]*350/maximum,400/maxi*curMatch + 50,400 - cumBetaDist[curMatch]*350/maximum);
        if(maxi <= 50){
          explain1 = "Note que procuro a cor que apresenta a menor diferença." 
          explain2 = "Basta ver que quando o erro aumentar, deve-se parar." 
        }else{
          explain1 = "A partir de agora, utilizo o algoritmo de forma mais eficiente, " 
          explain2 = "pois a busca de cores não reinicia, já que o acumulado não diminui."
        }
        textSize(10);
        stroke(255);
        strokeWeight(0.01);
        text(maxi,440,420);      
    }else{
      for(let i = 0; i < 256; i++){
        height = cumHist[i]*350/max(cumHist);
        height2 = cumHist[i+1]*350/max(cumHist);
        strokeWeight(4);
        stroke(200,100,50);
        line(400/256*i + 50, 400 - height,400/256*(i+1) + 50,400 - height2); 
        betaHeight = cumBetaDist[i]*350/max(cumBetaDist);
        betaHeight2 = cumBetaDist[i+1]*350/max(cumBetaDist);
        strokeWeight(4);
        stroke(50,200,100);
        line(400/256*i + 50, 400 - betaHeight,400/256*(i+1) + 50,400 - betaHeight2);  
      }
      explain1 = "Na próxima etapa, mostrarei a função de transição." 
      explain2 = "Para cada cor no eixo x, terei uma nova cor após o matching."
      textSize(10);
      stroke(255);
      strokeWeight(0.01);
      text(255,440,420); 
    }
  }  
  strokeWeight(1);
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
  text(explain2,250,470);
}

function seventhDraw(t){
  for(let i = 0;i < 256*t/3000;i++){
    height = matching[i]*350/255;
    height2 = matching[i+1]*350/255;
    strokeWeight(2);
    stroke(50,200,50);
    line(400/256*i + 50, 400 - height,400/256*(i+1) + 50,400 - height2);
  }
  explain1 = "Agora, basta clicar em continuar e você verá o resultado na imagem."
  strokeWeight(1);
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
}

function eighthDraw(){
  for(let i = 0;i < 256;i++){
    height = matching[i]*350/255;
    height2 = matching[i+1]*350/255;
    strokeWeight(2);
    stroke(50,200,50);
    line(400/256*i + 50, 400 - height,400/256*(i+1) + 50,400 - height2);
  }
  explain1 = "Este é, por fim, o resultado da imagem!"
  strokeWeight(1);
  stroke(255);
  textSize(13);
  textAlign(CENTER);
  text(explain1,250,450);
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
  else if(press == 6){
    t = millis() - t0;
    seventhDraw(t);
  }
  else if(press == 7){
    eighthDraw();
    histogramMatch(matching);
    noLoop();
  }
  else if(press == 8){
    eighthDraw();
    alert("Este é o fim! Obrigado!")
    noLoop();
  }
}