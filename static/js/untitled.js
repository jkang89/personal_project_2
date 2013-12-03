function camera(){
    var video, canvas, context, videoPause, overlayContext;
    var renderTimer;

    function initVideoStream() {
        video = document.getElementById('video');
        video.setAttribute('width', options.width);
        video.setAttribute('height', options.height);

        navigator.getUserMedia = navigator.getUserMedia         ||
                                 navigator.webkitGetUserMedia   ||
                                 navigator.mozGetUserMedia      ||
                                 navigator.msGetUserMedia;

        window.URL = window.URL     || window.webkitURL ||
                     window.mozURL  || window.msURL;

        if(navigator.getUserMedia) {
            navigator.getUserMedia ({
                video: true,
                audio: false
            }, function(stream) {
                options.onSuccess();

                if (window.navigator.mozGetUserMedia) {
                    video.mozGetUserMedia = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream);
                };

                initCanvas();
            });
        } else {
            options.onNotSupported();
        };
    };

    function initCanvas() {
        canvas = document.getElementById("canvas");
        canvas.setAttribute('width', options.width);
        canvas.setAttribute('height', options.height);
        context = canvas.getContext('2d');

        vid.appendChild(canvas);

        if (options.mirror) {
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
        };

        startCapture();
    };

    function startCapture() {
        cameraExists = true;
        video.play();
        renderTimer = setInterval(function() {
            context.drawImage(video, 0, 0, video.width, video.height);
        }, Math.round(1000/options.fps));
    };

    function pauseCapture() {
        if (renderTimer) clearInterval(renderTimer);
        video.pause();
    };

    function stopCapture() {
        pauseCapture();

        if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = null;
        } else {
            video.src = "";
        };
    };

    function getVideoInfo() {
        var v = document.getElementById("video");
        var ctx = v.getContext('2d');
        return ctx.getImageData(0, 0, canvas.width, canvas.height);
    };

    return {
        init: function(captureOptions) {
            var doNothing = function(){};

            options = captureOptions || {};
            options.fps = options.fps || 30;
            options.width = options.width || 600;
            options.height = options.height || 400;
            options.mirror = options.mirror || false;
            options.targetCanvas = options.targetCanvas || null;
        };
    };
}();

$("#startbutton").click(function() {
    camer();
});