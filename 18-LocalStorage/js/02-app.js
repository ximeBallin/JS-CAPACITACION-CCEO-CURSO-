const nombre = localStorage.getItem('nombre');
console.log(nombre);

const productoString = localStorage.getItem('producto');    
console.log(JSON.parse(productoString));    

const meses = localStorage.getItem('meses');    
const mesesArray = JSON.parse(meses);
console.log(mesesArray);