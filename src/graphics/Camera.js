
/**
* @class
* @extends {Component}
* @classdesc This class represents a camera.
* @param {Matrix4} matrix The matrix. The matrix can be Perspective or Orthogonal.
*/
var Camera = function (matrix){
	Component.call(this);
	this.target = null;
	this.projectionMatrix = matrix;
	this.frustum = new Frustum(this);
	this.viewMatrix = Matrix4.identity();
};

Camera.prototype = new Component();
Camera.prototype.constructor = Camera;

//----------------------------------------------------------------------

/**
* Return the frustum.
* @returns {Frustum} The frustum.
*/
Camera.prototype.getFrustum = function (){
	return this.frustum;
};

//----------------------------------------------------------------------

/**
* Set the projection matrix.
* @param {Matrix4} projectionMatrix The projection matrix.
*/
Camera.prototype.setProjection = function (projectionMatrix){
    this.projectionMatrix = projectionMatrix;
};

//----------------------------------------------------------------------

/**
* Return the projection matrix.
* @returns {Matrix4} The projectionMatrix.
*/
Camera.prototype.getProjectionMatrix = function (){
    return this.projectionMatrix;
};

//----------------------------------------------------------------------

/**
* Return the view matrix.
* @returns {Matrix4} The viewMatrix.
*/
Camera.prototype.getViewMatrix = function (){

	var t = this.gameObject.getTransform();

	if(t.isDirty()){
		
		var rotationMatrix = new Matrix4(
	        t.right,
	        t.up,
	        t.forward,
	        new Vector4(0,0,0,1));

		var translationMatrix = Matrix4.translation(t.getPosition().cpy().mulScl(-1));

		this.viewMatrix = Matrix4.mulMM(translationMatrix, rotationMatrix);
	}

	return this.viewMatrix;
};

//----------------------------------------------------------------------
