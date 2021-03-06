/**
* @class
* @classdesc This class represents a Frustum
*	(see: https://en.wikipedia.org/wiki/Frustum).
*/
var Frustum = function (camera){
	this.camera = camera;
	this.planes = new Array(6);

  for (var i = 0; i < this.planes.length; i++) {
      this.planes[i] = new Vector3(0,0,0); // x,y,z,w <=> A,B,C,D
  }

	this.VPmatrix = Matrix4.identity();
};

//----------------------------------------------------------------------

/**
* Tests if sphere is touching the frustum.
* @param {Vector3} center The center.
* @param {Number} radius The radius.
* @returns {Boolean} True if sphere is touching the frustum.
*/
Frustum.prototype.testSphere = function (center, radius){
	// console.log("TEST SPHERE");
	for (var i = 0; i < this.planes.length; i++) {

		var A = this.planes[i].x;
		var B = this.planes[i].y;
		var C = this.planes[i].z;
		var D = this.planes[i].w;

		// console.log(A+" "+B+" "+C+" "+D);
		// console.log(-radius);
		// console.log((A*center.x)+(B*center.y)+(C*center.z)+D);

		if((A*center.x)+(B*center.y)+(C*center.z)+D <= -radius)
			return false;
	}

	return true;
};

//----------------------------------------------------------------------

/**
* Builds the frustum planes.
*/
Frustum.prototype.build = function (){

	var t = this.camera.getGameObject().getTransform();

	if(t.isDirty()){

	  var LEFT = 0;
	  var RIGHT = 1;
	  var BOTTOM = 2;
	  var TOP = 3;
	  var NEAR = 4;
	  var FAR = 5;

		// var camPos = t.position;

	  // this.VPmatrix = Matrix4.mulMM(this.camera.getProjectionMatrix(),this.camera.getViewMatrix());
	  this.VPmatrix = Matrix4.mulMM(this.camera.getViewMatrix().transpose(),this.camera.getProjectionMatrix().transpose());
		this.VPmatrix = this.VPmatrix.transpose();

		// this.VPmatrix = Matrix4.mulMM(Matrix4.translation(new Vector3(-3,0,0)),this.VPmatrix)

		var d = new Array(6);

		/*
		* LEFT
		*/
	  this.planes[LEFT].x = this.VPmatrix.get(0,0) + this.VPmatrix.get(3,0);
	  this.planes[LEFT].y = this.VPmatrix.get(0,1) + this.VPmatrix.get(3,1);
	  this.planes[LEFT].z = this.VPmatrix.get(0,2) + this.VPmatrix.get(3,2);
		d[LEFT] =  this.VPmatrix.get(0,3) + this.VPmatrix.get(3,3);

		/*
		* RIGHT
		*/
	  this.planes[RIGHT].x = -this.VPmatrix.get(0,0) + this.VPmatrix.get(3,0);
	  this.planes[RIGHT].y = -this.VPmatrix.get(0,1) + this.VPmatrix.get(3,1);
	  this.planes[RIGHT].z = -this.VPmatrix.get(0,2) + this.VPmatrix.get(3,2);
		d[RIGHT] =  -this.VPmatrix.get(0,3) + this.VPmatrix.get(3,3);

		/*
		* BOTTOM
		*/
	  this.planes[BOTTOM].x = this.VPmatrix.get(1,0) + this.VPmatrix.get(3,0);
	  this.planes[BOTTOM].y = this.VPmatrix.get(1,1) + this.VPmatrix.get(3,1);
	  this.planes[BOTTOM].z = this.VPmatrix.get(1,2) + this.VPmatrix.get(3,2);
	  d[BOTTOM] =  this.VPmatrix.get(1,3) + this.VPmatrix.get(3,3);

		/*
		* TOP
		*/
	  this.planes[TOP].x = -this.VPmatrix.get(1,0) + this.VPmatrix.get(3,0);
	  this.planes[TOP].y = -this.VPmatrix.get(1,1) + this.VPmatrix.get(3,1);
	  this.planes[TOP].z = -this.VPmatrix.get(1,2) + this.VPmatrix.get(3,2);
	  d[TOP] =  -this.VPmatrix.get(1,3) + this.VPmatrix.get(3,3);

		/*
		* NEAR
		*/
	  this.planes[NEAR].x = this.VPmatrix.get(2,0) + this.VPmatrix.get(3,0);
	  this.planes[NEAR].y = this.VPmatrix.get(2,1) + this.VPmatrix.get(3,1);
	  this.planes[NEAR].z = this.VPmatrix.get(2,2) + this.VPmatrix.get(3,2);
	  d[NEAR] =  this.VPmatrix.get(2,3) + this.VPmatrix.get(3,3);

		/*
		* FAR
		*/
	  this.planes[FAR].x = -this.VPmatrix.get(2,0) + this.VPmatrix.get(3,0);
	  this.planes[FAR].y = -this.VPmatrix.get(2,1) + this.VPmatrix.get(3,1);
	  this.planes[FAR].z = -this.VPmatrix.get(2,2) + this.VPmatrix.get(3,2);
	  d[FAR] =  -this.VPmatrix.get(2,3) + this.VPmatrix.get(3,3);


    for (var i = 0; i < this.planes.length; i++) {

			if(this.planes[i].len() > 0){

				d[i] = d[i]/this.planes[i].len();

				this.planes[i] = this.planes[i].nor();

				this.planes[i].w = d[i];
			}
    }
	}
};

//----------------------------------------------------------------------
