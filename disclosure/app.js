'use strict';

//
// Constants
//

// The ID for the content
const contentId = 'content';

// Create the trigger
const trigger = createTrigger();

// Get the content
const content = document.querySelector(`#${contentId}`);


//
// Functions
//

/**
 * Create the trigger for the content.
 * @returns {HTMLButtonElement}
 */
function createTrigger() {
  // Create a button element
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Show';

  // Set the necessary attributes
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', contentId);

  // Return the button element
  return button;
}

/**
 * Show the content.
 */
function show() {
  // Show the content
  content.hidden = false;

  // Update the trigger
  trigger.textContent = 'Hide';
  trigger.setAttribute('aria-expanded', 'true');
}

/**
 * Hide the content.
 */
function hide() {
  // Hide the content
  content.hidden = true;

  // Update the trigger
  trigger.textContent = 'Show';
  trigger.setAttribute('aria-expanded', 'false');
}

/**
 * Handle click events.
 */
function handleClick() {
  // Get the expanded state
  const isExpanded = trigger.getAttribute('aria-expanded');

  // Show/hide the content based on the state
  if (isExpanded === 'true') {
    hide();
  } else if (isExpanded === 'false') {
    show();
  }
}

/**
 * Initialise the script.
 */
function init() {
  // Hide the content
  content.hidden = true;

  // Insert the trigger
  content.before(trigger);
  trigger.addEventListener('click', handleClick);
}


//
// Inits & Event Listeners
//

// Initialise the script
init();
