let imagenPerfilInput = document.getElementById("imagenPerfilInput");
let imagenPerfilFake = document.getElementById("imagenPerfilFake");
let imagenPerfilMostrada = document.getElementById("imagenPerfilMostrada");
let nombrePerfil = document.getElementById("nombrePerfil");
let telPerfil = document.getElementById("telPerfil");
let callePerfil = document.getElementById("callePerfil");
let localidadPerfil = document.getElementById("localidadPerfil");
let estadoPerfil = document.getElementById("estadoPerfil");
let ciudadPerfil = document.getElementById("ciudadPerfil");
let cpPerfil = document.getElementById("cpPerfil");
let editarPerfil = document.getElementById("editarPerfil");
let guardarPerfil = document.getElementById("guardarPerfil");

const cloudName = "dayprjvbg";
const unsignedUploadPreset = "preset_YolliCalli";
let imagenUrlPerfil = "";
let fotografia = "";

const expresiones = {
    nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/,
    telefono: /^\d{10}$/,
    calle: /[a-zA-Z0-9áéíóúüÁÉÍÓÚÜñÑ#]+$/,
    cp: /^\d{5}$/,
};

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

function habilitarEdicion() {
    nombrePerfil.disabled = false;
    telPerfil.disabled = false;
    callePerfil.disabled = false;
    localidadPerfil.disabled = false;
    estadoPerfil.disabled = false;
    ciudadPerfil.disabled = false;
    cpPerfil.disabled = false;
    editarPerfil.style.display = "none";
    guardarPerfil.style.display = "inline-block";
}

function deshabilitarEdicion() {
    nombrePerfil.value = usuario.nombre;
    telPerfil.value = usuario.telefono;
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
});

