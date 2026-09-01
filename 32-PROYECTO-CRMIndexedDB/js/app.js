(function() {
    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        // Si la base de datos está lista, cargar los clientes
        if (window.indexedDB.open('crm', 1)) {
            obtenerClientes();
        }
    });

    // Crea la base de datos de IndexedDB
    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function() {
            console.log('Hubo un error al crear la base de datos');
        };

        crearDB.onsuccess = function() {
            DB = crearDB.result;
        };

        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true });

            objectStore.createIndex('nombre', 'nombre', { unique: false });
            objectStore.createIndex('email', 'email', { unique: true });
            objectStore.createIndex('telefono', 'telefono', { unique: false });
            objectStore.createIndex('empresa', 'empresa', { unique: false });
            objectStore.createIndex('id', 'id', { unique: true });

            console.log('DB Lista y Creada');
        };
    }

    function obtenerClientes() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = function(e) {
                const cursor = e.target.result;

                if (cursor) {
                    const { nombre, telefono, empresa, email, id } = cursor.value;

                    listadoClientes.innerHTML += `
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 font-bold"> ${nombre} </p>
                                <p class="text-sm leading-5 text-gray-500"> ${email} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-sm leading-5 text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 leading-5 text-gray-700">
                                <p class="text-sm leading-5 text-gray-700">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <svg data-cliente="${id}" class="text-red-600 hover:text-red-900 cursor-pointer eliminar" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                            </td>
                        </tr>
                    `;

                    cursor.continue();
                } else {
                    console.log('No hay más registros...');
                }
            };
        };
    }
})();