// Agregar nombre y apellido como llaves del objeto
persona[nombre] = 'Juan';
persona[apellido] = 'De la torre';
persona.tipoCliente = 'Premium';
persona.saldo = 500

console.log(persona);
// console.log(persona[nombre]);

// Las propiedades que utilizan un symbol no son iterables
for (let i in persona) {
    console.log(i);
}


// Definir una descripción del symbol
const nombreCliente = Symbol('Nombre del Cliente');
const cliente = {};

cliente[nombreCliente] = 'Juan';    
