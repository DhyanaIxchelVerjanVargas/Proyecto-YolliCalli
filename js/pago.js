//////////////////////// TDC /////////////////////////////
let numeroTarjeta = document.querySelector("#numeroTarjeta");
let vencimiento = document.querySelector("#vencimiento");
let opcionTdc = document.querySelector("#opcionTdc");
let pagoTarjeta = document.querySelector("#pagoTarjeta");
let tdcIcon = document.querySelector("#tdcIcon");
let paypalIcon = document.querySelector("#paypalIcon");
let radiobuttonTdc = document.querySelector("#radiobuttonTdc");
let tarjeta = document.querySelector("#card");
let botonTarjetaFrente = document.querySelector("#botonTarjetaFrente");
let botonTarjetaReverso = document.querySelector("#botonTarjetaReverso");

pagoTarjeta.addEventListener("click", function () {
    opcionTdc.classList.add("extend");
    opcionPaypal.classList.remove("extend");
    //
    pagoTarjeta.classList.add("selected");
    tdcIcon.classList.add("selected");
    radiobuttonTdc.classList.add("radioSelected");
    //
    pagoPaypal.classList.remove("selected");
    paypalIcon.classList.remove("selected");
    radiobuttonPaypal.classList.remove("radioSelected");
});

botonTarjetaFrente.addEventListener("click", (e) => {
    e.preventDefault();
    tarjeta.classList.remove("mostrarReverso");
});

botonTarjetaReverso.addEventListener("click", (e) => {
    e.preventDefault();
    tarjeta.classList.add("mostrarReverso");
});

numeroTarjeta.addEventListener("keyup", (e) => {
    let entradaDeUsuario = e.target.value.replaceAll(" ", "");

    if (e.target.value) {
        if (e.target.value.length > 14) {
            e.target.value = entradaDeUsuario.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
            numeroTarjeta.innerHTML = entradaDeUsuario.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
        } else if (e.target.value.length > 9) {
            e.target.value = entradaDeUsuario.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
            numeroTarjeta.innerHTML = entradaDeUsuario.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
        } else if (e.target.value.length > 4) {
            e.target.value = entradaDeUsuario.replace(/(\d{4})(\d{0,4})/, "$1 $2");
            numeroTarjeta.innerHTML = entradaDeUsuario.replace(/(\d{4})(\d{0,4})/, "$1 $2");
        } else {
            numeroTarjeta.innerHTML = entradaDeUsuario;
        }
    }
});

numeroTarjeta.addEventListener("keydown", (e) => {
    if (e.key.match(/^[^0-9]$/)) {
        e.preventDefault();
    }
});

vencimiento.addEventListener("keyup", (e) => {
    let entradaDeUsuario = e.target.value.replaceAll("/", "");

    if (e.target.value) {
        if (e.target.value.length > 2) {
            e.target.value = entradaDeUsuario.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
            vencimiento.innerHTML = entradaDeUsuario.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
        } else {
            vencimiento.innerHTML = entradaDeUsuario;
        }
    }
});
//////////////////////// TDC /////////////////////////////

//////////////////////// Paypal //////////////////////////
let opcionPaypal = document.querySelector("#opcionPaypal");
let pagoPaypal = document.querySelector("#pagoPaypal");
let pagoTotal = 1000;
let nombre = "JC";

pagoPaypal.addEventListener("click", function () {
    opcionTdc.classList.remove("extend");
    opcionPaypal.classList.add("extend");
    //
    pagoTarjeta.classList.remove("selected");
    tdcIcon.classList.remove("selected");
    radiobuttonTdc.classList.remove("radioSelected");
    pagoPaypal.classList.add("selected");
    paypalIcon.classList.add("selected");
    radiobuttonPaypal.classList.add("radioSelected");
});

paypal
    .Buttons({
        style: {
            layout: "vertical",
            color: "blue",
            borderRadius: 10,
        },
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: 1000,
                        },
                    },
                ],
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert("Muchas gracias " + nombre + ", recibimos tu pago, recibirá un correo en cuanto tu orden haya sido creada!");
            });
        },
    })
    .render("#paypal-button-container");

function resultMessage(message) {
    const container = document.querySelector("#result-message");
    container.innerHTML = message;
}
//////////////////////// Paypal //////////////////////////

// Stripe //
/* const stripe = Stripe("pk_test_51P0I0YCxoXxcqfyiASCv6f4xl2sa6nVg3TYKtMJEJiUBGq89OSWw2YSzBEwpg2031rU77ieLLfjg0KrW9pNapIix004JmlfZF1");

const form = document.getElementById("payment-form");
form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const { token, error } = await stripe.createToken(card);
    if (error) {
        console.error("Error:", error);
        const errorElement = document.getElementById("card-errors");
        errorElement.textContent = error.message;
    } else {
        // Send token to your server
        fetch("http://127.0.0.1:4567/charge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: token.id }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
}); */

