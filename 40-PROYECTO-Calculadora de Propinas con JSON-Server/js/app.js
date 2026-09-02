let cliente = {
    mesa: '',
    hora: '',
    pedido: []
};

const categorias = {
    1: 'Comida',
    2: 'Bebidas',
    3: 'Postres'
};

const btnGuardarCliente = document.querySelector('#guardar-cliente');
if (btnGuardarCliente) {
    btnGuardarCliente.addEventListener('click', guardarCliente);
}

function guardarCliente() {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    const camposVacios = [mesa, hora].some(campo => campo === '');

    if (camposVacios) {
        const existeAlerta = document.querySelector('.invalid-feedback');
        if (!existeAlerta) {
            const alerta = document.createElement('div');
            alerta.classList.add('invalid-feedback', 'd-block', 'text-center');
            alerta.textContent = 'Todos los campos son obligatorios';
            document.querySelector('.modal-body form').appendChild(alerta);

            setTimeout(() => {
                alerta.remove();
            }, 3000);
        }
        return;
    }

    cliente = { ...cliente, mesa, hora };

    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
    modalBootstrap.hide();

    mostrarSecciones();
    obtenerPlatillos();
}

function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion => seccion.classList.remove('d-none'));
}

function obtenerPlatillos() {
    const url = 'http://localhost:4000/platillos';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error));
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido');

    platillos.forEach(platillo => {
        const { id, nombre, precio, categoria } = platillo;

        const row = document.createElement('div');
        row.classList.add('row', 'py-3', 'border-bottom');

        const colNombre = document.createElement('div');
        colNombre.classList.add('col-md-4');
        colNombre.textContent = nombre;

        const colPrecio = document.createElement('div');
        colPrecio.classList.add('col-md-3', 'fw-bold');
        colPrecio.textContent = `$${precio}`;

        const colCategoria = document.createElement('div');
        colCategoria.classList.add('col-md-3');
        colCategoria.textContent = categorias[categoria];

        const colInput = document.createElement('div');
        colInput.classList.add('col-md-2');
        
        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.min = 0;
        inputCantidad.value = 0;
        inputCantidad.id = `producto-${id}`;
        inputCantidad.classList.add('form-control');

        inputCantidad.onchange = function() {
            const cantidad = parseInt(inputCantidad.value);
            agregarPlatillo({ ...platillo, cantidad });
        };

        colInput.appendChild(inputCantidad);

        row.appendChild(colNombre);
        row.appendChild(colPrecio);
        row.appendChild(colCategoria);
        row.appendChild(colInput);

        contenido.appendChild(row);
    });
}

function agregarPlatillo(producto) {
    let { pedido } = cliente;

    if (producto.cantidad > 0) {
        if (pedido.some(articulo => articulo.id === producto.id)) {
            const pedidoActualizado = pedido.map(articulo => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad;
                }
                return articulo;
            });
            cliente.pedido = [...pedidoActualizado];
        } else {
            cliente.pedido = [...pedido, producto];
        }
    } else {
        const resultado = pedido.filter(articulo => articulo.id !== producto.id);
        cliente.pedido = [...resultado];
    }

    limpiarHTML();

    if (cliente.pedido.length) {
        actualizarResumen();
    } else {
        (mensaje)=>{
            const mensaje = document.createElement('p');
            mensaje.classList.add('text-center');
            mensaje.textContent = 'Añade los elementos del pedido aquí';
            document.querySelector('#resumen').appendChild(mensaje);
        }
    }
}

function actualizarResumen() {
    const resumen = document.querySelector('#resumen .contenido');

    const tabla = document.createElement('table');
    tabla.classList.add('table', 'table-striped', 'table-bordered');

    const cabecera = document.createElement('thead');
    cabecera.innerHTML = `
        <tr>
            <th>Platillo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Eliminar</th>
        </tr>
    `;

    const tbody = document.createElement('tbody');

    const { pedido } = cliente;
    pedido.forEach(articulo => {
        const { id, nombre, precio, cantidad } = articulo;

        const renglon = document.createElement('tr');

        const nombreEl = document.createElement('td');
        nombreEl.textContent = nombre;

        const precioEl = document.createElement('td');
        precioEl.textContent = `$${precio}`;

        const cantidadEl = document.createElement('td');
        cantidadEl.textContent = cantidad;

        const subtotalEl = document.createElement('td');
        subtotalEl.textContent = `$${precio * cantidad}`;

        const btnEliminar = document.createElement('button');
        btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = function() {
            eliminarProducto(id);
        };

        const eliminarEl = document.createElement('td');
        eliminarEl.appendChild(btnEliminar);

        renglon.appendChild(nombreEl);
        renglon.appendChild(precioEl);
        renglon.appendChild(cantidadEl);
        renglon.appendChild(subtotalEl);
        renglon.appendChild(eliminarEl);

        tbody.appendChild(renglon);
    });

    tabla.appendChild(cabecera);
    tabla.appendChild(tbody);
    resumen.appendChild(tabla);

    formularioPropinas();
}

