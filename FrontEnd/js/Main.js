const line = document.querySelector('.line');
const overlay = document.querySelector('.overlay');
const introText = document.querySelector('.intro-text');
const content = document.querySelector('.content');

function startAnimationSequence() {
  // Faz fade in do texto ARCHI HUB
  introText.classList.add('show');

  // Após 0.5s (tempo do fade in) + 1.5s exibindo o texto, inicia animação da linha
  setTimeout(() => {
    // Começa a expandir a linha
    line.classList.add('expand');

    line.addEventListener('transitionend', function lineTransitionHandler(event) {
      if (event.propertyName === 'transform') {
        line.removeEventListener('transitionend', lineTransitionHandler);

        overlay.classList.add('borders-black');

        // Faz fade out do texto
        introText.classList.remove('show');
        introText.classList.add('hide');

        // Quando a transição de opacidade do texto acabar, oculta do layout
        introText.addEventListener('transitionend', function introTransitionHandler(e) {
          if (e.propertyName === 'opacity') {
            introText.style.display = 'none';
            introText.removeEventListener('transitionend', introTransitionHandler);
          }
        });

        setTimeout(() => {
          line.classList.add('hide'); // some instantaneamente
        }, 20);

        setTimeout(() => {
          overlay.classList.add('animate');

          let start = null;
          const duration = 1000;

          function animateContent(timestamp) {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            content.style.opacity = progress;
            if (progress < 1) {
              requestAnimationFrame(animateContent);
            }
          }

          content.style.opacity = 0;
          content.style.display = 'block';
          requestAnimationFrame(animateContent);
        }, 300);
      }
    });
  }, 2000); // 0.5s fade in + 1.5s exibindo = 2s
}

window.onload = () => {
  startAnimationSequence();
};
