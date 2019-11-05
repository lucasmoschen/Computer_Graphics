// Sets up the the context and starts the rendering. 

function main() {
  const canvas = document.querySelector("#glCanvas");
  // Initialize the GL context
  const gl = canvas.getContext("webgl");

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  // Set clear color to black, fully opaque
  gl.clearColor(255, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var vertices = [-0.5, 0.5, 0.0, -0.5, -0.5, 0.0, 0.0, -0.5,0.0];
  var indices = [0,1,2];

  var vertex_buffer = gl.createBuffer(); // Create a new buffer object

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind an empty array buffer to it
  
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // Pass the vertices data to the buffer

  gl.bindBuffer(gl.ARRAY_BUFFER, null); // Unbind the buffer

  var Index_Buffer = gl.createBuffer();

  // Bind appropriate array buffer to it
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

  // Pass the vertex data to the buffer
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  
  // Unbind the buffer
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  var vertCode =
    'attribute vec3 coordinates;' + 
    'void main(void) {' + ' gl_Position = vec4(coordinates, 1.0);' + '}'; //source code

  var vertShader = gl.createShader(gl.VERTEX_SHADER);

  gl.shaderSource(vertShader, vertCode); //Attach vertex shader source code

  gl.compileShader(vertShader);

  var fragCode = 
     'void main(void) {' + 'gl_FragColor = vec4(1.0, 0.5, 0.0, 1);' + '}'; //source code

  var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(fragShader, fragCode);

  gl.compileShader(fragShader);

  var shaderProgram = gl.createProgram(); // Create a shader program to store combined shader program

  gl.attachShader(shaderProgram, vertShader); // Attach a vertex shader
  
  gl.attachShader(shaderProgram, fragShader);

  gl.linkProgram(shaderProgram); // Link both programs

  gl.useProgram(shaderProgram); // Use the combined shader program object

  gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); //Bind vertex buffer object

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);

  var coord = gl.getAttribLocation(shaderProgram, "coordinates"); //Get the attribute location

  gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); //point an attribute to the bound VBO

  gl.enableVertexAttribArray(coord);

  gl.clearColor(0.5, 0.5, 0.5, 0.9);

  gl.enable(gl.DEPTH_TEST); 

  gl.viewport(0,0,canvas.width,canvas.height);
  gl.drawElements(gl.TRIANGLES, indices.length,gl.UNSIGNED_SHORT,0);
}

window.onload = main;
