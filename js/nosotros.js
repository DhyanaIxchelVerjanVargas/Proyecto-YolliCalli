/*Seccion de validacion */
let inputNombre = document.getElementById("inputNombre");
let inputEmail = document.getElementById("inputEmail");
let inputAsunto = document.getElementById("inputAsunto");
let inputMensaje = document.getElementById("inputMensaje"); 
let checkCondicones = document.getElementById("checkContacto");
let botonEnviar = document.getElementById("boton-enviar");

let alertNombre = document.getElementById("alertNombre");
let alertCorreo = document.getElementById("alertCorreo");
let alertAsunto = document.getElementById("alertAsunto");
let alertMensaje = document.getElementById("alertMensaje");
let alertCondiciones = document.getElementById("alertCondiciones");

const expresiones = {
    nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/,
    correo: /^[\w.-]+@[a-zA-Z_-]+(?:\.[a-zA-Z]{2,6})+$/,
    texto: /^[^\/\\<>]*$/
  
}

botonEnviar.addEventListener("click",function(event){
    event.preventDefault();
    let isValido = true;

    //Se reinicia los alerts para que no aparezcan
    alertNombre.innerHTML = "";
    alertCorreo.innerHTML = "";
    alertAsunto.innerHTML = "";
    alertMensaje.innerHTML = "";
    alertCondiciones.innerHTML = "";

    alertNombre.style.display = "none";
    alertCorreo.style.display = "none";
    alertAsunto.style.display = "none";
    alertMensaje.style.display = "none";
    alertCondiciones.style.display = "none";

    //Se quitan los espacios de las entradas 
    inputNombre.value = inputNombre.value.trim();
    inputEmail.value = inputEmail.value.trim();
    inputAsunto.value = inputAsunto.value.trim();
    inputMensaje.value = inputMensaje.value.trim();
    isValido = true;

    //Las validaciones se comienzan desde el ultimo input para que el focus se quede en el primer input que no este validado
    if(!checkCondicones.checked){
        alertCondiciones.style.display = "inline";
        alertCondiciones.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Debe aceptar las condicones.</span>`);
        alertCondiciones.style.display= "inline";
        checkCondicones.focus(); 
        isValido = false;
    }

    if (inputMensaje.value.length == 0){
        alertMensaje.style.display = "inline";
        alertMensaje.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un mensaje.</span>`);
        alertMensaje.style.display= "inline";
        inputMensaje.focus();
        isValido = false;
    } else if (inputMensaje.value.length <= 20){
        alertMensaje.style.display = "inline";
        alertMensaje.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El mensaje es muy corto.</span>`);
        alertMensaje.style.display= "inline";
        inputMensaje.focus(); 
        isValido = false;
    } else if (!expresiones.texto.test(inputMensaje.value)){
        alertMensaje.style.display = "inline";
        alertMensaje.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El mensaje es invalido.</span>`);
        alertMensaje.style.display= "inline";
        inputMensaje.focus(); 
        isValido = false;
    }

    if (inputAsunto.value.length == 0){
        alertAsunto.style.display = "inline";
        alertAsunto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un asunto.</span>`);
        alertAsunto.style.display= "inline";
        inputAsunto.focus();
        isValido = false;
    } else if (inputAsunto.value.length <= 5){
        alertAsunto.style.display = "inline";
        alertAsunto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El asunto es muy corto.</span>`);
        alertAsunto.style.display= "inline";
        alertAsunto.focus(); 
        isValido = false;
    } else if (!expresiones.texto.test(inputAsunto.value)){
        alertAsunto.style.display = "inline";
        alertAsunto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El asunto es invalido.</span>`);
        alertAsunto.style.display= "inline";
        inputAsunto.focus(); 
        isValido = false;
    }

    if (inputEmail.value.length == 0){
        alertCorreo.style.display = "inline";
        alertCorreo.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un correo.</span>`);
        alertCorreo.style.display= "inline";
        inputEmail.focus();
        isValido = false;
    }  else if (!expresiones.correo.test(inputEmail.value) || inputEmail.value.length <= 5 ){
        alertCorreo.style.display = "inline";
        alertCorreo.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Correo invalido.</span>`);
        alertCorreo.style.display= "inline";
        inputEmail.focus(); 
        isValido = false;
    }

    if (inputNombre.value.length == 0){
        alertNombre.style.display = "inline";
        alertNombre.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un nombre.</span>`);
        alertNombre.style.display= "inline";
        inputNombre.focus();
        isValido = false;
    } else if (!expresiones.nombre.test(inputNombre.value)  || inputNombre.value.length <= 3){
        alertNombre.style.display = "inline";
        alertNombre.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Nombre invalido.</span>`);
        alertNombre.style.display= "inline";
        inputNombre.focus(); 
        isValido = false;
    }

    if(isValido){
        /*Las siguientes lineas es para limpiar lo campos del formularios*/
        /*No se si seria buena idea ponerlas despues de que se alla enviado el correo exitosamente */
        inputNombre.value = "";
        inputEmail.value = "";
        inputAsunto.value = "";
        inputMensaje.value = "";
        checkCondicones.checked = false;
        console.log("se envio mensaje");
        /*Aqui deberia ir el codigo codigo para los que es el envio del mensaje*/

    }
})


/*Seccion de validacion */