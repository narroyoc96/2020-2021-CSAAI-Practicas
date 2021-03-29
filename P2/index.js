function main() {
    console.log("Ejecutando JS...");
}

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
numeros = document.getElementsByClassName('numero')
calculos = document.getElementsByClassName('operacion')

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

//-- Recorre todo el array de los diferentes operadores
for(i=0; i<calculos.length; i++){
  calculos[i].onclick = (ev) => {
      if(estado == ESTADO.OP1){
          display.innerHTML += ev.target.value;
          estado = ESTADO.OPERATION;
          console.log(estado, "operacion no valida");
          ESTADO.COMA = true;
      }
  }
}
//-- Funcion que sirve para cuando se introduce
//-- un numero se elimine el 0 del display
function digito(boton) {
    if (estado == ESTADO.INIT) {
        display.innerHTML = boton;
        estado = ESTADO.OP1;
        console.log(estado, "operador 1");
    }else if (estado == ESTADO.OP1 || estado == ESTADO.OP2 || estado == ESTADO.OPERATION) {
        display.innerHTML += boton;
        if (estado == ESTADO.OPERATION) {
            estado = ESTADO.OP2;
            console.log(estado, "operador 2");
            ESTADO.COMA = false;
        }
    }
}
//-- Evaluar la expresion
igual.onclick = () => {
    if(estado == ESTADO.OP1 || estado == ESTADO.OP2){
        display.innerHTML = eval(display.innerHTML);
        estado == ESTADO.OP1;
        ESTADO.COMA = true;
        console.log(estado, "igual");
    }
}

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = "0";
  estado = ESTADO.INIT;
  ESTADO.COMA = false;
  console.log(estado, "borrando todo");
}

//-- Poner punto en la expresion
punto.onclick = () =>{
    if(ESTADO.COMA){
        console.log("Error al poner dos seguidos");
    }else{
        display.innerHTML += ev.target.value;
        ESTADO.COMA = true;
        console.log(estado,"No hay error");
    }
}

//-- Eliminar el ultimo digito en la expresion
del.onclick = () => {
    display.innerHTML = display.innerHTML.slice(0,-1);
    console.log(estado, "borrando ultimo digito");
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


