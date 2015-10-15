var width = 0;
var height = 0;
var google = new Text;
var googleRow = new Row;
var boxWidth = 0;
var boxHeight = 0;
var rowPadding = 10;
var canvas;
var context;

window.onload = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas = document.getElementById('myCanvas');
    canvas.setAttribute('width', width + 'px');
    canvas.setAttribute('height', height + 'px');
    context = canvas.getContext("2d");
    var root = new Doodle(context);  
    boxWidth = (440+rowPadding*2)/12;
    boxHeight = (height/3);

    // make a white background for the canvas
    var bg = new Container({
        width: width,
        height: height,
        left: 0,
        top: 0,
        fill: 'white',
    });

    // row 
    doodleRow = new Row({
        left: 0,
        top: 0,
        width: 440,
        height: height/3,
        borderWidth:0
    })    

    // googleRow is a row that contains all 6 graphics containers for the main doodle
    googleRow = new Row({
        left: (width-440-rowPadding*2) / 2,
        top: (height-182) / 2,
        width: 440+rowPadding*2,
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

    // draw the text "Google" over the graphics
    google = new Text({
        width: 440,
        height: 182,
        left: (width-440) / 2,
        top: (height-182) / 2,
        content: "Google",
        fill: 'white',
        size: 100,
        font: "Open Sans"
    });

    // draw the text shadow for the text
    googleShadow = new Text({
        width: 440,
        height: 182,
        left: (width-440) / 2+8,
        top: (height-182) / 2+4,
        content: "Google",
        fill: '#1f1f1f',
        size: 100,
        font: "Open Sans"
    });

    googleRow.children.push(container1);
    googleRow.children.push(container2);
    googleRow.children.push(container3);
    googleRow.children.push(container4);
    googleRow.children.push(container5);
    googleRow.children.push(container6);

    var animatedBg = new AnimatedDoodle({
        width: width,
        height: height,
        left: 10,
        top: 10,
        borderWidth: 1,
        fill: "black"
    });

    root.children = [bg, animatedBg, doodleRow,googleRow,googleShadow,google];
    root.draw();

}

window.onresize = function() {
    width = window.innerWidth;
    height = window.innerHeight;
    var canvas = document.getElementById('myCanvas');
    canvas.setAttribute('width', width + 'px');
    canvas.setAttribute('height', height + 'px');
    var context = canvas.getContext("2d");
    var root = new Doodle(context);  
    boxWidth = (440+rowPadding*2)/12;
    boxHeight = (height/3);

    var bg = new Container({
        width: width,
        height: height,
        left: 0,
        top: 0,
        fill: 'white',
    });

    // row 
    doodleRow = new Row({
        left: 0,
        top: 0,
        width: 440,
        height: height/3,
        borderWidth:0
    })    
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

    googleRow = new Row({
        left: (width-440-rowPadding*2) / 2,
        top: (height-182) / 2,
        width: 440+rowPadding*2,
        height: height / 3,
        borderWidth: 0
    })
    // text
    google = new Text({
        width: 440,
        height: 182,
        left: (width-440) / 2,
        top: (height-182) / 2,
        content: "Google",
        fill: 'white',
        size: 100,
        font: "Open Sans",
        bold: true
    });

    googleShadow = new Text({
        width: 440,
        height: 182,
        left: (width-440) / 2+8,
        top: (height-182) / 2+4,
        content: "Google",
        fill: '#1f1f1f',
        size: 100,
        font: "Open Sans",
        bold: true
    });

    googleRow.children.push(container1);
    googleRow.children.push(container2);
    googleRow.children.push(container3);
    googleRow.children.push(container4);
    googleRow.children.push(container5);
    googleRow.children.push(container6);

    root.children = [bg, doodleRow,googleRow,googleShadow,google];
    root.draw();
}