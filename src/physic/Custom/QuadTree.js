var QuadTree = function (width,height){
	this.width = width;
	this.height = height;
	this.root = new QuadTreeNode(new Vector2(-this.width/2,this.height/2), this.width, this.height, 2, 2, this);
	this.status = Collider.STATUS_NONE;
	this.contacts = [];
};

QuadTree.prototype.addCollider = function (collider){
	this.root.addCollider(collider);
};

QuadTree.prototype.clear = function (){
	this.root = new QuadTreeNode(new Vector2(-this.width/2,this.height/2), this.width, this.height, 2, 2, this);
};

QuadTree.prototype.getStatus = function (){
	return this.status;
};

QuadTree.prototype.setStatus = function (status){
	this.status = status;
};

QuadTree.prototype.getContacts = function (){
	return this.contacts;
};

QuadTree.prototype.addContacts = function (contactList){
	this.contacts = this.contacts.concat(contactList);
};

QuadTree.prototype.update = function (){
	this.status = Collider.STATUS_NONE;
	this.root.update();
};

QuadTree.prototype.clearContacts = function (){
	this.contacts = [];
	this.status = Collider.STATUS_NONE;
};
