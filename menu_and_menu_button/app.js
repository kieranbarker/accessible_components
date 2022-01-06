'use strict';

const menuButton = document.querySelector('#menu-button');
const menu = document.querySelector('#menu');
const firstMenuItem = menu.firstElementChild.firstElementChild;

function show() {
  menu.hidden = false;
  menuButton.setAttribute('aria-expanded', 'true');
}

function hide() {
  menu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
}

function toggle() {
  const isExpanded = menuButton.getAttribute('aria-expanded');

  if (isExpanded === 'true') {
    hide();
  } else if (isExpanded === 'false') {
    show();
  }
}

function handleClick() {
  toggle();
}

function handleKeydown(event) {
  const isMenuButtonInFocus = document.activeElement.matches('#menu-button');
  const isMenuItemInFocus = document.activeElement.matches('#menu a');

  if (isMenuButtonInFocus) {
    const isArrowDown = event.key === 'ArrowDown' || event.key === 'Down';
    if (!isArrowDown) return;

    show();
    firstMenuItem.focus();

    return;
  }

  if (isMenuItemInFocus) {
    const isArrowUp = event.key === 'ArrowUp' || event.key === 'Up';
    const isArrowDown = event.key === 'ArrowDown' || event.key === 'Down';
    const isEscape = event.key === 'Escape' || event.key === 'Esc';

    if (isArrowUp || isArrowDown) {
      const menuItems = [ ...menu.querySelectorAll('a') ];

      const index = menuItems.findIndex(item => {
        return item === document.activeElement;
      });

      if (isArrowUp) {
        menuItems[index - 1]?.focus();
      } else if (isArrowDown) {
        menuItems[index + 1]?.focus();
      }

      return;
    }

    if (isEscape) {
      hide();
      menuButton.focus();

      return;
    }
  }
}

menuButton.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
