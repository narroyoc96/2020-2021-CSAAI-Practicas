console.log("Ejecutando JS...");

display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
punto = document.getElementById("punto")
del= document.getElementById('del')
porcentaje = document.getElementById('porcentaje')
raiz = document.getElementById('raiz')
ans = document.getElementById('ans')

/*Estados Calculadora*/
const ESTADO = {
  INIT: 0,
  OP1: 1,
  OPERATION: 2,
  OP2: 3,
  RESULT: 4,
}

let estado = ESTADO.INIT;

/*Array con los elementos de la clase numero y la clase operacion*/
let numeros = document.getElementsByClassName('numero')
let calculos = document.getElementsByClassName('operacion')

for(i=0; i<numeros.length; i++){
  numeros[i].onclick = (ev) =>{
    digito(ev.target);
  }
}

for(i=0; i<calculos.length; i++){
  calculos[i].onclick = (ev) =>{
    display.innerHTML += ev.target.value;
  }
}

function digito(boton) {
  if (estado == ESTADO.INIT){
    display.innerHTML = boton;
    estado = ESTADO.OP1;
    console.log(estado,"Operador 1")
  } else if (estado == ESTADO.OP1 || estado == ESTADO.OP2 || estado == ESTADO.OPERATION){
    display.innerHTML += boton;
    if (estado == ESTADO.OPERATION) {
      estado = ESTADO.OP2;
      console.log(estado,"Operador 2");
    }
  }
}

for (let operando of operacion){
  operando.onclick = (ev) => {
      display.innerHTML += ev.target.value;
      console.log("OPERADOR");
  } 
}

//-- Evaluar la expresion
igual.onclick = () => {
  if(estado == ESTADO.OP1 || estado == ESTADO.OP2){
    display.innerHTML = eval(display.innerHTML);
    estado = ESTADO.INIT;
    console.log(estado,"igual");
  }
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = " ";
  estado = ESTADO.OP1;
}

//-- Poner punto en la expresion
punto.onclick = () =>{
  if(estado != ESTADO.OP1 && estado != ESTADO.OP2){
    console.log("ERROR");
  }else{
    display.innerHTML += ev.target.value;
    console.log(estado,"Ejecucción correcta");
  }
}

//-- Eliminar un digito en la expresion
del.onclick = () => {
  if (display.innerHTML.length == 1) {
    display.innerHTML = "";
    estado = ESTADO.INIT
  } else {
    display.innerHTML = display.innerHTML.substring(0, display.innerHTML.length - 1);
    if (estado == ESTADO.OPERATION){
      estado = ESTADO.OP1;
    }
  }
}

//-- Calcular porcentaje en la expresion
porcentaje.onclick = () => {
    display.innerHTML = (display.innerHTML/100);
}

//-- Calcular raiz cuadrada en la expresion
raiz.onclick = () => {
    display.innerHTML = Math.sqrt(display.innerHTML);
}

//-- Volver al ultimo resultado
ans.onclick = () => {
    display.innerHTML += ans.value;
}