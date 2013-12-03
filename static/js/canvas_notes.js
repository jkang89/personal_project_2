var a_canvas = document.getElementById("a")

function draw_a() {
    //first line of the function finds the <canvas> element in DOM
    var a_canvas = document.getElementById("a");
    //second line has a drawing context --> where all the fun stuff happens
    //once you find canvas element --> call getContext and MUST pass
    //string "2d" to it because not yet a 3d canvas
    var a_context = a_canvas.getContext("2d");
    //drawing context is where all the drawing methods and properties
    //are defined, a whole group of properties and methods devoted to
    //drawing rectanges:
        //fillStyle can be CSS color, patter, or gradient, default = black
        //fillRect(x,y,width,height) draws rect filled with current fill style
        //strokeStyle property like fillStyle --> can be CSS color, pattern, or gradient
        //strokeRect(x,y,width,height) draws rect with current stroke style
            //doesn't fill in middle, just draws edges
        //clearRect(x,y,width,height) clears pixels in specified rectangle
    a_context.fillRect(50, 25, 150, 100);
    //canvas coordinates --> like an upside graph

    //to draw "pencil" lines:
        // moveTo(x,y) moves pencil to specified starting pt.
        // lineTo(x,y) draws a line to specified ending point
    for (var x = 0.5; x < 500; x += 10) {
        a_context.moveTo(x, 0);
        a_context.lineTo(x, 375);
    };

    for (var y = 0.5; y < 375; y += 10) {
        a_context.moveTo(0, y);
        a_context.lineTo(500, y);
    };

    //now to add ink method
    a_context.strokeStyle = "#eee";
    a_context.stroke();

};

function draw_b() {
    var b_canvas = document.getElementById("b");
    var b_context = b_canvas.getContext("2d");

    b_context.beginPath();
    b_context.moveTo(0, 40);
    b_context.lineTo(240, 40);
    b_context.moveTo(260, 40);
    b_context.lineTo(500, 40);
    b_context.moveTo(495, 35);
    b_context.lineTo(500, 40);
    b_context.lineTo(495, 45);

    b_context.moveTo(60, 0);
    b_context.lineTo(60, 153);
    b_context.moveTo(60, 173);
    b_context.lineTo(60, 375);
    b_context.moveTo(65, 370);
    b_context.lineTo(60, 375);
    b_context.lineTo(55, 370);

    b_context.strokeStyle = "#000000";
    b_context.stroke();

    //text on canvas
    //fonts available are anything that's available in CSS
    //textAlign controls text alignment (start, end, left, right ,center)
    //textBaseline controls where text is drawn relative to a starting point
        //(top, hanging, middle, alphabetic, ideographic, bottom)

    b_context.font = "bold 12px sans-serif";
    b_context.fillText("x", 248, 43);
    b_context.fillText("y", 58, 165);

    //fillText() method draws actual text

    b_context.textBaseline = "top";
    //set baseline to top and pass in upper-left coordinate of text's bounding box
    b_context.fillText("(0,0)", 8, 5);

    //for text in lower-right corner
    b_context.textAlign = "right";
    b_context.textBaseline = "bottom";
    b_context.fillText("(500, 375)", 492, 370);

    b_context.fillRect(0,0,3,3);
    b_context.fillRect(497,372,3,3);

};

function draw_c() {
    var c_canvas = document.getElementById("c");
    var context = c_canvas.getContext("2d");

    //createLinearGradient(x0, y0, x1, y1) paints along a line from (x0, y0) to (x1, y1)
    //createRadialGradient(x0, y0, r0, x1, y1, r1) paints along a cone between two circles
        //1st 3 parameters represent start circle with origin (x0, y0) and raidus r0
        //last 3 parameters represent end circle with origin (x1, y1) and radiusr1

    var my_gradient = context.createLinearGradient(0, 0, 300, 0);
    //made gradient 300 pixels wide like the canvas
    //because y values (2nd and 4th parameters) both 0, gradient shade evenly from left to right

    //once have gradient object, can define gradient's colors
    //have two or more color stops, can be anywhere along gradient
    //to add color stop, need to specify position along gradient, positions can be anywhere between 0 to 1

    //gradient that shades from black to white
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");

    //defining a gradient doesn't draw anything, need to use fillStyle and draw a shape

    context.fillStyle = my_gradient;
    context.fillRect(0, 0, 300, 225);


};

function draw_d() {
    var d_canvas = document.getElementById("d");
    var d = d_canvas.getContext("2d");

    //for top to bottom, keep x values 0 and y values vary

    var my_gradient = d.createLinearGradient(0,0,0,225);
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");
    d.fillStyle = my_gradient;
    d.fillRect(0,0,300,225);
};

function draw_e() {
    var e_canvas = document.getElementById("e");
    var e = e_canvas.getContext("2d");

    //for diagonal, both values vary

    var my_gradient = e.createLinearGradient(0, 0, 300, 225);
    my_gradient.addColorStop(0, "black");
    my_gradient.addColorStop(1, "white");
    e.fillStyle = my_gradient;
    e.fillRect(0, 0, 300, 225);
};

function draw_f() {
    var f_canvas = document.getElementById("f");
    var f = f_canvas.getContext("2d");

    //drawing images onto canvas:
        //drawImage(image, dx, dy) takes an image and draws it onto canvas
            //coorinates (dx, dy) will be upper-left of image
        //drawImage(image, dx, dy, dw, dh) takes image and scales it to width of dw and height of dh
            //then draws it onto canvas at coordinates dx and dy
        //drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) takes image, clips it to rectangle (sx, sy, sw, sh)
            //scales it to dimensions (dw, dh) and draws it on at (dx, dy)
    //need an image, can be existing <img> element
        // or can create Image() object with Javascript
        // need to make sure image is fully loaded before drawing it on canvas
    //if using <img> element, can safely draw it on the canvas during window.onload event

    var fox = new Image();
    fox.src = "/static/img/fennec_fox.jpg";
    fox.onload = function() {
        f.drawImage(fox, 0, 0, 350, 300);
    };

};

$("#startcanvas").click(function() {
    draw_a();
});

$("#startcanvas_2").click(function() {
    draw_b();
});

$("#startcanvas_3").click(function() {
    draw_c();
});

$("#startcanvas_4").click(function() {
    draw_d();
});

$("#startcanvas_5").click(function() {
    draw_e();
});

$("#startcanvas_6").click(function() {
    draw_f();
});