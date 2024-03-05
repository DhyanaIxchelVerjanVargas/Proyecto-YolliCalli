/*Secion de la barra de navegacion */
let divBusqueda = document.getElementById("divBusqueda");
let btnBuscar = document.getElementById("btnBuscar");
let btnCancelarBusqueda = document.getElementById("CancelarBusqueda");
let txtBusqueda = document.getElementById("txtBusqueda");
let anchoPantalla = window.innerWidth;

let navbar = document.getElementById("navbar");
let navIcons = document.getElementById("navIcons");
let navMenu = document.getElementById("navMenu");
let searchField = document.getElementById("searchField");
let offcanvasbody = document.getElementById("offcanvas-body");
let header = document.getElementById("header");

btnBuscar.addEventListener("click", function (event) {
    anchoPantalla = window.innerWidth;
    txtBusqueda.value = txtBusqueda.value.trim();

    console.log("se mandara a buscar el producto y se ira a la pagina de tienda");
    sessionStorage.setItem("palabraBuscada", txtBusqueda.value);
    txtBusqueda.value = txtBusqueda.value.trim();
    txtBusqueda.value = "";
    location.href = "tienda.html";
});

txtBusqueda.addEventListener("keyup", function (event) {
    if (event.code == "Enter" && txtBusqueda.value.length != 0) {
        location.href = "tienda.html";
        sessionStorage.setItem("palabraBuscada", txtBusqueda.value);
    }
});

if (window.matchMedia("(max-width: 425px)").matches) {
    navbar.appendChild(searchField);
    navbar.insertBefore(searchField, navbar.children[1]);
    offcanvasbody.appendChild(navMenu);
    offcanvasbody.appendChild(navIcons);
} else {
    navIcons.appendChild(searchField);
    navIcons.insertBefore(searchField, navIcons.children[0]);
    navbar.appendChild(navMenu);
    navbar.appendChild(navIcons);
}

/* btnCancelarBusqueda.addEventListener("click", function (event) {
    divBusqueda.style.width = "0px";
    divBusqueda.style.marginRight = "1px";
    txtBusqueda.value = txtBusqueda.value.trim();
    txtBusqueda.value = "";
}); */
/*Secion de la barra de navegacion */
