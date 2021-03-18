//-- Contador de clicks de botón

console.log("Ejecutando JS...");

//-- Crear objeto gui, con los elementos de la interfaz gráfica
//-- Al tenerlo agrupado podemos pasarlo como párametro o asignárselo
//-- a otro objeto
const gui = {
    display: document.getElementById("display"),
    boton_inc: document.getElementById("boton_inc"),
    boton_dec: document.getElementById("boton_dec")
}
const 

//-- Objeto contador: Contiene el valor y el método para incrementarse
const counter = {
    valor: 0,
    inc : function(value) {
        this.valor += value;
        gui.display.innerHTML = this.valor;
    }
}

//-- Acciones: Ligar el botón al contador
//--- Incrementar cintador
gui.boton_inc.onclick = () => {
    counter.inc(1);
}

gui.boton_dec.onclick = () => {
    counter.inc(-1);
}