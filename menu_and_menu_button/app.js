/**
 *   This software includes material derived from the Navigation Menu Button
 *   Example in the WAI-ARIA Authoring Practices 1.2.
 *
 *   https://w3c.github.io/aria-practices/examples/menu-button/menu-button-links.html
 *
 *   Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
 */

'use strict';


//
// Constants
//

const main = document.querySelector('main');

const button = main.querySelector('#menu-button');

const menu = main.querySelector('#menu');
const menuItems = [ ...menu.querySelectorAll('[role="menuitem"]') ];

const firstChars = menuItems.map(item => {
  return item.textContent.toLowerCase().trim().charAt(0);
});

const buttonHandlers = {}, itemHandlers = {};


//
// Utilities
//

/**
 * Show the menu.
 */
function show() {
  menu.removeAttribute('hidden');
  button.setAttribute('aria-expanded', 'true');
}

/**
 * Hide the menu.
 */
function hide() {
  menu.setAttribute('hidden', '');
  button.removeAttribute('aria-expanded');
}

/**
 * Find the index of the menu item in focus.
 * @returns {number}
 */
function findIndexInFocus() {
  return menuItems.findIndex(item => item === document.activeElement);
}

/**
 * Shift focus to the next menu item.
 */
function focusNextItem() {
  const indexInFocus = findIndexInFocus();
  const nextItem = menuItems[indexInFocus + 1];
  nextItem ? nextItem.focus() : focusFirstItem();
}

/**
 * Shift focus to the previous menu item.
 */
function focusPrevItem() {
  const indexInFocus = findIndexInFocus();
  const prevItem = menuItems[indexInFocus - 1];
  prevItem ? prevItem.focus() : focusLastItem();
}

/**
 * Shift focus to the first menu item.
 */
function focusFirstItem() {
  menuItems[0].focus();
}

/**
 * Shift focus to the last menu item.
 */
function focusLastItem() {
  menuItems[menuItems.length - 1].focus();
}

/**
 * Shift focus to a menu item based on its first character.
 * https://w3c.github.io/aria-practices/examples/menu-button/js/menu-button-links.js
 * @param {Element} currentItem
 * @param {string} char
 */
function focusItemByChar(currentItem, char) {
  if (char.length > 1) return;

  let start, index;

  char = char.toLowerCase();

  // Get start index for search based on position of currentItem
  start = menuItems.indexOf(currentItem) + 1;
  if (start >= menuItems.length) {
    start = 0;
  }

  // Check remaining slots in the menu
  index = firstChars.indexOf(char, start);

  // If not found in remaining slots, check from beginning
  if (index === -1) {
    index = firstChars.indexOf(char, 0);
  }

  // If match was found...
  if (index > -1) {
    menuItems[index].focus();
  }
}

/**
 * Check if the menu is expanded.
 * @returns {boolean}
 */
function isExpanded() {
  return button.getAttribute('aria-expanded') === 'true';
}

/**
 * Check if a character is printable.
 * https://w3c.github.io/aria-practices/examples/menu-button/js/menu-button-links.js
 * @param {string} str
 * @returns {boolean}
 */
function isPrintableCharacter(str) {
  return str.length === 1 && str.match(/\S/);
}


//
// Event Handlers
//

/**
 * Handle click events on the button.
 */
buttonHandlers.click = function() {
  if (isExpanded()) {
    hide();
    button.focus();
  } else {
    show();
    focusFirstItem();
  }
};

/**
 * Handle keydown events on the button.
 * @param {KeyboardEvent} event
 */
buttonHandlers.keydown = function(event) {
  let shouldPreventDefault = false;

  switch (event.key) {
    case 'Enter':
    case ' ':
    case 'ArrowDown':
      show();
      focusFirstItem();
      shouldPreventDefault = true;
      break;
    case 'ArrowUp':
      show();
      focusLastItem();
      shouldPreventDefault = true;
      break;
    default:
      break;
  }

  if (shouldPreventDefault) {
    event.preventDefault();
  }
};

/**
 * Handle mouseover events on the menu items.
 * @param {MouseEvent} event
 */
itemHandlers.mouseover = function(event) {
  event.target.focus();
};

/**
 * Handle keydown events on the menu items.
 * @param {KeyboardEvent} event
 */
itemHandlers.keydown = function(event) {
  if (event.ctrlKey || event.altKey || event.metaKey) return;

  const isFirstItem = event.target === menuItems[0];
  const isLastItem = event.target === menuItems[menuItems.length - 1];

  let shouldPreventDefault = false;

  if (event.shiftKey) {
    if (isPrintableCharacter(event.key)) {
      focusItemByChar(event.target, event.key);
      shouldPreventDefault = true;
    }

    if (isFirstItem && event.key === 'Tab') {
      button.focus();
      hide();
      shouldPreventDefault = true;
    }
  } else if (isLastItem && event.key === 'Tab') {
    hide();
  } else {
    switch (event.key) {
      case ' ':
        event.target.click();
        shouldPreventDefault = true;
        break;
      case 'ArrowDown':
        focusNextItem();
        shouldPreventDefault = true;
        break;
      case 'ArrowUp':
        focusPrevItem();
        shouldPreventDefault = true;
        break;
      case 'End':
      case 'PageDown':
        focusLastItem();
        shouldPreventDefault = true;
        break;
      case 'Home':
      case 'PageUp':
        focusFirstItem();
        shouldPreventDefault = true;
        break;
      case 'Escape':
        hide();
        button.focus();
        shouldPreventDefault = true;
        break;
      default:
        if (!isPrintableCharacter(event.key)) break;
        focusItemByChar(event.target, event.key);
        shouldPreventDefault = true;
        break;
    }
  }

  if (shouldPreventDefault) {
    event.preventDefault();
  }
};

/**
 * Handle keydown events inside the component.
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (button === event.target) {
    buttonHandlers.keydown(event);
  } else if (menuItems.includes(event.target)) {
    itemHandlers.keydown(event);
  }
}

/**
 * Handle mousedown events outside the component.
 * @param {MouseEvent} event
 */
function handleMousedown(event) {
  if (main.contains(event.target)) return;
  if (!isExpanded()) return;
  hide();
  button.focus();
}


//
// Inits & Event Listeners
//

hide();

main.addEventListener('keydown', handleKeydown);
button.addEventListener('click', buttonHandlers.click);
menu.addEventListener('mouseover', itemHandlers.mouseover);
document.documentElement.addEventListener('mousedown', handleMousedown);
