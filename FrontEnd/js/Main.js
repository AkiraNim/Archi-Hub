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

                    // Marca no localStorage que a animação já foi executada
                    localStorage.setItem('played', 'true');

                    // ⬅️ Aqui removemos as linhas pretas e escondemos o overlay ao fim da animação
                    setTimeout(() => {
                        overlay.classList.remove('borders-black', 'animate');
                        overlay.style.display = 'none';

                        enableScrollSnap();
                    }, duration); // espera o tempo da animação (1000ms)

                }, 300);
            }

        });
    }, 2000); // 0.5s fade in + 1.5s exibindo = 2s
}

window.onload = () => {
    const played = localStorage.getItem('played');
    const imageSlide1 = document.getElementById('image-slide1');

    if (played === 'true') {
        // Já viu animação antes: oculta overlay, linha e texto, mostra conteúdo direto
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
        // Primeira visita: roda animação
        imageSlide1.style.animation = 'slideUpOnce 4s ease-out 0.3s 1';
        localStorage.setItem('imageSlidePlayed', 'true');
        startAnimationSequence();
    }
};

// Pega o carousel pelo id
const carouselElement = document.getElementById('mainCarousel');

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

const paragraph = document.querySelector('.animated-paragraph');

// Pega o conteúdo HTML original (com <br>)
const htmlContent = paragraph.innerHTML.trim();

// Separa por espaços e <br>
const parts = htmlContent.split(/(<br>|\s+)/).filter(p => p.trim() !== '');

// Limpa o parágrafo
paragraph.innerHTML = '';

// Para cada parte, se for <br>, adiciona um <br>, senão cria span
parts.forEach(part => {
    if (part === '<br>') {
        paragraph.appendChild(document.createElement('br'));
    } else {
        const span = document.createElement('span');
        span.textContent = part;
        paragraph.appendChild(span);
        paragraph.appendChild(document.createTextNode(' ')); // adiciona espaço entre as palavras
    }
});

const spans = paragraph.querySelectorAll('span');
let wordIndex = 0;
let isAnimating = false;

function revealNextWord(e) {
    e.preventDefault();

    if (wordIndex < spans.length) {
        spans[wordIndex].style.opacity = '1';
        spans[wordIndex].style.color = '#FFFFFF';
        wordIndex++;
    }

    if (wordIndex >= spans.length) {
        document.body.style.overflow = 'auto';
        window.removeEventListener('wheel', revealNextWord);
        isAnimating = false;
    }
}

// Quando o usuário chegar na seção, ativa animação e bloqueia scroll
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isAnimating && wordIndex < spans.length) {
            isAnimating = true;
            document.body.style.overflow = 'hidden';
            window.addEventListener('wheel', revealNextWord, {
                passive: false
            });
        }
    });
}, {
    threshold: 0.5
});

observer.observe(document.querySelector('.second-square'));

const video = document.getElementById('second-square-mp4');
video.playbackRate = 0.75; // 0.5 = metade da velocidade, 2.0 = dobro, etc.

// Inicia com scroll snap desativado
disableScrollSnap();

// Variável para ativar controle só depois de entrar na quarta ou footer
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

        // Ativa o controle dinâmico a partir da primeira visita
        if ((isFourthVisible || isFooterVisible) && !scrollSnapControlActivated) {
            scrollSnapControlActivated = true;
        }

        // Só aplica scroll snap dinâmico se o controle estiver ativado
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