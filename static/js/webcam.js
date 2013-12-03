function camera(){
    var video, canvas, context, videoPause, overlayContext;
    var renderTimer;

    function initVideoStream() {
        video = document.getElementById("video");
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
        context = canvas.getContext("2d");

        //canvasOverlay = document.createElement("canvas");
        //console.log(canvasOverlay)
        //canvasOverlay.setAttribute('width', 320);
        //canvasOverlay.setAttribute('height', 240);
        //canvasOverlay.style.position = "absolute";
        //canvasOverlay.style.top = '0px';
        //canvasOverlay.style.zIndex = '100001';
        //canvasOverlay.style.display = 'block';
        //overlayContext = canvasOverlay.getContext('2d');
        //overlayContext.clearRect(0,0,320,240);
        //console.log(overlayContext)

        vid.appendChild(canvas);
        //vid.appendChild(canvasOverlay)

        if (options.mirror) {
            context.translate(canvas.width, 0);
            context.scale(-1, 1);
        };

        startCapture();
    };
    //for facetracking
    //function headtrack(){
        //console.log(cameraExists +"blue");
        //var htracker = new headtrackr.Tracker();
        //htracker.init(video, canvas);
        //htracker.start();

        //window.htracker = htracker;
            // for each facetracking even received draw rectangle around tracked face on canvas
            // if (!videoPause){
            //document.addEventListener("facetrackingEvent", greenRect)
            //};
    //};
    // for facetracking, draws the rectangle on the canvas
    //function greenRect(event) {
        //clear canvas
        //overlayContext.clearRect(0,0,320,240);
            //once we have stable tracking, draw rectangle
        //console.log(event.detection)
        //if (event.detection == "CS") {
            //overlayContext.translate(event.x, event.y)
            //overlayContext.rotate(even.angle-(Math.PI/2));
            //overlayContext.strokeStyle = "#00CC00";
            //overlayContext.strokeRect((-(even.width/2)) >> 0, (-even.height/2)) >> 0, event.width, event.height);
            //overlayContext.rotate((Math.PI/2)-event.angle);
            //overlayContext.translate(-event.x, -event.y);
        //}
    //};

    function startCapture() {
        cameraExists = true;
        video.play();
        renderTimer = setInterval(function() {
            context.drawImage(video, 0, 0, video.width, video.height);
        }, Math.round(1000/options.fps));
        //headtrack();
    };

    function pauseCapture(){
        if (renderTimer) clearInterval(renderTimer);
        video.pause();
        //removes the even listener, but doesn't stop facetracking
        //document.removeEventListener("facetrackingEvent", greenRect);
    };

    function stopCapture() {
        pauseCapture();

        //WHAT DOES THIS CODE DO??? *table flip* *bang head against computer keyboard* T.T
        if (video.mozSrcObject !== undefined) {
            video.mozSrcObject = null;
        } else {
            video.src = "";
        };
    };

    function getVideoInfo() {
        var v = document.getElementById("livevideo");
        //figure out where Kara has "livevideo" in her code
        var ctx = v.getContext("2d");
        return ctx.getImageData(0,0,canvas.width, canvas.height);
    };

    // var errorCallback = function(error){
    //     console.log('Error', error);
    // };

    return {
    //     init: function() {
    //         initVideoStream();
    //     },
    //     start: startCapture,
    //     pause: pauseCapture
    // };

        init: function(captureOptions) {
            var doNothing = function(){};

            options = captureOptions || {};
            options.fps = options.fps || 30;
            options.width = options.width || 600;
            options.height = options.height || 400;
            options.mirror = options.mirror || false;
            options.targetCanvas = options.targetCanvas || null;

        }
    // need to figure out what this part of the code does before trying it
    };

} //();
//the (); at the end calls the camera function --> needs to call itself

$("#startbutton").click(function() {
    camera();
});