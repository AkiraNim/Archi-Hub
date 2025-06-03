document.addEventListener("DOMContentLoaded", function() {
    const ua = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    
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

function triggerTransition() {
  if (transitionTriggered) return;

  transitionTriggered = true;

  const semicircle = document.getElementById('semicircle-transition');
  semicircle.classList.add('animate');

  setTimeout(() => {
    window.location.href = 'main.html';
  }, 2200); 
}


window.addEventListener('wheel', triggerTransition, { once: true });


window.addEventListener('touchstart', triggerTransition, { once: true });

function restartScrollAnimation() {
    const el = document.querySelector('.scroll-content');

    el.classList.remove('scroll-content');

    
    void el.offsetWidth;

    el.classList.add('scroll-content');
}

setInterval(restartScrollAnimation, 15000);
localStorage.removeItem('played');