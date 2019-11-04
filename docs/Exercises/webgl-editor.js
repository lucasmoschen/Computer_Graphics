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
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  var vertices = [-0.5, 0.5, 0.3, -0.5, -0.5, 0.0,0.0, -0.5,0.5];

         var vertex_buffer = gl.createBuffer(); // Create a new buffer object

         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer); // Bind an empty array buffer to it
          
         gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW); // Pass the vertices data to the buffer

         gl.bindBuffer(gl.ARRAY_BUFFER, null); // Unbind the buffer

         // Vertex shader source code
         var vertCode =
            'attribute vec2 coordinates;' + 
            'void main(void) {' + ' gl_Position = vec4(coordinates,0.0, 1.0);' + '}';

         //Create a vertex shader object
         var vertShader = gl.createShader(gl.VERTEX_SHADER);

         //Attach vertex shader source code
         gl.shaderSource(vertShader, vertCode);

         //Compile the vertex shader
         gl.compileShader(vertShader);

         //Fragment shader source code
         var fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';

         // Create fragment shader object
         var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

         // Attach fragment shader source code
         gl.shaderSource(fragShader, fragCode);

         // Compile the fragment shader
         gl.compileShader(fragShader);

         // Create a shader program object to store combined shader program
         var shaderProgram = gl.createProgram();

         // Attach a vertex shader
         gl.attachShader(shaderProgram, vertShader); 
         
         // Attach a fragment shader
         gl.attachShader(shaderProgram, fragShader);

         // Link both programs
         gl.linkProgram(shaderProgram);

         // Use the combined shader program object
         gl.useProgram(shaderProgram);

         /* Step 4: Associate the shader programs to buffer objects */

         //Bind vertex buffer object
         gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

         //Get the attribute location
         var coord = gl.getAttribLocation(shaderProgram, "coordinates");

         //point an attribute to the currently bound VBO
         gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

         //Enable the attribute
         gl.enableVertexAttribArray(coord);

         /* Step5: Drawing the required object (triangle) */

         // Clear the canvas
         gl.clearColor(0.5, 0.5, 0.5, 0.9);

         // Enable the depth test
         gl.enable(gl.DEPTH_TEST); 

         // Set the view port
         gl.viewport(0,0,canvas.width,canvas.height);

         // Draw the triangle
         gl.drawArrays(gl.TRIANGLES, 0, 3);
}

window.onload = main;
