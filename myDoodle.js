var width = 0;
var height = 0;
var google = new Text;
var googleRow = new Row;
// box sizes for googleRow items
var boxWidth = 0;
var boxHeight = 0;
var rowPadding = 10;
var canvas;
var context;
// width and height for "Google" text when size is 100pt
var textWidth = 440;
var textHeight = 182;

window.onload = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = document.getElementById('myCanvas');
    canvas.setAttribute('width', width + 'px');
    canvas.setAttribute('height', height + 'px');
    context = canvas.getContext("2d");
    var root = new Doodle(context);  
    boxWidth = (textWidth+rowPadding*2)/12;
    boxHeight = (height/3);

    // make a white background for the canvas
    var bg = new Container({
        width: width,
        height: height,
        left: 0,
        top: 0,
        fill: 'white',
    });

    // googleRow is a row that contains all 6 graphics containers for the main doodle
    googleRow = new Row({
        left: (width-textWidth-rowPadding*2) / 2,
        top: (height-textHeight) / 2,
        width: textWidth+rowPadding*2,
        height: height / 3,
        borderWidth: 0
    })

    // container1: a large circle for letter "G"
    var container1 = new Container({
        width: boxWidth*3,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var circle1 = new Circle({
        left: 0,
        top: (boxHeight-(boxWidth*3/2))/2,
        borderWidth: 0,
        layoutCenterX: boxWidth*3/2,
        layoutCenterY: boxWidth*3/2,
        layoutRadius: boxWidth*3/2,
        fill: "#4285F4"
    });
    container1.children.push(circle1);

    // container2: a small circle for letter "o"
    var container2 = new Container({
        width: boxWidth*2,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var circle2 = new Circle({
        left: 0,
        top: (boxHeight-(boxWidth*2/2))/2,
        borderWidth: 0,
        layoutCenterX: boxWidth,
        layoutCenterY: boxWidth,
        layoutRadius: boxWidth,
        fill: "#EA4335"
    });
    container2.children.push(circle2);

    // container3: a small circle for letter "o"
    var container3 = new Container({
        width: boxWidth*2,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var circle3 = new Circle({
        left: 0,
        top: (boxHeight-(boxWidth*2/2))/2,
        borderWidth: 0,
        layoutCenterX: boxWidth,
        layoutCenterY: boxWidth,
        layoutRadius: boxWidth,
        fill: "#FBBC05"

    });
    container3.children.push(circle3);

    // container4: two small circles for letter "g" in a column
    var container4 = new Column({
        width: boxWidth*2,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })

    var circle4 = new Circle({
        width: boxWidth*2,
        height: boxWidth*2,
        left: 0,
        top: 0,
        borderWidth: 0,
        layoutCenterX: 19,
        layoutCenterY: 100,
        layoutRadius: boxWidth,
        fill: '#4285F4',
    });
    var circle5 = new Circle({
        width: boxWidth*2,
        height: boxWidth *2,
        left: 0,
        top: 0,
        borderWidth: 0,
        layoutCenterX: 19,
        layoutCenterY: 130,
        layoutRadius: boxWidth,
        fill: '#4285F4',
    });
    container4.children.push(circle4);
    container4.children.push(circle5);

    // container5: an ellipse for letter "l"
    var container5 = new Container({
        width: boxWidth,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var oval = new OvalClip({
        left: 0,
        top: boxHeight/3,
        borderWidth: 0,
        width: boxWidth,
        height: boxHeight/2,
        fill: '#34A853'
    });
    container5.children.push(oval);

    // container6: a small circle for letter "e"
    var container6 = new Container({
        width: boxWidth*2,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var circle6 = new Circle({
        left: 0,
        top: (boxHeight-(boxWidth*2/2))/2,
        borderWidth: 0,
        layoutCenterX: boxWidth,
        layoutCenterY: boxWidth,
        layoutRadius: boxWidth,
        fill: '#EA4335',
    });
    container6.children.push(circle6);

    googleRow.children.push(container1);
    googleRow.children.push(container2);
    googleRow.children.push(container3);
    googleRow.children.push(container4);
    googleRow.children.push(container5);
    googleRow.children.push(container6);

    // draw the text "Google" over the graphics row
    google = new Text({
        width: textWidth,
        height: textHeight,
        left: (width-textWidth) / 2,
        top: (height-textHeight) / 2,
        content: "Google",
        fill: 'white',
        size: 100,
        font: "Open Sans"
    });

    // draw the text shadow for the text
    googleShadow = new Text({
        width: textWidth,
        height: textHeight,
        left: (width-textWidth) / 2+8,
        top: (height-textHeight) / 2+4,
        content: "Google",
        fill: '#1f1f1f',
        size: 100,
        font: "Open Sans"
    });

    // draw four spinning animations at each corner of the page
    var animatedBgTopLeft = new AnimatedDoodle({
        width: width/8,
        height: height/8,
        borderWidth: 1,
        startX: 0,
        startY: 0
    });

    var animatedBgTopRight = new AnimatedDoodle({
        width: width/8,
        height: height/8,
        borderWidth: 1,
        startX: width,
        startY: 0
    });

    var animatedBgBottomLeft = new AnimatedDoodle({
        width: width/8,
        height: height/8,
        borderWidth: 1,
        startX: 0,
        startY: height
    });

    var animatedBgBottomRight = new AnimatedDoodle({
        width: width/8,
        height: height/8,
        borderWidth: 1,
        startX: width,
        startY: height
    });

    root.children = [bg,animatedBgTopLeft,animatedBgTopRight,animatedBgBottomLeft,animatedBgBottomRight,googleRow,googleShadow,google];
    root.draw();

}

// a copy of the window.onload code to make the doodle responsive to window resizing
window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = document.getElementById('myCanvas');
    canvas.setAttribute('width', width + 'px');
    canvas.setAttribute('height', height + 'px');
    context = canvas.getContext("2d");
    var root = new Doodle(context);  
    boxWidth = (textWidth+rowPadding*2)/12;
    boxHeight = (height/3);

    // make a white background for the canvas
    var bg = new Container({
        width: width,
        height: height,
        left: 0,
        top: 0,
        fill: 'white',
    });

    // googleRow is a row that contains all 6 graphics containers for the main doodle
    googleRow = new Row({
        left: (width-textWidth-rowPadding*2) / 2,
        top: (height-textHeight) / 2,
        width: textWidth+rowPadding*2,
        height: height / 3,
        borderWidth: 0
    })

    // container1: a large circle for letter "G"
    var container1 = new Container({
        width: boxWidth*3,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var circle1 = new Circle({
        left: 0,
        top: (boxHeight-(boxWidth*3/2))/2,
        borderWidth: 0,
        layoutCenterX: boxWidth*3/2,
        layoutCenterY: boxWidth*3/2,
        layoutRadius: boxWidth*3/2,
        fill: "#4285F4"
    });
    container1.children.push(circle1);

    // container2: a small circle for letter "o"
    var container2 = new Container({
        width: boxWidth*2,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var circle2 = new Circle({
        left: 0,
        top: (boxHeight-(boxWidth*2/2))/2,
        borderWidth: 0,
        layoutCenterX: boxWidth,
        layoutCenterY: boxWidth,
        layoutRadius: boxWidth,
        fill: "#EA4335"
    });
    container2.children.push(circle2);

    // container3: a small circle for letter "o"
    var container3 = new Container({
        width: boxWidth*2,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var circle3 = new Circle({
        left: 0,
        top: (boxHeight-(boxWidth*2/2))/2,
        borderWidth: 0,
        layoutCenterX: boxWidth,
        layoutCenterY: boxWidth,
        layoutRadius: boxWidth,
        fill: "#FBBC05"

    });
    container3.children.push(circle3);

    // container4: two small circles for letter "g" in a column
    var container4 = new Column({
        width: boxWidth*2,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })

    var circle4 = new Circle({
        width: boxWidth*2,
        height: boxWidth*2,
        left: 0,
        top: 0,
        borderWidth: 0,
        layoutCenterX: 19,
        layoutCenterY: 100,
        layoutRadius: boxWidth,
        fill: '#4285F4',
    });
    var circle5 = new Circle({
        width: boxWidth*2,
        height: boxWidth *2,
        left: 0,
        top: 0,
        borderWidth: 0,
        layoutCenterX: 19,
        layoutCenterY: 130,
        layoutRadius: boxWidth,
        fill: '#4285F4',
    });
    container4.children.push(circle4);
    container4.children.push(circle5);

    // container5: an ellipse for letter "l"
    var container5 = new Container({
        width: boxWidth,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var oval = new OvalClip({
        left: 0,
        top: boxHeight/3,
        borderWidth: 0,
        width: boxWidth,
        height: boxHeight/2,
        fill: '#34A853'
    });
    container5.children.push(oval);

    // container6: a small circle for letter "e"
    var container6 = new Container({
        width: boxWidth*2,
        height: boxHeight,
        borderWidth: 0,
        fill: "white",
    })
    var circle6 = new Circle({
        left: 0,
        top: (boxHeight-(boxWidth*2/2))/2,
        borderWidth: 0,
        layoutCenterX: boxWidth,
        layoutCenterY: boxWidth,
        layoutRadius: boxWidth,
        fill: '#EA4335',
    });
    container6.children.push(circle6);

    googleRow.children.push(container1);
    googleRow.children.push(container2);
    googleRow.children.push(container3);
    googleRow.children.push(container4);
    googleRow.children.push(container5);
    googleRow.children.push(container6);

    // draw the text "Google" over the graphics row
    google = new Text({
        width: textWidth,
        height: textHeight,
        left: (width-textWidth) / 2,
        top: (height-textHeight) / 2,
        content: "Google",
        fill: 'white',
        size: 100,
        font: "Open Sans"
    });

    // draw the text shadow for the text
    googleShadow = new Text({
        width: textWidth,
        height: textHeight,
        left: (width-textWidth) / 2+8,
        top: (height-textHeight) / 2+4,
        content: "Google",
        fill: '#1f1f1f',
        size: 100,
        font: "Open Sans"
    });

    // draw four spinning animations at each corner of the page
    var animatedBgTopLeft = new AnimatedDoodle({
        width: width/8,
        height: height/8,
        borderWidth: 1,
        startX: 0,
        startY: 0
    });

    var animatedBgTopRight = new AnimatedDoodle({
        width: width/8,
        height: height/8,
        borderWidth: 1,
        startX: width,
        startY: 0
    });

    var animatedBgBottomLeft = new AnimatedDoodle({
        width: width/8,
        height: height/8,
        borderWidth: 1,
        startX: 0,
        startY: height
    });

    var animatedBgBottomRight = new AnimatedDoodle({
        width: width/8,
        height: height/8,
        borderWidth: 1,
        startX: width,
        startY: height
    });

    root.children = [bg,animatedBgTopLeft,animatedBgTopRight,animatedBgBottomLeft,animatedBgBottomRight,googleRow,googleShadow,google];
    root.draw();

}