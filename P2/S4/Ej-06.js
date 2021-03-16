//-- Manejador del evento click sobre el párrafo test
//-- Cada vez que se hace click en el se invoca a esta función
function manejador_parrafo()
{
    console.log("Click sobre el párrafo...")
}

console.log("Ejecutando js...")

//-- Leer el párrafo identificado como test
const test = document.getElementById('test')

//-- Configurar el manejador para el evento de
//-- pulsación de botón: que se ejecute la
//-- funcion manejador_parrafo()
test.onclick = manejador_parrafo; //usamos esta funcion como un objeto, por eso no ponemos () al final