const track = document.querySelector('#verticalGroupCarousel .carousel-track');
  const pages = document.querySelectorAll('#verticalGroupCarousel .carousel-page');
  const slideNumber = document.getElementById('slide-number');
  const slideTotal = document.getElementById('slide-total');
  const prevBtn = document.querySelector('[data-bs-target="#verticalGroupCarousel"][data-bs-slide="prev"]');
  const nextBtn = document.querySelector('[data-bs-target="#verticalGroupCarousel"][data-bs-slide="next"]');

  let currentIndex = 0;

  function updateCarousel() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    slideNumber.textContent = currentIndex + 1;
    slideTotal.textContent = pages.length;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < pages.length - 1) {
      currentIndex++;
      updateCarousel();
    }
  });

  // Inicializa o total
  updateCarousel();

