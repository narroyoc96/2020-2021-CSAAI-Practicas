
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); //variable para guardar el contexto

var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;

var ballRadius = 10; //mantiene el radio del circulo dibujado

//variables para crear la pala que golpea la bola
var paddleHeight = 10; //altura
var paddleWidth = 75; //anchura
var paddleX = (cancas.width-paddleWidth)/2; //posicion

//funcion que dibuja la bola
function drawBall () {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//funcion que dibuja la pala
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//funcion para dibujar dentro del canvas
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