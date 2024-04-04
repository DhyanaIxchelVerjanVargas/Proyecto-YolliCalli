let imagenPerfilInput = document.getElementById("imagenPerfilInput");
let imagenPerfilFake = document.getElementById("imagenPerfilFake");
let imagenPerfilMostrada = document.getElementById("imagenPerfilMostrada");
let nombrePerfil = document.getElementById("nombrePerfil");
let telPerfil = document.getElementById("telPerfil");
let callePerfil = document.getElementById("callePerfil");
let localidadPerfil = document.getElementById("localidadPerfil");
let editarPerfil = document.getElementById("editarPerfil");
let guardarPerfil = document.getElementById("guardarPerfil");
let calleError = document.getElementById("calleError");
let localidadError = document.getElementById("localidadError");
let cpPerfil = document.getElementById("cpPerfil");
let cpError = document.getElementById("cpError");
let estadoPerfil = document.getElementById("estadoPerfil");
let estadoError = document.getElementById("estadoError");
let ciudadPerfil = document.getElementById("ciudadPerfil");
let ciudadError = document.getElementById("ciudadError");
let contenedorMain = document.getElementById("contenedorMain");
let noUsuario = document.getElementById("noUsuario");
let cargandoPerfil = document.getElementById("cargandoPerfil");

const cloudName = "dayprjvbg";
const unsignedUploadPreset = "preset_YolliCalli";
let imagenUrlPerfil = "";
let fotografia = "";
let isValid = true;

/* Agregado para Modal Pago */
let metodoPago = document.getElementById("metodoPago");
let modalPago = document.getElementById("modalPago");
let btnEnvioBotonPago = document.getElementById("btnEnvioBotonPago");
/* Fin agregado para Modal Pago */

//Usuario de prueba temporal
let usuario = {
    correo: "",
    foto: "",
    calle: "",
    localidad: "",
    estado: "",
    ciudad: "",
    cp: ""
};

buscarSessionStorage("isLogged");

//Agregado para cambiar foto de perfil
imagenPerfilFake.addEventListener("click",function(event){
    event.preventDefault();
    console.log("prueba")
    imagenPerfilInput.click();
})

function uploadFile(file) {
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', unsignedUploadPreset);

    return new Promise((resolve, reject) => {
        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
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
            var imagenUrl = data.secure_url;
            resolve(imagenUrl);
        })
        .catch(error => {
            console.error('Error:', error);
            reject(error);
        });
    });
}

imagenPerfilInput.addEventListener("change",function(event){
    event.preventDefault();
    fotografia = imagenPerfilInput.files[0];
    if (fotografia.type.startsWith('image/')) {
        uploadFile(fotografia)
            .then(imagenUrl => {   
                imagenUrlPerfil = imagenUrl;
                let usuarioLocalStorage = JSON.parse(localStorage.getItem('usuario'));

                if (usuarioLocalStorage) {
                    usuarioLocalStorage.foto = imagenUrlPerfil;
                    localStorage.setItem('usuario', JSON.stringify(usuarioLocalStorage));
                } else {
                    console.log("No se encontró ningún usuario en localStorage.");
                }

                imagenPerfilMostrada.src = imagenUrlPerfil;
            })
            .catch(error => { 
                console.log(error);
            });
    } else {
        console.log('El archivo seleccionado no es una imagen');
    }}
)
//Fin de foto de perfil

