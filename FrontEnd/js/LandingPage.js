document.addEventListener("DOMContentLoaded", function () {
  const ua = navigator.userAgent;
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

  if (isMobile) {
    console.log("Redirecionando para Main.html (mobile)");
    window.location.href = "Main.html";
    return;
  }

  console.log("Permanece na página atual.");

  // Seu código do carrossel continua aqui:
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

  function avancarParaDireita() {
    instanciaImagens.next();
    instanciaTextos.next();
  }

  setInterval(avancarParaDireita, 20000);
});