document.addEventListener('DOMContentLoaded', () => {

    // =====================================================
    // 1. MENU DE NAVEGAÇÃO (DESTAQUE ATIVO + MOBILE)
    // =====================================================
    const menuToggle = document.getElementById('menuToggle');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], footer[id]');

    // Abre/fecha menu no celular
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('open');
    });

    // Função para marcar o botão vermelho no item selecionado
    function setActiveLink(id) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    }

    // Atualiza imediatamente ao clicar em qualquer link do menu
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').replace('#', '');
            setActiveLink(targetId);
            navbar.classList.remove('open'); // Fecha menu mobile após clique
        });
    });

    // Atualiza automaticamente conforme a rolagem da página
    window.addEventListener('scroll', () => {
        let currentId = 'inicio';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 160;
            if (window.scrollY >= sectionTop) {
                currentId = section.getAttribute('id');
            }
        });

        // Se chegar no final da página, destaca "Contato"
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 30) {
            currentId = 'contato';
        }

        setActiveLink(currentId);
    });


    // =====================================================
    // 2. RECURSO JS 1: CARROSSEL DO BANNER PRINCIPAL
    // =====================================================
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const heroCarousel = document.querySelector('.hero-carousel');

    let currentSlide = 0;
    let autoPlayInterval;

    function goToSlide(index) {
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const slideIndex = Number(dot.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Inicia autoplay e pausa quando o mouse passa por cima
    startAutoPlay();
    heroCarousel.addEventListener('mouseenter', stopAutoPlay);
    heroCarousel.addEventListener('mouseleave', startAutoPlay);


    // =====================================================
    // 3. RECURSO JS 2: BOTÃO "MOSTRAR CURIOSIDADE"
    // =====================================================
    const curiosidades = [
        "Um carro de Fórmula 1 moderno gera tanta pressão aerodinâmica que poderia andar de cabeça para baixo no teto de um túnel acima de 200 km/h.",
        "Durante uma corrida de Fórmula 1, um piloto pode perder até 3 kg de peso corporal devido ao calor intenso no cockpit e à força G nas curvas.",
        "Os discos de freio de fibra de carbono de um carro de corrida atingem mais de 1.000 °C durante as freadas mais fortes.",
        "Nas 24 Horas de Le Mans, os carros percorrem mais de 5.000 km — distância superior a uma temporada inteira de Fórmula 1.",
        "Quase todos os grandes campeões do automobilismo mundial, como Ayrton Senna, Michael Schumacher e Lewis Hamilton, começaram suas carreiras no Kart.",
        "Um pit stop completo na Fórmula 1 moderna troca os quatro pneus em menos de 2 segundos."
    ];

    const curiosityText = document.getElementById('curiosityText');
    const btnCuriosity = document.getElementById('btnCuriosity');
    let curiosityIndex = 0;

    btnCuriosity.addEventListener('click', () => {
        curiosityIndex = (curiosityIndex + 1) % curiosidades.length;
        
        // Pequeno efeito suave de transição no texto
        curiosityText.style.opacity = 0;
        setTimeout(() => {
            curiosityText.textContent = curiosidades[curiosityIndex];
            curiosityText.style.opacity = 1;
        }, 180);
    });

});