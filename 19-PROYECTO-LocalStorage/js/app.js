//Variables 

const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');    
let tweets = [];    

//Event Listeners
eventListeners();

function eventListeners() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);   
    
    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || []; //Si no hay nada en el localStorage, que sea un arreglo vacio

        console.log(tweets);
        crearHTML();
    });
}   

//Funciones

function agregarTweet(e) {
    e.preventDefault();
    
    //Testarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;   

    //Validacion
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return; //Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //Una vez agregando vamos a crear el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();

    console.log(tweet);
}

//Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');   
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido'); 
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos 
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}


//mostrar listado de tweets
function crearHTML() {
    if(tweets.length > 0) {
        tweets.forEach(tweet => {

            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            const li = document.createElement('li');

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Añadir el texto
            li.innerText = tweet.tweet;
            li.appendChild(btnEliminar);
            //insertaro en el html
            listaTweets.appendChild(li);
        });

    }

    sincronizarStorage();
}

//Agrega los Tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets)); 
}

//Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}
    
//Limpiar el html 
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);    
    }
}