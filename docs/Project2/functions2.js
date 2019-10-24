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