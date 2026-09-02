const abrirBtn = document.querySelector('#abrir-btn');
const cerrarBtn = document.querySelector('#cerrar-btn');    

abrirBtn.addEventListener('click', pantallaCompleta);
cerrarBtn.addEventListener('click', salirPantallaCompleta);

function pantallaCompleta() {
    document.documentElement.requestFullscreen();

}

function cerrarPantallaCompleta(){
    document.exitFullscreen();
}

