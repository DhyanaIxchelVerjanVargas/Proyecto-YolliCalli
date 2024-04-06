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
let alertRegistroUsuarioTexto = document.getElementById("alertRegistroUsuarioTexto");
let alertRegistroUsuario = document.getElementById("alertRegistroUsuario");
let alertInicioSesion = document.getElementById("alertInicioSesion");
let alertInicioSesionTexto = document.getElementById("alertInicioSesionTexto");
let isLogged = false;
let personaNueva = [];

const expresiones = {
    nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/,
    correo: /^[\w.-]+@[a-zA-Z_-]+(?:\.[a-zA-Z]{2,6})+$/,
    telefono: /^\d{10}$/,
    contrasena: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
};

class Persona {
    nombreRegistro = "";
    emailRegistro = "";
    telefonoRegistro = "";
    contrasenaRegistro = "";

    constructor(nombreRegistro, emailRegistro, telefonoRegistro, contrasenaRegistro) {
        this.nombreRegistro = nombreRegistro;
        this.emailRegistro = emailRegistro;
        this.telefonoRegistro = telefonoRegistro;
        this.contrasenaRegistro = contrasenaRegistro;
    }
}

botonRegistrar.addEventListener("click", function (event) {
    event.preventDefault();
    let isCorrect = true;
    alertRegistroUsuarioTexto.innerHTML = "";
    alertNombreCompleto.innerHTML = "";
    alertEmailRegistro.innerHTML = "";
    alertTelefonoRegistro.innerHTML = "";
    alertContrasena.innerHTML = "";
    alertConfirmarContrasena.innerHTML = "";
    alertCondicionesRegistro.innerHTML = "";

    alertRegistroUsuario.style.display = "none";
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

    let usuariosGuardados = JSON.parse(localStorage.getItem("personaNueva")) || [];
    if (usuariosGuardados.some(usuario => usuario.emailRegistro === inputEmailRegistro.value)) {
        alertEmailRegistro.style.display = "inline";
        alertEmailRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Este correo electrónico ya está registrado.</span>`);
        inputEmailRegistro.focus();
        inputEmailRegistro.style.border = "solid #ff0909 thin";
        inputEmailRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }

    if (!checkCondicionesRegistro.checked) {
        alertCondicionesRegistro.style.display = "inline";
        alertCondicionesRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Debe aceptar la política de privacidad.</span>`);
        checkCondicionesRegistro.focus();
        checkCondicionesRegistro.style.border = "solid #ff0909 thin";
        checkCondicionesRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }

    if (inputConfirmarContrasena.value !== inputContrasenaRegistro.value) {
        alertConfirmarContrasena.style.display = "inline";
        alertConfirmarContrasena.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Las contraseñas no coinciden.</span>`);
        inputConfirmarContrasena.focus();
        inputConfirmarContrasena.style.border = "solid #ff0909 thin";
        inputConfirmarContrasena.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }

    if (inputContrasenaRegistro.value.length < 8) {
        alertContrasena.style.display = "inline";
        alertContrasena.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">La contraseña debe tener al menos 8 caracteres.</span>`);
        inputContrasenaRegistro.focus();
        inputContrasenaRegistro.style.border = "solid #ff0909 thin";
        inputContrasenaRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }

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
    } else if (inputTelefonoRegistro.value == 0) {
        alertTelefonoRegistro.style.display = "inline";
        alertTelefonoRegistro.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un número de teléfono válido.</span>`);
        inputTelefonoRegistro.focus();
        inputTelefonoRegistro.style.border = "solid #ff0909 thin";
        inputTelefonoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }

    if (inputNombreCompletoRegistro.value.length == 0) {
        alertNombreCompleto.style.display = "inline";
        alertNombreCompleto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese su nombre completo.</span>`);
        inputNombreCompletoRegistro.focus();
        inputNombreCompletoRegistro.style.border = "solid #ff0909 thin";
        inputNombreCompletoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    } else if (inputNombreCompletoRegistro.value.length <= 5) {
        alertNombreCompleto.style.display = "inline";
        alertNombreCompleto.insertAdjacentHTML("beforeend", `<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El nombre es muy corto.</span>`);
        inputNombreCompletoRegistro.focus();
        inputNombreCompletoRegistro.style.border = "solid #ff0909 thin";
        inputNombreCompletoRegistro.style.boxShadow = "0 0 5px #ff0909";
        isCorrect = false;
    }

    if (isCorrect) {
    let datos = {
    nombre: inputNombreCompletoRegistro.value.trim(),
    correo: inputEmailRegistro.value.trim(),
    telefono: inputTelefonoRegistro.value.trim()
};


    if (inputConfirmarContrasena.value === inputContrasenaRegistro.value) {
    datos.contrasenia = inputContrasenaRegistro.value.trim(); 
}

    const requestOptions = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(datos) 
};

    fetch("https://yollicalli-back.onrender.com/api/usuarios/", requestOptions)
    .then(response => {
        if (response.ok) {
            if (response.status === 204) {
                return "";
            } else {
                return response.json();
            }
        } else {
            throw new Error("Error al registrar usuario");
        }
    })
    .then(data => {
        if (data !== "") {
            console.log("Usuario registrado:", data);
            alertRegistroUsuarioTexto.innerHTML = "<span style='font-family: var(--barlow); font-size: var(--titulos-h3-rutas);'>¡Registro exitoso!</span>";
            alertRegistroUsuario.style.display = "flex";
            alertRegistroUsuario.setAttribute("tabindex", "-1");
            alertRegistroUsuario.focus();
            inputNombreCompletoRegistro.value = "";
            inputEmailRegistro.value = "";
            inputTelefonoRegistro.value = "";
            inputContrasenaRegistro.value = "";
            inputConfirmarContrasena.value = "";
            checkCondicionesRegistro.checked = false;
        } else {
            console.log("La respuesta del servidor está vacía");
        }
    })
    .catch(error => {
        console.error("Error:", error);
    });

    }

});

