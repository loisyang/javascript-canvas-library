/* Doodle Drawing Library
 *
 * Drawable and Primitive are base classes and have been implemented for you.
 * Do not modify them! 
 *
 * Stubs have been added to indicate where you need to complete the
 * implementation.
 * Please email me if you find any errors!
 */

/*
 * Root container for all drawable elements.
 */
function Doodle (context) {
    this.context = context;
    this.children = [];
}

Doodle.prototype.draw = function() {
	// Your draw code here
    for (var i = 0; i < this.children.length; i++) {
        this.context.save();
        if (this.children[i].visible) {
            this.children[i].draw(this.context);
        }
        this.context.restore();
    }
};


/* Base class for all drawable objects.
 * Do not modify this class!
 */
function Drawable (attrs) {
    var dflt = { 
        left: 0,
        top: 0,
        visible: true,
        theta: 0,
        scale: 1
    };
    attrs = mergeWithDefault(attrs, dflt);
    this.left = attrs.left;
    this.top = attrs.top;
    this.visible = attrs.visible;
    this.theta = attrs.theta*Math.PI/180;
    this.scale = attrs.scale;
}

/*
 * Summary: Uses the passed in context object (passed in by a doodle object)
 * to draw itself.
 */
Drawable.prototype.draw = function(context) {
    console.log("ERROR: Calling unimplemented draw method on drawable object.");
};


/* Base class for objects that cannot contain child objects.
 * Do not modify this class!
 */
