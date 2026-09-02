function iniciarApp() {
    const selectCategorias = document.querySelector('#categorias');
    const resultado = document.querySelector('#resultado');

    if (selectCategorias) {
        selectCategorias.addEventListener('input', seleccionarCategoria);
        obtenerCategorias();
    }

    const favoritosDiv = document.querySelector('.favoritos');
    if (favoritosDiv) {
        obtenerFavoritos();
    }

    const modal = new bootstrap.Modal('#modal', {});

    function obtenerCategorias() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarCategorias(resultado.categories));
    }

    function mostrarCategorias(categorias = []) {
        categorias.forEach(categoria => {
            const { strCategory } = categoria;
            const option = document.createElement('option');
            option.value = strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option);
        });
    }

    function seleccionarCategoria(e) {
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetas(resultado.meals));
    }

    function mostrarRecetas(recetas = []) {
        limpiarHTML(resultado);

        const heading = document.createElement('h2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = recetas.length ? 'Resultados' : 'No hay resultados';
        resultado.appendChild(heading);

        recetas.forEach(receta => {
            const { idMeal, strMeal, strMealThumb } = receta;

            const contenedorReceta = document.createElement('div');
            contenedorReceta.classList.add('col-md-4', 'mb-4');

            const recetaCard = document.createElement('div');
            recetaCard.classList.add('card', 'h-100');

            const recetaImagen = document.createElement('img');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal}`;
            recetaImagen.src = strMealThumb ?? receta.image;

            const recetaCardBody = document.createElement('div');
            recetaCardBody.classList.add('card-body', 'd-flex', 'flex-column', 'justify-content-between');

            const recetaHeading = document.createElement('h5');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal;

            const recetaButton = document.createElement('button');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100', 'mt-auto');
            recetaButton.textContent = 'Ver Receta';
            recetaButton.onclick = function() {
                seleccionarReceta(idMeal);
            }

            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            contenedorReceta.appendChild(recetaCard);

            resultado.appendChild(contenedorReceta);
        });
    }

    function seleccionarReceta(id) {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0]));
    }

    function mostrarRecetaModal(receta) {
        const { idMeal, strMeal, strInstructions, strMealThumb } = receta;

        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');

        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
            <img class="img-fluid rounded mb-4" src="${strMealThumb}" alt="receta ${strMeal}" />
            <h3 class="my-3">Instrucciones</h3>
            <p>${strInstructions}</p>
            <h3 class="my-3">Ingredientes y Cantidades</h3>
        `;

        const listGroup = document.createElement('ul');
        listGroup.classList.add('list-group');

        for (let i = 1; i <= 20; i++) {
            if (receta[`strIngredient${i}`]) {
                const ingrediente = receta[`strIngredient${i}`];
                const cantidad = receta[`strMeasure${i}`];

                const ingredienteLi = document.createElement('li');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;

                listGroup.appendChild(ingredienteLi);
            }
        }

        modalBody.appendChild(listGroup);

        const modalFooter = document.querySelector('.modal-footer');
        limpiarHTML(modalFooter);

        const btnFavorito = document.createElement('button');
        btnFavorito.classList.add('btn', 'col', existsStorage(idMeal) ? 'btn-warning' : 'btn-danger');
        btnFavorito.textContent = existsStorage(idMeal) ? 'Eliminar Favorito' : 'Guardar Favorito';

        btnFavorito.onclick = function() {
            if (existsStorage(idMeal)) {
                eliminarFavorito(idMeal);
                btnFavorito.textContent = 'Guardar Favorito';
                btnFavorito.classList.remove('btn-warning');
                btnFavorito.classList.add('btn-danger');
                mostrarToast('Eliminado correctamente');
                return;
            }

            agregarFavorito({
                id: idMeal,
                titulo: strMeal,
                image: strMealThumb
            });
            btnFavorito.textContent = 'Eliminar Favorito';
            btnFavorito.classList.remove('btn-danger');
            btnFavorito.classList.add('btn-warning');
            mostrarToast('Agregado correctamente');
        }

        const btnCerrarModal = document.createElement('button');
        btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');
        btnCerrarModal.textContent = 'Cerrar';
        btnCerrarModal.onclick = function() {
            modal.hide();
        }

        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrarModal);

        modal.show();
    }

    function agregarFavorito(receta) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
    }

    function eliminarFavorito(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
        
        if (window.location.pathname.includes('favoritos.html')) {
            obtenerFavoritos();
        }
    }

    function existsStorage(id) {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(favorito => favorito.id === id);
    }

    function mostrarToast(mensaje) {
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');
        toastBody.textContent = mensaje;
        const toast = new bootstrap.Toast(toastDiv);
        toast.show();
    }

    function obtenerFavoritos() {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        if (favoritos.length) {
            mostrarRecetas(favoritos);
            return;
        }

        const noFavoritos = document.createElement('p');
        noFavoritos.textContent = 'No hay favoritos aún';
        noFavoritos.classList.add('fs-4', 'text-center', 'font-bold', 'mt-5');
        resultado.appendChild(noFavoritos);
    }

    function limpiarHTML(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded', iniciarApp);