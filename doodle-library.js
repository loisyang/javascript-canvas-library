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

var num_of_image = 0;
var num_onload = 0;

Doodle.prototype.draw = function() {
	// Your draw code here
    var self = this;
    if (num_onload !== num_of_image){
        setTimeout(function() {
            self.context.save();
            self.draw(self.context);
            self.context.restore();
        }, 100)
    } else {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].visible) {
                this.context.save();
                this.children[i].draw(this.context);
                this.context.restore();
            }
        }
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
 * Summary: returns the calculated width of this object
 */
Drawable.prototype.getWidth = function(context) {
  console.log("ERROR: Calling unimplemented draw method on drawable object.");
  return 0;
}

/*
 * Summary: returns the calculated height of this object
 */
Drawable.prototype.getHeight = function(context) {
  console.log("ERROR: Calling unimplemented draw method on drawable object.");
  return 0;
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
        fill: "black", //color
        font: "Helvetica", //font family
        size: 12, //Size in pt
        bold: false //bold boolean
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
    // add constructor code here
    this.content = attrs.content;
    this.fill = attrs.fill;
    this.font = attrs.font;
    this.size = attrs.size;
    this.bold = attrs.bold;
}
Text.inheritsFrom(Drawable);

Text.prototype.draw = function (context) {
    // your draw code here
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.scale(this.scale, this.scale);
    context.beginPath();
    if (this.bold) { 
        context.font = "bold" + " " + this.size + "pt"+" "+this.font;
    } else {
        context.font = this.size + "pt"+" "+this.font;
    }
    context.fillStyle = this.fill;
    context.fillText(this.content, 0, this.getHeight(context));
    context.closePath();

};

//getWidth Return the width of the text (use the MeasureText helper method provided)
Text.prototype.getWidth = function (context) {
    var textMeasure = MeasureText(this.content, this.bold, this.font, this.size);
    // console.log("width: "+textMeasure[0]);
    return textMeasure[0];
}

//getHeight Return the height of the text (use the MeasureText helper method provided)
Text.prototype.getHeight = function (context) {
    var textMeasure = MeasureText(this.content, this.bold, this.font, this.size);
    // console.log("height: "+textMeasure[1]);
    return textMeasure[1];
}

function DoodleImage(attrs) {
    var dflt = {
        width: -1,
        height: -1,
        src: "",
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);
	// rest of constructor code here
    this.src = attrs.src;
    this.width = attrs.width;
    this.height = attrs.height;
    this.img = new Image();
    this.img.src = this.src

    // make sure all images are loaded before containers start drawing themselves.
    num_of_image++;
    this.img.onload = function() {
        num_onload++;
    }
}
DoodleImage.inheritsFrom(Drawable);

DoodleImage.prototype.draw = function (context) {
    // draw code here
    context.save();
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.scale(this.scale, this.scale);
    context.beginPath();
    if (this.width >= 0 && this.height >= 0) {
        context.drawImage(this.img, 0, 0, this.width, this.height);
    } else {
        context.drawImage(this.img, 0, 0);
    }
    context.closePath();
    context.restore();
}

DoodleImage.prototype.getWidth = function (context) {
    return this.width;   
}

