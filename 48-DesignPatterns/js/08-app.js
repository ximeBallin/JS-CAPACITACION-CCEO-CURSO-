function Vendedor(nombre) {
    this.nombre = nombre;
    this.sala = null;
}

Vendedor.prototype = {
    oferta: (articulo, precio) => {
        console.log(`Tenemos el siguiente artículo ${articulo}, iniciamos con un precio de $${precio}`);
    },
    vendido: comprador => {
        console.log(`Vendido a ${comprador}`);
    }
}

function Comprador(nombre) {
    this.nombre = nombre;
    this.sala = null;
}

Comprador.prototype = {
    oferta: (cantidad, comprador) => {
        console.log(`${comprador.nombre} : ${cantidad}`);
    }
}

function Subasta() {
    let compradores = [];
    return {
        registrar: usuario => {
            compradores.push(usuario);
            usuario.sala = this;
        },
        oferta: (articulo, precio, vendedor) => {
            vendedor.oferta(articulo, precio);
            compradores.forEach(comprador => {
                if(comprador !== vendedor) {
                    comprador.oferta(precio, vendedor);
                }
            });
        }
    }
}

// Ejemplo de uso
const subasta = new Subasta();
const vendedor = new Vendedor('Juan Vendedor');
const comprador1 = new Comprador('Pablo');
const comprador2 = new Comprador('Karen');

subasta.registrar(vendedor);
subasta.registrar(comprador1);
subasta.registrar(comprador2);

subasta.oferta('Guitarra Fender', 800, vendedor);