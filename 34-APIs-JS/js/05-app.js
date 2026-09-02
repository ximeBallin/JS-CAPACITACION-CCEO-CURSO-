document.addEventListener('visibilitychange', ()=>{
    if(document.visibilityState === 'visible'){
        console.log('Ejecutar la duncion para reproducir el video ...');
    }else{
        console.log('Pausar el video')
    }
})