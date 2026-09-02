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

// Añadir funcionesPersona a la clase de Persona
Object.assign(Persona.prototype, funcionesPersona);
Object.assign(Cliente.prototype, funcionesPersona);

const cliente = new Persona('Juan', 'correo@correo.com');
cliente.mostrarInformacion();
cliente.mostrarNombre();

const cliente2 = new Cliente('Karen', 'karen@correo.com');
cliente2.mostrarInformacion();
cliente2.mostrarNombre();