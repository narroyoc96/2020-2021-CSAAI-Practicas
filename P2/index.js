console.log("Ejecutando JS...");

display = document.getElementById("display")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
numeros = document.getElementsByClassName('numero')
calculos = document.getElementsByClassName('operacion')
punto = document.getElementById("punto")
del= document.getElementById('del')
porcentaje = document.getElementById('porcentaje')
raiz = document.getElementById('raiz')
ans = document.getElementById('ans')

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