// Create an instance of Stripe Elements
/* const elements = stripe.elements(); */

// Create an instance of the card Element.
/* const card = elements.create("card"); */

// Add an instance of the card Element into the `card-element` div.
/* card.mount("#card-element"); */

///////////// Validaciones /////////////////
let resumenPedido = document.getElementById("resumenPedido");

//Inputs
let nombreEnvio = document.getElementById("nombreEnvio");
let direccionEnvio = document.getElementById("direccionEnvio");
let ciudadEnvio = document.getElementById("ciudadEnvio");
let estadoEnvio = document.getElementById("estadoEnvio");
let cpEnvio = document.getElementById("cpEnvio");
let telEnvio = document.getElementById("telEnvio");
let correoEnvio = document.getElementById("correoEnvio");
//Inputs

//Alertas
let alertNombreEnvio = document.getElementById("alertNombreEnvio");
let alertDireccionEnvio = document.getElementById("alertDireccionEnvio");
let alertCiudadEnvio = document.getElementById("alertCiudadEnvio");
let alertEstadoEnvio = document.getElementById("alertEstadoEnvio");
let alertCpEnvio = document.getElementById("alertCpEnvio");
let alertCorreoEnvio = document.getElementById("alertCorreoEnvio");
let alertTelefonoEnvio = document.getElementById("alertTelefonoEnvio");

let nombreEnvioRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/;
let direccionEnvioRegex = /^[a-zA-Z0-9\s\.,#]+$/;
let ciudadEnvioRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/;
let cpEnvioRegex = /^\d{5}$/;
let estadoEnvioRegex = /^[a-zA-Z\s]+$/;
let correoRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
let telefonoRegex = /^[0-9]{10}$/;
let numeroTarjetaRegex =
    /(^4(?:[0-9]{4}\s?){3}[0-9]{4}(?:\s?[0-9]{3})?$)|(^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)(?:\s?[0-9]{4}){3}$)|(3[47][0-9]{2}(?:\s?[0-9]{4}){3})|(^3(?:0[0-5]|[68][0-9])(?:\s?[0-9]{4}){3}$)|(^6(?:011|5[0-9]{2})(?:\s?[0-9]{4}){3}$)|(^(?:2131|1800|35\d{3})(?:\s?[0-9]{4}){3}$)/;

nombreEnvio.addEventListener("blur", function () {
    alertNombreEnvio.innerHTML = "";
    alertNombreEnvio.style.display = "none";

    if (!nombreEnvioRegex.test(nombreEnvio.value)) {
        alertNombreEnvio.style.display = "inline";
        alertNombreEnvio.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese su nombre completo.</span>`);
        nombreEnvio.focus();
        nombreEnvio.style.border = "solid #ff0909 thin";
    } else {
        alertNombreEnvio.innerHTML = "";
        alertNombreEnvio.style.display = "none";
        nombreEnvio.style.border = "var(--bs-border-width) solid var(--bs-border-color)";
    }
});

// Validar direccion
direccionEnvio.addEventListener("blur", function () {
    alertDireccionEnvio.innerHTML = "";
    alertDireccionEnvio.style.display = "none";

    if (!direccionEnvioRegex.test(direccionEnvio.value)) {
        alertDireccionEnvio.style.display = "inline";
        alertDireccionEnvio.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese una dirección válida.</span>`);
        direccionEnvio.focus();
        direccionEnvio.style.border = "solid #ff0909 thin";
    } else {
        alertDireccionEnvio.innerHTML = "";
        alertDireccionEnvio.style.display = "none";
        direccionEnvio.style.border = "var(--bs-border-width) solid var(--bs-border-color)";
    }
});

