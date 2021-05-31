//----- Obtener elemento de video y configurarlo
let directo = document.getElementById("directo");
const video1 = document.getElementById("video1");
const video2 = document.getElementById("video2");
const video3 = document.getElementById("video3")

const btn_video1 = document.getElementById("btn_video1");
const btn_video2 = document.getElementById("btn_video2");
const btn_video3 = document.getElementById("btn_video3");

const btn_test = document.getElementById("btn_test");
const btn_src_on = document.getElementById("btn_src_on");
const btn_src_off = document.getElementById("btn_src_off");

const btn_auto = document.getElementById("btn_auto");
const btn_manual = document.getElementById("btn_manual");
const btn_bucle = document.getElementById("btn_bucle");

let running = false;

//-- Variable bucle
var start = 0;

//-- Variables cronómetro
var segundos = 0;
var minutos = 0;
var horas = 0;
var seconds = document.getElementById("segundos");
var minutes = document.getElementById("minutos");
var hours = document.getElementById("horas");


//-- Establecer las dimensiones de los vídeos
directo.width=420;
directo.height=200;

video1.width=200;  
video1.height=100;

video2.width=200;  
video2.height=100;

video3.width=200;  
video3.height=100;

//-- Imagen de Test usada
const TEST_IMAGE_URL = "tele.png";

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
directo.poster = TEST_IMAGE_URL;
video1.poster = TEST_IMAGE_URL;
video2.poster = TEST_IMAGE_URL;
video3.poster = TEST_IMAGE_URL;

//-- Boton de FUENTES-ON
btn_src_on.onclick = () => {
    running = true;
 
  //-- Establecer la fuente de la cámara 1, 2 y 3
  video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
  video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
  video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";

  //-- Reproducimos un vídeo, desde el comienzo
  video1.currentTime = 0;
  video1.play();
  video2.currentTime = 0;
  video2.play();
  video3.currentTime = 0;
  video3.play();

  //-- Y en silencio...
  video1.muted = true;
  video2.muted = true;
  video3.muted = true;

  //-- En la emisión en directo ponemos la imagen de prueba
  directo.poster = TEST_IMAGE_URL;
};

//-- Boton de FUENTES-OFF
btn_src_off.onclick = () => {
    running = false;

    //-- Establecer la fuente de la cámara 1, 2 y 3
    video1.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4";
    video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4";
    video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4";

    //-- Reproducimos un vídeo, desde el comienzo
    video1.currentTime = 0;
    video2.currentTime = 0;
    video3.currentTime = 0;
    directo.currentTime = 0;

    //-- Y en silencio...
    video1.muted;
    video2.muted;
    video3.muted;
    directo.muted;

    //-- En la emisión en directo ponemos la imagen de prueba
    directo.poster = TEST_IMAGE_URL;
    directo.src = '';

}

//-- Botón de Test
btn_test.onclick = () => {
    console.log("Imagen test");
    running = false;
    directo.poster = TEST_IMAGE_URL;
    directo.src = '';
};

//-- Botón de Selección de la cámara 1
btn_video1.onclick = () => {
    console.log("Cámara 1");
    if (!running) {
        return;
    }
    directo.src = video1.src;
    directo.currentTime = video1.currentTime;
    directo.play();
    directo.poster=null;
};

//-- Botón de Selección de la cámara 2
btn_video2.onclick = () => {
    console.log("Cámara 2");
    if (!running) {
        return;
    }
    directo.src = video2.src;
    directo.currentTime = video2.currentTime;
    directo.play();
    directo.poster=null;
};

//-- Botón de Selección de la cámara 3
btn_video3.onclick = () => {
    console.log("Cámara 3");
    if (!running) {
    return;
    }
    directo.src = video3.src;
    directo.currentTime = video3.currentTime;
    directo.play();
    directo.poster=null;
};

//--Botón manual
btn_manual.onclick = () => {
    console.log("Manual");
    running = false;

    directo.src = TEST_IMAGE_URL;
    video1.src = TEST_IMAGE_URL;
    video2.src = TEST_IMAGE_URL;
    video3.src = TEST_IMAGE_URL;
    btn_src_on.disabled = false;
    btn_src_off.disabled = false;
    btn_video1.disabled = false;
    btn_video2.disabled = false;
    btn_video3.disabled = false;
    btn_test.disabled = false;
    video1.disable = false;
    video2.disable = false;
    video3.disable = false;

}

//-- Botón de automático
btn_auto.onclick = () => {
    console.log("Automático");
    running = true;

    btn_video1.disabled=true;
    btn_video2.disabled=true;
    btn_video3.disabled=true;
    btn_test.disabled=true;
    btn_src_on.disabled=true;

    btn_video1.onclick();
    setTimeout(btn_video2.onclick, 3000);
    setTimeout(btn_video3.onclick, 6000);
    var repeat = setInterval(change, 9000);
    var camara2;
    var camara3;
    function change() {
      btn_video1.onclick();
      camara2 = setTimeout(btn_video2.onclick, 3000);
      camara3 = setTimeout(btn_video3.onclick, 6000);
    }
}

btn_bucle.onclick = () => {
    console.log("Bucle");
    running = true;
    start = directo.currentTime;
    var loop = setInterval(restart, 3000);
    function restart() {
        directo.currentTime = start;
    }
};

//-- Función cronómetro 
function chrono(){
    setInterval(() =>{
        if(!running){
            return;
        }

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

window.addEventListener("load", () => {
    chrono();
})