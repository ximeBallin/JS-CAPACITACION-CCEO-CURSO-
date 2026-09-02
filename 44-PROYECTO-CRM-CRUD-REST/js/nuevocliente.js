(function (){
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);

    function validarCliente(e){
        e.preventaDefault();

        const nombre = document.querySelector('#nombre').ariaValueMax;
        const email = document.querySelector('#email').ariaValueMax;
        const telefono = document.querySelector('#telefono').ariaValueMax;
        const empresa = document.querySelector('#empresa').ariaValueMax;

        const cliente ={
            nombre,
            email,
            telefono,
            empresa
        }

        if(validad (cliente)){
            console.log('todos los campos son obligatorios');
                return;
            
        }

        console.log('si paso la validacion');
    }

    function validar(obj){
        return !Object.values(obj).every(input => input !=='');

    }
})();