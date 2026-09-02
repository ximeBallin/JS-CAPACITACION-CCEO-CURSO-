// 1. New Binding (Función Constructor)
function Auto(modelo, color){
    this.modelo = modelo;
    this.color = color;
}

const auto = new Auto('Camaro', 'Negro');
console.log(auto);

// 2. Global / Window Binding
window.color = 'negro';

function hola() {
    console.log(color); // Accede a window.color en entornos de navegador
}

hola();
