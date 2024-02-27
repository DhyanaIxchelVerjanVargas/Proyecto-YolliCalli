/*Secion de la barra de navegacion */
let divBusqueda = document.getElementById("divBusqueda");
let btnBuscar = document.getElementById("btnBuscar");
let btnCancelarBusqueda = document.getElementById("CancelarBusqueda");
let txtBusqueda = document.getElementById("txtBusqueda");
let anchoPantalla = window.innerWidth;

btnBuscar.addEventListener("click", function(event){
    anchoPantalla = window.innerWidth;
    txtBusqueda.value = txtBusqueda.value.trim();
    if (txtBusqueda.value.length == 0 && txtBusqueda.clientWidth <= 10){
        divBusqueda.style.width = "200px";
        divBusqueda.style.marginRight = "29px";
        txtBusqueda.style.width = "200px";
        
    } else if(txtBusqueda.value.length == 0 && txtBusqueda.clientWidth >= 50 ){
        divBusqueda.style.width = "0px";
        divBusqueda.style.marginRight = "1px"
        txtBusqueda.style.width = "0px";
        txtBusqueda.value = "";
    } else {
        
        console.log("se mandara a buscar el producto y se ira a la pagina de tienda");
        sessionStorage.setItem("palabraBuscada", txtBusqueda.value);
        txtBusqueda.value = txtBusqueda.value.trim();
        txtBusqueda.value = "";
        location.href = "tienda.html";
        
        
    }
})

txtBusqueda.addEventListener("keyup", function(event){
    if(event.code == 'Enter' && txtBusqueda.value.length != 0){
        location.href = "tienda.html";
        sessionStorage.setItem("palabraBuscada", txtBusqueda.value);
    }
});

btnCancelarBusqueda.addEventListener("click",function(event){
    divBusqueda.style.width = "0px";
    divBusqueda.style.marginRight = "1px"
    txtBusqueda.style.width = "0px";
    txtBusqueda.value = txtBusqueda.value.trim();
    txtBusqueda.value = "";
    
})
/*Secion de la barra de navegacion */