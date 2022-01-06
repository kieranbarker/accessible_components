'use strict';

//
// Constants
//

// Get the menu and menu button
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu-button');

// Get the first menu item
const firstMenuItem = menu.firstElementChild.firstElementChild;


//
// Functions
//

/**
 * Show the menu.
 */
function show() {
  menu.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
}

/**
 * Hide the menu.
 */
function hide() {
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
}

/**
 * Handle click events.
 */
function handleClick() {
  // Get the expanded state
  const isExpanded = menuButton.getAttribute('aria-expanded');

  // Show/hide the menu based on the state
  if (isExpanded === 'true') {
    hide();
  } else if (isExpanded === 'false') {
    show();
  }
}

/**
 * Handle the menu button when it's in focus.
 * @param {Event} event
 */
function handleMenuButton(event) {
  // If it wasn't the down arrow key, do nothing
  const isArrowDown = event.key === 'ArrowDown' || event.key === 'Down';
  if (!isArrowDown) return;

  // Otherwise, show the menu and focus the first item
  show();
  firstMenuItem.focus();
}

/**
 * Handle the arrow keys when a menu item is in focus.
 * @param {boolean} isArrowUp
 * @param {boolean} isArrowDown
 */
function handleArrowKeys(isArrowUp, isArrowDown) {
  // Get all of the menu items
  const menuItems = [ ...menu.querySelectorAll('a') ];

  // Find the index of the item that's in focus
  const index = menuItems.findIndex(item => {
    return item === document.activeElement;
  });

  // Shift focus to the next item
  if (isArrowUp) {
    menuItems[index - 1]?.focus();
  } else if (isArrowDown) {
    menuItems[index + 1]?.focus();
  }
}

/**
 * Handle the escape key when a menu item is in focus.
 */
function handleEscapeKey() {
  hide();
  menuButton.focus();
}

/**
 * Handle a menu item when it's in focus.
 * @param {Event} event
 */
function handleMenuItem(event) {
  // Check which key was pressed
  const isArrowUp = event.key === 'ArrowUp' || event.key === 'Up';
  const isArrowDown = event.key === 'ArrowDown' || event.key === 'Down';
  const isEscape = event.key === 'Escape' || event.key === 'Esc';

  // Handle arrow keys and escape key
  if (isArrowUp || isArrowDown) {
    handleArrowKeys(isArrowUp, isArrowDown);
  } else if (isEscape) {
    handleEscapeKey();
  }
}

/**
 * Handle keydown events.
 * @param {Event} event
 */
function handleKeydown(event) {
  // Check which element is in focus
  const isMenuButtonInFocus = document.activeElement.matches('#menu-button');
  const isMenuItemInFocus = document.activeElement.matches('#menu a');

  // Handle menu button and menu items
  if (isMenuButtonInFocus) {
    handleMenuButton(event);
  } else if (isMenuItemInFocus) {
    handleMenuItem(event);
  }
}


//
// Inits & Event Listeners
//

// Handle click and keydown events
menuButton.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
