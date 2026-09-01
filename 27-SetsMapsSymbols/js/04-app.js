const producto ={
    idProcto: 10
}

const weakmap = new WeakMap();
weakmap.set(producto, 'Monitor 24 pulgadas');

console.log(weakmap.has(producto));
console.log(weakmap.get(producto));
console.log(weakmap.delete(producto));

console.log(weakmap);
