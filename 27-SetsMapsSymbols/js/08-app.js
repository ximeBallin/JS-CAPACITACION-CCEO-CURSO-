const ciudades = ['Londres', 'New York', 'Madrid', 'Paris'];
const ordenes = new Set([123, 231, 131, 102]);
const datos = new Map();

datos.set('nombre', 'Juan');
datos.set('profesion', 'Desarrollador Web');

// Default
for(let ciudad of ciudades) {
    console.log(ciudad);
}

for(let orden of ordenes) {
    console.log(orden);
}

for(let dato of datos) {
    console.log(dato);
}

// Keys Iterator
// for( let keys of ciudades.keys() ) {
//     console.log(keys);
// }

// for( let keys of ordenes.keys() ) {
//     console.log(keys);
// }