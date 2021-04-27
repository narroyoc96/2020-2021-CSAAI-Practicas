
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
var rightPressed = false; //boton derecha
var leftPressed = false; //boton izquierda

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//funciones para cuando se pulsa una tecla
function keyDownHandler(e) {
    if(e.keyCode == 39) { //39 es flecha derecha
        rightPressed = true;
    } else if(e.keyCode == 37) { //37 es flecha izquierda
        leftPressed == true;
    } 
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    } else if(e.keyCode == 37) {
        leftPressed == false;
    } 
}

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
    drawPaddle();

    //condiciones para que la bola se quede dentro del canvas
    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    //condiciones para que la pala no se salga del canvas
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    } else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);