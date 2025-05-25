document.addEventListener("DOMContentLoaded", function () {
  const carrosselImagens = document.querySelector('#carrosselImagens');
  const carrosselTextos = document.querySelector('#carrosselTextos');

  const instanciaImagens = bootstrap.Carousel.getOrCreateInstance(carrosselImagens, {
    interval: false,
    ride: false,
    pause: false,
    wrap: true,
  });

  const instanciaTextos = bootstrap.Carousel.getOrCreateInstance(carrosselTextos, {
    interval: false,
    ride: false,
    pause: false,
    wrap: true,
  });

  // Avança ambos sempre para a direita
  function avancarParaDireita() {
    instanciaImagens.next();
    instanciaTextos.next();
  }

  // Executa a cada 20 segundos
  setInterval(avancarParaDireita, 20000);
});
