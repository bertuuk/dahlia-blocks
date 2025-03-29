

function initializeCarousels() {
    const carouselBlocks = document.querySelectorAll('.wp-block-dahlia-blocks-post-grid');
    if (carouselBlocks.length === 0) return;
   
    // Recorremos todos los elementos de tipo carousel.
    carouselBlocks.forEach((carouselBlock) => {
        const carousel = carouselBlock.querySelector('.post-grid-carousel');
        if (!carousel) return;
        const controls = carouselBlock.querySelector('.tns-controls');
        const itemsLargeDesktop = parseInt(carousel.dataset.itemsLargeDesktop, 10) || 4;
        const itemsDesktop = parseInt(carousel.dataset.itemsDesktop, 10) || 4;
        const itemsTablet = parseInt(carousel.dataset.itemsTablet, 10) || 2;
        const itemsMobile = parseInt(carousel.dataset.itemsMobile, 10) || 1;
        const slideBy = parseInt(carousel.dataset.slideBy, 10) || 1;
        const peek = carousel.dataset.peek === 'true';
        const autoplay = carousel.dataset.autoplay === 'true';
        const nav = carousel.dataset.nav === 'true';
        // Inicializamos Tiny Slider.
        const slider = tns({
            container: carousel,
            items: itemsDesktop,
            slideBy: slideBy,
            autoplay: autoplay,
            controlsContainer: controls,
            controls: true,
            nav: nav,
            autoplayButtonOutput: false,
            loop: false,
            gutter: 36,
            
            responsive: {
                1750: { items: itemsLargeDesktop },
                1200: { items: itemsDesktop },
                992: { 
                    items: itemsDesktop - 1,
                    edgePadding: peek ? 0 : 0, // Show part of the next slide if "peek" is true
                },
                768: { items: itemsTablet },
                576: {
                    items: itemsMobile,
                    gutter: 36,
                },
                0: {
                    items: itemsMobile,
                    gutter: 20,
                    edgePadding: peek ? 75 : 0, // Show part of the next slide if "peek" is true
                },
            },
            
        });
        slider.events.on('indexChanged', () => {
            const info = slider.getInfo();
            const prevButton = carouselBlock.querySelector('.tns-prev');
            const nextButton = carouselBlock.querySelector('.tns-next');
        
            // Desactiva el botón "prev" si estás en el primer slide
            if (info.index === 0) {
                prevButton.disabled = true;
                prevButton.classList.add('disabled');
            } else {
                prevButton.disabled = false;
                prevButton.classList.remove('disabled');
            }
        
            // Desactiva el botón "next" si estás en el último slide
            if (info.index + info.items >= info.slideCount) {
                nextButton.disabled = true;
                nextButton.classList.add('disabled');
            } else {
                nextButton.disabled = false;
                nextButton.classList.remove('disabled');
            }
        });

    });
}

// DOMContentLoaded ensures this runs after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousels();
});