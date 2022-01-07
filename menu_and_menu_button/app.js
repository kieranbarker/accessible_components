'use strict';

//
// Constants
//

// Get the menu and menu button
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu-button');

// Get the menu items
const menuItems = [ ...menu.querySelectorAll('a') ];


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
 * Toggle the menu.
 */
function toggle() {
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
 * Handle click events.
 * @param {Event} event
 */
function handleClick(event) {
  if (event.target === menuButton) {
    toggle();
  } else {
    hide();
  }
}

/**
 * Handle the arrow down key when the menu button is in focus.
 */
function handleArrowDownKey() {
  // If the menu is already open, do nothing
  const isExpanded = menuButton.getAttribute('aria-expanded');
  if (isExpanded !== 'false') return;

  // Otherwise, open the menu
  show();
  menuItems[0].focus();
}

/**
 * Handle the escape key when the menu button or a menu item is in focus.
 */
function handleEscapeKey() {
  hide();
  menuButton.focus();
}

/**
 * Handle the menu button when it's in focus.
 * @param {Event} event
 */
function handleMenuButton(event) {
  // Check which key was pressed
  const isArrowDown = event.key === 'ArrowDown' || event.key === 'Down';
  const isEscape = event.key === 'Escape' || event.key === 'Esc';

  // Handle arrow down and escape keys
  if (isArrowDown) {
    handleArrowDownKey();
  } else if (isEscape) {
    handleEscapeKey();
  }
}

/**
 * Handle the arrow keys when a menu item is in focus.
 * @param {boolean} isArrowUp
 * @param {boolean} isArrowDown
 */
function handleArrowKeys(isArrowUp, isArrowDown) {
  // Find the index of the item that's in focus
  const index = menuItems.findIndex(item => {
    return item === document.activeElement;
  });

  // Shift focus to the next item
  let itemToFocus;
  if (isArrowUp) {
    itemToFocus = menuItems[index - 1] ?? menuItems[menuItems.length - 1];
  } else if (isArrowDown) {
    itemToFocus = menuItems[index + 1] ?? menuItems[0];
  }
  itemToFocus.focus();
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

/**
 * Initialise the script.
 */
function init() {
  // Hide the menu
  hide();

  // Handle click and keydown events
  document.documentElement.addEventListener('click', handleClick);
  document.addEventListener('keydown', handleKeydown);
}


//
// Inits & Event Listeners
//

// Initialise the script
init();
