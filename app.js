let numeroSecreto = 0;
let intentos = 0;
const numerosSorteados = [];
let numeroMaximo = 100;
let limiteIntentos = 5;

// Asigna texto a un elemento HTML seleccionado
function asignarTextoElemento(elemento, texto) {
  let elementoHTML = document.querySelector(elemento);
  elementoHTML.innerHTML = texto;
}

// Inicializa el juego asignando valores y mostrando mensajes iniciales
function inicializacionJuego() {
  asignarTextoElemento("h1", "El juego del número secreto");
  asignarTextoElemento("p", `Elige un número del 1 al ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
}

// Maneja los intentos del usuario para adivinar el número secreto
function intentarJuego() {
  let numeroUsuario = parseInt(document.querySelector("#valorUsuario").value);

  if(!isNaN(numeroUsuario)){ //Se evalua si se ingresó un numero valido
    if(intentos < limiteIntentos){
        if (numeroSecreto === numeroUsuario) {
            asignarTextoElemento("p",`Acertaste el numero en ${intentos} ${intentos === 1 ? "vez" : "veces"}`);
            document.querySelector("#reiniciar").removeAttribute("disabled");
          } else { 
            if (numeroUsuario > numeroSecreto) {
              asignarTextoElemento("p", "El número secreto es menor");
          } else {
            asignarTextoElemento("p", "El número secreto es mayor");
          }
          limpiarInput();
          intentos++;
          }
      }else{
        asignarTextoElemento('p',`Se alcanzo el el limite de ${intentos} intentos`);
        document.querySelector("#reiniciar").removeAttribute('disabled');
      }
  }else{
    asignarTextoElemento('p','Por favor, ingresa un número válido')
  }
  return;
}

function nuevoJuego() {
  limpiarInput();
  inicializacionJuego();
  document.querySelector("#reiniciar").setAttribute("disabled", "true");
}

function limpiarInput() {
  document.querySelector("#valorUsuario").value = "";
}

// Genera un número secreto aleatorio dentro del rango permitido
function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
  //Si ya sorteamos todos los numeros
  if (numerosSorteados.length === numeroMaximo) {
    asignarTextoElemento("p", "Ya se sortearon todos los numeros posibles");
  } else {
    if (numerosSorteados.includes(numeroGenerado)) {
      //Aplico recursividad
      return generarNumeroSecreto();
    } else {
      numerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

inicializacionJuego();
