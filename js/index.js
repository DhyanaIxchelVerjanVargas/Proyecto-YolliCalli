// Agregado para carrito
let contenedorProdutos = document.getElementById("contenedorProductos");
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