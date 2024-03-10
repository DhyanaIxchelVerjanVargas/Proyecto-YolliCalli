let contenedorProducto = document.getElementById("contenedorProducto");
let nombreProductoIndividual = document.getElementById("nombreProductoIndividual");
let precioProductoIndividual = document.getElementById("precioProductoIndividual");
let descripcionProductoIndividual = document.getElementById("descripcionProductoIndividual");
let categoriaProductoIndividual = document.getElementById("categoriaProductoIndividual");
let etiquetasProductoIndividual = document.getElementById("etiquetasProductoIndividual");
let imagenProductoIndividual = document.getElementById("imagenProductoIndividual");
let noProducto = document.getElementById("noProducto");

let productos = new Array();
let idCarta = "";

window.addEventListener("load",function(event){
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
                etiquetasProductoIndividual.innerHTML = producto.etiquetas;
                imagenProductoIndividual.src = producto.imagen;
            }
            
        })
    } else{
        contenedorProducto.style.display="none";
        noProducto.style.display="flex";
    }
});