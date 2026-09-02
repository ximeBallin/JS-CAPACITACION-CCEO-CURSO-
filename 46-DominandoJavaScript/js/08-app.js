self.onload = () =>{
    console.log('ventana lista')
}

window.nombre= 'Monitoe 20 Pulgadas';

const producto = {
    precio:30,
    sisponible:true,
    mostrarInfo: function (){
        return `El producto: ${self.nombre}`
    }
}

console.log(producto.mostrarInfo);