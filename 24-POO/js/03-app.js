class Cliente{
    constructor(nombre, saldo){
        this.nombre = nombre;
        this.saldo = saldo;
    }

    mostrarInformacion() {
        return `Cliente: ${this.nombre}, tu saldo es de ${this.saldo}`;
    }

    static bienvenida() {
        return `Bienvenido al cajero`;
    }

}

//Herencia
class Empresa extends Cliente {
    constructor(nombre, saldo, telefono, tipo) {
        super(nombre, saldo);
        this.telefono = telefono;
        this.tipo = tipo;
    }   
}

const juan = new Cliente('Juan', 500);
const empresa = new Empresa('Udemy', 1000000, 123456789, 'Educación');  
console.log(empresa.mostrarInformacion());
console.log(empresa.bienvenida());

