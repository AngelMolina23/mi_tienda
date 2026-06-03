const API_URL = "http://127.0.0.1:8000/api";

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    const submitButton =
    loginForm.querySelector("button[type='submit']");

    if(!username || !password){

        alert("Completa todos los campos.");
        return;

    }

    try{

        submitButton.disabled = true;

        submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Iniciando...';

        const response = await fetch(`${API_URL}/token/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if(response.ok){

            localStorage.setItem(
                "access",
                data.access
            );

            localStorage.setItem(
                "refresh",
                data.refresh
            );

            alert(
                `Bienvenido ${username}`
            );

            window.location.href =
            "index.html";

        }else{

            console.log(data);

            alert(
                "Usuario o contraseña incorrectos."
            );

        }

    }catch(error){

        console.error(error);

        alert(
            "No se pudo conectar con el servidor."
        );

    }finally{

        submitButton.disabled = false;

        submitButton.innerHTML =
        '<i class="fas fa-right-to-bracket"></i> Iniciar Sesión';

    }

});