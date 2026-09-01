import {nombreCliente, ahorro, mostratInformacion, tieneSaldo, Cliente} from './cliente.js';    

console.log(nombreCliente);
console.log(ahorro);
console.log(mostratInformacion(nombreCliente, ahorro));
console.log(tieneSaldo(ahorro));    


export const ahorro = 200;

export function mostrarInfromacion(nombre, ahorro) {
    if(ahorro > 0) {
        console.log('Si tiene saldo')
    }else{
        console.log('El Cliente no tiene saldo')
    }
}

export class Cliente {
    constructor(nombre, ahorro) {
        this.nombre = nombre;
        this.ahorro = ahorro;
    }

    mostrarInfromacion() {
        return `Cliente: ${this.nombre}, Ahorro: ${this.ahorro}`;
    }   
}