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

const menuId = 'menu';
const buttonId = 'menu-button';

const wrapper = document.querySelector('main');

const button = createButton();

const menu = wrapper.querySelector(`#${menuId}`);
const menuItems = [ ...menu.querySelectorAll('a') ];

const firstChars = menuItems.map(item => {
  return item.textContent.toLowerCase().trim().charAt(0);
});

const keyHandlers = {};

keyHandlers.button = {
  ' ': openMenuAndFocusFirstItem,
  Enter: openMenuAndFocusFirstItem,
  ArrowDown: openMenuAndFocusFirstItem,
  ArrowUp: openMenuAndFocusLastItem
};

keyHandlers.item = {
  ' ': activateItem,
  ArrowDown: focusNextItem,
  ArrowUp: focusPrevItem,
  End: focusLastItem,
  PageDown: focusLastItem,
  Home: focusFirstItem,
  PageUp: focusFirstItem,
  Escape: closeMenuAndFocusButton
};


//
// Utilities
//

/**
 * Initialise the script.
 */
function init() {
  createMenu();
  menu.before(button);
}

/**
 * Create the menu button.
 * @returns {HTMLButtonElement}
 */
function createButton() {
  const button = document.createElement('button');

  button.id = buttonId;
  button.type = 'button';
  button.textContent = 'Navigation';

  button.setAttribute('aria-controls', menuId);
  button.setAttribute('aria-haspopup', 'true');

  return button;
}

/**
 * Create the menu.
 */
function createMenu() {
  const listItems = [ ...menu.children ];

  menu.hidden = true;

  menu.setAttribute('role', 'menu');
  menu.setAttribute('aria-labelledby', buttonId);

  for (const listItem of listItems) {
    listItem.setAttribute('role', 'presentation');
    listItem.firstElementChild.setAttribute('role', 'menuitem');
  }
}

/**
 * Check if the menu is open.
 * @returns {boolean}
 */
function isMenuOpen() {
  return button.getAttribute('aria-expanded') === 'true';
}

/**
 * Open the menu.
 */
function openMenu() {
  menu.hidden = false;
  button.setAttribute('aria-expanded', 'true');
}

/**
 * Open the menu and shift focus to the first item.
 */
function openMenuAndFocusFirstItem() {
  openMenu();
  focusFirstItem();
}

/**
 * Open the menu and shift focus to the last item.
 */
function openMenuAndFocusLastItem() {
  openMenu();
  focusLastItem();
}

/**
 * Close the menu.
 */
function closeMenu() {
  menu.hidden = true;
  button.removeAttribute('aria-expanded');
}

/**
 * Close the menu and shift focus to the menu button.
 */
function closeMenuAndFocusButton() {
  closeMenu();
  button.focus();
}

/**
 * Find the index of the menu item in focus.
 * @returns {number}
 */
function findIndexInFocus() {
  return menuItems.findIndex(item => item === document.activeElement);
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
 * Shift focus to a menu item based on its first character.
 * https://w3c.github.io/aria-practices/examples/menu-button/js/menu-button-links.js
 * @param {HTMLAnchorElement} currentItem
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
 * Activate a menu item.
 * @param {KeyboardEvent} event
 */
function activateItem(event) {
  event.target.click();
}

/**
 * Handle click events on the button.
 */
function handleButtonClick() {
  if (isMenuOpen()) {
    closeMenuAndFocusButton();
  } else {
    openMenuAndFocusFirstItem();
  }
}

/**
 * Handle keydown events on the button.
 * @param {KeyboardEvent} event
 */
function handleButtonKeydown(event) {
  if (!keyHandlers.button.hasOwnProperty(event.key)) return;
  event.preventDefault();
  keyHandlers.button[event.key]();
}

/**
 * Handle mouseover events on the menu items.
 * @param {MouseEvent} event
 */
function handleItemMouseover(event) {
  event.target.focus();
}

/**
 * Handle keydown events on the menu items.
 * @param {KeyboardEvent} event
 */
function handleItemKeydown(event) {
  if (event.ctrlKey || event.altKey || event.metaKey) return;

  const isFirstItem = event.target === menuItems[0];
  const isLastItem = event.target === menuItems[menuItems.length - 1];

  if (event.shiftKey) {
    if (isPrintableCharacter(event.key)) {
      event.preventDefault();
      focusItemByChar(event.target, event.key);
    } else if (isFirstItem && event.key === 'Tab') {
      event.preventDefault();
      closeMenuAndFocusButton();
    }
    return;
  }

  if (isLastItem && event.key === 'Tab') {
    closeMenu();
    return;
  }

  if (keyHandlers.item.hasOwnProperty(event.key)) {
    event.preventDefault();
    keyHandlers.item[event.key](event);
    return;
  }

  if (isPrintableCharacter(event.key)) {
    event.preventDefault();
    focusItemByChar(event.target, event.key);
    return;
  }
}

/**
 * Handle keydown events inside the component.
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (button === event.target) {
    handleButtonKeydown(event);
  } else if (menuItems.includes(event.target)) {
    handleItemKeydown(event);
  }
}

/**
 * Handle mousedown events outside the component.
 * @param {MouseEvent} event
 */
function handleMousedown(event) {
  if (wrapper.contains(event.target)) return;
  if (!isMenuOpen()) return;
  event.preventDefault();
  closeMenuAndFocusButton();
}


//
// Inits & Event Listeners
//

init();

button.addEventListener('click', handleButtonClick);
menu.addEventListener('mouseover', handleItemMouseover);

wrapper.addEventListener('keydown', handleKeydown);
document.documentElement.addEventListener('mousedown', handleMousedown);
