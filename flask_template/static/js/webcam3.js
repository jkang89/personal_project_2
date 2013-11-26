var current_filter = null;

var camera = (function(){
    var video, canvas, context, videoPause, overlayContext;
    var render_timer = null;

    function initVideoStream(){
        console.log("In init video stream");
        video = document.getElementById("video");
        video.setAttribute('width', 640);
        video.setAttribute('height', 480);

        var cameraExists = false;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        navigator.getUserMedia( {video:true, audio:false}, 
            function(stream) {
                video.src = window.URL.createObjectURL(stream);
                console.log("Got the stream");

                startCapture();
              }
          );
    };
    function initCanvas() {
        canvas = document.getElementById("canvas");
        canvas.setAttribute('width', 640);
        canvas.setAttribute('height', 480);
        context = canvas.getContext("2d");


        //canvas.appendChild(video)
        //video.appendChild(canvas);
        //video.appendChild(canvasOverlay)

        // function snapshot() {
        //     if (localMediaStream) {
        //         context.drawImage(video, 0, 0);
        //     }

        // };

        startCapture();
    };

    function startCapture(){
        var fps = 15;
        render_timer = setInterval(copy_frame, 1000/fps);

        // cameraExists = true;
        // video.play();
        //headtrack();
    };

    function pauseCapture(){
        clearInterval(render_timer);
        render_timer = null;
        // video.pause();
        //removes the even listener, but doesn't stop facetracking
        //document.removeEventListener("facetrackingEvent", greenRect);
    };

    function toggleCapture() {
        console.log(render_timer);
        if (render_timer != null) {
            pauseCapture();
        } else {
            startCapture();
        }
    };

    function copy_frame() {
        var video = $("#video")[0];
        var mycanvas = $("#mycanvas")[0];
        var bgcanvas = $("#bgcanvas")[0];
        var my_ctx = mycanvas.getContext("2d");
        var bg_ctx = bgcanvas.getContext("2d");

        bg_ctx.drawImage(video, 0, 0);

        var pixels = bg_ctx.getImageData(0,0, video.width, video.height);

        filterCanvas(pixels);
        my_ctx.putImageData(pixels, 0, 0);
        //my_ctx.drawImage(pixels, 0, 0);

    };

    return {
        init: function() {
            initVideoStream();
        },
        start: startCapture,
        pause: pauseCapture,
        toggle: toggleCapture
    };
    
})();


filterCanvas = function(pixels) {
    if (current_filter != null) {
        current_filter(pixels);
    }
};

grayscale = function(pixels, args) {
    //pixels is not defined
    var d = pixels.data;
    for (var i = 0; i<d.length; i += 4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        d[i] = d[i+1] = d[i+2] = (r+g+b)/3;
    }
    return pixels;
};

brightness = function(pixels, args) {
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
        d[i] += 1;
        d[i+1] += 1;
        d[i+2] += 1;
    }
    return pixels;
};

sepia = function(pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i + 2];
        d[i] = (r*0.393) + (g*0.769) + (b*0.189);
        d[i+1] = (r*0.349) + (g*0.686) + (b*0.186);
        d[i+2] = (r*0.272) + (g*0.534) + (b*0.131);
    }
    return pixels;
};

red = function(pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        d[i] = Math.min(255, d[i] * 2);
        d[i+1] = d[i+1]/2;
        d[i+2] = d[i+2]/2;
    }
    return pixels;
};

blue = function(pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        d[i] = d[i]/2;
        d[i+1] = d[i+1]/2;
        d[i+2] = Math.min(255, d[i+2] * 2)
    }
    return pixels
};

green = function(pixels, args) {
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        d[i] = d[i]/2;
        d[i+1] = Math.min(255, d[i+1] * 2);
        d[i+2] = d[i+2]/2;
    }
    return pixels
};

threshold = function(pixels, args) {
    //doesn't work
    var d = pixels.data;
    for (var i = 0; i < d.length; i += 4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
        d[i] = d[i+1] = d[i+2] = v
    }
    return pixels
};

function startup_stuff() {
    camera.init();
}

$(startup_stuff);

// $("#startcanvas2").click(function() {
    // camera.init();
// });


$("#copy-to-canvas").click(function() {
    // copy_frame();
    camera.toggle();
    return false;    
});

$("#grayscale").click(function() {
    current_filter = grayscale;
});

$("#brighten").click(function() {
    current_filter = brightness;
});

$("#sepia").click(function() {
    current_filter = sepia;
});

$("#red").click(function() {
    current_filter = red;
});

$("#blue").click(function() {
    current_filter = blue;
});

$("#green").click(function() {
    current_filter = green;
});

$("#normal").click(function() {
    current_filter = null;
});

$("#threshold").click(function() {
    current_filter = threshold;
});