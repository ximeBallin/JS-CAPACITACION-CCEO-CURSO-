// Si ya tienes un 'enlace' o 'navegacion' declarado arriba en tu archivo, 
// no los vuelvas a declarar con const. Solo reutiliza las variables existentes.

// Ejemplo de cómo limpiar las declaraciones repetidas:
const enlace = document.createElement('A');

// Agregandole el texto
enlace.textContent = 'Nuevo Enlace';

// añadiendo href
enlace.href = '/nuevo-enlace';

console.log(enlace);

enlace.target = "_blank";
enlace.setAttribute('data-enlace', 'nuevo-enlace');
enlace.classList.add('alguna-clase');
enlace.onclick = miFuncion;

// Seleccionar la navegacion (asegúrate de que no esté declarada como const de nuevo más abajo)
const navegacion = document.querySelector('.navegacion');
navegacion.insertBefore(enlace, navegacion.children[1]);

function miFuncion() {
    alert('Diste click');
}

// Crear un CARD
const parrafo1 = document.createElement('P');
parrafo1.textContent = 'Concierto';
parrafo1.classList.add('categoria', 'concierto');

const parrafo2 = document.createElement('P');
parrafo2.textContent = 'Concierto de Rock';
parrafo2.classList.add('titulo');

const parrafo3 = document.createElement('P');
parrafo3.textContent = '$800 por persona';
parrafo3.classList.add('precio');

// Crear div con la clase de info
const info = document.createElement('div');
info.classList.add('info');
info.appendChild(parrafo1);
info.appendChild(parrafo2);
info.appendChild(parrafo3);

// Crear la imagen
const imagen = document.createElement('img');
imagen.src = 'img/hacer2.jpg';
imagen.classList.add('img-fluid');

// Crear el card
const card = document.createElement('div');
card.classList.add('card');

// Asignar la imagen y la info al card
card.appendChild(imagen);
card.appendChild(info);

// Insertar en el HTML
const contenedor = document.querySelector('.hacer');
contenedor.insertBefore(card, contenedor.children[0]);