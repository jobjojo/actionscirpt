/**
 * ActionScript code for a button's `on(release)` event handler.
 * This script modifies the global `_quality` setting (e.g., "HIGH", "MEDIUM", "LOW")
 * and then calls `control.localset()` to save this setting.
 *
 * In JavaScript, this would typically be a function assigned to a click event listener
 * of a UI element (e.g., a button in a DOM or a game engine UI).
 * `_quality` would be a global variable or a property of a settings object.
 * `control` is assumed to be an instance of a game control class.
 */
function onRelease_DefineButton2_108() {
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
      control.localset();
   }
}

// How this might be used in a JavaScript environment:
// Assuming `myButton108` is a DOM element or a game engine button instance.
// myButton108.addEventListener('click', onRelease_DefineButton2_108);
// Or if directly in an object's method:
// class MyButtonHandler {
//    constructor(controlInstance) {
//       this.control = controlInstance;
//       this.buttonElement.addEventListener('click', this.handleRelease.bind(this));
//    }
//
//    handleRelease() {
//       switch (window._quality) { /* ... same logic ... */ }
//       this.control.localset();
//    }
// }