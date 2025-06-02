
// Pega o carousel pelo id
const carouselElement = document.getElementById('verticalGroupCarousel');

// Pega o total de slides
const totalSlides = carouselElement.querySelectorAll('.carousel-item').length;
document.getElementById('slide-total').textContent = totalSlides;

// Pega o span que mostra o número do slide ativo
const slideNumberElem = document.getElementById('slide-number');

// Cria um listener para quando o slide mudar
carouselElement.addEventListener('slid.bs.carousel', function(event) {
    // event.to é o índice do slide ativo (0-based)
    slideNumberElem.textContent = event.to + 1; // +1 para ficar 1-based
});

document.addEventListener("DOMContentLoaded", () => {
    const videos = document.querySelectorAll(".hover-video");

    videos.forEach((video) => {
      const parent = video.closest(".item");

      if (parent) {
        parent.addEventListener("mouseenter", () => {
          video.play();
        });

        parent.addEventListener("mouseleave", () => {
          video.pause();
          video.currentTime = 0;
        });
      }
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const carouselButtons = document.querySelectorAll(
      '#verticalGroupCarousel .carousel-control-prev, #verticalGroupCarousel .carousel-control-next'
    );

    carouselButtons.forEach(button => {
      button.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth" // ou "auto" se quiser sem animação
        });
      });
    });
  });