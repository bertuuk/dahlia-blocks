/******/ (() => { // webpackBootstrap
/*!*******************************!*\
  !*** ./src/post-grid/view.js ***!
  \*******************************/
const htmlLang = document.documentElement.lang;
const t = htmlLang === 'ca' || htmlLang === 'es' ? {
  slide: 'Diapositiva',
  to: 'a',
  of: 'de'
} : {
  slide: 'Slide',
  to: 'to',
  of: 'of'
};
function initializeCarousels() {
  const carouselBlocks = document.querySelectorAll('.wp-block-dahlia-blocks-post-grid');
  if (carouselBlocks.length === 0) return;

  // Recorremos todos los elementos de tipo carousel.
  carouselBlocks.forEach(carouselBlock => {
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
    const loop = carousel.dataset.loop === 'true';
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
      loop: loop,
      gutter: 30,
      preventScrollOnTouch: true,
      responsive: {
        1750: {
          items: itemsLargeDesktop
        },
        1200: {
          items: itemsDesktop
        },
        992: {
          items: itemsDesktop - 1,
          edgePadding: peek ? 0 : 0,
          // Show part of the next slide if "peek" is true
          mouseDrag: false
        },
        768: {
          items: itemsTablet
        },
        576: {
          items: itemsMobile,
          gutter: 30,
          slideBy: 1
        },
        0: {
          items: itemsMobile,
          gutter: 20,
          edgePadding: peek ? 75 : 0,
          // Show part of the next slide if "peek" is true
          mouseDrag: true
        }
      }
    });
    function updateSlidesAccessibility() {
      const info = slider.getInfo();
      const slides = carousel.querySelectorAll('.tns-item');
      slides.forEach((slide, index) => {
        const isVisible = index >= info.index && index < info.index + info.items;
        slide.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
        slide.querySelectorAll('a, button, input, textarea, select, [tabindex]').forEach(el => {
          if (isVisible) {
            el.removeAttribute('tabindex');
          } else {
            el.setAttribute('tabindex', '-1');
          }
        });
      });
    }
    function updateLiveRegion(slider, carouselBlock) {
      const liveRegion = carouselBlock.querySelector('.tns-liveregion');
      if (!liveRegion) return;
      const info = slider.getInfo();
      const currentStart = info.displayIndex || info.index + 1;
      const currentEnd = currentStart + info.items - 1;
      const totalSlides = carouselBlock.querySelectorAll('.tns-item:not(.tns-slide-cloned)').length;
      let finalSlide = currentEnd > totalSlides ? (currentEnd - 1) % totalSlides + 1 : currentEnd;
      liveRegion.textContent = `${t.slide} ${currentStart} ${t.to} ${finalSlide} ${t.of} ${totalSlides}`;
    }
    updateSlidesAccessibility();
    updateLiveRegion(slider, carouselBlock);
    slider.events.on('indexChanged', () => {
      updateSlidesAccessibility();
      updateLiveRegion(slider, carouselBlock);
      const info = slider.getInfo();
      const prevButton = carouselBlock.querySelector('.tns-prev');
      const nextButton = carouselBlock.querySelector('.tns-next');
      if (!loop) {
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
      }
    });

    // Gestió refinada de swipe vs click damunt d'enllaços/botons
    let isDragging = false;
    let startTarget = null;
    carousel.addEventListener('touchstart', e => {
      isDragging = false;
      startTarget = e.target.closest('a, button, [tabindex]');
    });
    carousel.addEventListener('touchmove', () => {
      isDragging = true;
    });
    carousel.addEventListener('touchend', () => {
      if (isDragging && startTarget) {
        startTarget.dataset.blockClick = 'true';
        setTimeout(() => {
          delete startTarget.dataset.blockClick;
        }, 100); // temps mínim per evitar clic accidental
      }
    });
    carousel.addEventListener('click', e => {
      const target = e.target.closest('a, button, [tabindex]');
      if (target?.dataset.blockClick === 'true') {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true // captura abans que arribi a l'element
    );
  });
}

// DOMContentLoaded ensures this runs after the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initializeCarousels();
});
/******/ })()
;
//# sourceMappingURL=view.js.map