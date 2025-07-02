/**
 * ActionScript code for a button's `on(release)` event handler.
 * This script clears the local saved data (specifically the 'best record')
 * if the current 'best' record is not "0.00", and then plays a 'best_mc' animation.
 *
 * In JavaScript, this would typically be a function assigned to a click event listener
 * of a UI element.
 * `control` is assumed to be an instance of a game control class, and `best_mc`
 * a child display object.
 */
function onRelease_DefineButton2_118() {
   // Assuming 'control' is a globally accessible instance of GameControl.
   // And it has a 'best' getter and 'localclear' method.
   if (typeof control !== 'undefined' && control.best && control.localclear) {
      if (control.best !== "0.00") {
         control.localclear(); // Clear local saved data.
         // Assuming 'this' refers to the button's parent or container,
         // and 'best_mc' is a child MovieClip with a 'play' method.
         if (this.best_mc && typeof this.best_mc.play === 'function') {
            this.best_mc.play(); // Play an animation related to the best record.
         }
      }
   }
}

// How this might be used in a JavaScript environment:
// Assuming `myButton118` is a button instance within a larger UI component.
// myButton118.addEventListener('click', onRelease_DefineButton2_118.bind(uiComponentInstance));
// Example of how 'control' might be made available:
// const gameControl = new GameControl(); // Assuming GameControl is defined.
// // ... later, when setting up UI ...
// const uiComponent = {
//    control: gameControl,
//    best_mc: { play: () => console.log("Playing best_mc animation") } // Mock object
// };
// // Bind the event handler:
// // someButtonElement.addEventListener('click', onRelease_DefineButton2_118.bind(uiComponent));