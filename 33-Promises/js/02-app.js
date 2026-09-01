const paises = [];

function nuevoPais(pais, callback) {
    paises.push(pais);
    console.log(`Se agregó el país: ${pais}`);
    callback();
}

function mostrarPaises() {

}

function iniciarCallbackHell() {
    setTimeout(() => {
        nuevoPais('Alemania', mostrarPaises);
        setTimeout(() => {
            nuevoPais('Francia', mostrarPaises);
            setTimeout(() => {
                nuevoPais('Inglaterra', mostrarPaises);
            }, 3000);
        }, 3000);
    }, 3000);
}

inciarCallbackHell();
