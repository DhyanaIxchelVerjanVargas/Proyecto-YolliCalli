let nombreProducto = document.getElementById("nombreProducto");
let descripcion = document.getElementById("descripcion");
let precio = document.getElementById("precio");
let categoria = document.getElementById("categoria");
let etiquetas = document.getElementById("etiquetas");
let imagenProducto = document.getElementById("imagenProducto");
let botonProducto = document.getElementById("botonProducto");


let alertNombreProducto = document.getElementById("alertNombreProducto")
let alertDescripcion = document.getElementById("alertDescripcion")
let alertPrecio = document.getElementById("alertPrecio")
let alertCategoria = document.getElementById("alertCategoria")
let alertEtiquetas = document.getElementById("alertEtiquetas")
let alertImagenProducto = document.getElementById("alertImagenProducto")

const expresiones = {
    product: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/,
    price: /^\d{5}$/,
    tags: /^[a-zA-ZáéíóúüñÑÁÉÍÓÚÜ\s,']+$/,
    image: /\.(jpg|jpeg|png)$/
    
}
botonProducto.addEventListener("click", function(event) {
    event.preventDefault(); 
    let isValid = true;
    
    alertNombreProducto.innerHTML = "";
    alertDescripcion.innerHTML = "";
    alertPrecio.innerHTML = "";
    alertCategoria.innerHTML = "";
    alertEtiquetas.innerHTML = "";
    alertImagenProducto.innerHTML = "";

    alertNombreProducto.style.display= "none";
    alertDescripcion.style.display= "none";
    alertPrecio.style.display= "none";
    alertCategoria.style.display= "none";
    alertEtiquetas.style.display= "none";
    alertImagenProducto.style.display= "none";

    nombreProducto.style.border = "solid var(--rosa-mexicano) thin";
    nombreProducto.style.removeProperty("box-shadow");
    descripcion.style.border = "solid var(--rosa-mexicano) thin";
    descripcion.style.removeProperty("box-shadow");
    precio.style.border = "solid var(--rosa-mexicano) thin";
    precio.style.removeProperty("box-shadow");
    categoria.style.border = "solid var(--rosa-mexicano) thin";
    categoria.style.removeProperty("box-shadow");
    etiquetas.style.border = "solid var(--rosa-mexicano) thin";
    etiquetas.style.removeProperty("box-shadow");
    imagenProducto.style.border = "solid var(--rosa-mexicano) thin";
    imagenProducto.style.removeProperty("box-shadow");

    nombreProducto.value = nombreProducto.value.trim();
    descripcion.value = descripcion.value.trim();
    etiquetas.value = etiquetas.value.trim();
    isValid= true;
     
    //validacion imagen
    //-----------------
    if (imagenProducto.files.length == 0) {
        alertImagenProducto.style.display = "inline";
        alertImagenProducto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Seleccione una imagen.</span>`);
        alertImagenProducto.style.display = "inline";
        imagenProducto.focus();
        imagenProducto.style.border = "solid #ff0909 thin";
        imagenProducto.style.boxShadow = "0 0 5px #ff0909";
        isValid = false;
    } else if((!expresiones.image.test(imagenProducto.value.toLowerCase()))) {
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
    if(etiquetas.value.length ==0){
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
})

