/**
 * ActionScript code for a button's `on(release)` event handler,
 * likely a "Sound Toggle" button.
 * This script toggles the global sound volume between 0 (off) and 100 (on),
 * saves the setting using `control.localset()`, and then updates the
 * button's displayed text to reflect the new sound setting. It also
 * controls the background music (bgm_mc) based on the sound state.
 *
 * In JavaScript, this would typically be a function assigned to a click event listener
 * of a UI element.
 * Assumes `control` is an instance of a game control class, `_parent.bgm_mc` exists
 * and has `soundRestart()` and `soundStop()` methods, and `this.soundtext()` is a method
 * on the button (or its container) to update its label.
 */
function onRelease_DefineButton2_460() {
   // Assuming 'control' is a globally accessible instance of GameControl.
   // And it has a 'globalsound' property which has 'getVolume' and 'setVolume' methods.
   if (typeof control !== 'undefined' && control.globalsound && control.localset) {
      if (control.globalsound.getVolume() === 0) {
         control.globalsound.setVolume(100); // Turn sound ON.
         control.localset(); // Save setting.
         // Assuming _parent.bgm_mc exists and has soundRestart.
         if (this._parent && this._parent.bgm_mc && typeof this._parent.bgm_mc.soundRestart === 'function') {
            this._parent.bgm_mc.soundRestart(); // Restart BGM.
         }
      } else {
         control.globalsound.setVolume(0); // Turn sound OFF.
         control.localset(); // Save setting.
         // Assuming _parent.bgm_mc exists and has soundStop.
         if (this._parent && this._parent.bgm_mc && typeof this._parent.bgm_mc.soundStop === 'function') {
            this._parent.bgm_mc.soundStop(); // Stop BGM.
         }
      }
   }

   // Assuming 'this' refers to the button itself, which has a soundtext method
   // to update its display.
   if (typeof this.soundtext === 'function') {
      this.soundtext(); // Update button text to show new sound status.
   }
}

// How this might be used in a JavaScript environment:
// Assuming `soundToggleButton` is a button instance.
// soundToggleButton.addEventListener('click', onRelease_DefineButton2_460.bind(buttonContainerInstance));
// Where `buttonContainerInstance` would have the `_parent` property.