let botonIniciar = document.getElementById("boton-iniciar-sesion");

botonIniciar.addEventListener("click", function (event) {
    event.preventDefault();
    alertEmailInicioSesion.innerHTML = "";
    alertContrasenaInicioSesion.innerHTML = "";
    alertInicioSesionTexto.innerHTML = "";
    alertEmailInicioSesion.style.display = "none";
    alertInicioSesion.style.display = "none";
    alertContrasenaInicioSesion.style.display = "none";
    alertRegistroUsuarioTexto.innerHTML = "";
    alertRegistroUsuario.style.display = "none";
    inputEmailInicioSesion.style.border = "solid var(--rosa-mexicano) thin";
    inputEmailInicioSesion.style.removeProperty("box-shadow");
    inputContrasenaInicioSesion.style.border = "solid var(--rosa-mexicano) thin";
    inputContrasenaInicioSesion.style.removeProperty("box-shadow");

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "correo": inputEmailInicioSesion.value.trim(),
      "contrasenia": inputContrasenaInicioSesion.value.trim()
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://yollicalli-back.onrender.com/api/login/", requestOptions)
      .then((response) => {
          if (response.ok) {
              return response.text();
          } else {
              throw new Error("Error al iniciar sesión");
          }
      })
      .then((result) => {
          console.log(result);
          sessionStorage.setItem('correoUsuario', inputEmailInicioSesion.value.trim());
          alertRegistroUsuarioTexto.insertAdjacentHTML("beforeend", `
              <span style="font-family: var(--barlow); font-size: var(--titulos-h3-rutas);">
                  Iniciando sesión...
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </span>`);
          alertRegistroUsuario.style.display = "flex";

          isLogged = true;
          sessionStorage.setItem('isLogged', true);

           setTimeout(function () {
               location.href = "index.html";
           }, 2000);
      })
      .catch((error) => {
          console.error(error);
          alertInicioSesionTexto.insertAdjacentHTML("beforeend", `
              <span style="font-family: var(--barlow); font-size: var(--titulos-h3-rutas);">
                  Error al iniciar sesión.
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </span>`);
          alertInicioSesion.style.display = "flex";
          alertInicioSesion.focus();
          inputEmailInicioSesion.focus();
          inputEmailInicioSesion.style.border = "solid #ff0909 thin";
          inputEmailInicioSesion.style.boxShadow = "0 0 5px #ff0909";
          inputContrasenaInicioSesion.style.border = "solid #ff0909 thin";
          inputContrasenaInicioSesion.style.boxShadow = "0 0 5px #ff0909";
      });
});