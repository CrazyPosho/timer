document.addEventListener("DOMContentLoaded", () => {
  let tiempoTotalEnSegundos = 0;
  let temporizadorActivo = null;

  const pantallaTemporizador = document.getElementById("time-display");
  const inputMinutos = document.getElementById("minutes");
  const inputSegundos = document.getElementById("seconds");
  const botonIniciar = document.getElementById("start");
  const botonPausar = document.getElementById("pause");
  const botonReiniciar = document.getElementById("reset");

  function actualizarPantalla() {
    const minutos = Math.floor(tiempoTotalEnSegundos / 60);
    const segundos = tiempoTotalEnSegundos % 60;
    pantallaTemporizador.textContent = `${minutos
      .toString()
      .padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
  }

  function iniciarTemporizador() {
    if (!temporizadorActivo && tiempoTotalEnSegundos > 0) {
      temporizadorActivo = setInterval(() => {
        if (tiempoTotalEnSegundos > 0) {
          tiempoTotalEnSegundos--;
          actualizarPantalla();
        } else {
          detenerTemporizador();
        }
      }, 1000);
    }
  }

  function detenerTemporizador() {
    clearInterval(temporizadorActivo);
    temporizadorActivo = null;
  }

  function reiniciarTemporizador() {
    detenerTemporizador();
    tiempoTotalEnSegundos = 0;
    actualizarPantalla();
  }

  function establecerTiempoInicial() {
    const minutos = parseInt(inputMinutos.value, 10);
    const segundos = parseInt(inputSegundos.value, 10);

    if (!isNaN(minutos) && !isNaN(segundos) && minutos >= 0 && segundos >= 0) {
      tiempoTotalEnSegundos = minutos * 60 + segundos;
      actualizarPantalla();
    } else {
      alert("Por favor, ingrese valores válidos para minutos y segundos.");
    }
  }

  botonIniciar.addEventListener("click", () => {
    if (tiempoTotalEnSegundos === 0) {
      establecerTiempoInicial();
    }
    iniciarTemporizador();
  });

  botonPausar.addEventListener("click", detenerTemporizador);
  botonReiniciar.addEventListener("click", reiniciarTemporizador);

  actualizarPantalla();
});
