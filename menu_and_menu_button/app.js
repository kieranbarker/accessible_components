const menu = document.querySelector('#menu');
const button = document.querySelector('#menu-button');
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

function handleButtonClick(event) {
  if (isExpanded()) {
    hide();
    button.focus();
  } else {
    show();
    focusFirstItem();
  }
}

hide();
button.addEventListener('click', handleButtonClick);
button.addEventListener('keydown', handleButtonKeydown);
