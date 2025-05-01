/******/ (() => { // webpackBootstrap
/*!*************************************!*\
  !*** ./src/story-container/view.js ***!
  \*************************************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.wp-block-dahlia-blocks-story-container');
  containers.forEach(container => {
    let currentFontSizeIndex = 0;
    const fontSizes = [20, 25, 30, 35];

    // Aplicar mida de font inicial
    container.style.fontSize = `${fontSizes[currentFontSizeIndex]}px`;
    container.classList.add(`font-size-${currentFontSizeIndex}`);

    // Crear contenidor principal
    const controls = document.createElement('div');
    controls.classList.add('story-container-controls', 'wp-block-buttons');

    // Crear i capturar referències als botons
    function createWrappedButton({
      text,
      className,
      ariaLabel,
      title
    }) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('wp-block-button');
      const button = document.createElement('button');
      button.classList.add(className, 'wp-block-button__link');
      button.textContent = text;
      button.setAttribute('aria-label', ariaLabel);
      button.setAttribute('title', title);
      wrapper.appendChild(button);
      controls.appendChild(wrapper);
      return button; // Retorna el botó per poder-hi afegir esdeveniments
    }
    const increaseButton = createWrappedButton({
      text: '+',
      className: 'increase-font',
      ariaLabel: 'Augmenta la mida del text',
      title: 'Augmenta la mida del text'
    });
    const decreaseButton = createWrappedButton({
      text: '-',
      className: 'decrease-font',
      ariaLabel: 'Redueix la mida del text',
      title: 'Redueix la mida del text'
    });
    const toggleFontButton = createWrappedButton({
      text: 'a/A',
      className: 'toggle-font',
      ariaLabel: 'Canvia la tipografia',
      title: 'Canvia la tipografia'
    });

    // Afegim el contenidor de controls al principi
    container.insertBefore(controls, container.firstChild);

    // Esdeveniments
    increaseButton.addEventListener('click', () => {
      if (currentFontSizeIndex < fontSizes.length - 1) {
        container.classList.remove(`font-size-${currentFontSizeIndex}`);
        currentFontSizeIndex++;
        container.classList.add(`font-size-${currentFontSizeIndex}`);
      }
    });
    decreaseButton.addEventListener('click', () => {
      if (currentFontSizeIndex > 0) {
        container.classList.remove(`font-size-${currentFontSizeIndex}`);
        currentFontSizeIndex--;
        container.classList.add(`font-size-${currentFontSizeIndex}`);
      }
    });
    toggleFontButton.addEventListener('click', () => {
      container.classList.toggle('story-block-font');
    });
  });
});
/* eslint-enable no-console */
/******/ })()
;
//# sourceMappingURL=view.js.map