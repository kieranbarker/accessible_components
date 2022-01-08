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
  menuButton.removeAttribute('aria-expanded');
}

/**
 * Toggle the menu.
 */
function toggle() {
  // Get the expanded state
  const isExpanded = menuButton.getAttribute('aria-expanded');

  // Hide/show the menu based on the state
  if (isExpanded && isExpanded === 'true') {
    hide();
  } else {
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
 * Handle the ArrowUp and ArrowDown keys for the menu button.
 * @param {boolean} isArrowUp
 * @param {boolean} isArrowDown
 */
function handleMenuButton(isArrowUp, isArrowDown) {
  // Get the expanded state
  const isExpanded = menuButton.getAttribute('aria-expanded');

  // If the menu is closed, open it
  if (!isExpanded) {
    show();
  }

  // Shift focus to the last/first item
  if (isArrowUp) {
    menuItems[menuItems.length - 1].focus();
  } else if (isArrowDown) {
    menuItems[0].focus();
  }
}

/**
 * Handle the ArrowUp and ArrowDown keys for a menu item.
 * @param {boolean} isArrowUp
 * @param {boolean} isArrowDown
 */
function handleMenuItem(isArrowUp, isArrowDown) {
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
 * Handle the ArrowUp and ArrowDown keys.
 * @param {boolean} isArrowUp
 * @param {boolean} isArrowDown
 */
function handleArrowKeys(isArrowUp, isArrowDown) {
  // Check which element is in focus
  const isMenuButtonInFocus = document.activeElement.matches('#menu-button');
  const isMenuItemInFocus = document.activeElement.matches('#menu a');

  // Handle the menu button and menu items
  if (isMenuButtonInFocus) {
    handleMenuButton(isArrowUp, isArrowDown);
  } else if (isMenuItemInFocus) {
    handleMenuItem(isArrowUp, isArrowDown);
  }
}

/**
 * Handle the Escape key.
 */
function handleEscapeKey() {
  // Check if a menu item is in focus
  const isMenuItemInFocus = document.activeElement.matches('#menu a');

  // Close the menu
  hide();

  // If a menu item is in focus, shift focus to the menu button
  if (isMenuItemInFocus) {
    menuButton.focus();
  }
}

/**
 * Handle the Home key.
 */
function handleHomeKey() {
  menuItems[0].focus();
}

/**
 * Handle the End key.
 */
function handleEndKey() {
  menuItems[menuItems.length - 1].focus();
}

/**
 * Handle keydown events.
 * @param {Event} event
 */
function handleKeydown(event) {
  // Check which key was pressed
  const isArrowUp = event.key === 'ArrowUp' || event.key === 'Up';
  const isArrowDown = event.key === 'ArrowDown' || event.key === 'Down';
  const isEscape = event.key === 'Escape' || event.key === 'Esc';
  const isHome = event.key === 'Home';
  const isEnd = event.key === 'End';

  // Handle the ArrowUp/ArrowDown, Escape, Home, and End keys
  if (isArrowUp || isArrowDown) {
    handleArrowKeys(isArrowUp, isArrowDown);
  } else if (isEscape) {
    handleEscapeKey();
  } else if (isHome) {
    handleHomeKey();
  } else if (isEnd) {
    handleEndKey();
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