function limpiarHTML() {
    const contenido = document.querySelector('#resumen .contenido');
    while (contenido.firstChild) {
        contenido.removeChild(contenido.firstChild);
    }
}

function eliminarProducto(id) {
    const { pedido } = cliente;
    cliente.pedido = pedido.filter(articulo => articulo.id !== id);

    limpiarHTML();

    if (cliente.pedido.length) {
        actualizarResumen();
    } else {
        const mensaje = document.createElement('p');
        mensaje.classList.add('text-center');
        mensaje.textContent = 'Añade los elementos del pedido aquí';
        document.querySelector('#resumen').appendChild(mensaje);
    }

    const inputEl = document.querySelector(`#producto-${id}`);
    inputEl.value = 0;
}

function formularioPropinas() {
    const contenido = document.querySelector('#resumen .contenido');

    const formulario = document.createElement('div');
    formulario.classList.add('col-md-6', 'formulario', 'bg-white', 'py-3', 'px-4', 'shadow', 'rounded');

    const divPropinas = document.createElement('div');
    divPropinas.classList.add('opciones-propina');

    const heading = document.createElement('h3');
    heading.classList.add('my-4', 'text-center');
    heading.textContent = 'Propina';

    const radio10 = document.createElement('input');
    radio10.type = 'radio';
    radio10.name = 'propina';
    radio10.value = "10";
    radio10.classList.add('form-check-input');
    radio10.onclick = calcularPropina;

    const radio10Label = document.createElement('label');
    radio10Label.textContent = '10%';
    radio10Label.classList.add('form-check-label');

    const radio10Div = document.createElement('div');
    radio10Div.classList.add('form-check');
    radio10Div.appendChild(radio10);
    radio10Div.appendChild(radio10Label);

    const radio25 = document.createElement('input');
    radio25.type = 'radio';
    radio25.name = 'propina';
    radio25.value = "25";
    radio25.classList.add('form-check-input');
    radio25.onclick = calcularPropina;

    const radio25Label = document.createElement('label');
    radio25Label.textContent = '25%';
    radio25Label.classList.add('form-check-label');

    const radio25Div = document.createElement('div');
    radio25Div.classList.add('form-check');
    radio25Div.appendChild(radio25);
    radio25Div.appendChild(radio25Label);

    divPropinas.appendChild(heading);
    divPropinas.appendChild(radio10Div);
    divPropinas.appendChild(radio25Div);
    formulario.appendChild(divPropinas);
    contenido.appendChild(formulario);
}

function calcularPropina() {
    const { pedido } = cliente;
    let subtotal = 0;

    pedido.forEach(articulo => {
        subtotal += articulo.precio * articulo.cantidad;
    });

    const radioPropinaSeleccionada = document.querySelector('[name="propina"]:checked').value;

    const incremento = (subtotal * parseInt(radioPropinaSeleccionada)) / 100;

    const total = subtotal + incremento;

    mostrarTotalHTML(subtotal, total, incremento);
}

function mostrarTotalHTML(subtotal, total, incremento) {
    const totalDiv = document.createElement('div');
    totalDiv.classList.add('total-pagar', 'my-5');

    const subtotalParagraph = document.createElement('p');
    subtotalParagraph.classList.add('fs-4', 'fw-bold', 'mt-2');
    subtotalParagraph.textContent = `Subtotal Consumo: `;

    const subtotalSpan = document.createElement('span');
    subtotalSpan.classList.add('fw-normal');
    subtotalSpan.textContent = `$${subtotal}`;
    subtotalParagraph.appendChild(subtotalSpan);

    const propinaParagraph = document.createElement('p');
    propinaParagraph.classList.add('fs-4', 'fw-bold', 'mt-2');
    propinaParagraph.textContent = `Propina: `;

    const propinaSpan = document.createElement('span');
    propinaSpan.classList.add('fw-normal');
    propinaSpan.textContent = `$${incremento}`;
    propinaParagraph.appendChild(propinaSpan);

    const totalParagraph = document.createElement('p');
    totalParagraph.classList.add('fs-4', 'fw-bold', 'mt-2');
    totalParagraph.textContent = `Total a Pagar: `;

    const totalSpan = document.createElement('span');
    totalSpan.classList.add('fw-normal');
    totalSpan.textContent = `$${total}`;
    totalParagraph.appendChild(totalSpan);

    const totalPagar = document.querySelector('.total-pagar');
    if (totalPagar) {
        totalPagar.remove();
    }

    totalDiv.appendChild(subtotalParagraph);
    totalDiv.appendChild(propinaParagraph);
    totalDiv.appendChild(totalParagraph);

    const formulario = document.querySelector('.formulario');
    formulario.appendChild(totalDiv);
}