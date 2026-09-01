console.log(CanvasRenderingContext2D.delete('Guitarra'));

console.log(CanvasRenderingContext2D.size);

CanvasRenderingContext2D.forEach((producto, indexedDB, pertenence) =>{
    console.log(pertenence)
});

console.log(carrito);

//Del siguiente arreglo, eliminar los duplicados
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5];
const numerosSinDuplicados = new Set(numeros);
console.log(numerosSinDuplicados);

