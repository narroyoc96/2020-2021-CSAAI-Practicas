
console.log("Ejecutando js...")

//-- Leer el párrafo identificado como test
const test = document.getElementById('test')

//-- Configurar el manejador para el evento de
//-- pulsación de botón
test.onclick = () => {
    console.log("Click sobre el párrafo...") //Notación más compacta pero igual que Ej7
} 