function cargarInformacionUsuario() {
    // Obtener el correo electrónico del usuario que inició sesión desde sessionStorage
    const correoUsuario = sessionStorage.getItem('correoUsuario');
    if (correoUsuario) {
        // Realizar una solicitud GET para obtener la información del usuario correspondiente al correo electrónico
        fetch(`https://yollicalli-back.onrender.com/api/usuarios/`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error al obtener la información del usuario");
            })
            .then(data => {
                // Buscar el usuario que coincide con el correo electrónico del usuario actual
                const usuarioFetch = data.find(usuario => usuario.correo === correoUsuario);
                if (usuarioFetch) {
                    cargandoPerfil.style.display="none"
                    contenedorMain.style.display="block"
                    // Mostrar la información del usuario en los campos correspondientes del perfil
                    nombrePerfil.value = usuarioFetch.nombre;
                    telPerfil.value = usuarioFetch.telefono;
                    usuario.correo = usuarioFetch.correo;

                    const usuarioEnLocalStorage = obtenerUsuarioPorCorreo(usuarioFetch.correo);
                    if (usuarioEnLocalStorage) {
                        callePerfil.value = usuarioEnLocalStorage.calle;
                        localidadPerfil.value = usuarioEnLocalStorage.localidad;
                        estadoPerfil.value = usuarioEnLocalStorage.estado;
                        ciudadPerfil.value = usuarioEnLocalStorage.ciudad;
                        cpPerfil.value = usuarioEnLocalStorage.cp;
                        if(usuarioEnLocalStorage.foto != ""){
                            imagenPerfilMostrada.src = usuarioEnLocalStorage.foto;
                        }
                        console.log("Usuario encontrado en localStorage:", usuarioEnLocalStorage);
                    } else {
                        usuario.correo = usuarioFetch.correo;
                        localStorage.setItem('usuario', JSON.stringify(usuario));
                        console.log("No se encontró ningún usuario en localStorage con el correo proporcionado.");
                        console.log("Se crea nuevo usuario", usuario);
                    }

                    console.log("Información del usuario cargada:", usuarioFetch);
                } else {
                    console.log("No se encontró ningún usuario con el correo electrónico proporcionado.");
                    noUsuario.style.display="flex";
                    cargandoPerfil.style.display="none"
                }
            })
            .catch(error => {
                console.error("Error:", error);
                noUsuario.style.display="flex";
                cargandoPerfil.style.display="none"
            });
    }
}

function obtenerUsuarioPorCorreo(correo) {
    const usuarioLocalStorage = JSON.parse(localStorage.getItem('usuario'));
    if (usuarioLocalStorage && usuarioLocalStorage.correo === correo) {
        return usuarioLocalStorage;
    } else {
        return null;
    }
}

function buscarSessionStorage(clave) {
    const userLogged = sessionStorage.getItem(clave);
    if (!userLogged) {
        window.location.href = "./iniciosesion.html";
    }
    return JSON.parse(userLogged);
}

