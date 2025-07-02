/**
 * ActionScript code for `frame_11`, `DoAction` script (root timeline).
 * This script is for setting up a scene transition after an intro or title.
 * It assigns a `changer` object to `this.title_mc`, calls `control.localsave()`,
 * sets a `wait` state, and defines `prevact()` and `nextact()` functions
 * for navigation. It also clears a global `onMouseDown` listener.
 *
 * In JavaScript, this would be part of a scene manager or application flow logic.
 * It assumes `this` refers to the root MovieClip, and it interacts with `title_mc`
 * (a child MovieClip), `changer_mc` (a child MovieClip or object), `control` (GameControl object).
 */
function DoAction_frame_11() {
   // Assuming 'this' refers to the root MovieClip (timeline).

   // Assign `changer_mc` to `this.title_mc.changer`.
   // Assumes `title_mc` is a child MovieClip and `changer_mc` is accessible.
   if (this.title_mc) {
      this.title_mc.changer = this.changer_mc;
   }

   // Save local game data.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `localsave` method.
   if (typeof control !== 'undefined' && typeof control.localsave === 'function') {
      control.localsave();
   }

   let wait = "wait2"; // Set a 'wait' state.

   /**
    * Navigates to the previous scene (frame 1).
    */
   this.prevact = function() {
      if (typeof this.gotoAndStop === 'function') {
         this.gotoAndStop(1);
      }
   };

   /**
    * Navigates to the next scene (game scene).
    */
   this.nextact = function() {
      if (typeof this.gotoAndStop === 'function') {
         this.gotoAndStop("game");
      }
   };

   // Clear global `onMouseDown` listener.
   this.onMouseDown = null; // Or `delete this.onMouseDown;`

   // Go to the 'wait' frame.
   if (typeof this.gotoAndStop === 'function') {
      this.gotoAndStop(wait);
   }
}

// How this might be structured in a JavaScript class (conceptual, part of MainApplication):
/*
class MainApplication extends MovieClip { // Assuming MovieClip base class
   constructor() {
      super();
      // ... other initialization ...
      // Mock child MovieClips
      this.title_mc = { changer: null };
      this.changer_mc = {}; // Mock changer object

      // External `control` object
      window.control = window.control || { localsave: () => console.log("control.localsave called") };

      this.wait = ""; // Internal state for 'wait'
      this.prevact = null; // Internal function for previous action
      this.nextact = null; // Internal function for next action
   }

   onFrame11Action() {
      if (this.title_mc) {
         this.title_mc.changer = this.changer_mc;
      }
      if (window.control && window.control.localsave) {
         window.control.localsave();
      }

      this.wait = "wait2";

      this.prevact = () => {
         this.gotoAndStop(1);
      };

      this.nextact = () => {
         this.gotoAndStop("game");
      };

      this.onMouseDown = null;

      this.gotoAndStop(this.wait);
   }

   // Define onMouseDown setter/getter to emulate AS behavior
   set onMouseDown(callback) { this._onMouseDownCallback = callback; }
   get onMouseDown() { return this._onMouseDownCallback; }
}
*/