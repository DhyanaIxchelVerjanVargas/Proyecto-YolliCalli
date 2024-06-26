/*Seccion de validacion */
let inputNombre = document.getElementById("inputNombre");
let inputEmail = document.getElementById("inputEmail");
let inputTelefono=document.getElementById("inputTelefono")
let inputAsunto = document.getElementById("inputAsunto");
let inputMensaje = document.getElementById("inputMensaje"); 
let checkCondicones = document.getElementById("checkContacto");
let botonEnviar = document.getElementById("boton-enviar");
let modalEnvioEstado = document.getElementById("modalEnvioEstado");
let btnEnvioEstado = document.getElementById("btnEnvioEstado");

let alertNombre = document.getElementById("alertNombre");
let alertCorreo = document.getElementById("alertCorreo");
let alertTelefono = document.getElementById("alertTelefono");
let alertAsunto = document.getElementById("alertAsunto");
let alertMensaje = document.getElementById("alertMensaje");
let alertCondiciones = document.getElementById("alertCondiciones");

const expresiones = {
    nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s']+$/,
    correo: /^[\w.-]+@[a-zA-Z_-]+(?:\.[a-zA-Z]{2,6})+$/,
    texto: /^[^\/\\<>]*$/,
    telefono: /^(?!0{10})\d{10}$/
    
}

