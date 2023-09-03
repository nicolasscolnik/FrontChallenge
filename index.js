document.getElementById('miFormulario').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evitar que el formulario se envíe
    breadcrumbItems = []; // Limpiar el breadcrumb
    // Obtener el valor del campo de texto
    const query = document.getElementById('query').value;

    // Llamar a la función para obtener y filtrar los resultados
    const filteredResults = await fetchAndFilterResults(query);

    // Redirigir a la página results.html con el array como parámetro
    const url = `results.html?miArray=${encodeURIComponent(JSON.stringify(filteredResults))}`;
    window.location.href = url;

});

async function fetchAndFilterResults(query) {
    try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            const filteredResults = data.results.slice(0, 4);
            return filteredResults;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error al obtener resultados de la API:", error);
        return [];
    }
}


function obtenerValorDeBusqueda() {
    // Obtener la URL actual
    const urlActual = window.location.href;

    // Buscar la cadena de consulta (query) en la URL
    const queryString = new URL(urlActual).search;

    // Obtener el valor del parámetro "search" de la cadena de consulta
    const urlSearchParams = new URLSearchParams(queryString);
    const valorDeBusqueda = urlSearchParams.get('search');

    return valorDeBusqueda || ''; // Devolver el valor de búsqueda o una cadena vacía si no se encuentra
}

// Función para generar el breadcrumb
function generarBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb.innerHTML = '';

    // Agrega el enlace "Volver al inicio"
    const volverAlInicio = document.createElement('li');
    volverAlInicio.classList.add('breadcrumb-item');
    volverAlInicio.innerHTML = '<a href="index.html">Volver al inicio</a>';
    breadcrumb.appendChild(volverAlInicio);

    // Obtiene la página actual del atributo "data-page"
    const currentPage = document.documentElement.getAttribute('data-page');

    // Agrega elementos adicionales según la página actual
    if (currentPage === 'results') {
        const resultados = document.createElement('li');
        resultados.classList.add('breadcrumb-item', 'active');
        resultados.textContent = 'Resultados';
        breadcrumb.appendChild(resultados);
    } else if (currentPage === 'product') {
        const resultados = document.createElement('li');
        resultados.classList.add('breadcrumb-item');
        resultados.innerHTML = '<a href="results.html">Resultados</a>';
        breadcrumb.appendChild(resultados);

        const producto = document.createElement('li');
        producto.classList.add('breadcrumb-item', 'active');
        producto.textContent = 'Detalle del Producto';
        breadcrumb.appendChild(producto);
    }
}


// Llamar a la función para generar el breadcrumb en cada página
generarBreadcrumb();



