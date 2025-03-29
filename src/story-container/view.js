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

    containers.forEach((container) => {
        let currentFontSizeIndex = 0;
        const fontSizes = [20, 25, 30, 35]; // Tamaños de fuente
        const initialFontSize = fontSizes[currentFontSizeIndex];

        // Aplicar tamaño de fuente inicial
        container.style.fontSize = `${initialFontSize}px`;
        container.classList.add(`font-size-${currentFontSizeIndex}`);

        // Crear botones de control
        const controls = document.createElement('div');
        controls.classList.add('story-container-controls');

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.classList.add('increase-font', 'wp-block-button__link');
        increaseButton.setAttribute('aria-label', 'Augmenta la mida del text');
        increaseButton.setAttribute('title', 'Augmenta la mida del text');

        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.classList.add('decrease-font', 'wp-block-button__link');
        decreaseButton.setAttribute('aria-label', 'Redueix la mida del text');
        decreaseButton.setAttribute('title', 'Redueix la mida del text');

        const toggleFontButton = document.createElement('button');
        toggleFontButton.textContent = 'Toggle Font';
        toggleFontButton.classList.add('toggle-font', 'wp-block-button__link');

        toggleFontButton.setAttribute('aria-label', 'Canvia la tipografia');
        toggleFontButton.setAttribute('title', 'Canvia la tipografia');

        // Añadir botones al contenedor de controles
        controls.appendChild(increaseButton);
        controls.appendChild(decreaseButton);
        controls.appendChild(toggleFontButton);
        container.insertBefore(controls, container.firstChild);

        // Eventos per aumentar/disminuir tamaño
        increaseButton.addEventListener('click', () => {
            if (currentFontSizeIndex < fontSizes.length - 1) {
                // Esborra la classe anterior
                container.classList.remove(`font-size-${currentFontSizeIndex}`);
                currentFontSizeIndex++;
                // Afegeix la nova classe
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

        // Evento para alternar tipografía amb classes
        toggleFontButton.addEventListener('click', () => {
            container.classList.toggle('story-block-font');
        });
    });
});
/* eslint-enable no-console */
