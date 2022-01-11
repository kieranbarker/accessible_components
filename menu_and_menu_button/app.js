'use strict';

//
// Constants
//

// Get the menu and menu button
const menu = document.querySelector('#menu');
const menuButton = document.querySelector('#menu-button');

// Get the menu items
const menuItems = [ ...menu.querySelectorAll('a') ];

// The aria-expanded attribute
const ariaExpanded = 'aria-expanded';

// Handlers for keydown events
const keydownHandlers = {
  ArrowUp: handleArrowUpKey,
  ArrowDown: handleArrowDownKey,
  Escape: handleEscapeKey,
  Home: handleHomeKey,
  End: handleEndKey
};


//
// Functions
//

/**
 * Show the menu.
 */
function show() {
  menu.hidden = false;
  menuButton.setAttribute(ariaExpanded, 'true');
}

/**
 * Hide the menu.
 */
function hide() {
  menu.hidden = true;
  menuButton.removeAttribute(ariaExpanded);
}

/**
 * Toggle the menu.
 */
function toggle() {
  // Get the expanded state
  const isExpanded = menuButton.getAttribute(ariaExpanded);

  // Hide/show the menu based on the state
  if (isExpanded === 'true') {
    hide();
  } else {
    show();
    focusFirstItem();
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
 * Check if an element is in focus.
 * @param {Element} element
 * @returns {boolean}
 */
function isInFocus(element) {
  return document.activeElement === element;
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
  // Find the index of the item that's in focus
  const index = menuItems.findIndex(isInFocus);

  // Shift focus to the next item
  const nextItem = menuItems[index + 1];
  nextItem ? nextItem.focus() : focusFirstItem();
}

/**
 * Shift focus to the previous menu item.
 */
function focusPrevItem() {
  // Find the index of the item that's in focus
  const index = menuItems.findIndex(isInFocus);

  // Shift focus to the previous item
  const prevItem = menuItems[index - 1];
  prevItem ? prevItem.focus() : focusLastItem();
}

/**
 * Handle the ArrowUp key.
 */
function handleArrowUpKey() {
  // Check which element is in focus
  const isMenuButtonInFocus = isInFocus(menuButton);
  const isMenuItemInFocus = menuItems.includes(document.activeElement);

  // Handle the menu button and menu items
  if (isMenuButtonInFocus) {
    show();
    focusLastItem();
  } else if (isMenuItemInFocus) {
    focusPrevItem();
  }
}

/**
 * Handle the ArrowDown key.
 */
function handleArrowDownKey() {
  // Check which element is in focus
  const isMenuButtonInFocus = isInFocus(menuButton);
  const isMenuItemInFocus = menuItems.includes(document.activeElement);

  // Handle the menu button and menu items
  if (isMenuButtonInFocus) {
    show();
    focusFirstItem();
  } else if (isMenuItemInFocus) {
    focusNextItem();
  }
}

/**
 * Handle the Escape key.
 */
function handleEscapeKey() {
  // If neither the menu button nor a menu item is in focus, do nothing
  const isMenuButtonInFocus = isInFocus(menuButton);
  const isMenuItemInFocus = menuItems.includes(document.activeElement);
  if (!isMenuButtonInFocus && !isMenuItemInFocus) return;

  // Otherwise, close the menu and shift focus to the menu button
  hide();
  menuButton.focus();
}

/**
 * Handle the Home key.
 */
function handleHomeKey() {
  // If there isn't a menu item in focus, do nothing
  const isMenuItemInFocus = menuItems.includes(document.activeElement);
  if (!isMenuItemInFocus) return;

  // Otherwise, shift focus to the first item
  focusFirstItem();
}

/**
 * Handle the End key.
 */
function handleEndKey() {
  // If there isn't a menu item in focus, do nothing
  const isMenuItemInFocus = menuItems.includes(document.activeElement);
  if (!isMenuItemInFocus) return;

  // Otherwise, shift focus to the last item
  focusLastItem();
}

/**
 * Handle keydown events.
 * @param {Event} event
 */
function handleKeydown(event) {
  if (keydownHandlers.hasOwnProperty(event.key)) {
    keydownHandlers[event.key]();
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
