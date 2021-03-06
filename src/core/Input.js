/**
* @class
* @classdesc Provides a simple input facade.
*/
var Input = function (){

    var onKeyDown = function(event){

        // Input.key = event.keyCode;

        var found = false;

        for (var i = 0; i < Input.stack.length && !found; i++) {

          var key = Input.stack[i];

          if(key === event.keyCode)
            found = true;
        }

        if(!found)
          Input.stack.push(event.keyCode);

        // this allow reload page with F5
        // if(event.keyCode !== 116)
        //     event.preventDefault();

    };

    var onKeyUp = function(event){
        // Input.key = -1;

        var newStack = [];

        for (var i = 0; i < Input.stack.length; i++) {

          var key = Input.stack[i];

          if(key !== event.keyCode)
            newStack.push(key);

        }

        Input.stack = newStack;

        // event.preventDefault();

    };

    var onMouseMove = function(event){

      var canvas = Canvas.get();


        Input.cursorPos.x = event.clientX;
        Input.cursorPos.y = event.clientY * -1;

        Input.cursorPos.x -= canvas.width/2;
        Input.cursorPos.y += canvas.height/2;


        // event.preventDefault();

    };

    var onMouseDown = function(event){

        Input.button = event.button;

        // event.preventDefault();

    };

    var onMouseUp = function(event){

        Input.button = -1;

        // event.preventDefault();

    };

    document.addEventListener("keydown", onKeyDown,false);
    document.addEventListener("keyup", onKeyUp,false);

    var canvas = Canvas.get();
    canvas.addEventListener("mousedown", onMouseDown,false);
    canvas.addEventListener("mouseup", onMouseUp,false);
    canvas.addEventListener("mousemove", onMouseMove,false);

    canvas.addEventListener("contextmenu", function(event){
        event.preventDefault();
        return false;
    },false);

};

Input.key = -1;
Input.stack = [];
Input.button = -1;

Input.cursorPos = new Vector2(0,0);

//----------------------------------------------------------------------

/**
* Return the key wich is being pressed.
* @returns {Number} The key.
*/
Input.getKey = function (){
	return Input.key;
};

//----------------------------------------------------------------------

/**
* Return the key wich is being pressed.
* @returns {Number} The key.
*/
Input.isKeyPressed = function (key){
	// return Input.key === key;

  var found = false;

  for (var i = 0; i < Input.stack.length && !found; i++) {
    if(key === Input.stack[i])
      found = true;
  }

  return found;
};

//----------------------------------------------------------------------

/**
* Return the button wich is being pressed.
* @returns {Number} The button.
*/
Input.getButton = function (){
	return Input.button;
};

//----------------------------------------------------------------------

/**
* Return cursor position.
* @returns {Vector2} The cursor position.
*/
Input.getCursorPosition = function (){

	return Input.cursorPos;
};

//----------------------------------------------------------------------

// TODO: Implement input stack, implement key codes, char?
