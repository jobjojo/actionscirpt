/**
 * ActionScript code for `frame_1`, `DoAction` script (root timeline).
 * This script initializes the main application, handles preloading,
 * checks Flash Player version, and manages the initial display and transitions.
 * It also defines `init` variable for one-time initialization, and `playererror` flag.
 *
 * In JavaScript, this would be the main entry point for the application
 * (e.g., `main.js` or `app.js`), setting up the global environment and initial scene.
 * It assumes global functions/classes like `stopAllSounds()`, `getVersion()`, `Stage`,
 * `control` (GameControl object), `load_mc` (loading MovieClip), and `Sound`.
 */
function DoAction_frame_1() {
   // Stop all sounds initially.
   if (typeof stopAllSounds === 'function') {
      stopAllSounds(); // Conceptual global function.
   }

   // Clear `onMouseDown` listener (if any were globally set).
   this.onMouseDown = null; // Or `delete this.onMouseDown;`

   let init; // Flag for one-time initialization.
   // Play the current MovieClip's timeline (likely to proceed with loading/intro).
   this.play();

   // Check if `init` is undefined for one-time setup.
   if (init === undefined) {
      init = true; // Set flag to true to prevent re-initialization.
      const version = 1.08; // Application version.

      // Set Stage scale mode.
      // In JS, this maps to CSS or canvas scaling settings.
      if (typeof Stage !== 'undefined' && Stage.scaleMode !== undefined) {
         Stage.scaleMode = "noScale"; // Conceptual `Stage` object.
      }

      // Check Flash Player version.
      // `getVersion()` is a global AS function. In JS, would need browser/plugin detection.
      let playerString = typeof getVersion === 'function' ? getVersion() : "JS Mock Player 9.0.0"; // Conceptual `getVersion()`
      let index1 = playerString.indexOf(" ", 0);
      let index2 = playerString.indexOf(",", 0);
      let player = Number(playerString.substring(index1 + 1, index2 - index1 - 1)); // Parse player version.
      let playererror = isNaN(player) || player < 7; // Check if player is old or invalid.

      // If player version is old/invalid, hide the `load_mc`.
      if (playererror) {
         if (this.load_mc) {
            this.load_mc._visible = false;
         }
      }
   }

   // Update `load_mc` to display loading progress.
   // Assumes `this.getBytesLoaded()` and `this.getBytesTotal()` are available
   // (for the main MovieClip representing the loaded content).
   // Assumes `load_mc` is a child MovieClip with a `view` method.
   if (this.load_mc && typeof this.load_mc.view === 'function' &&
       typeof this.getBytesLoaded === 'function' && typeof this.getBytesTotal === 'function') {
      this.load_mc.view(this.getBytesLoaded() / this.getBytesTotal());
   }
}

// How this might be structured in a JavaScript (Main Application Entry Point):
/*
// Global/Window scope for AS-like globals
window.init = undefined; // Mimic initial undefined state
window.playererror = false; // Mock
window.Stage = { scaleMode: "" }; // Mock
window.stopAllSounds = () => console.log("All sounds stopped (conceptual)");
window.getVersion = () => "MAC 9,0,0,0"; // Mock version string

class MainApplication extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      // ... other initialization for the root MovieClip ...
      this.load_mc = { _visible: true, view: (progress) => console.log(`Loading: ${Math.floor(progress * 100)}%`) }; // Mock
      this.getBytesLoaded = () => 500; // Mock
      this.getBytesTotal = () => 1000; // Mock

      this.onFrame1Action(); // Call this on application start
   }

   onFrame1Action() {
      window.stopAllSounds();
      this.onMouseDown = null; // Clear any existing mouse down handler for the root

      if (window.init === undefined) {
         window.init = true;
         const version = 1.08;
         if (window.Stage) window.Stage.scaleMode = "noScale";

         const playerString = window.getVersion();
         const index1 = playerString.indexOf(" ", 0);
         const index2 = playerString.indexOf(",", 0);
         const player = Number(playerString.substring(index1 + 1, index2 - index1 - 1));
         window.playererror = isNaN(player) || player < 7;

         if (window.playererror) {
            if (this.load_mc) this.load_mc._visible = false;
         }
      }

      if (this.load_mc && typeof this.load_mc.view === 'function' &&
          typeof this.getBytesLoaded === 'function' && typeof this.getBytesTotal === 'function') {
         this.load_mc.view(this.getBytesLoaded() / this.getBytesTotal());
      }

      this.play(); // Continue root timeline playback
   }

   // Define onMouseDown setter/getter to emulate AS behavior
   set onMouseDown(callback) { this._onMouseDownCallback = callback; }
   get onMouseDown() { return this._onMouseDownCallback; }
}
*/