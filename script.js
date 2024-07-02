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
      pantallaTemporizador.textContent = `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`;
    }
  
    function iniciarTemporizador() {
      if (!temporizadorActivo) {
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
      tiempoTotalEnSegundos = parseInt(inputMinutos.value, 10) * 60 + parseInt(inputSegundos.value, 10);
      actualizarPantalla();
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
  