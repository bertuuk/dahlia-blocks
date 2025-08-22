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

/**
 * This script enhances the "story-container" block by adding a floating toggle
 * with accessible reading controls: increase font size, decrease font size, toggle font style.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.wp-block-dahlia-blocks-story-container');
  containers.forEach(container => {
    const srNotice = document.createElement('p');
    srNotice.classList.add('sr-only');
    srNotice.setAttribute('role', 'note');
    srNotice.textContent = 'Al final del conte hi trobareu opcions per canviar la mida del text i el tipus de lletra per facilitar la lectura als infants. S\'activen amb el botó "Mostrar opcions de lectura"';
    let currentFontSizeIndex = 0;
    // Apply initial font size
    const fontSizes = [20, 25, 30, 35];
    container.classList.add(`font-size-${currentFontSizeIndex}`);

    // === Create floating control container ===
    const floatingControls = document.createElement('div');
    floatingControls.classList.add('story-floating-toggle');

    // === Create toggle button  ===
    const toggleButton = document.createElement('button');
    toggleButton.classList.add('toggle-controls');
    const icon = window.createDahliaIcon({
      name: 'settings-sliders',
      size: 'large'
    });
    toggleButton.appendChild(icon);

    // === Create collapsible menu container ===
    const menu = document.createElement('div');
    menu.classList.add('story-floating-menu');
    menu.id = 'story-floating-menu';

    // === Define individual buttons ===
    const buttons = [{
      text: '+',
      iconName: 'plus-small',
      className: 'increase-font',
      ariaLabel: 'Augmenta la mida del text',
      action: () => {
        if (currentFontSizeIndex < fontSizes.length - 1) {
          container.classList.remove(`font-size-${currentFontSizeIndex}`);
          currentFontSizeIndex++;
          container.classList.add(`font-size-${currentFontSizeIndex}`);
        }
      }
    }, {
      text: '-',
      iconName: 'minus-small',
      className: 'decrease-font',
      ariaLabel: 'Redueix la mida del text',
      action: () => {
        if (currentFontSizeIndex > 0) {
          container.classList.remove(`font-size-${currentFontSizeIndex}`);
          currentFontSizeIndex--;
          container.classList.add(`font-size-${currentFontSizeIndex}`);
        }
      }
    }, {
      text: 'a/A',
      iconName: 'letter-case',
      className: 'toggle-font',
      ariaLabel: 'Canvia la tipografia',
      action: () => {
        container.classList.toggle('story-block-font');
      }
    }];
    const domButtons = [];
    // === Create button elements and bind actions ===
    buttons.forEach(({
      text,
      iconName,
      className,
      ariaLabel,
      action
    }) => {
      const btn = document.createElement('button');
      btn.classList.add(className, 'wp-block-button');
      // btn.textContent = text;
      btn.setAttribute('aria-label', ariaLabel);
      let buttonIcon = window.createDahliaIcon({
        name: iconName,
        size: 'medium'
      });
      btn.appendChild(buttonIcon);
      btn.addEventListener('click', e => {
        e.stopPropagation();
        action(); // Execute the intended action
      });
      menu.appendChild(btn);
      domButtons.push(btn);
    });
    function closedMenu() {
      toggleButton.setAttribute('aria-label', 'Mostra opcions de lectura');
      toggleButton.setAttribute('aria-expanded', 'false');
      toggleButton.setAttribute('aria-controls', 'story-floating-menu');
      menu.setAttribute('aria-hidden', 'true');
      domButtons.forEach(btn => {
        btn.setAttribute('tabindex', -1);
      });
    }
    closedMenu();
    // === Define open/close menu functions ===
    function openMenu() {
      container.classList.add('open');
      changeDahliaIcon(icon, {
        name: 'cross-small',
        size: 'large'
      });
      toggleButton.setAttribute('aria-label', 'Tanca opcions de lectura');
      toggleButton.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
      domButtons.forEach(btn => {
        btn.setAttribute('tabindex', 0);
      });
    }
    function closeMenu() {
      changeDahliaIcon(icon, {
        name: 'settings-sliders',
        size: 'large'
      });
      container.classList.remove('open');
      toggleButton.focus();
      closedMenu();
    }

    // === Toggle button: open/close menu ===
    toggleButton.addEventListener('click', e => {
      e.stopPropagation(); // evita que tanqui immediatament
      if (container.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
    // === Close menu with ESC key ===
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
    // === Close menu on click outside ===
    document.addEventListener('click', e => {
      if (!floatingControls.contains(e.target) && container.classList.contains('open')) {
        closeMenu();
      }
    });

    // === Append elements into the container (top of block) ===
    floatingControls.appendChild(toggleButton);
    floatingControls.appendChild(menu);
    container.append(floatingControls, container.firstChild);
    container.insertBefore(srNotice, container.firstChild);
  });
});

/* eslint-enable no-console */
/******/ })()
;
//# sourceMappingURL=view.js.map