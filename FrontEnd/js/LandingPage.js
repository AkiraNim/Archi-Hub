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
  const carouselImages = document.querySelector('#carousel-images');
  const carouselText = document.querySelector('#carousel-text');

  const instanciaImagens = bootstrap.Carousel.getOrCreateInstance(carouselImages, {
    interval: false,
    ride: false,
    pause: false,
    wrap: true,
  });

  const instanciaTextos = bootstrap.Carousel.getOrCreateInstance(carouselText, {
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

let transitionTriggered = false;

window.addEventListener('scroll', () => {
  if (transitionTriggered) return;

  const scrollTop = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  if (scrollTop + windowHeight >= documentHeight - 5) {
    transitionTriggered = true;

    const semicircle = document.getElementById('semicircle-transition');
    semicircle.classList.add('animate');

    setTimeout(() => {
      window.location.href = 'main.html';
    }, 2200); // tempo ideal para fluidez + carregamento
  }
});

function restartScrollAnimation() {
    const el = document.querySelector('.scroll-content');

    el.classList.remove('scroll-content');
    
    // Força o reflow para reiniciar animação
    void el.offsetWidth;

    el.classList.add('scroll-content');
  }

  setInterval(restartScrollAnimation, 15000); // 10s animação + 5s pausa
