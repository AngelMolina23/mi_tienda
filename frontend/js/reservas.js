const RESERVAS_API_URL = "http://127.0.0.1:8000/api";

const reservaForm = document.getElementById("reservaForm");

if(reservaForm){

    reservaForm.addEventListener("submit", async function(e){

        e.preventDefault();

        const token = localStorage.getItem("access");

        if(!token){

            alert("Debes iniciar sesión para reservar.");

            window.location.href = "login.html";

            return;
        }

        const submitButton = reservaForm.querySelector("button[type='submit']");

        const reserva = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            event_date: document.getElementById("event_date").value,
            event_type: document.getElementById("event_type").value,
            details: document.getElementById("details").value.trim()
        };

        if(
            !reserva.name ||
            !reserva.email ||
            !reserva.phone ||
            !reserva.event_date ||
            !reserva.event_type ||
            !reserva.details
        ){

            alert("Completa todos los campos.");
            return;

        }

        try{

            if(submitButton){

                submitButton.disabled = true;

                submitButton.innerHTML =
                '<i class="fas fa-spinner fa-spin"></i> Enviando...';

            }

            const response = await fetch(`${RESERVAS_API_URL}/events/reservations/`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },

                body: JSON.stringify(reserva)

            });

            const data = await response.json();

            console.log(data);

            if(response.ok){

                alert("Reserva enviada correctamente.");

                reservaForm.reset();

            }else{

                alert("No se pudo enviar la reserva. Revisa los datos.");

            }

        }catch(error){

            console.error(error);

            alert("Error al conectar con el servidor.");

        }finally{

            if(submitButton){

                submitButton.disabled = false;

                submitButton.innerHTML =
                '<i class="fas fa-calendar-check"></i> Solicitar Reserva';

            }

        }

    });

}