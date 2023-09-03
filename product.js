// Obtén el ID del producto de la URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Función para cargar la descripción del producto desde la API

async function loadProductDescription(id) {
  try {
    // Hacer una solicitud a la API para obtener el producto
    const productResponse = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const productData = await productResponse.json();

    // Obtener el elemento HTML donde se mostrará la imagen y la descripción
    const productImage = document.querySelector(".product-image");
    const descriptionContainer = document.querySelector(".product-description");
    const productTitle = document.querySelector(".product-title");
    const productPrice = document.querySelector(".product-price"); // Agregado
    const productAttributes = document.querySelector(".product-attributes"); // Agregado

    // Mostrar la imagen del producto
    if (productData.thumbnail) {
      productImage.src = productData.thumbnail;
      productImage.alt = productData.title;
    } else {
      productImage.src = "";
      productImage.alt = "Imagen no disponible";
    }

    if (productData.title) {
      productTitle.textContent = productData.title;
    } else {
      productTitle.textContent = "Nombre del producto no disponible";
    }

    // Mostrar el precio del producto
    if (productData.price) {
      productPrice.textContent = `$${productData.price}`;
    } else {
      productPrice.textContent = "Precio no disponible";
    }

    // Construir el atributo "condition - sold_quantity"
    if (productData.condition && productData.sold_quantity) {
      productAttributes.textContent = `${productData.condition} - ${productData.sold_quantity} vendidos`;
    } else {
      productAttributes.textContent = "Atributos no disponibles";
    }

    // Hacer una solicitud adicional para obtener la descripción del producto
    const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${id}/description`);
    const descriptionData = await descriptionResponse.json();

    // Mostrar la descripción en la página
    if (descriptionData.plain_text) {
      descriptionContainer.textContent = descriptionData.plain_text;
    } else {
      descriptionContainer.textContent = "Descripción no disponible.";
    }
  } catch (error) {
    console.error("Error al obtener el producto y la descripción:", error);
  }
}

loadProductDescription(productId);
