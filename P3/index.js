var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); //guarda el contexto
var ballRadius = 5; //mantiene el radio del circulo dibujado
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 0;
var dy = 0;
var playing = false;

var ballColor = 0;
var ballColors = ["red", "pink", "blue"]

var paddleHeight = 10; //altura pala
var paddleWidth = 75; //anchura pala
var paddleX = (canvas.width-paddleWidth)/2; //posicion pala
var rightPressed = false; //boton derecho
var leftPressed = false; //boton izquierdo

var startButton = document.getElementById("start");
startButton.addEventListener("click", ()=>{
    if(dx != 0 && dy != 0){
        return;
    }
    playing = true;
    dx = 2;
    dy = -2;
    y = canvas.height-30;
    x = paddleX+paddleWidth/2;
});

var brickRowCount = 5; //numero de filas ladrillos
var brickColumnCount = 9; //numero de columnas ladrillos
var brickWidth = 50; //ancho ladrillo
var brickHeight = 10; //altura ladrillo
var brickPadding = 10; //hueco para que no se toquen entre ladrillos
var brickOffsetTop = 30; //margen superior
var brickOffsetLeft = 30; //margen izquierdo

var score = 0; //contador
var lives = 3; //vidas jugador
var playing = false; //variable para saber si se esta jugando
var startButton; //representa el boton

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
    else if(e.keyCode == 32) {
        console.log("hola");
        if(dx != 0 && dy != 0){
            return;
        }
        playing = true;
        dx = 2;
        dy = -2;
        y = canvas.height-30;
        x = paddleX+paddleWidth/2;
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
    if (!playing){
        return;
    }
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = ballColors[ballColor];
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
                if(x+ballRadius > b.x && x + ballRadius < b.x+brickWidth && y + ballRadius > b.y && y + ballRadius < b.y+brickHeight) {
                    dy = -dy;
                    ballColor = (ballColor+1 <= ballColors.length)? ballColor+1: 0; 
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

var segundos = 0;
var minutos = 0;
var horas = 0;
var seconds = document.getElementById("segundos");
var minutes = document.getElementById("minutos");
var hours = document.getElementById("horas");

//funcion cronometro juego
function chrono(){
    setInterval(() =>{
        segundos++;
        if(segundos < 10){
            seconds.innerHTML="0"+segundos;

        }else{
            seconds.innerHTML=segundos;
        }
        if(segundos == 59){
            segundos = -1;
        }
        if(segundos==0){
            minutos++;
        }
        if(minutos < 10){
            minutes.innerHTML="0"+minutos;

        }else{
            minutes.innerHTML=minutos;
        }
        if(minutos == 59){
            minutos = -1;
        }
        if(minutos==0 && segundos==0){
            horas++;
        }
        if(horas < 10){
            hours.innerHTML="0"+horas;

        }else{
            hours.innerHTML=horas;
        }

    }, 1000)
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
        ballColor = (ballColor+1 <= ballColors.length)? ballColor+1: 0;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
        ballColor = (ballColor+1 <= ballColors.length)? ballColor+1: 0; 

    } else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX +paddleWidth) {
            dy = -dy;
            ballColor = (ballColor+1 <= ballColors.length)? ballColor+1: 0;
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
                playing = false;
                dx = 0;
                dy = 0;
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
    requestAnimationFrame(draw)
}

window.addEventListener("load", () => {
    chrono();
})

draw();
