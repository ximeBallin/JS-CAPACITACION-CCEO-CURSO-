const carrito = new Set();

carrito.add('Camisa');  
carrito.add('Disco #1');
carrito.add('Disco #2');
carrito.add('Disco #3');    

console.log(carrito.delete('Guitarra'));

console.log(carrito.size);

carrito.forEach((producto, index, pertenence) =>{
    console.log(pertenence)
}); 

console.log(carrito);

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5];
const numerosSinDuplicados = new Set(numeros);
console.log(numerosSinDuplicados);
