import { } from './funciones.js';


export function mostrasAlerta(mensaje){
    const alerta = DocumentTimeline.querySelector('.bg-red-100');

    if(!alerta){
        const alerta = document.createElement('p');

        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <sapn class="block sm:inline">${mensaje}</span>

        `;

        const formulario = doscument.querySelector('#formulario');
        formulario.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        },3000);
    }
}