'use strict';

//
// Constants
//

// Get the main element
const main = document.querySelector('main');

// The message for the alert
const message = 'You just activated a native HTML button element. It has the \
required button role, focus outline, and keyboard functionality by default.';


//
// Functions
//

/**
 * Toggle a button's pressed state.
 * @param {HTMLButtonElement} button
 */
function toggle(button) {
  // Get the old pressed state
  const oldState = button.getAttribute('aria-pressed');

  // Get the new pressed state
  let newState;
  if (oldState === 'true') {
    newState = 'false';
  } else if (oldState === 'false') {
    newState = 'true';
  }

  // Update the pressed state
  button.setAttribute('aria-pressed', newState);
}

/**
 * Handle click events.
 * @param {Event} event
 */
function handleClick(event) {
  switch (event.target.id) {
    case 'alert':
      alert(message);
      break;
    case 'toggle':
      toggle(event.target);
      break;
    default:
      return;
  }
}


//
// Event Listeners
//

// Handle click events
main.addEventListener('click', handleClick);
