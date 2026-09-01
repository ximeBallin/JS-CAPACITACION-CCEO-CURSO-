document.addEventListener('DOMContentLoaded', function() {
    crmDB();

});

function crmDB() {
    //Crear base de datos version 1
    let crmDB = window.indexedDB.open('crm', 1);    

    //Si hay un error
    crmDB.onerror = function() {
        console.log('Hubo un error a la hora de crear la base de datos');
    }

    //Si se creo bien
    crmDB.onsuccess = function() {
        console.log('Base de datos creada correctamente');
    }

    //Configuracion de la base de datos 
    crmDB.onupgradeneeded = function(e) {
        console.log(e.target.result);

        const objectStore = db.createObjectStore('crm', {
            keyPath: 'crm',
            autoIncrement: true
        });


        //Definir columnas
        objectStore.createIndex('nombre', 'nombre', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
        objectStore.createIndex('telefono', 'telefono', { unique: false });
        objectStore.createIndex('empresa', 'empresa', { unique: false });
        objectStore.createIndex('id', 'id', { unique: true });  

        console.log('Columnas creadas correctamente');


    }

}

let transaction = DB.transaction(['crm'], 'readwrite');

transaction.oncomplete = function() {
    console.log('Transacción Completada');
}

transaction.onerror = function() {
    console.log('Hubo un error en la transacción');
}

const objectStore = transaction.objectStore('crm');

const nuevoCliente = {
    telefono: 19009120,
    nombre: 'Juan',
    email: 'correo@correo.com'
}

   