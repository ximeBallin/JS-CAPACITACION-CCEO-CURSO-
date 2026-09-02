
const caragarJSONBtn = document.querySelector('"cargarJSON');
caragarJSONBtn.addEventListener('click', obtenerDatos);

function obtenerDatos(){
    const url = 'data/empleado.json';
    fetch(url)
        .then(respuesta =>respuesta.json())
        .then(resultado => mostrarHTML(resultado))
}

function mostrarHTML({empresa, id, nombre, trabajo}){
    const contenido = document.querySelector('.contenido');

    contenido.innerHTML =`
        <p>Empleado: ${nombre}</p>
        <p>ID: ${nombre}</p>
        <p>Empleado: ${nombre}</p>
        <p>Empleado: ${nombre}</p>
    `
}