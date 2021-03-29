console.log("Ejecutando JS...");

//-- Identificadores
display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
punto = document.getElementById("punto")
del= document.getElementById('del')
porcentaje = document.getElementById('porcentaje')
raiz = document.getElementById('raiz')
ans = document.getElementById('ans')

//-- Array elementos de la diferente clase
let numeros = document.getElementsByClassName('numero')
let calculos = document.getElementsByClassName('operacion')

//-- Estados
const ESTADO = {
    INIT: 0,
    OP1: 1,
    OPERATION: 2,
    OP2: 3,
    COMA: false,
}

//-- Variable estado
let estado = ESTADO.INIT;

//-- Recorre todo el array de los numeros ( 0 al 9)
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

//-- Funcion que sirve para cuando se introduce
//-- un numero se elimine el 0 del display
function digito(boton)
{
  if (display.innerHTML == "0"){
    display.innerHTML = boton.value;
  } else{
    display.innerHTML += boton.value;
  }
}

//-- Evaluar la expresion
igual.onclick = () => {
  display.innerHTML = eval(display.innerHTML);
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
}

//-- Poner punto en la expresion
punto.onclick = () =>{
    display.innerHTML += punto.value;
}

//-- Eliminar un digito en la expresion
del.onclick = () => {
    display.innerHTML = display.innerHTML.slice(0,-1);
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


