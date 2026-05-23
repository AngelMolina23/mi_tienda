// BOTON VOLVER ARRIBA

const topBtn = document.getElementById("topBtn");

if(topBtn){

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}


// EFECTO NAVBAR

const navbar =
document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if(navbar){

        navbar.classList.toggle(
            "active",
            window.scrollY > 50
        );

    }

});