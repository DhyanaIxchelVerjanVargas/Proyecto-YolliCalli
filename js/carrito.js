let cuerpoTabla = document.getElementById("cuerpoTabla");
let botonCarrito = document.getElementById("botonCarrito");
let idSubtotal = document.getElementById("idSubtotal");
let idEnvio = document.getElementById("idEnvio");
let idTotal = document.getElementById("idTotal");
let alertaCarritoVacio = document.getElementById("alertaCarritoVacio");
let mostrarTabla = document.getElementById("mostrarTabla");
let main = document.getElementById("main");
let borrarElemento = document.getElementById("borrarElemento");
let botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
let tablaCarrito = document.querySelector("#tablaCarrito");
let productosCarrito = new Array();
let subtotal = 0;
let envio = 180.00;
let total = 0;
let prodId;

function addProducto(producto){
    cuerpoTabla.insertAdjacentHTML("beforeend", `
        <tr>
            <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><div class="div-cantidad-global"><div class="div-cantidad">${producto.cantidad}</div>
                <div class="div-signos">
                <i class="bi bi-dash"></i>
                <i class="bi bi-plus"></i>
                </div>
                </div>
            </td>
            <td><i class="bi bi-trash3-fill borrarProducto" data-id="${producto.id}" ></i></td>
        </tr>
    `)
}

cargarEventListeners();
function cargarEventListeners(){
    // Elimina Producto del carrito
    tablaCarrito.addEventListener('click', eliminarProducto);
    botonVaciarCarrito.addEventListener("click",vaciarCarrito);
}

function traerProductos(){
    return productosCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
}

function carritoVacio(){
    return localStorage.getItem("productosCarrito") == null;
}

function precioPorProducto(producto){
    let precio = producto.precio;
    let cantidad = producto.cantidad;
    return precio * cantidad;
}

function vaciarCarrito(){
    productosCarrito = [];
    actualizarPagina();
}

function actualizarPagina(){
    subtotal = 0;
    total = 0;
    limpiarTabla();
    if(productosCarrito.length == 0){
        alertaCarritoVacio.style.display = "block";
        main.style.justifyContent = "space-around";
        mostrarTabla.style.display = "none";
        envio = 0;
        localStorage.clear();
    }
    else{
        mostrarTabla.style.display = "block";
        traerProductos();
        productosCarrito.forEach((productoEnCarrito, index)=>{
            addProducto(productoEnCarrito);
            subtotal += precioPorProducto(productoEnCarrito);
        })
    }
    idSubtotal.innerHTML = `$ ${subtotal.toFixed(2)}`;
    idEnvio.innerText = `$ ${envio.toFixed(2)}`;
    total = subtotal + envio;
    idTotal.innerHTML = `$ ${total.toFixed(2)}`;

}

function limpiarTabla(){
    cuerpoTabla.innerHTML = "";
}

function eliminarProducto(e){
    if(e.target.classList.contains('borrarProducto')){
       prodId = e.target.getAttribute("data-id");
       
    }
    traerProductos();
    productosCarrito = productosCarrito.filter(producto => producto.id !== prodId);
    localStorage.setItem("productosCarrito", JSON.stringify(productosCarrito));
    actualizarPagina();
    //console.log(productosCarrito);
}

window.addEventListener("load",function(event){
    event.preventDefault();
    if(!carritoVacio()){
        mostrarTabla.style.display = "block";
        traerProductos();
        productosCarrito.forEach((productoEnCarrito, index)=>{
            addProducto(productoEnCarrito);
            subtotal += precioPorProducto(productoEnCarrito);
        })
        idSubtotal.innerHTML = `$ ${subtotal.toFixed(2)}`;
        idEnvio.innerText = `$ ${envio.toFixed(2)}`;
        total = subtotal + envio;
        idTotal.innerHTML = `$ ${total.toFixed(2)}`;
    }else{
        alertaCarritoVacio.style.display = "block";
        main.style.justifyContent = "space-around";
    }
    
})
