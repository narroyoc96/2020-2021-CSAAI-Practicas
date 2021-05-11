console.log('Ejecutando JS...');

const canvas = document.getElementById('canvas');
const img = document.getElementById('original')
const ctx = canvas.getContext('2d');
const slider_r = document.getElementById('red');
const slider_g = document.getElementById('green')
const slider_b = document.getElementById('blue')

//Valor deslizadores
const value_r = document.getElementById('value_r');
const value_g = document.getElementById('value_g');
const value_b = document.getElementById('value_b');

const gray = document.getElementById('gray') //botón gris
const colour = document.getElementById('colour') //boton color RGB

img.onload = function(){
  canvas.width = img.width;
  canvas.height = img.height;

  //situar la imagen original en el canvas; no se han hecho manipulaciones todavía
  ctx.drawImage(img, 0,0);

  console.log("Imprimiendo imagen..");
};

//funcion retrollamadambotón RGB
colour.onclick = () => {
  //funcion retrollamada deslizador
  slider_r.oninput = () => {
    value_r.innerHTML = slider_r.value;

  //situar la imagen original en el canvas; no se han hecho manipulaciones todavía
    ctx.drawImage(img, 0,0);

    //Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //Obtener el array con todos los píxeles
    let data = imgData.data

    //Obtener el umbral de R del deslizador
    umbral = slider_r.value

    //Filtrar la imagen según el nuevo umbral
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbral)
        data[i] = umbral;
    }

    //Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
}

//Función retrollamada botón gris
gray.onclick = () => {
  var brightness = 0;
  //Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //Obtener el array con todos los pixeles
  let data = imgData.data;

  for (var i = 0; i < data.length; i+=4) {
    brightness = (3 * data[i] + 4 * data[i+1] + data[i+2])/8
    data[i] = brightness;
    data[i+1] = brightness;
    data[i+2] = brightness;
  }

  //Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}