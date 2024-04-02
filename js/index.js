let contenedorProductos = document.getElementById("contenedorProductos");
let tarjetas = document.querySelectorAll('.carousel-inner .tarjetaCategoria');
let carouselItems = document.querySelectorAll('.carousel-inner .carousel-item');
let currentIndex = 0;
let intervalId;
let siguienteItem = document.getElementById("siguienteItem");
let anteriorItem = document.getElementById("anteriorItem");
let productos = [
    { 
        id: "CP1", 
        nombre: "Cojín Tenango", 
        imagen: "src/img/photo_2024-02-07_15-18-15 (2).jpg", 
        precio: 400.00 
    },
    { 
        id: "CP2", 
        nombre: "Cojines Chiapanecos", 
        imagen: "src/img/photo_2024-02-07_15-18-17.jpg", 
        precio: 300.00 
    },
    { 
        id: "CP3", 
        nombre: "Camino de Mesa", 
        imagen: "src/img/photo_2024-02-07_15-18-17 (2).jpg", 
        precio: 500.00 
    },
    { 
        id: "CP4", 
        nombre: "Sagrado Corazón", 
        imagen: "src/img/photo_2024-02-07_15-18-15 (3).jpg", 
        precio: 200.00 
    },
    { 
        id: "CP5", 
        nombre: "Blusa Oaxaqueña", 
        imagen: "src/img/photo_2024-02-07_18-45-03.jpg", 
        precio: 400.00 
    },
    { 
        id: "CP6", 
        nombre: "Cesto Tejido", 
        imagen: "src/img/photo_2024-02-07_18-45-12.jpg", 
        precio: 450.00 
    },
    { 
        id: "CP7", 
        nombre: "Alebrije", 
        imagen: "src/img/photo_2024-02-07_18-45-20.jpg", 
        precio: 250.00 
    },
    { 
        id: "CP8", 
        nombre: "Cazuela de Barro", 
        imagen: "src/img/photo_2024-02-07_18-45-24.jpg", 
        precio: 100.00 
    }
];

// Resto del código


function ajustarTarjetasVisibles() {
    if (window.innerWidth <= 425) {
        tarjetas.forEach(function(tarjeta, index) {
            tarjeta.style.display = index === currentIndex ? 'block' : 'none';
            if (currentIndex < 3) {
                carouselItems[0].classList.add("active");
                carouselItems[1].classList.remove("active");
            }
            if (currentIndex >= 3) {
                carouselItems[1].classList.add("active");
                carouselItems[0].classList.remove("active");
            }
        });
    } else {
        tarjetas.forEach(function(tarjeta) {
            tarjeta.style.display = '';
        });
    }
}

function handleNext() {
    clearInterval(intervalId);
    currentIndex = currentIndex === tarjetas.length - 1 ? 0 : currentIndex + 1;
    ajustarTarjetasVisibles();
    reiniciarMovimientoAutomatico();
}

function handlePrev() {
    clearInterval(intervalId);
    currentIndex = currentIndex === 0 ? tarjetas.length - 1 : currentIndex - 1;
    ajustarTarjetasVisibles();
    reiniciarMovimientoAutomatico();
}

function reiniciarMovimientoAutomatico() {
    clearInterval(intervalId);
    intervalId = setInterval(handleNext, 5000);
}

window.addEventListener('load', function() {
    ajustarTarjetasVisibles();
    reiniciarMovimientoAutomatico();
});

window.addEventListener('resize', ajustarTarjetasVisibles);

document.querySelector('.carousel-control-next').addEventListener('click', function(event) {
    event.preventDefault();
    handleNext();
    ajustarTarjetasVisibles();
    if (window.innerWidth > 425) {
        siguienteItem.click();
    }
});

document.querySelector('.carousel-control-prev').addEventListener('click', function(event) {
    event.preventDefault();
    handlePrev();
    ajustarTarjetasVisibles();
    if (window.innerWidth > 425) {
        anteriorItem.click();
    }
});

reiniciarMovimientoAutomatico();

// Event listener para los botones "Más información"
contenedorProductos.addEventListener('click', function(event) {
    if (event.target.classList.contains('irProducto')) {
        const idCarta = event.target.closest('.cardProducto').id;
        localStorage.setItem("productos", JSON.stringify(productos));
        localStorage.setItem("idCarta", idCarta);
        window.location.href = "productoIndividual.html"; 
    }
});

window.addEventListener('resize', ajustarTarjetasVisibles);

document.querySelector('.carousel-control-next').addEventListener('click', function(event) {
    event.preventDefault();
    handleNext();
    ajustarTarjetasVisibles();
    if (window.innerWidth > 425) {
        siguienteItem.click();
    }
});

document.querySelector('.carousel-control-prev').addEventListener('click', function(event) {
    event.preventDefault();
    handlePrev();
    ajustarTarjetasVisibles();
    if (window.innerWidth > 425) {
        anteriorItem.click();
    }
});

reiniciarMovimientoAutomatico();

// Event listener para los botones "Más información"
/*contenedorProductos.addEventListener('click', function(event) {
    if (event.target.classList.contains('irProducto')) {
        const idCarta = event.target.closest('.cardProducto').id;
        localStorage.setItem("productos", JSON.stringify(productos));
        localStorage.setItem("idCarta", idCarta);
        window.location.href = "productoIndividual.html"; 
    }
});*/

window.addEventListener('resize', ajustarTarjetasVisibles);

document.querySelector('.carousel-control-next').addEventListener('click', function(event) {
    event.preventDefault();
    handleNext();
    ajustarTarjetasVisibles();
    if (window.innerWidth > 425) {
        siguienteItem.click();
    }
});

document.querySelector('.carousel-control-prev').addEventListener('click', function(event) {
    event.preventDefault();
    handlePrev();
    ajustarTarjetasVisibles();
    if (window.innerWidth > 425) {
        anteriorItem.click();
    }
});

reiniciarMovimientoAutomatico();

// Event listener para los botones "Más información"
// contenedorProductos.addEventListener('click', function(event) {
//     if (event.target.classList.contains('irProducto')) {
//         const idCarta = event.target.closest('.cardProducto').id;
//         localStorage.setItem("productos", JSON.stringify(productos));
//         localStorage.setItem("idCarta", idCarta);
//         window.location.href = "productoIndividual.html"; 
//     }
// });
