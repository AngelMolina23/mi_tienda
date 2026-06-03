// CONFIGURACION

const API_URL = "http://127.0.0.1:8000/api";


// BOTON VOLVER ARRIBA

const topBtn = document.getElementById("topBtn");

if(topBtn){

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// EFECTO NAVBAR

const navbar = document.querySelector(".navbar");

if(navbar){

    window.addEventListener("scroll", () => {

        navbar.classList.toggle(
            "active",
            window.scrollY > 50
        );

    });

}


// ELEMENTOS DE SESION

const loginItem = document.getElementById("loginItem");
const logoutItem = document.getElementById("logoutItem");
const userItem = document.getElementById("userItem");
const usernameDisplay = document.getElementById("usernameDisplay");

function mostrarLogin(){

    if(loginItem){
        loginItem.style.display = "block";
    }

    if(logoutItem){
        logoutItem.style.display = "none";
    }

    if(userItem){
        userItem.style.display = "none";
    }

    if(usernameDisplay){
        usernameDisplay.textContent = "";
    }

}

function mostrarUsuario(username){

    if(loginItem){
        loginItem.style.display = "none";
    }

    if(logoutItem){
        logoutItem.style.display = "block";
    }

    if(userItem){
        userItem.style.display = "block";
    }

    if(usernameDisplay){
        usernameDisplay.textContent = `Hola ${username}`;
    }

}

async function verificarSesion(){

    const token = localStorage.getItem("access");

    if(!token){

        mostrarLogin();

        return;
    }

    try{

        const response = await fetch(`${API_URL}/profile/`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        if(!response.ok){

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            mostrarLogin();

            return;
        }

        const data = await response.json();

        if(data && data.username){

            mostrarUsuario(data.username);

        }else{

            localStorage.removeItem("access");
            localStorage.removeItem("refresh");

            mostrarLogin();

        }

    }catch(error){

        console.error("Error al verificar sesión:", error);

        mostrarLogin();

    }

}

verificarSesion();


// CERRAR SESION

function logout(){

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    mostrarLogin();

    window.location.href = "index.html";

}