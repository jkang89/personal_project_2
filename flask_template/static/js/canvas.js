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

$("#startcanvas").click(function() {
    drawOnPicture();
});