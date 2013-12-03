// window.addEventListener("DOMContentLoaded", function() {
//     //grab elements, create settings, etc.
//     var canvas = document.getElementById("mycanvas");
//     //calls canvas tag from html
//         context = canvas.getContext('2d');
//         //defines that we're using canvas in the context of images and whatno
//         video = document.getElementById('video');
//         //calls video tag from html
//         videoObj = {"video": true},
//         //saying we want to call video

//         var onCameraFail = function (e) {
//             console.log('Camera did not work.', e);
//         };
//         };

//     //put video listeneres into place
//     if(navigator.getUserMedia) {
//         navigator.getUserMedia(videoObj, function(stream) {
//             video.src = stream;
//             video.play();
//         }, errBack);
//     } else if(navigator.webkitGetUserMedia) {
//         navigator.webkitGetUserMedia(videoObj, function(stream) {
//             video.src = window.webkitURL.createObjectURL(stream);
//             video.play();
//         }, errBack);
//     }

// }, false);

// document.getElementById("startcanvs2").addEventListener("click", function() {
//     context.drawImage(video, 0,0, 300, 300);
// });


function getCamera() {
    var video = document.getElementById("video");
    var canvas = document.getElementById("mycanvas");
    var context = canvas.getContext('2d');
    var localMediaStream = null;

    var onCameraFail = function (e) {
        console.log('Camera did not work.', e);
    };

    function snapshot() {
        if (localMediaStream) {
            context.drawImage(video, 0, 0);
        }
    }

    navigator.getUserMedia = navigator.getUserMedia     || navigator.webkitGetUserMedia ||
                             navigator.mozGetUserMedia  || navigator.msGetUserMedia;

    window.URL = window.URL     || window.webkitURL ||

    navigator.getUserMedia({video: true}, function (stream) {
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
    }, onCameraFail);
};

$('#startcanvs2').click(function() {
    getCamera();
});



