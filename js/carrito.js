let cuerpoTabla = document.getElementById("cuerpoTabla");
let botonCarrito = document.getElementById("botonCarrito");
let idSubtotal = document.getElementById("idSubtotal");
let idEnvio = document.getElementById("idEnvio");
let idTotal = document.getElementById("idTotal");
let alertaCarritoVacio = document.getElementById("alertaCarritoVacio");
let mostrarTabla = document.getElementById("mostrarTabla");
let main = document.getElementById("main");
let productosCarrito = new Array();
let subtotal = 0;
let envio = 180.00;
let total = 0;

function addProducto(producto){
    cuerpoTabla.insertAdjacentHTML("beforeend", `
        <tr id="${producto.id}">
            <td><img src="${producto.imagen}" alt="${producto.nombre}"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><div class="div-cantidad">${producto.cantidad}</div></td>
            <td><i class="bi bi-trash3-fill"></i></td>
        </tr>
    `)
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

/*botonCarrito.addEventListener("click", function (event){
    event.preventDefault();
    console.log(traerProductos());
    addProducto(productosCarrito[0]);
})*/