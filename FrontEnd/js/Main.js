const line = document.querySelector('.line');
const overlay = document.querySelector('.overlay');
const introText = document.querySelector('.intro-text');
const content = document.querySelector('.content');

function startAnimationSequence() {
  // Começa a expandir a linha
  line.classList.add('expand');

  // Espera a linha terminar de expandir (transform)
  line.addEventListener('transitionend', (event) => {
    if (event.propertyName === 'transform') {
      // Mostra as bordas pretas
      overlay.classList.add('borders-black');

      // Esconde o texto ARCHI HUB
      introText.classList.add('hide');

      // Aguarda 0.2s antes de esconder a linha (sem fade)
      setTimeout(() => {
        line.classList.add('hide'); // linha some instantaneamente
      }, 20);

      // Após um pequeno delay, abre a cortina
      setTimeout(() => {
        overlay.classList.add('animate');

        // Anima o conteúdo junto com a cortina (duração: 1s)
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
      }, 300); // delay total: 200ms + 100ms extra para suavidade
    }
  });
}

window.onload = () => {
  startAnimationSequence();
};
