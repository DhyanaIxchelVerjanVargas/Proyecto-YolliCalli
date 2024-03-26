let isValid = true;
let nombreProducto = document.getElementById("nombreProducto");
let descripcion = document.getElementById("descripcion");
let precio = document.getElementById("precio");
let categoria = document.getElementById("categoria");
//let etiquetas = document.getElementById("etiquetas");
let botonProducto = document.getElementById("botonProducto");
let alertNombreProducto = document.getElementById("alertNombreProducto")
let alertDescripcion = document.getElementById("alertDescripcion")
let alertPrecio = document.getElementById("alertPrecio")
let alertCategoria = document.getElementById("alertCategoria")
//let alertEtiquetas = document.getElementById("alertEtiquetas")
let alertImagenProducto = document.getElementById("alertImagenProducto")
let imagenProducto = document.getElementById("imagenProducto");
let imagenProductoFake = document.getElementById("imagenProductoFake")
let alertProductoAgregado = document.getElementById("alertProductoAgregado");
let alertProductoAgregadoTexto = document.getElementById("alertProductoAgregadoTexto");
let tallas = document.getElementById("tallasRopa");
let tallaChica = document.getElementById("tallaChica");
let tallaMediana = document.getElementById("tallaMediana");
let tallaGrande = document.getElementById("tallaGrande");
let alertTalla = document.getElementById("alertTalla");
let imagenUrlProducto = "";
let archivo ="";
let productosNuevos = new Array();
let tallasSeleccionadas = new Array();
const cloudName = "dayprjvbg";
const unsignedUploadPreset = "preset_YolliCalli";
const expresiones = {
    product: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/,
    price: /^\d{5}$/,
    tags: /^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s,']+$/,
    image: /\.(jpg|jpeg|png)$/  
}

imagenProductoFake.addEventListener("click",function(event){
    event.preventDefault();
    console.log("prueba")
    imagenProducto.click();
})

imagenProducto.addEventListener("change",function(event){
    event.preventDefault();
    archivo = imagenProducto.files[0];
    // uploadFile(archivo)
    // .then(imageUrl => {
    //     imagenUrlProducto = imageUrl
    // })
    // .catch(error => {
    //     imagenUrlProducto = "";
    // });
    alertImagenProducto.innerHTML = "";
    if (archivo.type.startsWith('image/')) {
        uploadFile(archivo)
            .then(imageUrl => {
                imagenUrlProducto = imageUrl;
                alertImagenProducto.style.display = "inline";
                alertImagenProducto.insertAdjacentHTML("beforeend", `<span style=" color: #5cb85c; font-family: var(--barlow); font-size: 11px);">El archivo se subió exitosamente.</span>
                `);
                alertImagenProducto.style.display = "inline";
                imagenProducto.focus();
                imagenProducto.style.border = "solid #ff0909 thin";
                imagenProducto.style.boxShadow = "0 0 5px #ff0909";
                isValid = true;   
            })
            .catch(error => {
                alertImagenProducto.style.display = "inline";
            alertImagenProducto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:1.8rem; font-family:var(--barlow)">Hubo un error al subir el archivo</span>`);
            alertImagenProducto.style.display = "inline";
            imagenProducto.focus();
            imagenProducto.style.border = "solid #ff0909 thin";
            imagenProducto.style.boxShadow = "0 0 5px #ff0909";
            isValid = false;  
                imagenUrlProducto = "";
            });
    } else {
        console.log('El archivo seleccionado no es una imagen');
        alertImagenProducto.style.display = "inline";
        alertImagenProducto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:1.8rem; font-family:var(--barlow)">Solo se adminten archivos .jpg .png.</span>`);
        alertImagenProducto.style.display = "inline";
        imagenProducto.focus();
        imagenProducto.style.border = "solid #ff0909 thin";
        imagenProducto.style.boxShadow = "0 0 5px #ff0909";
        isValid = false;
    }}
)

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

/*botonProducto.addEventListener("click", function(event) {
    event.preventDefault(); 
    
})*/
class Producto {
    nombre="";
    descripcion="";
    precio = 0;
    categoria = "";
    //etiquetas = "";
    talla = [];
    imagen =""
    // elaboradoPor ="";
    id="";
    static total=0;

    constructor(nombre,descripcion,precio, categoria, talla, imagen){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        // this.elaboradoPor = elaboradoPor;
        this.categoria = categoria;
        //this.etiquetas = etiquetas;
        this.talla = talla;
        this.imagen = imagen;
        Producto.total +=1;
        this.id= "CP" + Producto.total;
    }
 }

 /*Prevenir que las flechas cambien el precio*/
precio.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
    }
});

 /*Display de tallas para categoria ropa*/
categoria.addEventListener('change', function(){
    if(categoria.value.toLowerCase() == "ropa"){
        tallas.style.display = "block";
    }else{
        tallas.style.display = "none";
    }
})

