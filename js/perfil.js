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
const cloudName = "dayprjvbg";
const unsignedUploadPreset = "preset_YolliCalli";
let imagenUrlPerfil = "";
let fotografia = "";

/* Agregado para Modal Pago */
let metodoPago = document.getElementById("metodoPago");
let modalPago = document.getElementById("modalPago");
let btnEnvioBotonPago = document.getElementById("btnEnvioBotonPago");
/* Fin agregado para Modal Pago */

const expresiones = {
    nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/,
    telefono: /^\d{10}$/,
    calle: /[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ#]+$/,
    cp: /^\d{5}$/,
};

callePerfil.addEventListener("blur", e=>{
    e.preventDefault;
    if(callePerfil.value.length >=3){

        if(/[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ#]+$/.test(callePerfil.value)){
            calleError.classList.remove("mensajeError");
            calleError.innerText="";
        } else{
            calleError.classList.add("mensajeError");
            calleError.innerText="No cumple con el formato"
        }
    }else{
        calleError.classList.add("mensajeError");
        calleError.innerText="Nombre de la calle muy corto";   
    }
});


localidadPerfil.addEventListener("blur", e=>{
    e.preventDefault;
    if(localidadPerfil.value.length >=4){

        if(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/.test(localidadPerfil.value)){
            localidadError.classList.remove("mensajeError");
            localidadError.innerText="";
        } else{
            localidadError.classList.add("mensajeError");
            localidadError.innerText="No cumple con el formato"
        }
    }else{
        localidadError.classList.add("mensajeError");
        localidadError.innerText="Nombre muy corto";   
    }
});

estadoPerfil.addEventListener("blur", e=>{
    e.preventDefault;
    if(estadoPerfil.value.length >=4){

        if(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/.test(estadoPerfil.value)){
            estadoError.classList.remove("mensajeError");
            estadoError.innerText="";
        } else{
            estadoError.classList.add("mensajeError");
            estadoError.innerText="No cumple con el formato"
        }
    }else{
        estadoError.classList.add("mensajeError");
        estadoError.innerText="Nombre muy corto";   
    }
});

ciudadPerfil.addEventListener("blur", e=>{
    e.preventDefault;
    if(ciudadPerfil.value.length >=4){

        if(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/.test(ciudadPerfil.value)){
            ciudadError.classList.remove("mensajeError");
            ciudadError.innerText="";
        } else{
            ciudadError.classList.add("mensajeError");
            ciudadError.innerText="No cumple con el formato"
        }
    }else{
        ciudadError.classList.add("mensajeError");
        ciudadError.innerText="Nombre muy corto";   
    }
});

cpPerfil.addEventListener("blur", e=>{
    e.preventDefault;
    if(cpPerfil.value.length >4){
        if(/^\d{5}$/.test(cpPerfil.value)){
            cpError.classList.remove("mensajeError");
            cpError.innerText="";
        } else{
            cpError.classList.add("mensajeError");
            cpError.innerText="No cumple con el formato"
        }
    }else{
        cpError.classList.add("mensajeError");
        cpError.innerText="Código postal muy corto";   
    }
});

//Usuario de prueba temporal
let usuario = {
    nombre: "John Doe",
    telefono: "555555555",
    calle: "Platanito 12",
    localidad: "Tlalpan",
    estado: "CDMX",
    ciudad: "Valle Gómez",
    cp: "00100"
};

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
                imagenPerfilMostrada.src = imagenUrlPerfil;
            })
            .catch(error => { 
                console.log(error);
                imagenUrlPerfil = "https://res.cloudinary.com/dayprjvbg/image/upload/v1712112724/img_perfil-01_hq450o.png";
            });
    } else {
        console.log('El archivo seleccionado no es una imagen');
        imagenUrlPerfil = "https://res.cloudinary.com/dayprjvbg/image/upload/v1712112724/img_perfil-01_hq450o.png";
    }}
)
//Fin de foto de perfil

function cargarInformacionUsuario() {
    // Obtener el correo electrónico del usuario que inició sesión desde sessionStorage
    const correoUsuario = sessionStorage.getItem('correoUsuario');
    if (correoUsuario) {
        // Realizar una solicitud GET para obtener la información del usuario correspondiente al correo electrónico
        fetch(`http://localhost:8080/api/usuarios/?correo=${correoUsuario}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error al obtener la información del usuario");
            })
            .then(data => {
                // Suponiendo que la respuesta de la API contiene la información del usuario
                // Buscar el usuario que coincide con el correo electrónico del usuario actual
                const usuarioRegistrado = data.find(usuario => usuario.correo === correoUsuario);
                if (usuarioRegistrado) {
                    // Mostrar la información del usuario en los campos correspondientes del perfil
                    nombrePerfil.value = usuarioRegistrado.nombre;
                    telPerfil.value = usuarioRegistrado.telefono;
                    // Resto de los campos
                    console.log("Información del usuario cargada:", usuarioRegistrado);
                } else {
                    console.log("No se encontró ningún usuario con el correo electrónico proporcionado.");
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
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
    callePerfil.value = usuario.calle;
    localidadPerfil.value = usuario.localidad;
    estadoPerfil.value = usuario.estado;
    ciudadPerfil.value = usuario.ciudad;
    cpPerfil.value = usuario.cp;

    nombrePerfil.disabled = true;
    telPerfil.disabled = true;
    callePerfil.disabled = true;
    localidadPerfil.disabled = true;
    estadoPerfil.disabled = true;
    ciudadPerfil.disabled = true;
    cpPerfil.disabled = true;

    editarPerfil.style.display = "inline-block";
    guardarPerfil.style.display = "none";
}

//Botón para editar formulario
editarPerfil.addEventListener("click", function() {
    habilitarEdicion();
});

//Botón para guardar formulario
guardarPerfil.addEventListener("click", function(event) {
    event.preventDefault();
    const nuevoNombre = nombrePerfil.value;
    const nuevoTelefono = telPerfil.value;
    const nuevaCalle = callePerfil.value;
    const nuevaLocalidad = localidadPerfil.value;
    const nuevoEstado = estadoPerfil.value;
    const nuevaCiudad = ciudadPerfil.value;
    const nuevoCp = cpPerfil.value;

    usuario = {
    nombre: nuevoNombre,
    telefono: nuevoTelefono,
    calle: nuevaCalle,
    localidad: nuevaLocalidad,
    estado: nuevoEstado,
    ciudad: nuevaCiudad,
    cp: nuevoCp
    };

    deshabilitarEdicion();
});

window.addEventListener("load", function(event){
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
        <p class="fs-3">Estamos trabajando en ello ...</p>
        </div>
    </div>
    </div>
    `);
    
    btnEnvioBotonPago.click();
    
   //console.log("Se hizo click en boton perfil");
})
/* Fin Modal Pago */