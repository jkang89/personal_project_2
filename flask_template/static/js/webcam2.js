var camera = function() {
    var video = document.getElementById("video");
    var canvas = document.getElementById("mycanvas");

    var whenUserGrantsAccess = function(mediaStreamObject) {
        console.log(mediaStreamObject);
        video.src = window.URL.createObjectURL(mediaStreamObject);
        video.play();

        var context = canvas.getContext("2d");
    };

    navigator.getUserMedia = function() {
        return navigator.getUserMedia       ||
               navigator.webkitGetUserMedia ||
               navigator.mozGetUserMedia    ||
               navigator.msGetUserMedia;
    }();

    if(navigator.getUserMedia) {
        navigator.getUserMedia ({
            video: true,
            audio: false
        }, whenUserGrantsAccess);
    } else {
        throw new Error("Browser does not appear to support getUserMedia;")
    };
}();