botonProducto.addEventListener("click", function (event){
    event.preventDefault();
    console.log("se da click en boton enviar");
    

    alertNombreProducto.innerHTML = "";
    alertDescripcion.innerHTML = "";
    alertPrecio.innerHTML = "";
    alertCategoria.innerHTML = "";
    //alertEtiquetas.innerHTML = "";
    alertImagenProducto.innerHTML = "";
    alertTalla.innerHTML="";
    alertProductoAgregadoTexto.innerHTML="";

    alertNombreProducto.style.display= "none";
    alertDescripcion.style.display= "none";
    alertPrecio.style.display= "none";
    alertCategoria.style.display= "none";
    //alertEtiquetas.style.display= "none";
    alertTalla.style.display= "none";
    alertImagenProducto.style.display= "none";
    alertProductoAgregado.style.display="none";

    nombreProducto.style.border = "solid var(--rosa-mexicano) thin";
    nombreProducto.style.removeProperty("box-shadow");
    descripcion.style.border = "solid var(--rosa-mexicano) thin";
    descripcion.style.removeProperty("box-shadow");
    precio.style.border = "solid var(--rosa-mexicano) thin";
    precio.style.removeProperty("box-shadow");
    categoria.style.border = "solid var(--rosa-mexicano) thin";
    categoria.style.removeProperty("box-shadow");
    //etiquetas.style.border = "solid var(--rosa-mexicano) thin";
    //etiquetas.style.removeProperty("box-shadow");
    tallaChica.style.border = "solid var(--rosa-mexicano) thin";
    tallaChica.style.removeProperty("box-shadow");
    tallaMediana.style.border = "solid var(--rosa-mexicano) thin";
    tallaMediana.style.removeProperty("box-shadow");
    tallaGrande.style.border = "solid var(--rosa-mexicano) thin";
    tallaGrande.style.removeProperty("box-shadow");
    imagenProducto.style.border = "solid var(--rosa-mexicano) thin";
    imagenProducto.style.removeProperty("box-shadow");

    nombreProducto.value = nombreProducto.value.trim();
    descripcion.value = descripcion.value.trim();
    //etiquetas.value = etiquetas.value.trim();
     
    //validacion imagen
    //-----------------
    if (imagenProducto.files.length === 0) {
        alertImagenProducto.style.display = "inline";
        alertImagenProducto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Seleccione una imagen.</span>`);
        alertImagenProducto.style.display = "inline";
        imagenProducto.focus();
        imagenProducto.style.border = "solid #ff0909 thin";
        imagenProducto.style.boxShadow = "0 0 5px #ff0909";
        isValid = false;}
    else if((!expresiones.image.test(imagenProducto.value.toLowerCase()))) {
            alertImagenProducto.style.display = "inline";
            alertImagenProducto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Solo se adminten archivos .jpg .png.</span>`);
            alertImagenProducto.style.display = "inline";
            imagenProducto.focus();
            imagenProducto.style.border = "solid #ff0909 thin";
            imagenProducto.style.boxShadow = "0 0 5px #ff0909";
            isValid = false;   
         }
    //------------------


    //Validacion campo etiquetas
    /*if(etiquetas.value.length ==0){
        alertEtiquetas.style.display = "inline";
        alertEtiquetas.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese una etiqueta.</span>`);
        alertEtiquetas.style.display= "inline";
        etiquetas.focus();
        etiquetas.style.border = "solid #ff0909 thin";
        etiquetas.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;

    }else if(etiquetas.value.length <3){
        alertEtiquetas.style.display = "inline";
        alertEtiquetas.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">La etiqueta es muy corta.</span>`);
        alertEtiquetas.style.display= "inline";
        etiquetas.focus();
        etiquetas.style.border = "solid #ff0909 thin";
        etiquetas.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;

    }else if(!expresiones.tags.test(etiquetas.value)){
        alertEtiquetas.style.display = "inline";
        alertEtiquetas.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">La etiqueta no es válida.</span>`);
        alertEtiquetas.style.display= "inline";
        etiquetas.focus();
        etiquetas.style.border = "solid #ff0909 thin";
        etiquetas.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;
    }*/

    //Validacion talla
    if(categoria.value.toLowerCase() === "ropa" && !tallaChica.checked && !tallaMediana.checked && !tallaGrande.checked){
        alertTalla.style.display = "inline";
        alertTalla.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Seleccione al menos una talla.</span>`);
        tallaGrande.focus();
        tallaGrande.style.border = "solid #ff0909 thin";
        tallaGrande.style.boxShadow = "0 0 5px #ff0909"
        tallaMediana.style.border = "solid #ff0909 thin";
        tallaMediana.style.boxShadow = "0 0 5px #ff0909"
        tallaChica.style.border = "solid #ff0909 thin";
        tallaChica.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;
    }

    //Validacion categoria
    if(categoria.value ===""){
        alertCategoria.style.display = "inline";
        alertCategoria.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Seleccione una categoría.</span>`);
        alertCategoria.style.display= "inline";
        categoria.focus();
        categoria.style.border = "solid #ff0909 thin";
        categoria.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;
    }
    //Validacion precio
    if(precio.value.length ==0){
        alertPrecio.style.display = "inline";
        alertPrecio.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un precio.</span>`);
        alertPrecio.style.display= "inline";
        precio.focus();
        precio.style.border = "solid #ff0909 thin";
        precio.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;

    }else if(parseFloat(precio.value)<=0){
        alertPrecio.style.display = "inline";
        alertPrecio.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un precio válido.</span>`);
        alertPrecio.style.display= "inline";
        precio.focus();
        precio.style.border = "solid #ff0909 thin";
        precio.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;
        

    }else if(parseFloat(precio.value)<10){
        alertPrecio.style.display = "inline";
        alertPrecio.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un precio mayor, mínimo $10.00.</span>`);
        alertPrecio.style.display= "inline";
        precio.focus();
        precio.style.border = "solid #ff0909 thin";
        precio.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;

    }else if(parseFloat(precio.value)>100000){
        alertPrecio.style.display = "inline";
        alertPrecio.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)"> Ingrese un precio menor, máximo $100000.00.</span>`);
        alertPrecio.style.display= "inline";
        precio.focus();
        precio.style.border = "solid #ff0909 thin";
        precio.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;

    }
    if(descripcion.value.length ==0){
        alertDescripcion.style.display = "inline";
        alertDescripcion.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese una descripción.</span>`);
        alertDescripcion.style.display= "inline";
        descripcion.focus();
        descripcion.style.border = "solid #ff0909 thin";
        descripcion.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;

    }else if(descripcion.value.length <10 && descripcion.value.length){
        alertDescripcion.style.display = "inline";
        alertDescripcion.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">La descripción es muy corta.</span>`);
        alertDescripcion.style.display= "inline";
        descripcion.focus();
        descripcion.style.border = "solid #ff0909 thin";
        descripcion.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;

    }else if(descripcion.value.length >500){
        alertDescripcion.style.display = "inline";
        alertDescripcion.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">La descripción es muy larga.</span>`);
        alertDescripcion.style.display= "inline";
        descripcion.focus();
        descripcion.style.border = "solid #ff0909 thin";
        descripcion.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;
    }
    //validacion Nombre Producto
    if(nombreProducto.value.length ==0){
        alertNombreProducto.style.display = "inline";
        alertNombreProducto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese el nombre de su producto.</span>`);
        alertNombreProducto.style.display= "inline";
        nombreProducto.focus();
        nombreProducto.style.border = "solid #ff0909 thin";
        nombreProducto.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;

    }else if(nombreProducto.value.length <4){
        alertNombreProducto.style.display = "inline";
        alertNombreProducto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El nombre del producto es muy corto.</span>`);
        alertNombreProducto.style.display= "inline";
        nombreProducto.focus();
        nombreProducto.style.border = "solid #ff0909 thin";
        nombreProducto.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;
    }else if(nombreProducto.value.length >50){
        alertNombreProducto.style.display = "inline";
        alertNombreProducto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El nombre del producto es muy largo.</span>`);
        alertNombreProducto.style.display= "inline";
        nombreProducto.focus();
        nombreProducto.style.border = "solid #ff0909 thin";
        nombreProducto.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;
    }else if(!expresiones.product.test(nombreProducto.value)){
        alertNombreProducto.style.display = "inline";
        alertNombreProducto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El nombre del producto no es válido.</span>`);
        alertNombreProducto.style.display= "inline";
        nombreProducto.focus();
        nombreProducto.style.border = "solid #ff0909 thin";
        nombreProducto.style.boxShadow = "0 0 5px #ff0909"
        isValid = false;
    }

    /*Aqui terminan las validaciones*/



    if (localStorage.getItem("productosNuevos") != null){
        productosNuevos = JSON.parse(localStorage.getItem("productosNuevos"));
    }else{
        productosNuevos = [];
    }
    if(isValid){
        if(tallaGrande.checked){
            tallasSeleccionadas.push(tallaGrande.value);
        }
        if(tallaMediana.checked){
            tallasSeleccionadas.push(tallaMediana.value);
        }
        if(tallaChica.checked){
            tallasSeleccionadas.push(tallaChica.value);
            
        }
        console.log(tallasSeleccionadas);

        productosNuevos.push(new Producto(nombreProducto.value, descripcion.value, parseFloat(precio.value), categoria.value, tallasSeleccionadas, imagenUrlProducto))
        console.log("productos nuevos");
        localStorage.setItem("productosNuevos", JSON.stringify(productosNuevos));

        alertProductoAgregadoTexto.insertAdjacentHTML("beforeend",`
        <span font-family: var(--barlow); font-size: var( --titulos-h3-rutas)>
            ¡Producto agregado exitosamente! <a href="./tienda.html" class="alert-link">Ver tienda</a>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </span>`);
        alertProductoAgregado.style.display = "block";

        nombreProducto.value = "";
        descripcion.value = "";
        precio.value = "";
        categoria.value = "";
        //etiquetas.value = "";
        imagenProducto.value = "";
        tallaGrande.checked = false;
        tallaMediana.checked = false;
        tallaChica.checked = false;
        nombreProducto.focus();
    }

    
 })




