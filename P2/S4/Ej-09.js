
//-- Leer el elemento párrafo test2
const test2 = document.getElementById('test2')

//-- Obtener el elemento párrafo 1 para modificarlo
const test1 = document.getElementById('test1')

//-- Configurar el manejador para el evento de
//-- pulsación de botón
test.onclick = () => {
    console.log("Click sobre el párrafo...") //Notación más compacta pero igual que Ej7


    //-- cambiar su texto
    test1.innerHTML = "¡TEXTO CAMBIADO!"
}
