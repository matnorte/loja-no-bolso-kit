// app.js — assistente de comércio eletrônico interativo e semântico
// focado em acessibilidade, performance e ambiente local do agente Hermes

// ———————————————————————————————
// Acessibilidade: foco visual para botões e links via teclado
// ———————————————————————————————

document.addEventListener('DOMContentLoaded', () => {
    // Navegação suave para âncoras internas
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Indicador de foco para leitores de tela
            target.setAttribute('tabindex', '-1');
            target.focus();
            target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        });
    });

    // Realce do link ativo durante o scroll (saúde do UX)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        },
        { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));

    // Manter o estado do focus ao navegar com o teclado
    navLinks.forEach(link => {
        link.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                link.click();
            }
        });
    });

    // Mini carrossel de produtos (setas do teclado funcionam)
    const carouselContainer = document.querySelector('.product-grid');
    if (carouselContainer) {
        let scrollAmount = 0;
        const maxScroll = carouselContainer.scrollWidth - carouselContainer.clientWidth;

        // Scroll suave com botão do meio do mouse (opcional)
        carouselContainer.addEventListener('wheel', e => {
            // Allow natural scrolling on mobile devices
            if (e.deltaY > 0 && carouselContainer.scrollLeft + carouselContainer.clientWidth >= carouselContainer.scrollWidth - 5) {
                // At bottom, allow natural scroll propagation
                return;
            }
            if (e.deltaY < 0 && carouselContainer.scrollLeft <= 5) {
                // At top, allow natural scroll propagation
                return;
            }
            // Only prevent default for horizontal scrolling within carousel
            e.preventDefault();
            carouselContainer.scrollLeft += e.deltaY;
        }, { passive: false });
    }

    // Indicador de status de loading para imagens (fallback para conexões lentas)
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        img.addEventListener('load', () => img.classList.add('loaded'));
        img.addEventListener('error', () => {
            img.src = 'https://picsum.photos/seed/placeholder/400/600.jpg';
            img.alt = 'Imagem não disponível';
        });
    });
});