// Validar ciudad
ciudadEnvio.addEventListener("blur", function () {
    alertCiudadEnvio.innerHTML = "";
    alertCiudadEnvio.style.display = "none";

    if (!ciudadEnvioRegex.test(ciudadEnvio.value)) {
        alertCiudadEnvio.style.display = "inline";
        alertCiudadEnvio.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese su ciudad.</span>`);
        ciudadEnvio.focus();
        ciudadEnvio.style.border = "solid #ff0909 thin";
    } else {
        alertCiudadEnvio.innerHTML = "";
        alertCiudadEnvio.style.display = "none";
        ciudadEnvio.style.border = "var(--bs-border-width) solid var(--bs-border-color)";
    }
});

// Validar CP
cpEnvio.addEventListener("blur", function () {
    alertCpEnvio.innerHTML = "";
    alertCpEnvio.style.display = "none";

    if (!cpEnvioRegex.test(cpEnvio.value)) {
        alertCpEnvio.style.display = "inline";
        alertCpEnvio.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Código postal inválido.</span>`);
        cpEnvio.focus();
        cpEnvio.style.border = "solid #ff0909 thin";
    } else {
        alertCpEnvio.innerHTML = "";
        alertCpEnvio.style.display = "none";
        cpEnvio.style.border = "var(--bs-border-width) solid var(--bs-border-color)";
    }
});

// Validar estado
estadoEnvio.addEventListener("blur", function () {
    alertEstadoEnvio.innerHTML = "";
    alertEstadoEnvio.style.display = "none";

    if (estadoEnvio.value == 0) {
        alertEstadoEnvio.style.display = "inline";
        alertEstadoEnvio.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Elija un estado.</span>`);
        estadoEnvio.focus();
        estadoEnvio.style.border = "solid #ff0909 thin";
    }

    estadoEnvio.addEventListener("change", function () {
        alertEstadoEnvio.innerHTML = "";
        alertEstadoEnvio.style.display = "none";

        if (estadoEnvio.value == 0) {
            alertEstadoEnvio.style.display = "inline";
            alertEstadoEnvio.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Elija un estado.</span>`);
            estadoEnvio.focus();
            estadoEnvio.style.border = "solid #ff0909 thin";
        } else {
            alertEstadoEnvio.innerHTML = "";
            alertEstadoEnvio.style.display = "none";
            estadoEnvio.style.border = "var(--bs-border-width) solid var(--bs-border-color)";
        }
    });
});

// Validar teléfono
telEnvio.addEventListener("blur", function () {
    alertTelefonoEnvio.innerHTML = "";
    alertTelefonoEnvio.style.display = "none";

    if (!telefonoRegex.test(telEnvio.value)) {
        alertTelefonoEnvio.style.display = "inline";
        alertTelefonoEnvio.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Número inválido.</span>`);
        telEnvio.focus();
        telEnvio.style.border = "solid #ff0909 thin";
    } else {
        alertTelefonoEnvio.innerHTML = "";
        alertTelefonoEnvio.style.display = "none";
        telEnvio.style.border = "var(--bs-border-width) solid var(--bs-border-color)";
    }
});

// Validar correo
correoEnvio.addEventListener("blur", function () {
    alertCorreoEnvio.innerHTML = "";
    alertCorreoEnvio.style.display = "none";

    if (!correoRegex.test(correoEnvio.value)) {
        alertCorreoEnvio.style.display = "inline";
        alertCorreoEnvio.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un correo válido.</span>`);
        correoEnvio.focus();
        correoEnvio.style.border = "solid #ff0909 thin";
    } else {
        alertCorreoEnvio.innerHTML = "";
        alertCorreoEnvio.style.display = "none";
        correoEnvio.style.border = "var(--bs-border-width) solid var(--bs-border-color)";
    }
});

// Validar tdc
let campoNumeroTarjeta = document.getElementById("campoNumeroTarjeta");

numeroTarjeta.addEventListener("change", function () {
    console.log(numeroTarjeta.value);
    if (!numeroTarjetaRegex.test(numeroTarjeta.value)) {
        campoNumeroTarjeta.style.borderBottom = "2px solid #ff0909";
    } else {
        campoNumeroTarjeta.style.borderBottom = "1px solid var(--blanco)";
    }
});

//Resumen de pago
let cantidadProductos = document.getElementById("cantidadProductos");
let cantidadSubtotal = document.getElementById("cantidadSubtotal");
let cantidadEnvio = document.getElementById("cantidadEnvio");
let cantidadTotal = document.getElementById("cantidadTotal");
let cantidadDeProductos = document.getElementById("cantidadDeProductos");

let productosCarrito = JSON.parse(localStorage.getItem("productosCarrito"));
let envio = localStorage.getItem("envio");
let subtotal = localStorage.getItem("subtotal");
let total = localStorage.getItem("total");

cantidadProductos.innerText = "$" + subtotal;
cantidadSubtotal.innerText = "$" + subtotal;
cantidadEnvio.innerHTML = "$" + envio;
cantidadTotal.innerText = "$" + total;

console.log(productosCarrito);

let sumaProductos = 0;

productosCarrito.forEach((element) => {
    sumaProductos = sumaProductos + element.cantidad;
});

cantidadDeProductos.innerHTML = sumaProductos;
