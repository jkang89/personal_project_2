var current_filter = null;

var camera = (function(){
    var video, canvas, context, videoPause, overlayContext;
    var render_timer = null;

    function initVideoStream(){
        console.log('In init video stream');
        video = document.getElementById('video');
        video.setAttribute('width', 640);
        video.setAttribute('height', 480);

        var cameraExists = false;

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        vendorURL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        navigator.getUserMedia( {video: true, audio: false}, 
            function (stream) {
                video.src = vendorURL.createObjectURL(stream);
                console.log('Got the stream.');

                startCapture();
            }
        );
    };
    function initCanvas() {
        canvas = document.getElementById('canvas');
        canvas.setAttribute('width', 640);
        canvas.setAttribute('height', 480);
        context = canvas.getContext('2d');

        startCapture();
    };

    function startCapture(){
        var fps = 15;
        render_timer = setInterval(copy_frame, 1000/fps);

    };

    function pauseCapture(){
        clearInterval(render_timer);
        render_timer = null;

        saveCanvas();
    };

    function toggleCapture() {
        console.log(render_timer);
        if (render_timer != null) {
            pauseCapture();
            $('#canvasImg')[0].style.display = 'block'
            //show capture
        } else {
            startCapture();
            //hide capture
            $('#canvasImg')[0].style.display = 'none'
        }
    };

    function copy_frame() {
        var video = $('#video')[0];
        var mycanvas = $('#mycanvas')[0];
        var bgcanvas = $('#bgcanvas')[0];
        var my_ctx = mycanvas.getContext('2d');
        var bg_ctx = bgcanvas.getContext('2d');

        bg_ctx.drawImage(video, 0, 0);

        var pixels = bg_ctx.getImageData(0,0, video.width, video.height);

        filterCanvas(pixels);
        my_ctx.putImageData(pixels, 0, 0);
    };

    function saveCanvas() {
        var canvas = $('#mycanvas')[0];
        var dataURL = canvas.toDataURL();
        document.getElementById('canvasImg').src = dataURL;
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

var filterFunctions = {
    grayscale: function(pixels, args) {
        var d = pixels.data;

        for (var i = 0; i<d.length; i += 4) {
            var r = d[i],
                g = d[i+1],
                b = d[i+2];
            d[i] = d[i+1] = d[i+2] = (r+g+b)/3;
        }
        return pixels;
    },
    brightness: function(pixels, args) {
        var d = pixels.data;
        for (var i=0; i<d.length; i+=4) {
            d[i] += 125;
            d[i+1] += 125;
            d[i+2] += 125;
        }
        return pixels;
    },
    sepia: function(pixels, args) {
        var d = pixels.data;

        for (var i = 0; i < d.length; i += 4) {
            var r = d[i],
                g = d[i+1],
                b = d[i+2];
            d[i] = (r*0.393) + (g*0.769) + (b*0.189);
            d[i+1] = (r*0.349) + (g*0.686) + (b*0.186);
            d[i+2] = (r*0.272) + (g*0.534) + (b*0.131);
        }
        return pixels;
    },
    red: function(pixels, args) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = Math.min(255, d[i] * 2);
            d[i+1] = d[i+1]/2;
            d[i+2] = d[i+2]/2;
        }
        return pixels;
    },
    blue: function(pixels, args) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = d[i]/2;
            d[i+1] = d[i+1]/2;
            d[i+2] = Math.min(255, d[i+2] * 2);
        }
        return pixels;
    },
    green: function(pixels, args) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            d[i] = d[i]/2;
            d[i+1] = Math.min(255, d[i+1] * 2);
            d[i+2] = d[i+2]/2;
        }
        return pixels;
    },
    threshold: function(pixels, args) {
        var d = pixels.data;
        for (var i = 0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];
            var v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 50) ? 255 : 0;
            d[i] = d[i+1] = d[i+2] = v;
        }
        return pixels;
    }
};

$(function() {
    camera.init();
});

$('#copy-to-canvas').click(function() {
    camera.toggle();
    return false;    
});


$('.btn-add-filter').click(function(e) {
    current_filter = filterFunctions[$(e.target).data('filter')];
});


$('#saveImage').click(function() {
    window.location.href = $('#canvasImg')[0].src.replace('image/png', 'image/octet-stream');
});