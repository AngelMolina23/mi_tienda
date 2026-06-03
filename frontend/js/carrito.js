const CART_API_URL = "http://127.0.0.1:8000/api";

const cartContainer = document.getElementById("cartContainer");
const cartTotal = document.getElementById("cartTotal");

async function cargarCarrito(){

    const token = localStorage.getItem("access");

    if(!cartContainer || !cartTotal){
        return;
    }

    if(!token){

        cartContainer.innerHTML = `
            <div class="card">
                <h3>Debes iniciar sesión</h3>
                <p>Inicia sesión para ver tu carrito.</p>
                <a href="login.html">
                    <button class="btn-neon">Iniciar Sesión</button>
                </a>
            </div>
        `;

        cartTotal.textContent = "Total: $0 MXN";

        return;
    }

    try{

        const response = await fetch(`${CART_API_URL}/cart/`, {
            headers:{
                Authorization: "Bearer " + token
            }
        });

        if(!response.ok){
            throw new Error("No se pudo cargar el carrito.");
        }

        const items = await response.json();

        console.log("Carrito:", items);

        cartContainer.innerHTML = "";

        let total = 0;

        if(!Array.isArray(items) || items.length === 0){

            cartContainer.innerHTML = `
                <div class="card">
                    <h3>Tu carrito está vacío</h3>
                    <p>Agrega productos desde la tienda.</p>
                    <a href="productos.html">
                        <button class="btn-neon">Ir a la tienda</button>
                    </a>
                </div>
            `;

            cartTotal.textContent = "Total: $0 MXN";

            return;
        }

        items.forEach(item => {

            const productName =
            item.product_name ||
            item.name ||
            item.product?.name ||
            "Producto sin nombre";

            const productPrice = Number(
                item.product_price ||
                item.price ||
                item.product?.price ||
                0
            );

            const quantity = Number(
                item.quantity ||
                item.cantidad ||
                1
            );

            const subtotal = Number(
                item.subtotal ||
                item.total ||
                productPrice * quantity
            );

            total += subtotal;

            const div = document.createElement("div");

            div.classList.add("cart-item");

            div.innerHTML = `
                <div>
                    <h3>${productName}</h3>
                    <p>Precio: $${productPrice.toFixed(2)} MXN</p>
                    <p>Subtotal: $${subtotal.toFixed(2)} MXN</p>
                </div>

                <div class="cart-actions">

                    <input
                    type="number"
                    min="1"
                    value="${quantity}"
                    onchange="actualizarCantidad(${item.id}, this.value)">

                    <button class="btn-outline" onclick="eliminarProducto(${item.id}, this)">
                        <i class="fas fa-trash"></i>
                        Eliminar
                    </button>

                </div>
            `;

            cartContainer.appendChild(div);

        });

        cartTotal.textContent = `Total: $${total.toFixed(2)} MXN`;

    }catch(error){

        console.error(error);

        cartContainer.innerHTML = `
            <div class="card">
                <h3>Error al cargar carrito</h3>
                <p>Verifica que el backend esté encendido y que tu sesión siga activa.</p>
            </div>
        `;

        cartTotal.textContent = "Total: $0 MXN";
    }

}

async function actualizarCantidad(itemId, quantity){

    const token = localStorage.getItem("access");

    if(!token){
        alert("Debes iniciar sesión.");
        window.location.href = "login.html";
        return;
    }

    if(Number(quantity) < 1){
        alert("La cantidad debe ser mínimo 1.");
        cargarCarrito();
        return;
    }

    try{

        const response = await fetch(`${CART_API_URL}/cart/${itemId}/`, {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization:"Bearer " + token
            },
            body:JSON.stringify({
                quantity:Number(quantity)
            })
        });

        if(!response.ok){
            throw new Error("No se pudo actualizar la cantidad.");
        }

        cargarCarrito();

    }catch(error){

        console.error(error);
        alert("No se pudo actualizar la cantidad.");
        cargarCarrito();

    }

}

async function eliminarProducto(itemId, button){

    const token = localStorage.getItem("access");

    if(!token){
        alert("Debes iniciar sesión.");
        window.location.href = "login.html";
        return;
    }

    try{

        if(button){
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Eliminando...';
        }

        const response = await fetch(`${CART_API_URL}/cart/${itemId}/`, {
            method:"DELETE",
            headers:{
                Authorization:"Bearer " + token
            }
        });

        if(!response.ok){
            throw new Error("No se pudo eliminar el producto.");
        }

        cargarCarrito();

    }catch(error){

        console.error(error);
        alert("No se pudo eliminar el producto.");

        if(button){
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-trash"></i> Eliminar';
        }

    }

}

async function hacerCheckout(){

    const token = localStorage.getItem("access");

    if(!token){

        alert("Debes iniciar sesión.");
        window.location.href = "login.html";
        return;

    }

    try{

        const response = await fetch(`${CART_API_URL}/checkout/`, {
            method:"POST",
            headers:{
                Authorization:"Bearer " + token
            }
        });

        const data = await response.json();

        if(response.ok){

            alert("Compra realizada correctamente.");

            cargarCarrito();

        }else{

            console.log(data);

            alert("No se pudo finalizar la compra.");

        }

    }catch(error){

        console.error(error);

        alert("Error al conectar con el servidor.");

    }

}

cargarCarrito();