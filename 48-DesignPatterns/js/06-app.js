class Persona {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

class Cliente {
    constructor(nombre, email) {
        this.nombre = nombre;
        this.email = email;
    }
}

const funcionesPersona = {
    mostrarInformacion() {
        console.log(`Nombre Persona: ${this.nombre} Email: ${this.email}`);
    },
    mostrarNombre() {
        console.log(`Mi nombre es ${this.nombre}`);
    }
}

// Añadir funcionesPersona a la clase de Persona y Cliente (Mixin Pattern)
Object.assign(Persona.prototype, funcionesPersona);
Object.assign(Cliente.prototype, funcionesPersona);

const persona = new Persona('Juan', 'correo@correo.com');
console.log(persona);
persona.mostrarInformacion();
persona.mostrarNombre();

const cliente = new Cliente('Pedro', 'pedro@correo.com');
console.log(cliente);
cliente.mostrarInformacion();
cliente.mostrarNombre();