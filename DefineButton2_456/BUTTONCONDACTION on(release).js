/**
 * ActionScript code for a button's `on(release)` event handler,
 * likely a "Quality" setting button.
 * This script cycles through different quality settings (`_quality`),
 * saves the setting using `control.localset()`, and then updates the
 * button's displayed text to reflect the new quality setting.
 *
 * In JavaScript, this would typically be a function assigned to a click event listener
 * of a UI element.
 * Assumes `_quality` is a global variable, `control` is an instance of a game control class,
 * and `this.qualitytext()` is a method on the button (or its container) to update its label.
 */
function onRelease_DefineButton2_456() {
   // Assuming _quality is a global variable or accessible in this scope.
   // In a modern JS application, this would likely be part of a settings object.
   switch (window._quality) {
      case "HIGH":
         window._quality = "MEDIUM";
         break;
      case "MEDIUM":
         window._quality = "LOW";
         break;
      case "LOW":
         window._quality = "HIGH";
         break;
      default:
         window._quality = "HIGH"; // Fallback if _quality is not set or unexpected.
   }

   // Assuming 'control' is a globally accessible instance of GameControl.
   // And `localset` is a method on it.
   if (typeof control !== 'undefined' && control.localset) {
      control.localset(); // Save the new quality setting.
   }

   // Assuming 'this' refers to the button itself, which has a qualitytext method
   // to update its display.
   if (typeof this.qualitytext === 'function') {
      this.qualitytext(); // Update button text to show new quality.
   }
}

// How this might be used in a JavaScript environment:
// Assuming `qualityButton` is a button instance.
// qualityButton.addEventListener('click', onRelease_DefineButton2_456.bind(qualityButtonInstance));