DoodleImage.prototype.getHeight = function (context) {
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
    context.scale(this.scale, this.scale);
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
    context.scale(this.scale, this.scale);
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

Rectangle.prototype.getWidth = function (context) {
    return this.width;
}

Rectangle.prototype.getHeight = function (context) {
    return this.height;
}

function Container(attrs) {
    var dflt = {
        width: 100,
        height: 100,
        fill: false,
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
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.scale(this.scale, this.scale);

    // draw container
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(this.width,0);
    context.lineTo(this.width,this.height);
    context.lineTo(0,this.height);
    context.lineTo(0,0);
    context.closePath();

    if (this.borderWidth != 0) {
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }

    if (this.fill != false) {
        context.fillStyle = this.fill;
        context.fill();
    }

    context.clip();
    this.layout(context);
    context.restore();        
};

//Rest of container methods here

//layout Performs layout on the children objects before it draws them.
Container.prototype.layout = function (context) {
    // draw visible children here
    for(var i=0; i<this.children.length; i++){
        var child = this.children[i];
        if (child.visible) {
            context.save();
            child.draw(context);
            context.restore();
        }
    }
}

//getWidth Return the width of the container
Container.prototype.getWidth = function () {
    return this.width;
}

//getHeight Return the height of the container
Container.prototype.getHeight = function () {
    return this.height;
}

//Places all of its children at its own top-left corner.
function Pile(attrs) {
    Container.call(this, attrs);   
    //Rest of constructor code here
}
Pile.inheritsFrom(Container);

//Rest of pile methods here
Pile.prototype.draw = function (context) {
    // draw code here
    context.save();
    // make transformation, rotation and scaling
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.scale(this.scale, this.scale);
    // draw container
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(this.width,0);
    context.lineTo(this.width,this.height);
    context.lineTo(0,this.height);
    context.lineTo(0,0);
    context.closePath();

    if (this.borderWidth != 0) {
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    if (this.fill != false) {
        context.fillStyle = this.fill;
        context.fill();
    }
    context.clip();
    this.layout(context);
    context.restore();    
}

Pile.prototype.layout = function (context) {
    // draw visible children here
    for(var i=0; i<this.children.length; i++){
        var child = this.children[i];
        child.top = 0;
        child.left = 0;
        if (child.visible) {
            context.save();
            child.draw(context);
            context.restore();
        }
    }
}

Pile.prototype.getWidth = function (context) {
    return this.width;
}

Pile.prototype.getHeight = function (context) {
    return this.height;
}

//Places its children in a single horizontal row with the children vertically centered. 
//If the children do not fit within the bounds of the row object 
//they are clipped at the right edge.
function Row(attrs) {
    Container.call(this, attrs);    
    //Rest of constructor code here
}
Row.inheritsFrom(Container);

//Rest of row methods here
Row.prototype.draw = function (context) {
    // draw code here
    context.save();
    // make transformation, rotation and scaling
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.scale(this.scale, this.scale);
    // draw container
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(this.width,0);
    context.lineTo(this.width,this.height);
    context.lineTo(0,this.height);
    context.lineTo(0,0);
    context.closePath();
    if (this.borderWidth != 0) {
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    if (this.fill != false) {
        context.fillStyle = this.fill;
        context.fill();
    }
    context.clip();
    this.layout(context);
    context.restore();    
}

Row.prototype.layout = function (context) {
    // draw visible children here
    var left = 0;
    var middle = this.getHeight(context)/2;
    var nextLeft = 0;
    for(var i=0; i<this.children.length; i++){
        var child = this.children[i];
        // determine the positions for the child
        child.left = left;
        nextLeft = left + child.getWidth(context)+ child.borderWidth;
        left = nextLeft;
        child.top = middle - child.getHeight(context)/2;
        console.log(child + ", "+child.top + ", "+child.left);
        if (child.visible) {
            context.save();
            child.draw(context);
            context.restore();
        }
    }
}

Row.prototype.getWidth = function (context) {
    return this.width;
}

Row.prototype.getHeight = function (context) {
    return this.height;
}

function Column(attrs) {
  Container.call(this, attrs);  
  //Rest of constructor code here
}
Column.inheritsFrom(Container);

// Rest of column methods here
Column.prototype.draw = function (context) {
    // draw code here
    context.save();
    // make transformation, rotation and scaling
    context.translate(this.left, this.top);
    context.rotate(this.theta);
    context.scale(this.scale, this.scale);
    // draw container
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(this.width,0);
    context.lineTo(this.width,this.height);
    context.lineTo(0,this.height);
    context.lineTo(0,0);
    context.closePath();
    if (this.borderWidth != 0) {
        context.strokeStyle = this.borderColor;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    if (this.fill != false) {
        context.fillStyle = this.fill;
        context.fill();
    }
    context.clip();
    this.layout(context);
    context.restore();    
}

Column.prototype.layout = function (context) {
    // draw visible children here
    var top = 0;
    var middle = this.width/2;
    var nextTop = top;
    for(var i=0; i<this.children.length; i++){
        var child = this.children[i];
        child.top = top;
        nextTop = top + child.getHeight(context) + child.borderWidth;
        top = nextTop;
        child.left = middle - child.getWidth(context)/2;
        if (child.visible) {
            context.save();
            child.draw(context);
            context.restore();
        }
    }
}

Column.prototype.getWidth = function (context) {
    return this.width;
}

Column.prototype.getHeight = function (context) {
    return this.height;
}

// Places its children so that their centers (not top-left corners) lie positioned at equal angles around a circular perimeter of a given size. 

// So for example, if there were five child objects they would be placed every 360/5 = 72°. Or if there were four child objects, their centers would be positioned 90° apart, i.e., at the four compass points. Note that this layout ignores any overlap that might occur between children, simply calculating their locations and drawing them there in the order found in the child list.
function Circle(attrs) {
  Container.call(this, attrs);      
  var dflt = {
    layoutCenterX: this.width / 2,
    layoutCenterY: this.height / 2,
    layoutRadius: Math.min(this.width, this.height) / 2 - 30
  };
  attrs = mergeWithDefault(attrs, dflt);
  //Rest of constructor code here
  this.layoutCenterX = attrs.layoutCenterX;
  this.layoutCenterY = attrs.layoutCenterY;
  this.layoutRadius = attrs.layoutRadius;
}
Circle.inheritsFrom(Container);

//Rest of circle methods here
Circle.prototype.draw = function(context) {
    context.save();
    context.translate(this.left,this.top);
    context.rotate(this.theta);
    context.scale(this.scale,this.scale);

    context.beginPath();
    context.arc(this.layoutCenterX,this.layoutCenterY,this.layoutRadius, 0, 2 * Math.PI);
    if (this.lineWidth) {
        context.strokeStyle = this.color;
        context.lineWidth = this.lineWidth;
        context.stroke();
    }
    if (this.fill) {
        context.fillStyle = this.fill;
        context.fill();
    }
    context.closePath();

    // context.clip();
    this.layout(context);
    context.restore();  
}

Circle.prototype.layout = function (context) {
    // draw visible children here

    var num_of_children = this.children.length;
    var angle = 2 * Math.PI / num_of_children;
    for(var i=0; i<this.children.length; i++){
        var child = this.children[i];
        var childWidth = child.getWidth(context)+child.borderWidth*2;
        var childHeight = child.getHeight(context)+child.borderWidth*2;
        var radius = this.layoutRadius

        // if the children should only be placed within the circle:
        // var radius = this.layoutRadius - Math.sqrt( childWidth*childWidth + childHeight*childHeight)/2
        // determine the positions for the child
        // child.top = this.layoutCenterY - Math.sin(i * angle) * radius - child.getHeight(context)/2- child.borderWidth;
        // child.left = this.layoutCenterX - Math.cos(i * angle) * radius - child.getWidth(context)/2 -child.borderWidth ;

        child.top = this.layoutCenterY - Math.sin(i * angle) * radius - child.getHeight(context)/2- child.borderWidth;
        child.left = this.layoutCenterX - Math.cos(i * angle) * radius - child.getWidth(context)/2 -child.borderWidth ;
        if (child.visible) {
            context.save();
            child.draw(context);
            context.restore();
        }
    }    
}

Circle.prototype.getWidth = function (context) {
    return this.layoutRadius;
}

Circle.prototype.getHeight = function (context) {
    return this.layoutRadius;
}

// Applies additional clipping to all its children in the form of an oval which fits just inside its defined bounding box.
function OvalClip(attrs) {
  Container.call(this, attrs);
  //Rest of constructor code here
  this.top = attrs.top;
  this.left = attrs.left;
  this.height = attrs.height;
  this.width = attrs.width;
  this.borderWidth = attrs.borderWidth;
}
OvalClip.inheritsFrom(Container);

//Rest of ovalClip methods here
OvalClip.prototype.draw = function(context) {
    context.save();
    context.translate(this.left,this.top);
    context.rotate(this.theta);
    context.scale(this.scale,this.scale);

    context.beginPath();
    context.ellipse(this.width/2, this.height/2, this.width/2, this.height/2, 2*Math.PI, 0, 2*Math.PI, true);
    if (this.borderWidth) {
        context.strokeStyle = this.color;
        context.lineWidth = this.borderWidth;
        context.stroke();
    }
    if (this.fill) {
        context.fillStyle = this.fill;
        context.fill();
    }
    context.closePath();

    context.clip();
    this.layout(context);
    context.restore();  
}

OvalClip.prototype.layout = function (context) {
    // draw visible children here
    for(var i=0; i<this.children.length; i++){
        var child = this.children[i];
        if (child.visible) {
            context.save();
            child.draw(context);
            context.restore();
        }
    }
}

//getWidth Return the width of the container
OvalClip.prototype.getWidth = function (context) {
    return this.width;
}

//getHeight Return the height of the container
OvalClip.prototype.getHeight = function (context) {
    return this.height;
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


function AnimatedDoodle(attrs) {
    var dflt = {
        startX: 0,
        startY: 0,
        width: 0,
        height: 0,
    };
    attrs = mergeWithDefault(attrs, dflt);
    Drawable.call(this, attrs);  
    this.startX = attrs.startX;
    this.startY = attrs.startY;
}
AnimatedDoodle.inheritsFrom(Drawable);

AnimatedDoodle.prototype.draw = function (context) {
    var ctx = context;
    var self = this;
    var count = 80;
    var distanceBase = 0.1;
    var distanceIncr = 8;
    var tick = 0;

    ctx.save();
    (function loop() {        
        requestAnimationFrame( loop );  
        ctx.clearRect( self.startX-this.width/4, self.startY-this.width/4, this.width/2, this.width/2 );

        var angle = tick / 8;
        var radius = -60 + Math.sin( tick / 15 ) * 100;
        var distance;

        for( var i = 0; i < count; i++ ) {
            angle += Math.PI / 64;
            radius += i / 30;
            distance = distanceBase + i / distanceIncr;

            // draw four spinning arcs 
            // 1st: blue for "G" and "g"
            ctx.beginPath();
            ctx.arc( (Math.cos( angle ) * radius) + self.startX, (Math.sin( angle ) * radius) + self.startY, distance, 0, Math.PI * 2, false );
            ctx.fillStyle = '#4285F4';
            ctx.fill();
            ctx.closePath();

            // 2nd: red #EA4335 for "o" and "e"
            ctx.beginPath();
            ctx.arc( (Math.cos( angle ) * -radius) + self.startX, (Math.sin( angle ) * -radius) + self.startY, distance, 0, Math.PI *2, false );
            ctx.fillStyle = '#EA4335';
            ctx.fill();
            ctx.closePath();

            // 3rd: green #34A853 for "l"
            ctx.beginPath();
            ctx.arc( (Math.cos( angle + Math.PI / 2 ) * -radius) + self.startX, (Math.sin( angle + Math.PI / 2 ) * -radius) + self.startY, distance, 0, Math.PI *2 );
            ctx.fillStyle = '#34A853';
            ctx.fill();
            ctx.closePath();

            // 4th: yellow #FBBC05 for "o"
            ctx.beginPath();
            ctx.arc( (Math.cos( angle + Math.PI / 2 ) * radius) + self.startX, (Math.sin( angle + Math.PI / 2 ) * radius) + self.startY, distance, 0, Math.PI *2, false );
            ctx.fillStyle = '#FBBC05';
            ctx.fill();
            ctx.closePath();


        }
        tick++;
    })()
    ctx.restore();
    
}

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