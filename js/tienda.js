const range = document.querySelectorAll("#filtro .cardFiltros .tipoFiltros .filtroPrecio div .rangeSlider input");
const categoriaFiltro = document.querySelectorAll("#filtro .cardFiltros .tipoFiltros .filtroCategorias .contenedorTipoFiltros .checkCategorias");
const ordenPrecioFiltro = document.querySelectorAll("#filtro .cardFiltros .tipoFiltros .filtroOrdenar .contenedorTipoFiltros .ordenPrecio input");
const ordenNombreFiltro = document.querySelectorAll("#filtro .cardFiltros .tipoFiltros .filtroOrdenar .contenedorTipoFiltros .ordenNombre input");
const filtro = document.getElementById("filtro");
let progress = document.querySelector("#filtro .cardFiltros .tipoFiltros .filtroPrecio div .rangeSlider .progres");
let gap=100;
const inputValue = document.querySelectorAll("#filtro .cardFiltros .tipoFiltros .filtroPrecio div .contentTxtMinMax .numberVal input");
const btnSiguientePagina = document.getElementById("btnSiguientePagina");
const btnAnteriorPagina = document.getElementById("btnAnteriorPagina");

let contenedorProdutos = document.getElementById("contenedorProductos");
let contnedorBtnPaginacion = document.getElementById("contnedorBtnPaginacion");
let btnAplicarFiltro = document.getElementById("btnAplicarFiltro");
let btnMuestraFiltro = document.getElementById("btnMuestraFiltro");
let btnLimpiarBusquda = document.getElementById("btnLimpiarBusquda");
let btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros");
let btnBusqueda = document.getElementById("btnBusqueda");
let inputBusqueda = document.getElementById("inputBusqueda");
let precioMayor = 0;
let precioMenor = 0;
let categoriaFiltroID = [];
let categoriaFiltroIDString ="";
let ordenNombre = "ASC";
let ordenPrecio = "ASC";
let productos = new Array();
let productosNuevos = new Array();
let auxBusqueda = "";
let productosBuscados = new Array();
let paginaActual = 1;
let paginasTotal = 1;
let solicitudURL = "";
let buscando = false;
let filtrando = false;

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
    contenedorProdutos.addEventListener('click', obtenerDatos);
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