function Primitive(attrs) {
    var dflt = {
        lineWidth: 1,
        color: "black"
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    this.lineWidth = attrs.lineWidth;
    this.color = attrs.color;
}
Primitive.inheritsFrom(Drawable);


function Text(attrs) {
    var dflt = {
        content: "",
        fill: "black",
        font: "12pt Helvetica",
        height: 12
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    // add constructor code here
    this.content = attrs.content;
    this.fill = attrs.fill;
    this.font = attrs.font;
    this.height = attrs.height;
//    this.size = attrs.size;
//    this.bold = attrs.bold;
}
Text.inheritsFrom(Drawable);

Text.prototype.draw = function (context) {
    // your draw code here
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.scale(this.scale, this.scale);
    context.beginPath();
    context.font = this.font;
    context.fillStyle = this.fill;
    // size and bold
    context.fillText(this.content, 0, this.height);
    context.closePath();

};

//getWidth Return the width of the text (use the MeasureText helper method provided)
Text.prototype.getWidth = function (context) {
    textMeasure = context.measureText;
    return textMeasure.width
}

//getHeight Return the height of the text (use the MeasureText helper method provided)
Text.prototype.getHeight = function (context) {
    textMeasure = context.measureText;
    return textMeasure.height
}

function DoodleImage(attrs) {
    var dflt = {
        width: 0,
        height: 0,
        src: "",
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
	// rest of constructor code here
    this.width = attrs.width;
    this.height = attrs.height;
    this.src = attrs.src;
}
DoodleImage.inheritsFrom(Drawable);

DoodleImage.prototype.draw = function (context) {
    // draw code here
    var self = this;
    var img = new Image();
    img.src = this.src;
    
    img.onload = function() {
        context.save();
        console.log("I start drawing");
        context.translate(self.left, self.top);
        context.rotate(self.theta);
        context.scale(self.scale, self.scale);
        context.beginPath();
        if (self.width >= 0 && self.height >= 0) {
            context.drawImage(img, 0, 0, self.width, self.height);
            console.log("I finish drawing");
        } else {
            context.drawImage(img, 0, 0);
        }
        context.closePath();
        context.restore();
    }
}

DoodleImage.prototype.getWidth = function () {
    
    return this.width;   
}

DoodleImage.prototype.getHeight = function () {
    return this.height;   
}

function Line(attrs) {
    var dflt = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
    // your draw code here
    this.startX = attrs.startX;
    this.startY = attrs.startY;
    this.endX = attrs.endX;
    this.endY = attrs.endY;
}
Line.inheritsFrom(Primitive);

Line.prototype.draw = function (context) {
    // your draw code here
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.beginPath();
    context.lineWidth = this.lineWidth;
    context.strokeStyle = this.color;
    context.moveTo(this.startX, this.startY);
    context.lineTo(this.endX, this.endY);
    context.stroke();
    context.closePath();
};

Line.prototype.getWidth = function () {
    return this.endX - this.startX;
}

Line.prototype.getHeight = function () {
    return this.endY - this.startY;
}

function Rectangle(attrs) {
    var dflt = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Primitive.call(this, attrs);
	// rest of constructor code here
    this.x = attrs.x;
    this.y = attrs.y;
    this.width = attrs.width;
    this.height = attrs.height;
}
Rectangle.inheritsFrom(Primitive);

Rectangle.prototype.draw = function (context) {
    // draw code here
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    if (this.lineWidth > 0) {
      context.strokeStyle = this.color;
      context.lineWidth = this.lineWidth;
      context.stroke();
    }
    if (this.fill) {
      context.fillStyle = this.fill;
      context.fill();
    }
    context.closePath();
};

Rectangle.prototype.getWidth = function () {
    return this.width;
}

Rectangle.prototype.getHeight = function () {
    return this.height;
}

function Container(attrs) {
    var dflt = {
        width: 100,
        height: 100,
        fill: "",
        borderColor: "black",
        borderWidth: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);    
    // rest of constructor code here.
    this.children = [];
    this.width = attrs.width;
    this.height = attrs.height;
    this.fill = attrs.fill;
    this.borderColor = attrs.borderColor;
    this.borderWidth = attrs.borderWidth;
}
Container.inheritsFrom(Drawable);

Container.prototype.draw = function (context) {
    // draw code here
    context.save();
    // make transformation, rotation and scaling
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.scale(this.scale, this.scale);
    // draw container
    context.beginPath();
    context.rect(0,0,this.width, this.height);
    context.closePath();
    
    if (this.fill != "") {
        context.fillStyle = this.fill;
        context.fill();
    }
    if (this.borderWidth != 0) {
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    context.clip();
    
    // draw visible children here
    for(var i=0; i<this.children.length; i++){
        var child = this.children[i];
        if (child.visible) {
            context.save();
            child.draw(context);
            context.restore();
        }
    }
    context.restore();        
 
};

//layout Performs layout on the children objects before it draws them.
Container.prototype.layout = function (context) {
}

//getWidth Return the width of the container
Container.prototype.getWidth = function () {
    return this.width;
}

//getHeight Return the height of the container
Container.prototype.getHeight = function () {
    return this.height;
}

function Pile(attrs) {
  Container.call(this, attrs);   
  //Rest of constructor code here
}

Pile.inheritsFrom(Container);

//Rest of pile methods here

function Row(attrs) {
  Container.call(this, attrs);    
  //Rest of constructor code here
}
Row.inheritsFrom(Container);

//Rest of row methods here

function Column(attrs) {
  Container.call(this, attrs);  
  //Rest of constructor code here
}
Column.inheritsFrom(Container);

//Rest of column methods here

function Circle(attrs) {
  Container.call(this, attrs);      
  var dflt = {
    layoutCenterX: this.width / 2,
    layoutCenterY: this.height / 2,
    layoutRadius: Math.min(this.width, this.height) / 2 - 30
  };
  attrs = mergeWithDefault(attrs, dflt);
  //Rest of constructor code here
}
Circle.inheritsFrom(Container);

//Rest of circle methods here

function OvalClip(attrs) {
  Container.call(this, attrs);
  //Rest of constructor code here
}
OvalClip.inheritsFrom(Container);

//Rest of ovalClip methods here

/**
 * Measurement function to measure canvas fonts
 *
 * @return: Array with two values: the first [0] is the width and the seconds [1] is the height 
 *          of the font to be measured. 
 **/
function MeasureText(text, bold, font, size)
{
    // This global variable is used to cache repeated calls with the same arguments
    var str = text + ':' + bold + ':' + font + ':' + size;
    if (typeof(__measuretext_cache__) == 'object' && __measuretext_cache__[str]) {
        return __measuretext_cache__[str];
    }

    var div = document.createElement('DIV');
        div.innerHTML = text;
        div.style.position = 'absolute';
        div.style.top = '-100px';
        div.style.left = '-100px';
        div.style.fontFamily = font;
        div.style.fontWeight = bold ? 'bold' : 'normal';
        div.style.fontSize = size + 'pt';
    document.body.appendChild(div);
    
    var size = [div.offsetWidth, div.offsetHeight];

    document.body.removeChild(div);
    
    // Add the sizes to the cache as adding DOM elements is costly and can cause slow downs
    if (typeof(__measuretext_cache__) != 'object') {
        __measuretext_cache__ = [];
    }
    __measuretext_cache__[str] = size;
    
    return size;
}