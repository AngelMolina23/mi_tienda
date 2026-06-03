const PRODUCTS_API_URL = "http://127.0.0.1:8000/api";
const PRODUCTS_BACKEND_URL = "http://127.0.0.1:8000";

const productsContainer = document.getElementById("productsContainer");

async function cargarProductos() {

    const token = localStorage.getItem("access");

    if (!productsContainer) {
        return;
    }

    if (!token) {

        productsContainer.innerHTML = `
            <div class="card">
                <h3>Debes iniciar sesión</h3>
                <p>Para ver la tienda y agregar productos al carrito, inicia sesión.</p>
                <a href="login.html">
                    <button class="btn-neon">Iniciar Sesión</button>
                </a>
            </div>
        `;

        return;
    }

    try {

        const response = await fetch(`${PRODUCTS_API_URL}/products/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        if (!response.ok) {
            throw new Error("No se pudieron cargar los productos.");
        }

        const products = await response.json();

        productsContainer.innerHTML = "";

        if (!Array.isArray(products) || products.length === 0) {

            productsContainer.innerHTML = `
                <div class="card">
                    <h3>No hay productos disponibles</h3>
                    <p>Por ahora no hay productos activos en la tienda.</p>
                </div>
            `;

            return;
        }

        products.forEach(product => {

            const card = document.createElement("div");
            card.classList.add("product-card");

            let imageUrl =
                "https://placehold.co/400x250/05010f/ff00b7?text=DJ+GUSTAVO";

            if (product.image_url) {

                imageUrl = product.image_url;

            } else if (product.image) {

                if (product.image.startsWith("http")) {
                    imageUrl = product.image;
                } else {
                    imageUrl = `${PRODUCTS_BACKEND_URL}${product.image}`;
                }
            }

            const price = Number(product.price).toFixed(2);
            const stock = Number(product.stock);

            const stockText =
                stock > 0
                    ? `Stock: ${stock}`
                    : "Sin stock";

            const disabledButton =
                stock > 0
                    ? ""
                    : "disabled";

            const buttonText =
                stock > 0
                    ? `<i class="fas fa-cart-plus"></i> Agregar al carrito`
                    : `<i class="fas fa-ban"></i> Sin stock`;

            card.innerHTML = `
                <img
                    src="${imageUrl}"
                    alt="${product.name}"
                    class="product-image"
                    onerror="this.src='https://placehold.co/400x250/05010f/ff00b7?text=DJ+GUSTAVO'">

                <h3>${product.name}</h3>

                <p>${product.description || "Producto profesional para DJ."}</p>

                <h4>$${price} MXN</h4>

                <p>${stockText}</p>

                <button
                    class="btn-neon"
                    ${disabledButton}
                    onclick="agregarAlCarrito(${product.id}, this)">
                    ${buttonText}
                </button>
            `;

            productsContainer.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        productsContainer.innerHTML = `
            <div class="card">
                <h3>Error al cargar productos</h3>
                <p>Verifica que el backend esté encendido y que tu sesión siga activa.</p>
            </div>
        `;
    }
}

async function agregarAlCarrito(productId, button) {

    const token = localStorage.getItem("access");

    if (!token) {

        alert("Debes iniciar sesión para agregar productos al carrito.");
        window.location.href = "login.html";

        return;
    }

    try {

        if (button) {
            button.disabled = true;
            button.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Agregando...';
        }

        const response = await fetch(`${PRODUCTS_API_URL}/cart/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token
            },
            body: JSON.stringify({
                product: productId,
                quantity: 1
            })
        });

        const data = await response.json();

        if (response.ok) {

            alert("Producto agregado al carrito.");

            if (button) {

                button.innerHTML =
                    '<i class="fas fa-check"></i> Agregado';

                setTimeout(() => {

                    button.disabled = false;

                    button.innerHTML =
                        '<i class="fas fa-cart-plus"></i> Agregar al carrito';

                }, 1200);
            }

        } else {

            console.log(data);

            alert("No se pudo agregar al carrito.");

            if (button) {

                button.disabled = false;

                button.innerHTML =
                    '<i class="fas fa-cart-plus"></i> Agregar al carrito';
            }
        }

    } catch (error) {

        console.error(error);

        alert("Error al conectar con el servidor.");

        if (button) {

            button.disabled = false;

            button.innerHTML =
                '<i class="fas fa-cart-plus"></i> Agregar al carrito';
        }
    }
}

cargarProductos();