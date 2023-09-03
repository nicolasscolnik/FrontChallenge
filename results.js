// Obtener el valor del parámetro 'miArray' de la URL
const urlParams = new URLSearchParams(window.location.search);
const miArrayParam = urlParams.get('miArray');

// Convierte la cadena de texto en un objeto o array
const miArrayObj = JSON.parse(decodeURIComponent(miArrayParam));

// Llama a la función para renderizar los resultados
renderResults(miArrayObj);
console.log(miArrayObj);

function renderResults(results) {
    const resultsContainer = document.getElementById("resultados");
    resultsContainer.innerHTML = "";
    if (results == null) {
        // Recupera la cadena JSON del almacenamiento local
        const arrayJSONRecuperado = localStorage.getItem('miArrayGuardado');

        // Convierte la cadena JSON de nuevo a un array
        results = JSON.parse(arrayJSONRecuperado);

        // Ahora, "miArrayRecuperado" contiene el array original
        console.log(results);
    }


    results.forEach(result => {
        // Crear un div container para cada producto
        const productContainer = document.createElement("div");
        productContainer.classList.add("product-container", "row");

        // Crear un div de 2 columnas para la imagen
        const thumbnailContainer = document.createElement("div");
        thumbnailContainer.classList.add("col-2", "product-thumbnail-container");
        const thumbnailLink = document.createElement("a");
        thumbnailLink.href = `product.html?id=${result.id}`;
        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = result.thumbnail;
        thumbnailImage.alt = result.title;
        thumbnailImage.classList.add("product-thumbnail");
        thumbnailLink.appendChild(thumbnailImage);
        thumbnailContainer.appendChild(thumbnailLink);

        // Crear un div de 6 columnas para la información
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("col-6");

        // Crear un div para el precio
        const priceDiv = document.createElement("div");
        priceDiv.classList.add("product-price");
        priceDiv.style.fontSize = "24px";
        priceDiv.style.textAlign = "left";
        priceDiv.textContent = `Precio: $${result.price}`;

        // Verificar si hay envío gratuito y agregar el icono del camión
        if (result.shipping && result.shipping.free_shipping) {
            const truckIcon = document.createElement("i");
            truckIcon.classList.add("fas", "fa-truck", "shipping-icon");
            priceDiv.appendChild(truckIcon);
        }

        // Crear un div para el título
        const titleDiv = document.createElement("div");
        titleDiv.style.fontSize = "18px";
        titleDiv.style.textAlign = "left";
        titleDiv.textContent = result.title;

        // Agregar el precio y el título al contenedor de información
        infoContainer.appendChild(priceDiv);
        infoContainer.appendChild(document.createElement("div")); // Espacio de 32px
        infoContainer.appendChild(titleDiv);

        // Crear un div para la ciudad
        const cityDiv = document.createElement("div");
        cityDiv.classList.add("col-4", "text-right", "product-city");
        cityDiv.style.fontSize = "12px";
        cityDiv.textContent = result.address.city_name;

        // Agregar los divs al producto container
        productContainer.appendChild(thumbnailContainer);
        productContainer.appendChild(infoContainer);
        productContainer.appendChild(cityDiv);

        // Agregar el producto container al contenedor de resultados
        resultsContainer.appendChild(productContainer);

        storeResults(results);
    });
}

function storeResults(results) {
    // Convierte el array a una cadena JSON
    const arrayJSON = JSON.stringify(results);

    // Almacena la cadena JSON en el almacenamiento local
    localStorage.setItem('miArrayGuardado', arrayJSON);
}