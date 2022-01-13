const main = document.querySelector('main');

const button = main.querySelector('#menu-button');

const menu = main.querySelector('#menu');
const menuItems = [ ...menu.querySelectorAll('[role="menuitem"]') ];

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
 * Handle keydown events on the button.
 * @param {KeyboardEvent} event
 */
function handleButtonKeydown(event) {
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
}

/**
 * Check if the menu is expanded.
 * @returns {boolean}
 */
function isExpanded() {
  return button.getAttribute('aria-expanded') === 'true';
}

/**
 * Handle click events on the button.
 */
function handleButtonClick() {
  if (isExpanded()) {
    hide();
    button.focus();
  } else {
    show();
    focusFirstItem();
  }
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
 * Handle keydown events on the menu items.
 * @param {KeyboardEvent} event
 */
function handleItemKeydown(event) {
  const isFirstItem = event.target === menuItems[0];
  const isLastItem = event.target === menuItems[menuItems.length - 1];

  let shouldPreventDefault = false;

  if (event.key === 'Tab') {
    if (isFirstItem && event.shiftKey) {
      button.focus();
      hide();
      shouldPreventDefault = true;
    } else if (isLastItem && !event.shiftKey) {
      hide();
    }
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
        break;
    }
  }

  if (shouldPreventDefault) {
    event.preventDefault();
  }
}

/**
 * Handle mouseover events on the menu items.
 * @param {MouseEvent} event
 */
function handleItemMouseover(event) {
  event.target.focus();
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

hide();

button.addEventListener('click', handleButtonClick);
button.addEventListener('keydown', handleButtonKeydown);

menu.addEventListener('keydown', handleItemKeydown);
menu.addEventListener('mouseover', handleItemMouseover);

document.documentElement.addEventListener('mousedown', handleMousedown);
