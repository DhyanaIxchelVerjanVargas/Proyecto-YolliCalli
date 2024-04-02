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
let alertRegistroUsuarioTexto =document.getElementById("alertRegistroUsuarioTexto")
let alertRegistroUsuario = document.getElementById("alertRegistroUsuario")
let alertInicioSesion = document.getElementById("alertInicioSesion");
let alertInicioSesionTexto = document.getElementById("alertInicioSesionTexto");
let isLogged = false;
let personaNueva = new Array();


const expresiones = {
    nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/,
    correo: /^[\w.-]+@[a-zA-Z_-]+(?:\.[a-zA-Z]{2,6})+$/,
    telefono: /^\d{10}$/,
    contrasena: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
};

class  Persona{
    nombreRegistro="";
    emailRegistro="";
    telefonoRegistro="";
    contrasenaRegistro="";
   // id="";
    //static total=0;

    constructor(nombreRegistro, emailRegistro, telefonoRegistro,contrasenaRegistro ){
        this.nombreRegistro= nombreRegistro;
        this.emailRegistro= emailRegistro;
        this.telefonoRegistro= telefonoRegistro;
        this.contrasenaRegistro= contrasenaRegistro;
    }
}
botonRegistrar.addEventListener("click", function(event) {
    event.preventDefault();
    let isCorrect = true;
    alertRegistroUsuarioTexto.innerHTML="";
    alertNombreCompleto.innerHTML = "";
    alertEmailRegistro.innerHTML = "";
    alertTelefonoRegistro.innerHTML = "";
    alertContrasena.innerHTML = "";
    alertConfirmarContrasena.innerHTML = "";
    alertCondicionesRegistro.innerHTML = "";

    alertRegistroUsuario.style.display= "none";
    alertNombreCompleto.style.display = "none";
    alertEmailRegistro.style.display = "none";
    alertTelefonoRegistro.style.display = "none";
    alertContrasena.style.display = "none";
    alertConfirmarContrasena.style.display = "none";
    alertCondicionesRegistro.style.display = "none";

    checkCondicionesRegistro.style.border = "solid var(--rosa-mexicano) thin";
    checkCondicionesRegistro.style.removeProperty("box-shadow");
    inputNombreCompletoRegistro.style.border = "solid var(--rosa-mexicano) thin";
    inputNombreCompletoRegistro.style.removeProperty("box-shadow");
    inputEmailRegistro.style.border = "solid var(--rosa-mexicano) thin";
    inputEmailRegistro.style.removeProperty("box-shadow");
    inputTelefonoRegistro.style.removeProperty("border");
    inputTelefonoRegistro.style.removeProperty("box-shadow");
    inputTelefonoRegistro.style.border = "solid var(--rosa-mexicano) thin";
    inputContrasenaRegistro.style.border = "solid var(--rosa-mexicano) thin";
    inputContrasenaRegistro.style.removeProperty("box-shadow");
    inputConfirmarContrasena.style.border = "solid var(--rosa-mexicano) thin";
    inputConfirmarContrasena.style.removeProperty("box-shadow");

    inputNombreCompletoRegistro.value = inputNombreCompletoRegistro.value.trim();
    inputEmailRegistro.value = inputEmailRegistro.value.trim();
    inputTelefonoRegistro.value = inputTelefonoRegistro.value.trim();
    inputContrasenaRegistro.value = inputContrasenaRegistro.value.trim();
    inputConfirmarContrasena.value = inputConfirmarContrasena.value.trim();
    isCorrect = true;
    //usuario ya registrado
    let usuariosGuardados = JSON.parse(localStorage.getItem("personaNueva")) || [];
    if (usuariosGuardados.some(usuario => usuario.emailRegistro === inputEmailRegistro.value)) {
        alertEmailRegistro.style.display = "inline";
        alertEmailRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Este correo electrónico ya está registrado.</span>`);
        inputEmailRegistro.focus();
        inputEmailRegistro.style.border = "solid #ff0909 thin";
        inputEmailRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
     //validacion politicas
    if (!checkCondicionesRegistro.checked) {
        alertCondicionesRegistro.style.display = "inline";
        alertCondicionesRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Debe aceptar política de privacidad.</span>`);
        checkCondicionesRegistro.focus();
        checkCondicionesRegistro.style.border = "solid #ff0909 thin";
        checkCondicionesRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //Validacion confirmacion de contraseña
    if (inputConfirmarContrasena.value !== inputContrasenaRegistro.value) {
        alertConfirmarContrasena.style.display = "inline";
        alertConfirmarContrasena.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Las contraseñas no coinciden.</span>`);
        inputConfirmarContrasena.focus();
        inputConfirmarContrasena.style.border = "solid #ff0909 thin";
        inputConfirmarContrasena.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //Validacion de contrtseña
    if (inputContrasenaRegistro.value.length < 8) {
        alertContrasena.style.display = "inline";
        alertContrasena.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">La contraseña debe tener al menos 8 caracteres.</span>`);
        inputContrasenaRegistro.focus();
        inputContrasenaRegistro.style.border = "solid #ff0909 thin";
        inputContrasenaRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //validacion correo
    if (inputEmailRegistro.value.length == 0) {
        alertEmailRegistro.style.display = "inline";
        alertEmailRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un correo.</span>`);
        inputEmailRegistro.focus();
        inputEmailRegistro.style.border = "solid #ff0909 thin";
        inputEmailRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    } else if (!expresiones.correo.test(inputEmailRegistro.value) || inputEmailRegistro.value.length <= 5) {
        alertEmailRegistro.style.display = "inline";
        alertEmailRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Correo inválido.</span>`);
        inputEmailRegistro.focus();
        inputEmailRegistro.style.border = "solid #ff0909 thin";
        inputEmailRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //validacion telefono
    if (inputTelefonoRegistro.value.length == 0) {
        alertTelefonoRegistro.style.display = "inline";
        alertTelefonoRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un número de teléfono.</span>`);
        inputTelefonoRegistro.focus();
        inputTelefonoRegistro.style.border = "solid #ff0909 thin";
        inputTelefonoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    } else if (!expresiones.telefono.test(inputTelefonoRegistro.value)) {
        alertTelefonoRegistro.style.display = "inline";
        alertTelefonoRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Número de teléfono inválido.</span>`);
        inputTelefonoRegistro.focus();
        inputTelefonoRegistro.style.border = "solid #ff0909 thin";
        inputTelefonoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }else if (inputTelefonoRegistro.value == 0) {
        alertTelefonoRegistro.style.display = "inline";
        alertTelefonoRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un número de teléfono válido.</span>`);
        inputTelefonoRegistro.focus();
        inputTelefonoRegistro.style.border = "solid #ff0909 thin";
        inputTelefonoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //validacion nombre completo
    if (inputNombreCompletoRegistro.value.length == 0) {
        alertNombreCompleto.style.display = "inline";
        alertNombreCompleto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese su nombre completo.</span>`);
        inputNombreCompletoRegistro.focus();
        inputNombreCompletoRegistro.style.border = "solid #ff0909 thin";
        inputNombreCompletoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }else if (inputNombreCompletoRegistro.value.length <=4) {
        alertNombreCompleto.style.display = "inline";
        alertNombreCompleto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El nombre es muy corto.</span>`);
        inputNombreCompletoRegistro.focus();
        inputNombreCompletoRegistro.style.border = "solid #ff0909 thin";
        inputNombreCompletoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }
    //Fin de las validaciones
    //amonos 

    // if(localStorage.getItem("personaNueva") !=null){
    //     personaNueva = JSON.parse(localStorage.getItem("personaNueva"));
    // }else{
    //     personaNueva=[];
    // }
    if(isCorrect){
        personaNueva.push(new Persona(inputNombreCompletoRegistro.value,inputEmailRegistro.value, inputTelefonoRegistro.value,inputContrasenaRegistro.value  ));
        localStorage.setItem("personaNueva", JSON.stringify(personaNueva));
   
        alertRegistroUsuarioTexto.insertAdjacentHTML("beforeend",`
        <span style="font-family: var(--barlow); font-size: var( --titulos-h3-rutas);">
            ¡Registro exitoso!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </span>`);
        alertRegistroUsuario.style.display = "flex";
        alertRegistroUsuario.setAttribute("tabindex", "-1");
        alertRegistroUsuario.focus();  
        inputNombreCompletoRegistro.value = "";
        inputEmailRegistro.value = "";
        inputTelefonoRegistro.value = "";
        inputContrasenaRegistro.value = "";
        inputConfirmarContrasena.value = "";
        checkCondicionesRegistro.value = "";
    }

});
let inputEmailInicioSesion = document.getElementById("inputEmailInicioSesion");
let inputContrasenaInicioSesion = document.getElementById("inputContrasenaInicioSesion");
let botonIniciarSesion = document.getElementById("boton-iniciar-sesion");

let alertEmailInicioSesion = document.getElementById("alertEmailInicioSesion");
let alertContrasenaInicioSesion = document.getElementById("alertContrasenaInicioSesion");


botonIniciarSesion.addEventListener("click", function(event) {
    event.preventDefault();
    alertEmailInicioSesion.innerHTML = "";
    alertContrasenaInicioSesion.innerHTML = "";
    alertInicioSesionTexto.innerHTML= "";
    alertEmailInicioSesion.style.display = "none";
    alertInicioSesion.style.display ="none";
    alertContrasenaInicioSesion.style.display = "none";
    alertRegistroUsuarioTexto.innerHTML="";
    alertRegistroUsuario.style.display="none";
    inputEmailInicioSesion.style.border = "solid var(--rosa-mexicano) thin";
    inputEmailInicioSesion.style.removeProperty("box-shadow");
    inputContrasenaInicioSesion.style.border = "solid var(--rosa-mexicano) thin";
    inputContrasenaInicioSesion.style.removeProperty("box-shadow");

    //variable que recupera la informacion de localstoraege
    let usuariosGuardados = JSON.parse(localStorage.getItem("personaNueva")) || [];
    //(usuario => usuario.emailRegistro === inputEmailInicioSesion.value);
    let usuarioEncontrado = usuariosGuardados.find(usuario => usuario.emailRegistro === inputEmailInicioSesion.value);
    let contrasenaEncontrada = usuariosGuardados.find(usuario => usuario.contrasenaRegistro === inputContrasenaInicioSesion.value);
    console.log(usuarioEncontrado);
    
    
    if (!usuarioEncontrado || !contrasenaEncontrada) {
        alertInicioSesionTexto.insertAdjacentHTML("beforeend",`
        <span style="font-family: var(--barlow); font-size: var( --titulos-h3-rutas);">
            Usuario o contraseña incorrectos.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </span>`);
        alertInicioSesion.style.display = "flex";
        inputEmailInicioSesion.focus();
        inputEmailInicioSesion.style.border = "solid #ff0909 thin";
        inputEmailInicioSesion.style.boxShadow = "0 0 5px #ff0909";
        inputContrasenaInicioSesion.style.border = "solid #ff0909 thin";
        inputContrasenaInicioSesion.style.boxShadow = "0 0 5px #ff0909";
        isLogged = false;
    } else{
        isLogged = true;
        sessionStorage.setItem("isLogged", isLogged);
        alertRegistroUsuarioTexto.insertAdjacentHTML("beforeend",`
        <span style="font-family: var(--barlow); font-size: var( --titulos-h3-rutas);">
            Iniciando sesión...
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </span>`);
        alertRegistroUsuario.style.display = "flex";
        setTimeout(function() {
            location.href = "index.html";
        }, 2000);
    }
    
        
    
    })