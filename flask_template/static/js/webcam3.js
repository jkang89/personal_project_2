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

        function snapshot() {
            if (localMediaStream) {
                context.drawImage(video, 0, 0);
            }
        };

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
    }

    return {
        init: function() {
            initVideoStream();
        },
        start: startCapture,
        pause: pauseCapture,
        toggle: toggleCapture
    };
    
})();

function startup_stuff() {
    camera.init();
}

$(startup_stuff);

// $("#startcanvas2").click(function() {
    // camera.init();
// });

function copy_frame() {
    var video = $("video")[0];
    var canvas = $("canvas")[0];

    var ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
}

$("#copy-to-canvas").click(function() {
    // copy_frame();
    camera.toggle();
    return false;    
});