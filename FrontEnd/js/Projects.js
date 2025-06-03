const carouselElement = document.getElementById('verticalGroupCarousel');

const totalSlides = carouselElement.querySelectorAll('.carousel-item').length;
document.getElementById('slide-total').textContent = totalSlides;

const slideNumberElem = document.getElementById('slide-number');

carouselElement.addEventListener('slid.bs.carousel', function(event) {
    slideNumberElem.textContent = event.to + 1;
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
                behavior: "smooth"
            });
        });
    });
});