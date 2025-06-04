const line = document.querySelector('.line');
const overlay = document.querySelector('.overlay');
const introText = document.querySelector('.intro-text');
const content = document.querySelector('.content');

function enableScrollSnap() {
    document.documentElement.style.scrollSnapType = 'y mandatory';
    document.body.style.scrollSnapType = 'y mandatory';
}

function disableScrollSnap() {
    document.documentElement.style.scrollSnapType = 'none';
    document.body.style.scrollSnapType = 'none';
}

function startAnimationSequence() {
    introText.classList.add('show');

    setTimeout(() => {
        line.classList.add('expand');

        line.addEventListener('transitionend', function lineTransitionHandler(event) {
            if (event.propertyName === 'transform') {
                line.removeEventListener('transitionend', lineTransitionHandler);

                overlay.classList.add('borders-black');

                introText.classList.remove('show');
                introText.classList.add('hide');

                introText.addEventListener('transitionend', function introTransitionHandler(e) {
                    if (e.propertyName === 'opacity') {
                        introText.style.display = 'none';
                        introText.removeEventListener('transitionend', introTransitionHandler);
                    }
                });

                setTimeout(() => {
                    line.classList.add('hide');
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

                    localStorage.setItem('played', 'true');

                    setTimeout(() => {
                        overlay.classList.remove('borders-black', 'animate');
                        overlay.style.display = 'none';

                        enableScrollSnap();
                    }, duration);

                }, 300);
            }

        });
    }, 2000);
}

window.onload = () => {
    const played = localStorage.getItem('played');
    const imageSlide1 = document.getElementById('image-slide1');

    if (played === 'true') {
        introText.style.display = 'none';
        line.classList.add('hide');
        overlay.classList.remove('borders-black', 'animate');
        overlay.style.display = 'none';
        imageSlide1.style.animation = 'none';
        imageSlide1.style.transform = 'translateY(0)';
        imageSlide1.style.opacity = '1';
        enableScrollSnap();
        content.style.display = 'block';
        content.style.opacity = 1;
    } else {
        imageSlide1.style.animation = 'slideUpOnce 4s ease-out 0.3s 1';
        localStorage.setItem('imageSlidePlayed', 'true');
        startAnimationSequence();
    }
};

const carouselElement = document.getElementById('mainCarousel');
const totalSlides = carouselElement.querySelectorAll('.carousel-item').length;
document.getElementById('slide-total').textContent = totalSlides;
const slideNumberElem = document.getElementById('slide-number');

carouselElement.addEventListener('slid.bs.carousel', function(event) {
    slideNumberElem.textContent = event.to + 1;
});

const paragraph = document.querySelector('.animated-paragraph');
const htmlContent = paragraph.innerHTML.trim();
const parts = htmlContent.split(/(<br>|\s+)/).filter(p => p.trim() !== '');
paragraph.innerHTML = '';

parts.forEach(part => {
    if (part === '<br>') {
        paragraph.appendChild(document.createElement('br'));
    } else {
        const span = document.createElement('span');
        span.textContent = part;
        span.style.opacity = '0.3';       // visível, mas esmaecido
        span.style.color = '#AAAAAA';     // cinza claro
        paragraph.appendChild(span);
        paragraph.appendChild(document.createTextNode(' '));
    }
});

const spans = paragraph.querySelectorAll('span');
let wordIndex = 0;
let isAnimating = false;
const wordsPerScroll = 3;

function revealNextWord(e) {
    if (e.deltaY > 0) {
        // Scroll para baixo → revelar palavras
        e.preventDefault();
        for (let i = 0; i < wordsPerScroll && wordIndex < spans.length; i++) {
            spans[wordIndex].style.opacity = '1';
            spans[wordIndex].style.color = '#FFFFFF';
            wordIndex++;
        }

        if (wordIndex >= spans.length) {
            document.body.style.overflow = 'auto';
            window.removeEventListener('wheel', revealNextWord);
            isAnimating = false;
        }
    } else if (e.deltaY < 0) {
        // Scroll para cima → liberar scroll normal para subir
        document.body.style.overflow = 'auto';
        window.removeEventListener('wheel', revealNextWord);
        isAnimating = false;
    }
}

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isAnimating && wordIndex < spans.length) {
            isAnimating = true;
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', revealNextWord, { passive: false });
        }
    });
}, {
    threshold: 0.5
});

observer.observe(paragraph);


observer.observe(document.querySelector('.second-square'));

const video = document.getElementById('second-square-mp4');
video.playbackRate = 0.75;

disableScrollSnap();

let scrollSnapControlActivated = false;

const fourthSquare = document.getElementById('fourth-square');
const footer = document.querySelector('footer');

let isFourthVisible = false;
let isFooterVisible = false;

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;

        if (target.id === 'fourth-square') {
            isFourthVisible = entry.isIntersecting;
        }

        if (target.tagName === 'FOOTER') {
            isFooterVisible = entry.isIntersecting;
        }

        if ((isFourthVisible || isFooterVisible) && !scrollSnapControlActivated) {
            scrollSnapControlActivated = true;
        }

        if (scrollSnapControlActivated) {
            if (isFourthVisible || isFooterVisible) {
                disableScrollSnap();
            } else {
                enableScrollSnap();
            }
        }
    });
}, {
    threshold: 0.5
});

observer2.observe(fourthSquare);
observer2.observe(footer);