//Animacion en la barra de navegacion para mostrar el precio menor y el precio mayor 
//conforme se cambian los rangos
 range.forEach(input => {
    input.addEventListener("input", e => {
        let minRange = parseInt(range[0].value);
        let maxRange = parseInt(range[1].value);
        if((maxRange - minRange) < gap){
            if(e.target.className === "rangeMin"){
                range[0].value = maxRange - gap;
            } else {
                range[1].value = minRange + gap;
            }
        } else {
            progress.style.left = (minRange / range[0].max)*100 + "%";
            progress.style.right = 100 - (maxRange / range[1].max)*100 + "%";
            inputValue[0].value = minRange;
            inputValue[1].value = maxRange;
        }
    })
 })

 categoriaFiltro.forEach(cat => {
    cat.addEventListener("change", function() {
        if (this.id === "CAT-0" && this.checked) {
            categoriaFiltro.forEach(cat => {
                if (cat.id !== "CAT-0") {
                    cat.checked = false;
                }
            });
        } else if (this.id !== "CAT-0" && this.checked) {
            document.getElementById("CAT-0").checked = false;
        }
    });
});

 btnAplicarFiltro.addEventListener("click",function(event){
    event.preventDefault();
    categoriaFiltroID = [];
    precioMenor = range[0].value;
    precioMayor = range[1].value;
    categoriaFiltro.forEach((cat)=>{
        if (cat.checked) {
            categoriaFiltroID.push(cat.value);
        }
    })

    if(ordenPrecioFiltro[0].checked){
        ordenPrecio="ASC"
    }else{
        ordenPrecio="DESC"
    }

    if(ordenNombreFiltro[0].checked){
        ordenNombre="ASC"
    }else{
        ordenNombre="DESC"
    }
    categoriaFiltroIDString = categoriaFiltroID.join('_');
    /*
    console.log("Precio menor: " + precioMenor + " Precio mayor: " + precioMayor);
    console.log(categoriaFiltroIDString)
    console.log(ordenPrecio);
    console.log(ordenNombre);
    */
    localStorage.setItem("precioMenor",precioMenor);
    localStorage.setItem("precioMayor",precioMayor);
    localStorage.setItem("categoriaFiltroIDString",categoriaFiltroIDString);
    localStorage.setItem("ordenPrecio",ordenPrecio);
    localStorage.setItem("ordenNombre",ordenNombre);
    paginaActual=1;

    if(localStorage.getItem("productoBuscar") != null){
        btnLimpiarBusquda.style.display = "flex";
        auxBusqueda = localStorage.getItem("productoBuscar");
        inputBusqueda.value=auxBusqueda;
        auxBusqueda = auxBusqueda.replace(/\s+/g, '_');
        solicitudURL="http://localhost:8080/tienda/productos?buscar="+auxBusqueda+"&ordenPrecio="+ordenPrecio+"&ordenNombre="+ordenNombre+"&categorias="+categoriaFiltroIDString+"&precioMenor="+precioMenor+"&precioMayor="+precioMayor+"&pagina=";
        buscando = true;
    }else {
        solicitudURL="http://localhost:8080/tienda/productos?"+"ordenPrecio="+ordenPrecio+"&ordenNombre="+ordenNombre+"&categorias="+categoriaFiltroIDString+"&precioMenor="+precioMenor+"&precioMayor="+precioMayor+"&pagina=";

        buscando = false;
    }

    if(filtro.clientHeight > 300){
        btnMuestraFiltro.click();
    }
    filtrando = true;
    loadProductos(solicitudURL+paginaActual);
    btnLimpiarFiltros.style.display = "flex";
    
 })

 btnLimpiarFiltros.addEventListener("click", function(event){
    
    event.preventDefault();
    categoriaFiltroID = [];
    range[0].value = 0;
    range[1].value = 10000;
    categoriaFiltro.forEach((cat)=>{
        if (cat.id == "CAT-0"){
            cat.checked = true;
        } else {
            cat.checked = false;
        }
    })

    ordenPrecioFiltro[0].checked = true;
    ordenNombreFiltro[0].checked = true;

    progress.style.left = (0 / range[0].max)*100 + "%";
    progress.style.right = 100 - (10000 / range[1].max)*100 + "%";
    inputValue[0].value = 0;
    inputValue[1].value = 10000;
    
    btnAplicarFiltro.click()
    btnLimpiarFiltros.style.display = "none";
    paginaActual=1;
    if(localStorage.getItem("productoBuscar") != null){
        btnLimpiarBusquda.style.display = "flex";
        auxBusqueda = localStorage.getItem("productoBuscar");
        inputBusqueda.value=auxBusqueda;
        auxBusqueda = auxBusqueda.replace(/\s+/g, '_');
        solicitudURL="http://localhost:8080/tienda/productos?buscar="+auxBusqueda+"&pagina=";
        buscando = true;
    }else {
        solicitudURL="http://localhost:8080/tienda/productos?pagina=";
        buscando = false;
    }
    localStorage.removeItem("precioMenor");
    localStorage.removeItem("precioMayor");
    localStorage.removeItem("categoriaFiltroIDString");
    localStorage.removeItem("ordenPrecio");
    localStorage.removeItem("ordenNombre");
    filtrando=false;
    loadProductos(solicitudURL+paginaActual);
 })

 function createCards(prods){
    contenedorProdutos.innerHTML="";
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

        contenedorProdutos.insertAdjacentHTML("beforeend", card);
    });
};

 //prueba corriendo datos desde springboot 
 async function loadProductos(url){
    //console.log("esta es la url: "+url)
    let promesa = fetch (url, { method: "GET" });
    contenedorProdutos.innerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `
    promesa.then((response) => { 
        response.json().then( (data) => {
            
            console.log("Contenido: "+data)
            console.log("Numero de paginas: "+data.nPaginas);
            console.log("Numero de productos: "+data.nProductos)
            console.log("Lista de productos: "+data.productos)
            
            paginasTotal = data.nPaginas;

            if(data.nProductos == 0 && buscando == true && filtrando==true){
                contenedorProdutos.innerHTML = `
                    <div class="d-flex flex-column justify-content-center">
                        <h2 class="titulosRosas">No hay productos que coincidan con su busqueda y filtrado.</h2>
                    </div>
                    `
            }else if(data.nProductos == 0 && buscando == true){
                contenedorProdutos.innerHTML = `
                    <div class="d-flex flex-column justify-content-center">
                        <h2 class="titulosRosas">No hay coincidencias con su busqueda.</h2>
                    </div>
                    `
            }else if(data.nProductos == 0 && filtrando == true){
                contenedorProdutos.innerHTML = `
                    <div class="d-flex flex-column justify-content-center">
                        <h2 class="titulosRosas">No hay productos que coincidan con su filtrado.</h2>
                    </div>
                    `
            }else{
                createCards(data.productos)
            }
            actualizarBotonesPaginacion();
        }).catch((err)=>{
            console.log("Ocurrio un error en el json "+ err)
        })
        
    })
    .catch((err) => {
        console.log("Ocurrio un error en la solicitud",err)
        contenedorProdutos.innerHTML = `
        <div class="d-flex flex-column justify-content-center">
            <h2 class="titulosRosas">Hubo un problema al cargar los productos.</h2>
            <p class="mensajeContactoError">
                Por favor,haga <a href="./nosotros.html#contacto">click aquí</a> para ponerse en contacto con nuestro equipo técnico.
            </p>
        </div>
        `
    })
 }

 btnLimpiarBusquda.addEventListener("click",function(event){
    event.preventDefault();
    paginaActual=1;
    if(filtrando == true){
        precioMenor = localStorage.getItem("precioMenor");
        precioMayor = localStorage.getItem("precioMayor");
        categoriaFiltroIDString = localStorage.getItem("categoriaFiltroIDString");
        ordenPrecio = localStorage.getItem("ordenPrecio");
        ordenNombre = localStorage.getItem("ordenNombre");
        solicitudURL="http://localhost:8080/tienda/productos?"+"ordenPrecio="+ordenPrecio+"&ordenNombre="+ordenNombre+"&categorias="+categoriaFiltroIDString+"&precioMenor="+precioMenor+"&precioMayor="+precioMayor+"&pagina=";
    }else{
        solicitudURL="http://localhost:8080/tienda/productos?pagina="
    }
    loadProductos(solicitudURL+paginaActual);
    btnLimpiarBusquda.style.display = "none";
    inputBusqueda.value="";
    localStorage.removeItem("productoBuscar");
    buscando=false;
 })

 btnBusqueda.addEventListener("click",function(event){
    let busqueda="";
    event.preventDefault();
    inputBusqueda.value = inputBusqueda.value.trim();
    localStorage.setItem("productoBuscar", inputBusqueda.value);
    busqueda = inputBusqueda.value.replace(/\s+/g, '_');
    if(inputBusqueda.value.length > 2){
        paginaActual=1;
        solicitudURL="http://localhost:8080/tienda/productos?buscar="+busqueda+"&pagina=";
        buscando=true;
        btnLimpiarBusquda.style.display = "flex";
        loadProductos(solicitudURL+paginaActual);
    }
 })

 inputBusqueda.addEventListener("keyup", function (event) {
    let busqueda="";
    event.preventDefault();
    if (event.code == "Enter") {
        inputBusqueda.value = inputBusqueda.value.trim();
        localStorage.setItem("productoBuscar", inputBusqueda.value);
        busqueda = inputBusqueda.value.replace(/\s+/g, '_');
        if(inputBusqueda.value.length > 3){
            paginaActual=1;
            solicitudURL="http://localhost:8080/tienda/productos?buscar="+busqueda+"&pagina=";
            buscando=true;
            btnLimpiarBusquda.style.display = "flex";
            loadProductos(solicitudURL+paginaActual);
        }
    }
 });

 inputBusqueda.addEventListener("search", function(event) {
    if (inputBusqueda.value === "") {
        console.log("Se limpió el campo de búsqueda");
        btnLimpiarBusquda.click();
        inputBusqueda.blur();
    }
});

 contenedorProdutos.addEventListener('click', function(event) {
    if (event.target.classList.contains('irProducto')) {
        const idCarta = event.target.closest('.cardProducto').id;
        console.log('ID de la carta:', idCarta);
        localStorage.setItem("idCarta",idCarta);
        window.location.href = "productoIndividual.html";
    }
});

function actualizarBotonesPaginacion() {

    if (paginaActual === 1) {
        btnAnteriorPagina.style.display = 'none';
    } else {
        btnAnteriorPagina.style.display = 'flex';
    }

    if (paginaActual === paginasTotal) {
        btnSiguientePagina.style.display = 'none';
    } else {
        btnSiguientePagina.style.display = 'flex';
    }

    if (paginasTotal === 0){
        btnSiguientePagina.style.display = 'none';
        btnAnteriorPagina.style.display = 'none';
    }
  }

btnSiguientePagina.addEventListener("click",function(event){
    event.preventDefault();
    if(paginaActual < paginasTotal){
        paginaActual++;
    }
    loadProductos(solicitudURL+paginaActual)
})

btnAnteriorPagina.addEventListener("click",function(event){
    event.preventDefault();
    if(paginaActual > 1){
        paginaActual--;
    }
    loadProductos(solicitudURL+paginaActual)
})

 document.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    paginaActual=1;
    solicitudURL="http://localhost:8080/tienda/productos?pagina=";
    if(localStorage.getItem("productoBuscar") != null && localStorage.getItem("categoriaFiltroIDString") == null){
        btnLimpiarBusquda.style.display = "flex";
        auxBusqueda = localStorage.getItem("productoBuscar");
        inputBusqueda.value=auxBusqueda;
        auxBusqueda = auxBusqueda.replace(/\s+/g, '_');
        solicitudURL="http://localhost:8080/tienda/productos?buscar="+auxBusqueda+"&pagina=";
        buscando = true;
    }else { 
        buscando = false;
    }

    if(localStorage.getItem("categoriaFiltroIDString") != null && localStorage.getItem("productoBuscar") == null){
        btnLimpiarFiltros.style.display = "flex";
        categoriaFiltroIDString = localStorage.getItem("categoriaFiltroIDString").toString();

        categoriaFiltro.forEach((cat)=>{
            if (cat.value.toString() == categoriaFiltroIDString ) {
                cat.checked = true;
            }else{
                cat.checked = true;
            }
        })

        solicitudURL="http://localhost:8080/tienda/productos?categorias="+categoriaFiltroIDString+"&pagina=";
        filtrando = true;
    }else {
        filtrando = false;
    }

    loadProductos(solicitudURL+paginaActual);
 })