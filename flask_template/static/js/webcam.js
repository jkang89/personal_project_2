// (function() {
//     var streaming = false,
//         video = document.querySelector('#video'),
//         canvas = document.querySelector('#canvas'),
//         photo = document.querySelector('#photo'),
//         startbutton = document.querySelector('startbutton'),
//         width = 320,
//         height = 0;

//     navigator.getMedia = (navigator.getUserMedia ||
//                           navigator.webkitGetUserMedia ||
//                           navigator.mozGetUserMedia ||
//                           navigator.msGetUserMedia);
//     navigator.getMedia(
//         {
//             video: true,
//             audio: false

//         },
//         function(stream) {
//             if (navigator.mozGetUserMedia) {
//                 video.mozSrcObject = stream;
//             } else {
//                 var vendorURL = window.URL || window.webkitURL;
//                 video.src = vendorURL.createObjectURL(stream);
//             }
//             video.play();
//         },
//         function(err) {
//             console.log("An error occured! " + err);
//         }
//     );

//     video.addEventListener('canplay', function(ev){
//         if (!streaming) {
//             height = video.videoHeight / (video.video.Width/width);
//             video.setAttribute('width', width);
//             video.setAttribute('height', height);
//             canvas.setAttribute('width', width);
//             canvas.setAttribute('height', height);
//             streaming = true;
//         }
//     }, false);

//     function takepicture() {
//         canvas.width = width;
//         canvas.height = height;
//         canvas.getContext('2d').drawImage(video, 0, 0, width, height);
//         var data = canvas.toDataURL('image/png');
//         photo.setAttribute('src', data);
//     }

//     startbutton.addEventListener('click', function(ev){
//         takepicture();
//         ev.preventDefault();
//     }, false);

// })();


// video = document.createElement('video');
// video.width = 320;
// video.height = 240;
// video.autoplay = true;

// function gotStream(stream) {
//     window.AudioContext = window.AudioContext || window.webkitAudoContext;
//     var audioContext = new AudioContext();

//     //Create an AudioNode from the stream
//     var mediaStreamSource = audioContext.createMediaStreamSource(stream);

//     // connect it to destination hear yourself
//     // or any other node for processing
//     mediaStreamSource.connect(audioContext.destination);
// }

// navigator.getUserMedia({audio:true}, gotStream);


// //from a diff tutorial
// var hasUserMedia = navigator.webkitGetUserMedia ? true: false;

// navigator.webkitGetUserMedia('video', function(stream){
//     video.src = webkitURL.createObjectURL(stream);
// }, function(error){
//     console.log("Failed to get a stream due to", error);
// });

// var videoTexture = new THREE.Texture( video );

// var material = new THREE.MeshLambertMaterial({
//     map : videoTexture
// });

// if(video.readyState === video.HAVE_ENOUGH_DATE){
//     videoTexture.needsupdate = true;
// }


// if (navigator.webkitGetUserMedia != null) {
//     var options = {
//         video: true,
//         audio: true,
//     };

//     navigator.webkitGetUserMedia (options,
//         function(stream) {
//             var video = document.querySelector('video');
//             video.src = window.webkitURL.createObjectURL(stream);
//         },
//         function(e) {
//             console.log("error");
//         }
//     );
// }


var camera = (function(){
    var video, canvas, context, videoPause, overlayContext;

    function initVideoStream(){
        console.log("In init video stream");
        video = document.getElementById("video");
        video.setAttribute('width', 320);
        video.setAttribute('height', 240);
        var cameraExists = false;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        if (navigator.getUserMedia){
            navigator.webkitGetUserMedia({video:true, audio:true},
                  function(stream) {
                    video.src = window.webkitURL.createObjectURL(stream);
                    //initCanvas();
                  }
              );
        };
    };

    function initCanvas(){
        canvas = document.getElementById("canvas");
        canvas.setAttribute('width', 320);
        canvas.setAttribute('height', 240);
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

        video.appendChild(canvas);
        video.appendChild(canvasOverlay)

        starCapture();
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

    function startCapture(){
        cameraExists = true;
        video.play();
        //headtrack();
    };

    function pauseCapture(){
        video.pause();
        //removes the even listener, but doesn't stop facetracking
        //document.removeEventListener("facetrackingEvent", greenRect);
    };

    var errorCallback = function(error){
        console.log('Error', error);
    };

    return {
        init: function() {
            initVideoStream();
        },
        start: startCapture,
        pause: pauseCapture
    };

})();

$("#startbutton").click(function() {
    camera.init();
});