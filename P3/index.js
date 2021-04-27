var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); //guarda el contexto
var ballRadius = 10; //mantiene el radio del circulo dibujado
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var paddleHeight = 10; //altura pala
var paddleWidth = 75; //anchura pala
var paddleX = (canvas.width-paddleWidth)/2; //posicion pala
var rightPressed = false; //boton derecho
var leftPressed = false; //boton izquierdo

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//funciones para cuando se pulsa una tecla
function keyDownHandler(e) {
    if(e.keyCode == 39) { //tecla derecha
        rightPressed = true;
    }
    else if(e.keyCode == 37) { //tecla izquierda
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

//funcion que dibuja la bola
function drawBall() {
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    
    
    //condiciones para que la bola se quede dentro del canvas
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        alert("GAME OVER");
        document.location.reload();
    }
    
    //condiciones para que la pala no se salga del canvas
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
    
    x += dx;
    y += dy;
}

setInterval(draw, 10);