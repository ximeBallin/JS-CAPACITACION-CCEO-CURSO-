//Object Literal 
const producto = {
    nombre: "Monitor 20 pulgadas",
    precio: 300,
    disponible: true
}

//Object Constructor 
function Producto(nombre, precio){
    this.nombre = nombre;
    this.precio = precio;
    this.disponible = true;
}

const producto3 = new Producto("Monitor 24 pulgadas", 100)
console.log(producto3);