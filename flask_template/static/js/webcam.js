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


if (navigator.webkitGetUserMedia != null) {
    var options = {
        video: true,
        audio: true,
    };

    navigator.webkitGetUserMedia (options,
        function(stream) {
            var video = document.querySelector('video');
            video.src = window.webkitURL.createObjectURL(stream);
        },
        function(e) {
            console.log("error");
        }
    );
}