function validarCalle() {
    if (callePerfil.value.length >= 3 && /[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ#]+$/.test(callePerfil.value)) {
        calleError.classList.remove("mensajeError");
        calleError.innerText = "";
        return true;
    } else {
        calleError.classList.add("mensajeError");
        calleError.innerText = "Ingrese una calle válida.";
        return false;
    }
}

function validarLocalidad() {
    if (localidadPerfil.value.length >= 4 && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/.test(localidadPerfil.value)) {
        localidadError.classList.remove("mensajeError");
        localidadError.innerText = "";
        return true;
    } else {
        localidadError.classList.add("mensajeError");
        localidadError.innerText = "Ingrese un municipio válido.";
        return false;
    }
}

function validarEstado() {
    if (estadoPerfil.value.length >= 4 && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/.test(estadoPerfil.value)) {
        estadoError.classList.remove("mensajeError");
        estadoError.innerText = "";
        return true;
    } else {
        estadoError.classList.add("mensajeError");
        estadoError.innerText = "Ingrese un estado válido.";
        return false;
    }
}

function validarEstado() {
    if (estadoPerfil.value.length >= 4 && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/.test(estadoPerfil.value)) {
        estadoError.classList.remove("mensajeError");
        estadoError.innerText = "";
        return true;
    } else {
        estadoError.classList.add("mensajeError");
        estadoError.innerText = "Ingrese un estado válido.";
        return false;
    }
}

function validarCiudad() {
    if (ciudadPerfil.value.length >= 4 && /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/.test(ciudadPerfil.value)) {
        ciudadError.classList.remove("mensajeError");
        ciudadError.innerText = "";
        return true;
    } else {
        ciudadError.classList.add("mensajeError");
        ciudadError.innerText = "Ingrese una ciudad válida.";
        return false;
    }
}

function validarCp() {
    if (/^[1-9]\d{4}$/.test(cpPerfil.value)) {
        cpError.classList.remove("mensajeError");
        cpError.innerText = "";
        return true;
    } else {
        cpError.classList.add("mensajeError");
        cpError.innerText = "Ingrese un código postal válido.";
        return false;
    }
}

function habilitarEdicion() {
    callePerfil.disabled = false;
    localidadPerfil.disabled = false;
    estadoPerfil.disabled = false;
    ciudadPerfil.disabled = false;
    cpPerfil.disabled = false;
    editarPerfil.style.display = "none";
    guardarPerfil.style.display = "inline-block";
}

function deshabilitarEdicion() {

    nombrePerfil.disabled = true;
    telPerfil.disabled = true;
    callePerfil.disabled = true;
    localidadPerfil.disabled = true;
    estadoPerfil.disabled = true;
    ciudadPerfil.disabled = true;
    cpPerfil.disabled = true;

    calleError.classList.remove("mensajeError");
    localidadError.classList.remove("mensajeError");
    ciudadError.classList.remove("mensajeError");
    estadoError.classList.remove("mensajeError");
    cpError.classList.remove("mensajeError");
    calleError.innerText="";
    localidadError.innerText="";
    ciudadError.innerText="";
    estadoError.innerText="";
    cpError.innerText="";

    editarPerfil.style.display = "inline-block";
    guardarPerfil.style.display = "none";
}

//Botón para editar formulario
editarPerfil.addEventListener("click", function() {
    habilitarEdicion();
});

callePerfil.addEventListener("blur", validarCalle);
localidadPerfil.addEventListener("blur", validarLocalidad);
estadoPerfil.addEventListener("blur", validarEstado);
ciudadPerfil.addEventListener("blur", validarCiudad);
cpPerfil.addEventListener("blur", validarCp);

//Botón para guardar formulario
guardarPerfil.addEventListener("click", function(event) {
    event.preventDefault();

    const camposPerfil = [
        { elemento: cpPerfil, valido: validarCp(), valor: 'cp' },
        { elemento: ciudadPerfil, valido: validarCiudad(), valor: 'ciudad' },
        { elemento: estadoPerfil, valido: validarEstado(), valor: 'estado' },
        { elemento: localidadPerfil, valido: validarLocalidad(), valor: 'localidad' },
        { elemento: callePerfil, valido: validarCalle(), valor: 'calle' }
    ];

    let usuarioLocalStorage = JSON.parse(localStorage.getItem('usuario'));

    camposPerfil.forEach(campo => {
        if (campo.valido) {
            usuario[campo.valor] = campo.elemento.value;

            if (usuarioLocalStorage) {
                usuario.foto = usuarioLocalStorage.foto;
            }
        } else {
            campo.elemento.value = "";
        }
    });
    
    localStorage.setItem('usuario', JSON.stringify(usuario));
    deshabilitarEdicion();
    console.log(usuario);
});

window.addEventListener("load", function(event){
    cargandoPerfil.style.display="flex"
    contenedorMain.style.display="none"
    deshabilitarEdicion();
    cargarInformacionUsuario();
});

/* Agregado para Modal Pago */
metodoPago.addEventListener("click", function(event){
    event.preventDefault();
    
    modalPago.innerHTML=""
    //Modal para envío exitoso a Carrito
    modalPago.insertAdjacentHTML("beforeend", `
    <div class="modal-dialog modal-lg">
    <div class="modal-content">
        <div class="modal-header">
        <h1 class="modal-title fs-2" id="estadoModalLabel">YolliCalli</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerral"></button>
        </div>
        <div class="modal-body">
        <p class="fs-3">Esta función estará disponible próximamente ...</p>
        </div>
    </div>
    </div>
    `);
    
    btnEnvioBotonPago.click();
    
   //console.log("Se hizo click en boton perfil");
})
/* Fin Modal Pago */