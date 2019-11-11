//--------------------------Canvas---------------------------//
 var canvas = document.getElementById('glCanvas');
 gl = canvas.getContext('experimental-webgl');

 var sliderX = document.getElementById("myRangeX");
 var outputX = document.getElementById("demoX");

 outputX.innerHTML = sliderX.value; // Display the default slider value

 // Update the current slider value (each time you drag the slider handle)
 sliderX.oninput = function() {
   outputX.innerHTML = this.value;
 } 

 var sliderY = document.getElementById("myRangeY");
 var outputY = document.getElementById("demoY");

 outputY.innerHTML = sliderY.value; // Display the default slider value

 // Update the current slider value (each time you drag the slider handle)
 sliderY.oninput = function() {
   outputY.innerHTML = this.value;
 } 

 var sliderZ = document.getElementById("myRangeZ");
 var outputZ = document.getElementById("demoZ");

 outputZ.innerHTML = sliderZ.value; // Display the default slider value

 // Update the current slider value (each time you drag the slider handle)
 sliderZ.oninput = function() {
   outputZ.innerHTML = this.value;
 } 

//-----------------Geometry of the object-------------------//

 var vertices = [
    -1,-1,-1,    1,-1,-1,    1, 1,-1,   -1, 1,-1,           //faces 
    -1,-1, 1,    1,-1, 1,    1, 1, 1,   -1, 1, 1,
    -1,-1,-1,   -1, 1,-1,   -1, 1, 1,   -1,-1, 1,
     1,-1,-1,    1, 1,-1,    1, 1, 1,    1,-1, 1,
    -1,-1,-1,   -1,-1, 1,    1,-1, 1,    1,-1,-1,
    -1, 1,-1,   -1, 1, 1,    1, 1, 1,    1, 1,-1, 
 ];

 var colors = [  
    0,1,1, 0,1,1, 0,1,1, 0,1,1,
    0,0,1, 0,0,1, 0,0,1, 0,0,1,
    1,0,1, 1,0,1, 1,0,1, 1,0,1,
    1,0,0, 1,0,0, 1,0,0, 1,0,0,
    0,1,0, 0,1,0, 0,1,0, 0,1,0,
    1,1,0, 1,1,0, 1,1,0, 1,1,0,
 ];

 var indices = [
    0,1,2, 0,2,3, 4,5,6, 4,6,7,
    8,9,10, 8,10,11, 12,13,14, 12,14,15,
    16,17,18, 16,18,19, 20,21,22, 20,22,23 
 ];

//-----------------------BUFFERS--------------------------//
 var vertex_buffer = gl.createBuffer ();
 gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

 var color_buffer = gl.createBuffer ();
 gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

 var index_buffer = gl.createBuffer ();
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);

//----------------------------SHADERS-------------------------------//

 var vertCode = 'attribute vec3 position;'+
    'uniform mat4 Pmatrix;'+   //create for this shader a matrix 4 for 4, to do the operations. 
    'uniform mat4 Vmatrix;'+
    'uniform mat4 Mmatrix;'+
    'attribute vec3 color;'+   
    'varying vec3 vColor;'+

    //the position is made about multiplying the matrix to the position. Note we do w = 1.  
    'void main(void) { '+
       'gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(position, 1.);'+
       'vColor = color;'+
    '}';

 var fragCode = 'precision mediump float;'+
    'varying vec3 vColor;'+
    'void main(void) {'+
       'gl_FragColor = vec4(vColor, 1.);'+
    '}';

//------------------------------CREATE SHADERS ---------------------------------//
 var vertShader = gl.createShader(gl.VERTEX_SHADER);
 gl.shaderSource(vertShader, vertCode);
 gl.compileShader(vertShader);

 var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
 gl.shaderSource(fragShader, fragCode);
 gl.compileShader(fragShader);

 var shaderProgram = gl.createProgram();
 gl.attachShader(shaderProgram, vertShader);
 gl.attachShader(shaderProgram, fragShader);
 gl.linkProgram(shaderProgram);

//Associating values with the Locatation in the Program
 var Pmatrix = gl.getUniformLocation(shaderProgram, "Pmatrix");
 var Vmatrix = gl.getUniformLocation(shaderProgram, "Vmatrix");
 var Mmatrix = gl.getUniformLocation(shaderProgram, "Mmatrix");

 gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
 var position = gl.getAttribLocation(shaderProgram, "position");
 gl.vertexAttribPointer(position, 3, gl.FLOAT, false,0,0) ;
 gl.enableVertexAttribArray(position);

 gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
 var color = gl.getAttribLocation(shaderProgram, "color");
 gl.vertexAttribPointer(color, 3, gl.FLOAT, false,0,0) ;
 gl.enableVertexAttribArray(color);

 gl.useProgram(shaderProgram);

//----------------------------MATRIX-------------------------------//

 function get_projection(angle, aspect, near, far) {
    var ang = Math.tan((angle*.5)*Math.PI/180);//angle*.5

    return [
       1/(aspect*ang), 0 , 0, 0,
       0, 1/ang, 0, 0,
       0, 0, -(far+near)/(far-near), -1,
       0, 0, (-2*far*near)/(far-near), 0 
    ];
 }

 var proj_matrix = get_projection(50, canvas.width/canvas.height, 1, 100);

 var mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
 var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

 // translating z
 view_matrix[14] = view_matrix[14] - 8;//zoom

 //---------------------- ROTATE ------------------------//

 function rotateX(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);

    let m1 = m[1];
    let m5 = m[5]; 
    let m9 = m[9];

    m[1] = c*m[1] - s*m[2]; 
    m[2] = c*m[2] + s*m1;
    m[5] = c*m[5] - s*m[6];
    m[6] = c*m[6] + s*m5;
    m[9] = c*m[9] - s*m[10];
    m[10] = c*m[10] + s*m9;
 }

 function rotateY(m, angle) {
    var c = Math.cos(angle);
    var s = Math.sin(angle);

    let m0 = m[0], m4 = m[4], m8 = m[8];


    m[0] = c*m[0]+s*m[2];
    m[2] = c*m[2]-s*m0;
    m[4] = c*m[4]+s*m[6];
    m[6] = c*m[6]-s*m4;
    m[8] = c*m[8]+s*m[10];
    m[10] = c*m[10]-s*m8
 }

 function rotateZ(m, angle) {
  var c = Math.cos(angle);
  var s = Math.sin(angle);

  let m0 = m[0], m4 = m[4], m8 = m[8];

  m[0] = c*m[0] - s*m[1];
  m[1] = c*m[1] + s*m0;
  m[4] = c*m[4] - s*m[5];
  m[5] = c*m[5] + s*m4;
  m[8] = c*m[8] - s*m[9];
  m[9] = c*m[9] + s*m8;
}

//------------------------ DRAW --------------------------//
 var time_old = 0;

 var animate = function(time) {

    var dt = time-time_old;
    
    rotateX(mov_matrix, dt*0.0001*sliderX.value);
    rotateY(mov_matrix, dt*0.0001*sliderY.value);
    rotateZ(mov_matrix, dt*0.0001*sliderZ.value);

    time_old = time;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clearColor(1, 0.5, 0.5, 0.9);   //background
    gl.clearDepth(1.0);

    gl.viewport(0.0, 0.0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

    window.requestAnimationFrame(animate);
 }
 animate(0);

