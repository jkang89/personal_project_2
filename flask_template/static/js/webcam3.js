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
        var video = $("video")[0];
        var canvas = $("canvas")[0];

        var ctx = canvas.getContext("2d");
        ctx.drawImage(video, 0, 0);

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

Filters = {};
Filters.getPixels = function(video) {
    var video = $('video')[0];
    var canvas = $("canvas")[0];
    var ctx = video.getContext('2d');
    return ctx.getImageData(0,0,640,480);
};

Filters.filterImage = function(filter, image, var_args) {
    var args = [this.getPixels(video)];
    for (var i=2; i<arguments.length; i++) {
        args.push(arguments[i]);
    }
    return filter.apply(null, args);
};

Filters.grayscale = function(pixels, args) {
    //not working because .data can't read data off of something that is not defined
    //need to define pixels...
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
        var r = d[i];
        var g = d[i+1];
        var b = d[i+2];
        var v = 0.2126*r + 0.7152*g + 0.0722*b;
        d[i] = d[i+1] = d[i+2] = v 
    }
    return pixels;
};

Filters.brightness = function(pixels, adjustment) {
    var d = pixels.data;
    for (var i=0; i<d.length; i+=4) {
        d[i] += adjustment;
        d[i+1] += adjustment;
        d[i+2] += adjustment;
    }
    return pixels;
};

Filters.sepia = function(pixels, args) {
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
    Filters.grayscale();
});

$("#brighten").click(function() {
    Filters.brightness();
});