console.log("Ejecutando JS...");

display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
punto = document.getElementById("punto")
del= document.getElementById('del')
porcentaje = document.getElementById('porcentaje')
raiz = document.getElementById('raiz')

const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,
  PUNTO: false,
}

let estado = ESTADO.INIT; //Variable estado
let estado_log = []; //variable estados anteriores

let numeros = document.getElementsByClassName('numero');
for(i=0; i<numeros.length; i++){
  numeros[i].onclick = (ev) =>{
    digito(ev.target.value);
  }
}

let calculos = document.getElementsByClassName('operacion')
for(i=0; i<calculos.length; i++){
  calculos[i].onclick = (ev) =>{
    if(estado == ESTADO.OP1){
      display.innerHTML += ev.target.value;
      estado_log.push(estado);
      estado = ESTADO.OPERATION;
      console.log(estado, "opera");
      
    }
  }
}

function digito(boton)
{
  if(estado == ESTADO.INIT){
    display.innerHTML = boton;
    estado_log.push(estado);
    estado = ESTADO.OP1;
    console.log(estado, "digito");
    
  } else if (estado == ESTADO.OP1 || estado == ESTADO.OP2 || estado == ESTADO.OPERATION){
    display.innerHTML += boton;
    console.log(estado, "digito");
    estado_log.push(estado);
    if (estado == ESTADO.OPERATION){
      estado = ESTADO.OP2;
      console.log(estado);
    }

  }
  sonido_teclas.play();
}

//-- Evaluar la expresion
igual.onclick = () => {
  console.log(estado);
  if(estado == ESTADO.OP2){
    display.innerHTML = eval(display.innerHTML);
    estado = ESTADO.OP1;
    ESTADO.PUNTO = false;
    console.log(estado,"igual");
    estado_log = [];
  }
  sonido_teclas.play();
}

//-- Poner a cero la expresion
clear.onclick = (ev) => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
  ESTADO.PUNTO = false;
  console.log(estado,"clear");
  sonido_teclas.play();
  estado_log = [];
}

//-- Poner punto en la expresion
punto.onclick = (ev) =>{
  if (ESTADO.PUNTO){
    console.log("No introduzca dos puntos seguidos, no se puede");
  } else {
    display.innerHTML += ev.target.value;
    ESTADO.PUNTO = true;
    estado_log.push(estado);
  }
  sonido_teclas.play();
}

//-- Eliminar un digito en la expresion
del.onclick = () => {
  display.innerHTML = display.innerHTML.slice(0,-1);
  if(estado_log.length>1){
    estado = estado_log.pop();
  }
  sonido_teclas.play();
}

//-- Calcular porcentaje en la expresion
porcentaje.onclick = () => {
  display.innerHTML = (display.innerHTML/100);
  estado = ESTADO.OP1;
  estado_log = [];
  sonido_teclas.play();
}

//-- Calcular raiz cuadrada en la expresion
raiz.onclick = () => {
  display.innerHTML = Math.sqrt(display.innerHTML);
  estado = ESTADO.OP1;
  estado_log = [];
  sonido_teclas.play();
}
