const father = document.getElementById('productGrid');
const containerCategory = document.querySelector('.containerCategory');
const URLApi = "http://localhost:8082/api-proyecto/productos";
const URLImg = "http://localhost:8082/api-proyecto/img?imageRootName=";
let btnSiguiente = document.getElementById('btnSiguiente');
let btnAnterior = document.getElementById('btnAnterior');
let pageIndicator = document.getElementById('pageIndicator');
let page = 0;
let totalPage;
let currentPage;
let urlToFetch;

const requestOptions = {
    method: "GET",
    mode: "cors"
};

let cargarArticulos = async () => {
    await fetch(urlToFetch, requestOptions)
        .then(response => response.json())
        .then(datos => {
            totalPage = datos.totalPages;
            currentPage = datos.number;
            let articulos = datos.content;
            const fragmento = document.createDocumentFragment();
            father.innerHTML = '';

            articulos.forEach(element => {
                const createElement = document.createElement('div');
                createElement.className = 'card'; // Cambiado a card
                createElement.innerHTML = `
                    <div class="product">
                        <img class="imgProducto" src="${URLImg + element.imagen}" alt="imagen">
                        <div class="product-info">
                            <p class="nombre">${element.nombre}</p>
                            <p class="descripcion">${element.descripcion}</p>
                            <p class="precio">Precio:₡${element.precio}</p>
                            <p class="cantidad">Cantidad:${element.cantidad}</p>
                            <button class="comprar-btn" data-product-id="${element.id}">Agregar al carrito</button>
                        </div>
                    </div>`;

                fragmento.appendChild(createElement);
            });

            father.appendChild(fragmento);
            pageIndicator.innerHTML = `Página ${currentPage + 1} de ${totalPage}`;
        })
        .catch(error => {
            console.log(error);
        });
};


btnSiguiente.addEventListener('click', function () {
    if (currentPage + 1 < totalPage) {
        page++;
        urlToFetch = URLApi + '?' + 'page=' + page;
        cargarArticulos();
        pageIndicator.innerHTML = `Página ${currentPage + 1} de ${totalPage}`;
    } else {
        alert('Ha llegado a la última página');
    }
});

btnAnterior.addEventListener('click', function () {
    if (currentPage > 0) {
        page--;
        urlToFetch = URLApi + '?' + 'page=' + page;
        cargarArticulos();
        pageIndicator.innerHTML = `Página ${currentPage + 1} de ${totalPage}`;
    } else {
        alert('Ha llegado a la primera página');
    }
});

// Cargar productos al inicio
urlToFetch = URLApi + '?' + 'page=' + page;
cargarArticulos();


//logica del carrito de compras//
const carritoEmergentes = document.getElementById("carritoEmergentes");
const popup = document.getElementById("popup");
const carritoContenido = document.getElementById("carritoContenido");

carritoEmergentes.addEventListener("click", () => {
    actualizarPopup();
    togglePopup();
});

const cerrarPopup = () => {
    popup.style.display = "none";
};

const togglePopup = () => {
    if (popup.style.display === "flex") {
        popup.style.display = "none";
    } else {
        popup.style.display = "flex";
    }
};

const actualizarPopup = () => {
    // Limpiar el contenido actual del carrito
    carritoContenido.innerHTML = "";

    // Agregar elementos al carrito (puedes personalizar esto según tus necesidades)
    agregarElementoAlCarrito("Producto 1", 10);
    agregarElementoAlCarrito("Producto 2", 20);
    // ... más elementos ...
};

const agregarElementoAlCarrito = (nombre, precio) => {
    const elemento = document.createElement("div");
    elemento.className = "itemCarrito";
    elemento.innerHTML = `<span>${nombre} - $${precio}</span>
                          <button class="comprarItem" onclick="comprarElemento('${nombre}', ${precio})">Comprar</button>
                          <button class="eliminarItem" onclick="eliminarElemento('${nombre}')">Eliminar</button>`;
    carritoContenido.appendChild(elemento);
};

const comprarElemento = (nombre, precio) => {
    // Lógica para comprar el elemento (puedes personalizar esto según tus necesidades)
    console.log(`Comprar ${nombre} por $${precio}`);
};

const eliminarElemento = (nombre) => {
    // Lógica para eliminar el elemento del carrito (puedes personalizar esto según tus necesidades)
    console.log(`Eliminar ${nombre} del carrito`);
    actualizarPopup(); // Actualizar la vista después de eliminar un elemento
};

document.addEventListener("DOMContentLoaded", () => {
    const closeButton = document.querySelector(".popup-content button");
    if (closeButton) {
        closeButton.addEventListener("click", cerrarPopup);
    }
});