let contenedorProducto = document.getElementById("contenedorProducto");
let nombreProductoIndividual = document.getElementById("nombreProductoIndividual");
let precioProductoIndividual = document.getElementById("precioProductoIndividual");
let descripcionProductoIndividual = document.getElementById("descripcionProductoIndividual");
let categoriaProductoIndividual = document.getElementById("categoriaProductoIndividual");
//let etiquetasProductoIndividual = document.getElementById("etiquetasProductoIndividual");
let tallas = document.querySelectorAll('input[name="radioTallas"]');
let tallaProductoIndividual = document.getElementById("tallaProductoIndividual")
let imagenProductoIndividual = document.getElementById("imagenProductoIndividual");
let noProducto = document.getElementById("noProducto");
let contenedorCargando = document.getElementById("cargando");
//Agregado para carrito
let botonProductoCarrito = document.getElementById("botonProductoCarrito");
let modalEnvioCarrito = document.getElementById("modalEnvioCarrito");
let btnEnvioCarrito = document.getElementById("btnEnvioCarrito");

let productos = new Array();
let idCarta = "";

//Agregado para carrito
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

const requestOptions = {
    method: "GET",
    redirect: "follow"
  };

async function fecthProductoIndividual(){
    try{
        contenedorCargando.style.display = "flex"
        const prodId = new URLSearchParams(window.location.search).get('id');
        const response = await fetch(`https://yollicalli-back.onrender.com/api/products/${prodId}`, requestOptions);
        const productoIndividual = await response.json();
        console.log(productoIndividual, prodId);

        displayProductoIndividual(productoIndividual);

    }catch(err){
        console.log("Algo salió mal", err)
        contenedorProducto.style.display="none";
        contenedorCargando.style.display = "none"
        noProducto.style.display="flex";
    }
}

function displayProductoIndividual(productoIndividual){
    contenedorCargando.style.display = "none"
    contenedorProducto.style.display = "flex";
    nombreProductoIndividual.innerHTML = productoIndividual.nombreProducto;
    precioProductoIndividual.innerHTML = productoIndividual.precio.toFixed(2);
    descripcionProductoIndividual.innerHTML = productoIndividual.descripcion;
    imagenProductoIndividual.src = productoIndividual.imagen;
    //Nombre para categorías
    switch (productoIndividual.idCategoria) {
        case 1:
            categoriaProductoIndividual.innerText = "Accesorios para el hogar";
            break;
        case 2:
                categoriaProductoIndividual.innerText = "Ropa";
                if (!productoIndividual.talla.includes("chica")) {
                    tallas.forEach(radio => {
                        if (radio.value === "chica") {
                            radio.disabled = true;
                        }
                    });
                }
                if (!productoIndividual.talla.includes("mediana")) {
                    tallas.forEach(radio => {
                        if (radio.value === "mediana") {
                            radio.disabled = true;
                        }
                    });
                }
                if (!productoIndividual.talla.includes("grande")) {
                    tallas.forEach(radio => {
                        if (radio.value === "grande") {
                            radio.disabled = true;
                        }
                    });
                }
                tallaProductoIndividual.style.display = "block";
                break;
        case 3:
            categoriaProductoIndividual.innerText = "Alimentos";
            break;
        case 3:
            categoriaProductoIndividual.innerText = "Cuidado personal";
            break;
        case 4:
            categoriaProductoIndividual.innerText = "Joyería y Bisutería";
            break;
        case 5:
            categoriaProductoIndividual.innerText = "Arte y Pintura";
            break;
        case 6:
            categoriaProductoIndividual.innerText = "Cerámica y alfarería";
            break;
        default:
            // Acciones por defecto si no coincide con ninguna categoría
            contenedorProducto.style.display="none";
            contenedorCargando.style.display = "none"
            noProducto.style.display="flex";
            break;
    }

    //Agregado para carrito
    nombreProd = productoIndividual.nombreProducto;
    precioProd = productoIndividual.precio.toFixed(2);
    imagenProd = productoIndividual.imagen;
    idProd = productoIndividual.idProducto.toString();
}

window.addEventListener("load",function(event){
    event.preventDefault();
    fecthProductoIndividual();
});


/*window.addEventListener("load",function(event){
    event.preventDefault();
    if(this.localStorage.getItem("idCarta") != null){
        contenedorProducto.style.display="flex";
        noProducto.style.display="none";
        productos = JSON.parse(this.localStorage.getItem("productos"));
        idCarta = this.localStorage.getItem("idCarta");
        productos.forEach((producto)=>{
            if(producto.id.toString() == idCarta.toString()){
                nombreProductoIndividual.innerHTML = producto.nombre;
                precioProductoIndividual.innerHTML = producto.precio.toFixed(2);
                descripcionProductoIndividual.innerHTML = producto.descripcion;
                categoriaProductoIndividual.innerHTML = producto.categoria;
                //etiquetasProductoIndividual.innerHTML = producto.etiquetas;
                imagenProductoIndividual.src = producto.imagen;

                let tallasDisponibles = producto.talla
                console.log(tallasDisponibles);
                contenedorCargando.style.display="none";

                if(producto.categoria.toLowerCase() == "ropa"){
                    tallas.forEach(opcionTalla => {
                        let valor = opcionTalla.value;
                        if (!tallasDisponibles.includes(valor)) {
                            opcionTalla.disabled = true;
                        }
                    });
                    tallaProductoIndividual.style.display = "block";
                }

                //Agregado para carrito
                nombreProd = producto.nombre;
                precioProd = producto.precio.toFixed(2);
                imagenProd = producto.imagen;
                idProd = producto.id;
            }
            
        })
    } else{
        contenedorProducto.style.display="none";
        noProducto.style.display="flex";
    }
});*/

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

botonProductoCarrito.addEventListener("click", function(event){
    event.preventDefault();
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
})