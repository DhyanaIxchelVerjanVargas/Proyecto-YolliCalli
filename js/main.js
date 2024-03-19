/*Sección de la barra de navegación */
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
    if (txtBusqueda.value.length == 0 && divBusqueda.clientWidth <= 10) {
        divBusqueda.style.width = "200px";
        divBusqueda.style.marginRight = "29px";
    } else if (txtBusqueda.value.length == 0 && divBusqueda.clientWidth >= 190) {
        divBusqueda.style.width = "0px";
        divBusqueda.style.marginRight = "1px";
        txtBusqueda.value = "";
    } else {
        console.log("se mandara a buscar el producto y se ira a la pagina de tienda");
        localStorage.setItem("productoBuscar", txtBusqueda.value);
        txtBusqueda.value = txtBusqueda.value.trim();
        txtBusqueda.value = "";
        location.href = "tienda.html";
    }
});

txtBusqueda.addEventListener("keyup", function (event) {
    if (event.code == "Enter" && txtBusqueda.value.length != 0) {
        location.href = "tienda.html";
        localStorage.setItem("productoBuscar", txtBusqueda.value);
    }
});

window.addEventListener("resize", function () {
    if (window.matchMedia("(max-width: 670px)").matches) {
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
});
window.addEventListener("load", function () {
    if (window.matchMedia("(max-width: 670px)").matches) {
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
});
/*Sección de la barra de navegación */

/*Sección de login */
let profileButton = document.getElementById("profileButton");
let loginButton = document.getElementById("loginButton");
let userLogged = sessionStorage.getItem("isLogged") === "true";

if (userLogged) {
    loginButton.innerText = "Cerrar Sesión";
} else {
    loginButton.innerText = "Ingresar";
}

loginButton.addEventListener("click", function (event) {
    if (userLogged) {
        event.preventDefault();
        sessionStorage.setItem("isLogged", "false");
        window.location.href = "./index.html";
    }
});

profileButton.addEventListener("click", function (event) {
    if (!userLogged) {
        event.preventDefault();
        window.location.href = "./iniciosesion.html";
    }
});
