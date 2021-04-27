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

var brickRowCount = 5; //numero de filas ladrillos
var brickColumnCount = 9; //numero de columnas ladrillos
var brickWidth = 50; //ancho ladrillo
var brickHeight = 10; //altura ladrillo
var brickPadding = 10; //hueco para que no se toquen entre ladrillos
var brickOffsetTop = 30; //margen superior
var brickOffsetLeft = 30; //margen izquierdo

var score = 0; //contador
var lives = 3; //vidas jugador

//ladrillos guardados en una matriz
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

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

//funcion que dibuja los ladrillos
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

//funcion para detectar colisiones entre bola y ladrillos
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS!!");
                        document,location.reload(); //la funcion vuelve a cargar la pagina y el juego empieza de nuevo
                    }
                }
            }
        }
    }
}

//funcion para el contador
function drawScore(){
    ctx.font = "12px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Puntos:"+score, 8, 20);
}

//funcion vidas jugador
function drawLives() {
    ctx.font = "12px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Vidas:"+lives, canvas.width-60, 20);
}
//funcion para dibujar dentro del canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();
    
    //condiciones para que la bola se quede dentro del canvas
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX +paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
            alert("GAME OVER");
            document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
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