
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); //variable para guardar el contexto

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var ballRadius = 10; //mantiene el radio del circulo dibujado

function drawBall () {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //borra el rastro que deja la bola
    drawBall();

    //condiciones para que la bola se quede dentro del canvas
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);