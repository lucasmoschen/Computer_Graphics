//functions

histogram = function(data){
  color = new Array(256).fill(0);
  for(let i = 0; i < data.data.length; i +=4){
      color[data.data[i]] += 1;
  }
  for(let i = 0; i < 256; i++){
      color[i] = 4*color[i]/data.data.length;
  }

  return color;
}

var par1 = document.getElementById("alpha").value;
var par2 = document.getElementById("beta").value;
var betaDist = beta(par1,par2)//beta distribution

function calculate(){
  par1 = document.getElementById("alpha").value;
  par2 = document.getElementById("beta").value;
  betaDist = beta(par1,par2);
  cumBetaDist = cumulative(betaDist);
  t0 = millis();
}

function beta(alpha,betap){

  let betaDist = new Array(256);
  if(alpha === undefined){alpha = 1;}
  else if(alpha <= 0){
    alpha = 1;
    alert("Alfa deve ser positivo.");
  }
  if(betap === undefined){betap = 1;}
  else if(betap <= 0){
    betap = 1;
    alert("Beta deve ser positivo.");
  }
  a = parseFloat(alpha);
  b = parseFloat(betap);
  for(let i = 0; i < 256; i++){
    B = ss.gamma(a + b)/(ss.gamma(a)*ss.gamma(b));
    betaDist[i] = B*(Math.pow(i/256,a - 1)*Math.pow(1 - i/256,b - 1)+Math.pow((i+1)/256,a - 1)*Math.pow(1 - (i+1)/256,b - 1))/512;
  }

  return betaDist;
}

function cumulative(histogram){
  var H = new Array(256);
  H[0] = histogram[0];
  for(let i = 1; i < histogram.length; i++){
    H[i] = H[i-1] + histogram[i];
  }
  return H;
}

function calcMatching(histogram,reference){
  var matching = new Array(256);
  for(let i = 0; i < 256; i++){
    let j = 0;
    errOld = 2;
    err = Math.abs(histogram[i] - reference[j]);
    while(err <= errOld){
      errOld = err;
      j += 1;
      err = Math.abs(histogram[i] - reference[j]);
    }
    matching[i] = j - 1;
  }
  return matching;
}

function doit() {
  calculate();
  matching = calcMatching(cumHist,cumBetaDist);
}