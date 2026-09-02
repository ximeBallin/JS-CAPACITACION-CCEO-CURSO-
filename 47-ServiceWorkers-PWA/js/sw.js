// Cuando se instala el Service Worker
self.addEventListener('install', e => {
    console.log('Instalado el Service Worker');

    console.log(e);
});

// Activar el Service worker
self.addEventListener('activate', e => {
    console.log('Service Worker Activado');


    console.log(e);
})

// Evento fetch para descargar archivos estatico
self.addEventListener('fetch', e => {
    console.log('Fetch... ', e);
})