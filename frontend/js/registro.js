const API_URL = "http://127.0.0.1:8000/api";

const registroForm = document.getElementById("registroForm");

registroForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if(password !== confirmPassword){

        alert("Las contraseñas no coinciden.");
        return;

    }

    if(password.length < 8){

        alert("La contraseña debe tener al menos 8 caracteres.");
        return;

    }

    try{

        const response = await fetch(`${API_URL}/register/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                phone: phone
            })
        });

        const data = await response.json();

        if(response.ok){

            alert("Cuenta creada correctamente. Iniciando sesión...");

            const loginResponse = await fetch(`${API_URL}/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const loginData = await loginResponse.json();

            if(loginResponse.ok){

                localStorage.setItem("access", loginData.access);
                localStorage.setItem("refresh", loginData.refresh);

                window.location.href = "index.html";

            }else{

                window.location.href = "login.html";

            }

        }else{

            console.log(data);

            if(data.username){
                alert("Ese usuario ya existe.");
            }
            else if(data.email){
                alert("Ese correo ya está registrado.");
            }
            else{
                alert("No se pudo crear la cuenta. Revisa los datos.");
            }

        }

    }catch(error){

        console.error(error);

        alert("Error al conectar con el servidor.");
    }

});