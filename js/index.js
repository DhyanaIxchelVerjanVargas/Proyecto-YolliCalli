let contenedorProductos = document.getElementById("contenedorProductos");
let tarjetas = document.querySelectorAll('.carousel-inner .tarjetaCategoria');
let carouselItems = document.querySelectorAll('.carousel-inner .carousel-item');
let currentIndex = 0;
let intervalId;
let controlarProductos = document.getElementById("controlarProductos");
let siguienteItem = document.getElementById("siguienteItem");
let anteriorItem = document.getElementById("anteriorItem");
let contenedorCategorias = document.getElementById("contenedorCategorias")


// Agregado para carrito
let botonProductoCarrito = document.getElementById("botonProductoCarrito");
let modalEnvioCarrito = document.getElementById("modalEnvioCarrito");
let btnEnvioCarrito = document.getElementById("btnEnvioCarrito");

let productosCarrito = new Array();
let nombreProd = "";
let precioProd = 0;
let imagenProd = "";
let idProd = "";

class ProductoCarrito{
    nombre = "";
    precio = 0;
    imagen = "";
    id = "";
    cantidad = 0;
    constructor(nombre,precio,imagen,id){
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.id = id;
        this.cantidad = 1;
    }
}// Class ProductoCarrito

cargarEventListeners();
function cargarEventListeners(){
    controlarProductos.addEventListener('click', obtenerDatos);
}

function obtenerDatos(e){
    e.preventDefault();
    if(e.target.classList.contains('borrarProducto')){
        cardSeleccionada = e.target.parentElement.parentElement.parentElement.parentElement;
        leerDatosCard(cardSeleccionada);
    }
}

//Agregado para carrito
function traerProductos(productosCarrito){
    return productosCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
}

function carritoVacio(){
    return localStorage.getItem("productosCarrito") == null;
}

function agregarProducto(nombreProd,precioProd,imagenProd,idProd){
    productosCarrito.push(new ProductoCarrito(nombreProd,precioProd,imagenProd,idProd));
}


function leerDatosCard(card){
    nombreProd = card.querySelector(".card-title").innerHTML;
    precioProd = (card.querySelector(".productPrecio").innerHTML).substring(2);
    imagenProd = card.querySelector("img").src;
    idProd = card.querySelector(".overlay").getAttribute("data-id");
    modalEnvioCarrito.innerHTML=""
    if(carritoVacio()){
        agregarProducto(nombreProd,precioProd,imagenProd,idProd);
        localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
        //console.log("Producto nuevo agregado al carrito VACÍO");
    }else{
        let isInCarrito = false;
        productosCarrito = traerProductos(productosCarrito);
        // Verificar que no esté anteriormente el producto y si ya está solo aumentar la cantidad
        // console.log(productosCarrito[0].id);
        productosCarrito.forEach((ProductoEnCarrito, index)=>{
            if(ProductoEnCarrito.id == idProd){
                //console.log("Entré");
                ProductoEnCarrito.cantidad++;
                localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
                isInCarrito = true;
            }
        })
        if(!isInCarrito){
            agregarProducto(nombreProd,precioProd,imagenProd,idProd);
            //console.log("Producto nuevo agregado al carrito en No vacío");
            localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
        }
    }
    //Modal para envío exitoso a Carrito
    modalEnvioCarrito.insertAdjacentHTML("beforeend", `
    <div class="modal-dialog modal-lg">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-2" id="estadoModalLabel">YolliCalli</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerral"></button>
        </div>
        <div class="modal-body">
        <p class="fs-3">Producto agregado al carrito</p>
        </div>
    </div>
    </div>
    `);
    
    btnEnvioCarrito.click();
}
// Termina agregado para carrito

 

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


function createCards(prods){
    controlarProductos.innerHTML="";
    prods.forEach((producto) => {
        let card = `
        <div class="cardProducto" id="${producto.idProducto}">
                <div class="caraPrincipal">
                    <img src="${producto.imagen}" alt="">
                    <div class="card-body fondoAzul">
                        <h4 class="card-title colorBlanco">${producto.nombreProducto}</h4>
                    </div>
                </div>
                <div class="overlay" data-id="${producto.idProducto}">
                    <span class="productoSlogan colorBlanco">Hecho con el corazón</span>
                    <h4>${producto.nombreProducto}</h4>
                    <span class="productPrecio">$ ${parseFloat(producto.precio).toFixed(2)}</span>
                    <span>por</span>
                    <span class="productMadeBy">Artesanos de Tenango</span>
                    <div class="verProducto"><a class="irProducto" ><i class="bi bi-plus-circle irProducto"></i> Información</a></div>
                    <div class="productIconos">
                        <a  class="productoIcon"><i class="bi bi-cart3 iconoCarrito borrarProducto"></i></a>
                    </div>
                </div>
            </div>
        `;

        controlarProductos.insertAdjacentHTML("beforeend", card);
    });
};

 //prueba corriendo datos desde springboot 
 async function loadProductos(){
    //console.log("esta es la url: "+url)
    let promesa = fetch ("http://localhost:8080/api/products/destacados", { method: "GET" });
    controlarProductos.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `
    promesa.then((response) => { 
        response.json().then( (data) => {
           
          
            if(data.length == 0){
                controlarProductos.innerHTML = `
                    <div class="d-flex flex-column justify-content-center">
                        <h2 class="titulosRosas">No hay productos destacados.</h2>
                    </div>
                    `
           
                }else{
                createCards(data)
            } 
        }).catch((err)=>{
            console.log("Ocurrio un error en el json "+ err)
        })
        
    })
    .catch((err) => {
        console.log("Ocurrio un error en la solicitud",err)
        controlarProductos.innerHTML = `
        <div class="d-flex flex-column justify-content-center">
            <h2 class="titulosRosas">Hubo un problema al cargar los productos.</h2>
            <p class="mensajeContactoError">
                Por favor,haga <a href="./nosotros.html#contacto">click aquí</a> para ponerse en contacto con nuestro equipo técnico.
            </p>
        </div>
        `
    })
 }
 controlarProductos.addEventListener('click', function(event) {
    if (event.target.classList.contains('irProducto')) {
        const idProducto = event.target.closest('.cardProducto').id;
        console.log('ID de la carta:', idProducto);
        localStorage.setItem("idProducto",idProducto);
        window.location.href = "productoIndividual.html?id=" + idProducto;
    }
});

 document.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    loadProductos();
      // Agregar evento de clic a cada tarjeta
      tarjetas.forEach(function(tarjeta) {
        tarjeta.addEventListener('click', function() {
            // Obtener el valor de data-id de la tarjeta clicada
            let dataId = tarjeta.getAttribute('data-id');

            // Mostrar el valor en la consola (puedes hacer lo que necesites con este valor)
            localStorage.setItem("categoriaFiltroIDString", dataId.toString())
            window.location.href="tienda.html"
        });
    });
 })

