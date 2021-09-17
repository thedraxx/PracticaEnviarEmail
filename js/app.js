//variables
const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn");
const formulario = document.querySelector("#enviar-mail");
// variables para campos
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListener();
function eventListener() {
  // cuando la app arranca
  document.addEventListener("DOMContentLoaded", iniciarApp);
  // campos del formulario
  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);
  // reinicia el formulario
  reset.addEventListener("click", resetearFormulario);

  // enviar email
  formulario.addEventListener("submit", enviarEmail);
}

//funciones
function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

// valida el formulario

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    // eliminar los errores...
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    if (er.test(email.value)) {
      // eliminar los errores...
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }
      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.remove("border", "border-green-500");
      e.target.classList.add("border", "border-red-500");
      mostrarError("Email no valido");
    }
  }

  if (er.test(email.value) && asunto.value != "" && mensaje.value != "") {
    console.log("pasaste la validacion");
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );
  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

// envia el email
function enviarEmail(e) {
  e.preventDefault();

  //mostrar el spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  // Despues de 3 segundos ocultar el spinner y mostrar mensaje
  setTimeout(() => {
    spinner.style.display = "none";

    // mensaje que dice que se envio correctamente
    const parrafo = document.createElement("p");
    parrafo.textContent = "El mensaje se envio correctamente";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-3",
      "bg-green-500",
      "text-white",
      "font-bold",
      "uppercase"
    );
    // inserta el parrafo antes del spinner
    formulario.insertBefore(parrafo, spinner);

    setTimeout(() => {
      parrafo.remove(); //Eliminar el mensaje de exito
      resetearFormulario();
    }, 5000);
  }, 3000);
}
// funcion que resetea el formulario
function resetearFormulario() {
  formulario.reset();
  iniciarApp();
}
