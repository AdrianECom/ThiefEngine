/**
* @class
* @classdesc This class represents line renderer. (NOTE: This class doesn't extend from MeshRenderer !).
* @param {Shader} shader The number of vertices.
* @param {Vector3} start The number of vertices.
* @param {Vector3} end The number of vertices.
* @param {Color} color The number of vertices.
* @param {Matrix4} modelMatrix The number of vertices.
*/
var LineRenderer = function (shader,start,end,color, modelMatrix){
    this.shader = shader;
    this.color = color;

    this.modelMatrix = modelMatrix;

    this.start = start.cpy();
    this.end = end.cpy();

    this.start.w = 1;
    this.end.w = 1;

    this.vertices = this.start.toArray().concat(this.end.toArray());

    this.colors = this.color.toArray().concat(this.color.toArray());

    this.elem = [0,1];

    this.vboPosition = 0;
  	this.vboColor = 0;
  	this.vboElemIndices = 0;

  	this.vao = 0;
};

//----------------------------------------------------------------------

/**
* Binds the line renderer. (Sends data to WebGL)
*/
LineRenderer.prototype.bind = function () {

    this.vao = vao_ext.createVertexArrayOES();

    vao_ext.bindVertexArrayOES(this.vao);

    gl.enableVertexAttribArray(0);

  	// Create some buffers
  	this.vboPosition = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, this.vboPosition);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW); // TODO DYNAMIC
  	gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 0, 0);

  	gl.enableVertexAttribArray(1);

    this.vboColor = gl.createBuffer();
  	gl.bindBuffer(gl.ARRAY_BUFFER, this.vboColor);
  	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.colors), gl.STATIC_DRAW); // TODO DYNAMIC
  	gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 0, 0);


    this.vboElemIndices = gl.createBuffer();
  	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vboElemIndices);
  	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.elem), gl.STATIC_DRAW);

    vao_ext.bindVertexArrayOES(null);
};

//----------------------------------------------------------------------


/**
* Renders the line.
*/
LineRenderer.prototype.render = function () {
    this.shader.enable();

    this.shader.addMatrix(this.modelMatrix, "modelMatrix");

  	vao_ext.bindVertexArrayOES(this.vao);

  	gl.enableVertexAttribArray(0);
  	gl.enableVertexAttribArray(1);

  	gl.drawElements(gl.LINES, 2, gl.UNSIGNED_SHORT, 0);

    this.shader.disable();

  	gl.disableVertexAttribArray(0);
  	gl.disableVertexAttribArray(1);

};

//----------------------------------------------------------------------
