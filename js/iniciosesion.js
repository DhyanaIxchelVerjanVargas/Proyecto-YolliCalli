//Validaciones para Registro

let inputNombreCompletoRegistro = document.getElementById("inputNombreCompletoRegistro");
let inputEmailRegistro = document.getElementById("inputEmailRegistro");
let inputTelefonoRegistro = document.getElementById("inputTelefonoRegistro");
let inputContrasenaRegistro = document.getElementById("nuevaContraseñaRegistro");
let inputConfirmarContrasena = document.getElementById("inputConfirmarContrasena");
let checkCondicionesRegistro = document.getElementById("terms");
let botonRegistrar = document.getElementById("boton-registrar");

let alertNombreCompleto = document.getElementById("alertNombreCompleto");
let alertEmailRegistro = document.getElementById("alertEmailRegistro");
let alertTelefonoRegistro = document.getElementById("alertTelefonoRegistro");
let alertContrasena = document.getElementById("alertContrasena");
let alertConfirmarContrasena = document.getElementById("alertConfirmarContrasena");
let alertCondicionesRegistro = document.getElementById("alertCondicionesRegistro");

const expresiones = {
    nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/,
    correo: /^[\w.-]+@[a-zA-Z_-]+(?:\.[a-zA-Z]{2,6})+$/,
    telefono: /^\d{10}$/,
    contrasena: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
};

botonRegistrar.addEventListener("click", function(event) {
    event.preventDefault();
    let isCorrect = true;

    alertNombreCompleto.innerHTML = "";
    alertEmailRegistro.innerHTML = "";
    alertTelefonoRegistro.innerHTML = "";
    alertContrasena.innerHTML = "";
    alertConfirmarContrasena.innerHTML = "";
    alertCondicionesRegistro.innerHTML = "";

    alertNombreCompleto.style.display = "none";
    alertEmailRegistro.style.display = "none";
    alertTelefonoRegistro.style.display = "none";
    alertContrasena.style.display = "none";
    alertConfirmarContrasena.style.display = "none";
    alertCondicionesRegistro.style.display = "none";

    checkCondicionesRegistro.style.border = "solid var(--azul-talavera) thin";
    checkCondicionesRegistro.style.removeProperty("box-shadow");
    inputNombreCompletoRegistro.style.border = "solid var(--azul-talavera) thin";
    inputNombreCompletoRegistro.style.removeProperty("box-shadow");
    inputEmailRegistro.style.border = "solid var(--azul-talavera) thin";
    inputEmailRegistro.style.removeProperty("box-shadow");
    inputTelefonoRegistro.style.removeProperty("border");
    inputTelefonoRegistro.style.removeProperty("box-shadow");
    inputContrasenaRegistro.style.border = "solid var(--azul-talavera) thin";
    inputContrasenaRegistro.style.removeProperty("box-shadow");
    inputConfirmarContrasena.style.border = "solid var(--azul-talavera) thin";
    inputConfirmarContrasena.style.removeProperty("box-shadow");

    inputNombreCompletoRegistro.value = inputNombreCompletoRegistro.value.trim();
    inputEmailRegistro.value = inputEmailRegistro.value.trim();
    inputTelefonoRegistro.value = inputTelefonoRegistro.value.trim();
    inputContrasenaRegistro.value = inputContrasenaRegistro.value.trim();
    inputConfirmarContrasena.value = inputConfirmarContrasena.value.trim();
    isCorrect = true;
    //validacion politicas
    if (!checkCondicionesRegistro.checked) {
        alertCondicionesRegistro.style.display = "inline";
        alertCondicionesRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Debe aceptar política de privacidad.</span>`);
        alertCondicionesRegistro.style.display = "inline";
        checkCondicionesRegistro.focus();
        checkCondicionesRegistro.style.border = "solid #ff0909 thin";
        checkCondicionesRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //Validacion confirmacion de contraseña
    if (inputConfirmarContrasena.value !== inputContrasenaRegistro.value) {
        alertConfirmarContrasena.style.display = "inline";
        alertConfirmarContrasena.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Las contraseñas no coinciden.</span>`);
        alertConfirmarContrasena.style.display = "inline";
        inputConfirmarContrasena.focus();
        inputConfirmarContrasena.style.border = "solid #ff0909 thin";
        inputConfirmarContrasena.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //Validacion de contrtseña
    if (inputContrasenaRegistro.value.length < 8) {
        alertContrasena.style.display = "inline";
        alertContrasena.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">La contraseña debe tener al menos 8 caracteres.</span>`);
        alertContrasena.style.display = "inline";
        inputContrasenaRegistro.focus();
        inputContrasenaRegistro.style.border = "solid #ff0909 thin";
        inputContrasenaRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //validacion correo
    if (inputEmailRegistro.value.length == 0) {
        alertEmailRegistro.style.display = "inline";
        alertEmailRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un correo.</span>`);
        alertEmailRegistro.style.display = "inline";
        inputEmailRegistro.focus();
        inputEmailRegistro.style.border = "solid #ff0909 thin";
        inputEmailRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    } else if (!expresiones.correo.test(inputEmailRegistro.value) || inputEmailRegistro.value.length <= 5) {
        alertEmailRegistro.style.display = "inline";
        alertEmailRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Correo inválido.</span>`);
        alertEmailRegistro.style.display = "inline";
        inputEmailRegistro.focus();
        inputEmailRegistro.style.border = "solid #ff0909 thin";
        inputEmailRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //validacion telefono
    if (inputTelefonoRegistro.value.length == 0) {
        alertTelefonoRegistro.style.display = "inline";
        alertTelefonoRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un número de teléfono.</span>`);
        alertTelefonoRegistro.style.display = "inline";
        inputTelefonoRegistro.focus();
        inputTelefonoRegistro.style.border = "solid #ff0909 thin";
        inputTelefonoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    } else if (!expresiones.telefono.test(inputTelefonoRegistro.value)) {
        alertTelefonoRegistro.style.display = "inline";
        alertTelefonoRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Número de teléfono inválido.</span>`);
        alertTelefonoRegistro.style.display = "inline";
        inputTelefonoRegistro.focus();
        inputTelefonoRegistro.style.border = "solid #ff0909 thin";
        inputTelefonoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //validacion nombre completo
    if (inputNombreCompletoRegistro.value.length == 0) {
        alertNombreCompleto.style.display = "inline";
        alertNombreCompleto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese su nombre completo.</span>`);
        alertNombreCompleto.style.display = "inline";
        inputNombreCompletoRegistro.focus();
        inputNombreCompletoRegistro.style.border = "solid #ff0909 thin";
        inputNombreCompletoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }else if (inputNombreCompletoRegistro.value.length <=10) {
        alertNombreCompleto.style.display = "inline";
        alertNombreCompleto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El nombre es muy corto.</span>`);
        alertNombreCompleto.style.display = "inline";
        inputNombreCompletoRegistro.focus();
        inputNombreCompletoRegistro.style.border = "solid #ff0909 thin";
        inputNombreCompletoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
});