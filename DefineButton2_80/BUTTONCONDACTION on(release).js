/**
 * ActionScript code for a button's `on(release)` event handler,
 * likely a "Sound Toggle" button.
 * This script checks the global sound volume and toggles it between 0 (off) and 100 (on).
 * It then calls `bgm_mc.soundRestart()` or `bgm_mc.soundStop()` accordingly for background music,
 * and `control.localset()` to save the sound setting.
 *
 * In JavaScript, this would typically be a function assigned to a click event listener
 * of a UI element.
 * Assumes `control` is an instance of a game control class, `bgm_mc` exists
 * and has `soundRestart()` and `soundStop()` methods.
 */
function onRelease_DefineButton2_80() {
   // Assuming 'control' is a globally accessible instance of GameControl.
   // And it has a 'globalsound' property which has 'getVolume' and 'setVolume' methods.
   if (typeof control !== 'undefined' && control.globalsound && control.localset) {
      if (control.globalsound.getVolume() === 0) {
         control.globalsound.setVolume(100); // Turn sound ON.
         // Assuming bgm_mc exists and has soundRestart.
         if (this.bgm_mc && typeof this.bgm_mc.soundRestart === 'function') {
            this.bgm_mc.soundRestart(); // Restart BGM.
         }
         control.localset(); // Save setting.
      } else {
         control.globalsound.setVolume(0); // Turn sound OFF.
         // Assuming bgm_mc exists and has soundStop.
         if (this.bgm_mc && typeof this.bgm_mc.soundStop === 'function') {
            this.bgm_mc.soundStop(); // Stop BGM.
         }
         control.localset(); // Save setting.
      }
   }
}

// How this might be used in a JavaScript environment:
// Assuming `soundButton` is a button instance within a larger UI component.
// soundButton.addEventListener('click', onRelease_DefineButton2_80.bind(uiComponentInstance));
// Where `uiComponentInstance` would have the `bgm_mc` property.