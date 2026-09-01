window.addEventListener('online', actualizarEstado);
window.addEventListener('offline', actualizarEstado);

function actualizarEstado() {
    if(navigator.onLine) {
        console.log('Conexión Restablecida');
    }else {
        console.log('Conexión Perdida');
    }   
}