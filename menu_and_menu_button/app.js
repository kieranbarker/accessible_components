const button = document.querySelector('#menu-button');

const menu = document.querySelector('#menu');
const menuItems = [ ...menu.querySelectorAll('[role="menuitem"]') ];

function show() {
  menu.removeAttribute('hidden');
  button.setAttribute('aria-expanded', 'true');
}

function hide() {
  menu.setAttribute('hidden', '');
  button.removeAttribute('aria-expanded');
}

function focusFirstItem() {
  menuItems[0].focus();
}

function focusLastItem() {
  menuItems[menuItems.length - 1].focus();
}

function handleButtonKeydown(event) {
  switch (event.key) {
    case 'Enter':
    case ' ':
    case 'ArrowDown':
      show();
      focusFirstItem();
      break;
    case 'ArrowUp':
      show();
      focusLastItem();
      break;
    case 'Escape':
      hide();
      button.focus();
      break;
    default:
      break;
  }
}

function isExpanded() {
  return button.getAttribute('aria-expanded') === 'true';
}

function handleButtonClick() {
  if (isExpanded()) {
    hide();
    button.focus();
  } else {
    show();
    focusFirstItem();
  }
}

function findIndexInFocus() {
  return menuItems.findIndex(item => item === document.activeElement);
}

function focusNextItem() {
  const indexInFocus = findIndexInFocus();
  const nextItem = menuItems[indexInFocus + 1];
  nextItem ? nextItem.focus() : focusFirstItem();
}

function focusPrevItem() {
  const indexInFocus = findIndexInFocus();
  const prevItem = menuItems[indexInFocus - 1];
  prevItem ? prevItem.focus() : focusLastItem();
}

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

hide();

button.addEventListener('click', handleButtonClick);
button.addEventListener('keydown', handleButtonKeydown);

menu.addEventListener('keydown', handleItemKeydown);
