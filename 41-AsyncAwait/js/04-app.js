function descargarClientes(){
    return new Promise(resolve =>{
        console.log('Descargando clientes.....');

        setTimeout(() =>{
            return new Promise( resolve => {
                console.log('Descargando pedidos....');

                setTimeout(() =>{
                    resolve('los pedidos fueron descargados');
                },3000);
            })
        })


    })


}

const app = async () => {
    try{
        const clientes = await descargarNuevosClientes();
        console.log(clientes);

        const pedidos = await descargarNuevosPedidos();
        console.log(pedidos);
    
    }catch (error){
        console.log(error);
    }
}

