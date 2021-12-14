'use strict';

//
// Constants
//

// Get the accordion and its children
const accordion = document.querySelector('[data-accordion]');
const sections = [ ...accordion.children ];


//
// Functions
//

/**
 * Convert a section into an accordion panel.
 * @param {HTMLElement} section
 * @param {number} index
 */
function createPanels(section, index) {
  // Get the heading and content for this panel
  const [ heading, content ] = section.children;

  // Set the necessary attributes
  section.dataset.panel = '';
  content.id = `content-${index}`;

  // If this isn't the first panel, hide its content
  if (index > 0) {
    content.hidden = true;
  }

  // Replace the heading text with a button
  heading.innerHTML = `
    <button
      type="button"
      data-heading=""
      aria-controls="content-${index}"
      aria-expanded="${index < 1}"
      aria-disabled="${index < 1}"
    >
      ${heading.textContent}
    </button>
  `;
}

/**
 * Show an accordion panel.
 * @param {HTMLElement} panel
 */
function show(panel) {
  // Get the necessary elements
  const [ heading, content ] = panel.children;
  const [ button ] = heading.children;

  // If the panel is already open, do nothing
  const isOpen = button.getAttribute('aria-disabled');
  if (isOpen === 'true') return;

  // Mark the panel as expanded and disabled
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-disabled', 'true');

  // Show the content
  content.hidden = false;
}

/**
 * Hide an accordion panel.
 * @param {HTMLElement} panel
 */
function hide(panel) {
  // Get the necessary elements
  const [ heading, content ] = panel.children;
  const [ button ] = heading.children;

  // Mark the panel as collapsed and enabled
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-disabled', 'false');

  // Hide the content
  content.hidden = true;
}

/**
 * Handle click events.
 * @param {Event} event
 */
function handleClick(event) {
  // If this wasn't a heading, do nothing
  if (!event.target.matches('[data-heading]')) return;

  // Get the panel that was activated
  const thisPanel = event.target.closest('[data-panel]');

  // Get the other panels
  const otherPanels = sections.filter(section => section !== thisPanel);

  // Show this panel
  show(thisPanel);

  // Hide the other panels
  otherPanels.forEach(hide);
}

/**
 * Handle keydown events.
 * @param {Event} event
 */
function handleKeydown(event) {
  // If we already handled the event, do nothing
  if (event.defaultPrevented) return;

  // If there is no heading in focus, do nothing
  const isHeading = document.activeElement.matches('[data-heading]');
  if (!isHeading) return;

  // If it wasn't the up/down arrow key, do nothing
  const isArrowUp = event.key === 'Up' || event.key === 'ArrowUp';
  const isArrowDown = event.key === 'Down' || event.key === 'ArrowDown';
  if (!isArrowUp && !isArrowDown) return;

  // Get all of the headings
  const headings = [ ...accordion.querySelectorAll('[data-heading]') ];

  // Find the index of the heading that's in focus
  const index = headings.findIndex(heading => {
    return heading === document.activeElement;
  });

  // Shift focus to the next heading
  if (isArrowUp) {
    headings[index - 1]?.focus();
  } else if (isArrowDown) {
    headings[index + 1]?.focus();
  }

  // Prevent the default action to avoid handling the event twice
  event.preventDefault();
}


//
// Inits & Event Listeners
//

// Add the necessary elements and attributes
sections.forEach(createPanels);

// Handle click and keydown events
accordion.addEventListener('click', handleClick);
document.addEventListener('keydown', handleKeydown);