botonEnviar.addEventListener("click",function(event){
    event.preventDefault();
    let isValido = true;

    //Se reinicia los alerts para que no aparezcan
    alertNombre.innerHTML = "";
    alertCorreo.innerHTML = "";
    alertTelefono.innerHTML = "";
    alertAsunto.innerHTML = "";
    alertMensaje.innerHTML = "";
    alertCondiciones.innerHTML = "";

    alertNombre.style.display = "none";
    alertCorreo.style.display = "none";
    alertAsunto.style.display = "none";
    alertMensaje.style.display = "none";
    alertCondiciones.style.display = "none";

    checkCondicones.style.border = "solid var(--azul-talavera) thin";
    checkCondicones.style.removeProperty("box-shadow");
    inputNombre.style.border = "solid var(--azul-talavera) thin";
    inputNombre.style.removeProperty("box-shadow");
    inputEmail.style.border = "solid var(--azul-talavera) thin";
    inputEmail.style.removeProperty("box-shadow");
    //inputTelefono.style.removeProperty("border");
    inputTelefono.style.removeProperty("box-shadow");
    inputTelefono.style.border = "solid var(--azul-talavera) thin";
    inputAsunto.style.border = "solid var(--azul-talavera) thin";
    inputAsunto.style.removeProperty("box-shadow");
    inputMensaje.style.border = "solid var(--azul-talavera) thin";
    inputMensaje.style.removeProperty("box-shadow");

    //Se quitan los espacios de las entradas 
    inputNombre.value = inputNombre.value.trim();
    inputEmail.value = inputEmail.value.trim();
    inputTelefono.value = inputTelefono.value.trim();
    inputAsunto.value = inputAsunto.value.trim();
    inputMensaje.value = inputMensaje.value.trim();
    isValido = true;

    //Las validaciones se comienzan desde el ultimo input para que el focus se quede en el primer input que no este validado
    if(!checkCondicones.checked){
        alertCondiciones.style.display = "inline";
        alertCondiciones.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Debe marcar la casilla para continuar.</span>`);
        alertCondiciones.style.display= "inline";
        checkCondicones.focus(); 
        checkCondicones.style.border = "solid #ff0909 thin";
        checkCondicones.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    }

    if (inputMensaje.value.length == 0){
        alertMensaje.style.display = "inline";
        alertMensaje.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un mensaje.</span>`);
        alertMensaje.style.display= "inline";
        inputMensaje.focus();
        inputMensaje.style.border = "solid #ff0909 thin";
        inputMensaje.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    } else if (inputMensaje.value.length <= 20){
        alertMensaje.style.display = "inline";
        alertMensaje.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El mensaje es muy corto.</span>`);
        alertMensaje.style.display= "inline";
        inputMensaje.focus(); 
        inputMensaje.style.border = "solid #ff0909 thin";
        inputMensaje.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    } else if (!expresiones.texto.test(inputMensaje.value)){
        alertMensaje.style.display = "inline";
        alertMensaje.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El mensaje es invalido.</span>`);
        alertMensaje.style.display= "inline";
        inputMensaje.focus(); 
        inputMensaje.style.border = "solid #ff0909 thin";
        inputMensaje.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    }

    if (inputAsunto.value.length == 0){
        alertAsunto.style.display = "inline";
        alertAsunto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un asunto.</span>`);
        alertAsunto.style.display= "inline";
        inputAsunto.focus();
        inputAsunto.style.border = "solid #ff0909 thin";
        inputAsunto.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    } else if (inputAsunto.value.length <= 5){
        alertAsunto.style.display = "inline";
        alertAsunto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El asunto es muy corto.</span>`);
        alertAsunto.style.display= "inline";
        inputAsunto.focus(); 
        inputAsunto.style.border = "solid #ff0909 thin";
        inputAsunto.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    } else if (!expresiones.texto.test(inputAsunto.value)){
        alertAsunto.style.display = "inline";
        alertAsunto.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">El asunto es invalido.</span>`);
        alertAsunto.style.display= "inline";
        inputAsunto.focus(); 
        inputEinputAsuntomail.style.border = "solid #ff0909 thin";
        inputAsunto.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    }

    if (inputEmail.value.length == 0){
        alertCorreo.style.display = "inline";
        alertCorreo.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un correo.</span>`);
        alertCorreo.style.display= "inline";
        inputEmail.focus();
        inputEmail.style.border = "solid #ff0909 thin";
        inputEmail.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    }  else if (!expresiones.correo.test(inputEmail.value) || inputEmail.value.length <= 5 ){
        alertCorreo.style.display = "inline";
        alertCorreo.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Correo invalido.</span>`);
        alertCorreo.style.display= "inline";
        inputEmail.focus(); 
        inputEmail.style.border = "solid #ff0909 thin";
        inputEmail.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    }
    if (inputTelefono.value.length == 0) {
        alertTelefono.style.display = "inline";
        alertTelefono.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un número de teléfono.</span>`);
        alertTelefono.style.display= "inline";
        inputTelefono.focus();
        inputTelefono.style.border = "solid #ff0909 thin";
        inputTelefono.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    } else if (!expresiones.telefono.test(inputTelefono.value)) {
        alertTelefono.style.display = "inline";
        alertTelefono.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Número de teléfono inválido.</span>`);
        alertTelefono.style.display= "inline";
        inputTelefono.focus();
        inputTelefono.style.border = "solid #ff0909 thin";
        inputTelefono.style.boxShadow = "0 0 5px #ff0909"
        isValido = false;
    }    
    if (inputNombre.value.length == 0){
        alertNombre.style.display = "inline";
        alertNombre.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Ingrese un nombre.</span>`);
        alertNombre.style.display= "inline";
        inputNombre.style.border = "solid #ff0909 thin";
        inputNombre.style.boxShadow = "0 0 5px #ff0909"
        inputNombre.focus();
        isValido = false;
    } else if (!expresiones.nombre.test(inputNombre.value)  || inputNombre.value.length <= 3){
        alertNombre.style.display = "inline";
        alertNombre.insertAdjacentHTML("beforeend",`<span style="color: #ff0909; font-size:11px; font-family:var(--barlow)">Nombre invalido.</span>`);
        alertNombre.style.display= "inline";
        inputNombre.style.border = "solid #ff0909 thin";
        inputNombre.style.boxShadow = "0 0 5px #ff0909"
        inputNombre.focus(); 
        isValido = false;
    }

    modalEnvioEstado.innerHTML=""
    if(isValido){
        /*Aqui deberia ir el codigo codigo para los que es el envio del mensaje*/
        let ebody = `
            <strong>Nombre: </strong>${inputNombre.value}
            <br/>
            <strong>Email: </strong>${inputEmail.value}
            <br/>
            <strong>Telefono: </strong>${inputTelefono.value}
            <br/>
            <strong>Asunto: </strong>${inputAsunto.value}
            <br/>
            <strong>Mensaje: </strong>${inputMensaje.value}
            <br/>
            `
        
            // Email code here
            Email.send({
                SecureToken : "346ac9c0-85e9-4c0b-ae5a-9bd1607a4ea4",
                To : 'yollicalli.g@gmail.com',
                From : "yollicalli.g@gmail.com",
                Subject : `${inputAsunto.value}`,
                Body : ebody
            }).then(function (message) {
                if(String(message)=="OK"){
                    /*Las siguientes lineas es para limpiar lo campos del formularios*/
                    /*No se si seria buena idea ponerlas despues de que se alla enviado el correo exitosamente */
                    inputNombre.value = "";
                    inputEmail.value = "";
                    inputTelefono.value="";
                    inputAsunto.value = "";
                    inputMensaje.value = "";
                    checkCondicones.checked = false;
                    modalEnvioEstado.insertAdjacentHTML("beforeend", `
                    <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h1 class="modal-title fs-2" id="estadoModalLabel">YolliCalli</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerral"></button>
                        </div>
                        <div class="modal-body">
                        <p class="fs-3">Mensaje enviado satisfactoriamente</p>
                        </div>
                    </div>
                </div>
                    `);
                    
                      btnEnvioEstado.click();
                }else {
                    modalEnvioEstado.insertAdjacentHTML("beforeend", `
                    <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h1 class="modal-title fs-3" id="estadoModalLabel">YolliCalli</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerral"></button>
                        </div>
                        <div class="modal-body">
                        <p>Error en el envío</p>
                        </div>
                    </div>
                    </div>
                    `);
                    
                    btnEnvioEstado.click();
                }
            })
            inputNombre.style.removeProperty("border");
            inputEmail.style.removeProperty("border");
            inputTelefono.style.removeProperty("border");
            inputAsunto.style.removeProperty("border");
            inputMensaje.style.removeProperty("border");
            /*then(function (message) {
            alert("Mensaje enviado satisfactoriamente")
            });*/
            
            /*then(
              message => alert(message)
            );*/
    }
})

