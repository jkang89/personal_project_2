//drawing image on canvas and writing text on picture
function drawOnPicture() {
    var a_canvas = document.getElementById("a");
    var aCon = a_canvas.getContext("2d");
    var fox = new Image();
    fox.onload = function() {
        drawScreen();
        drawText();
    };

    fox.src = "/static/img/fennec_fox.jpg"

    function drawScreen() {
            aCon.drawImage(fox, 0, 0, 300, 300);

    };

    function drawText() {
        aCon.font = "12px Arial";
        aCon.textAlign = "right";
        aCon.textBaseline = "top";
        aCon.fillText("fennec_fox", 75, 10)
    };

};

//call image from video
function getVideo() {
    var camera = document
    var canvas = document.getElementById("mycanvas");
    if (canvas.getContext);
        var context = canvas.getContext("2d");

        return document.getElementById("video");

    function drawOnVideo() {

    }
};

$("#startcanvas").click(function() {
    drawOnPicture();
});

$("#startcanvas2").click(function() {
    getVideo();
});