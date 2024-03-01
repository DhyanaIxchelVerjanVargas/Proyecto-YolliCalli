let imagenProducto = document.getElementById("imagenProducto");
let imagenProductoFake = document.getElementById("imagenProductoFake")
let imagenUrlProducto = "";
let productosNuevos = new Array();
const cloudName = "dw66wcnoo";
const unsignedUploadPreset = "preset_YolliCalli";

imagenProductoFake.addEventListener("click",function(event){
    event.preventDefault();
    console.log("prueba")
    imagenProducto.click();
})

imagenProducto.addEventListener("change",function(event){
    event.preventDefault();
    const archivo = imagenProducto.files[0];
    uploadFile(archivo)
    .then(imageUrl => {
        imagenUrlProducto = imageUrl
    })
    .catch(error => {
        imagenUrlProducto = "";
    });
})

function uploadFile(file) {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', unsignedUploadPreset);

    return new Promise((resolve, reject) => {
        fetch('https://api.cloudinary.com/v1_1/' + cloudName + '/image/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error al cargar archivo a Cloudinary');
        })
        .then(data => {
            console.log('Imagen subida exitosamente');
            var imageUrl = data.secure_url;
            resolve(imageUrl);
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error);
        });
    });
}

let nombreProducto = document.getElementById("nombreProducto");
let descripcion = document.getElementById("descripcion");
let precio = document.getElementById("precio");
let categoria = document.getElementById("categoria");
let etiquetas = document.getElementById("etiquetas");
let botonProducto = document.getElementById("botonProducto");

class Producto {
    nombre="";
    descripcion="";
    precio = 0;
    categoria = "";
    etiquetas = "";
    imagen =""
    // elaboradoPor ="";
    id="";
    static total=0;

    constructor(nombre,descripcion,precio, categoria, etiquetas, imagen){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        // this.elaboradoPor = elaboradoPor;
        this.categoria = categoria;
        this.etiquetas = etiquetas;
        this.imagen = imagen;
        Producto.total +=1;
        this.id= "CP" + Producto.total;
    }
 }


 botonProducto.addEventListener("click", function (event){
    event.preventDefault();

    /*Aqui inician las validaciones*/

    /*Para validar si se subio la foto utilizar la siguiente variable imagenUrlProducto si esta vacia no se subio
    la foto si contiene algo se subio bien la foto */
    
    /*Aqui terminan las validaciones*/

    if (localStorage.getItem("productosNuevos") != null){
        productosNuevos = JSON.parse(this.localStorage.getItem("productosNuevos"));
    }else{
        productosNuevos = [];
    }
    productosNuevos.push(new Producto(nombreProducto.value, descripcion.value, parseFloat(precio.value), categoria.value, etiquetas.value, imagenUrlProducto))
    localStorage.setItem("productosNuevos", JSON.stringify(productosNuevos));
 })



