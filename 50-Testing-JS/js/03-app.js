// Probar 2 valores

function suma(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

async function sumaAsync(a, b) {
    return Promise.resolve( suma(a, b) );
}

let resultado = suma(1, 2);
let esperado = 3;

expected(esperado).toBe(resultado);

resultado = restar(10, 5);
esperado = 5;

expected(esperado).toBe(resultado);

expected(esperado).toEqual(resultado);

test('Suma 10 + 20 y el resultado debe ser 30', async () => {
    const resultado = await sumaAsync(10, 20);
})