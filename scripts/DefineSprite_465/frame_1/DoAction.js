/**
 * ActionScript code for `DefineSprite_465`, frame 1's `DoAction` script.
 * This script defines two core functions for a UI menu:
 * - `hidebtn()`: Hides a set of menu buttons if the mouse is not currently
 * rolling over any of them and `hideenable` is true.
 * - `viewbtn()`: Shows a set of menu buttons.
 * It also defines `gamestart()`, `gameover()`, `rollover()`, `rollout()`
 * and functions for text updates (`qualitytext()`, `soundtext()`).
 * It sets up initial button states and event listeners.
 *
 * In JavaScript, these would be methods of a UI menu component class.
 * It assumes `this` refers to the menu MovieClip, and it interacts with
 * various child button MovieClips (e.g., `menu_btn`, `meter_btn`, `pauser_btn`),
 * global `_quality` and `control` objects.
 */
function DoAction_DefineSprite_465_frame_1() {
   // Assuming 'this' refers to the menu MovieClip instance.

   this.stop(); // Stop the MovieClip's timeline by default.

   // Properties initialized for menu state.
   let roll = false; // Flag for mouse rollover state on menu buttons.
   let openstatus; // Flag for whether the menu is open/buttons are visible.
   let hideenable = true; // Flag to enable/disable auto-hiding.

   /**
    * Hides a set of menu buttons if conditions are met.
    */
   this.hidebtn = function() {
      // Check if any of the specified buttons are currently being rolled over.
      // Assumes `menu_btn`, `meter_btn`, etc. are child MovieClips with a `roll` property.
      this.roll = (this.menu_btn ? this.menu_btn.roll : false) ||
                  (this.meter_btn ? this.meter_btn.roll : false) ||
                  (this.pauser_btn ? this.pauser_btn.roll : false) ||
                  (this.title_btn ? this.title_btn.roll : false) ||
                  (this.againr_btn ? this.againr_btn.roll : false) ||
                  (this.quality_btn ? this.quality_btn.roll : false) ||
                  (this.sound_btn ? this.sound_btn.roll : false);

      // If no button is rolled over and hiding is enabled, hide buttons.
      if (!this.roll && this.hideenable) {
         this.openstatus = false;
         // Hide and disable buttons.
         if (this.pauser_btn) { this.pauser_btn._visible = false; this.pauser_btn.enabled = false; }
         if (this.title_btn) { this.title_btn._visible = false; this.title_btn.enabled = false; }
         if (this.meter_btn) { this.meter_btn._visible = false; this.meter_btn.enabled = false; }
         if (this.againr_btn) { this.againr_btn._visible = false; this.againr_btn.enabled = false; }
         if (this.quality_btn) { this.quality_btn._visible = false; this.quality_btn.enabled = false; }
         if (this.sound_btn) { this.sound_btn._visible = false; this.sound_btn.enabled = false; }
      }
   };

   /**
    * Shows a set of menu buttons.
    */
   this.viewbtn = function() {
      // Re-evaluate roll state (though not strictly necessary for viewing).
      this.roll = (this.menu_btn ? this.menu_btn.roll : false) ||
                  (this.meter_btn ? this.meter_btn.roll : false) ||
                  (this.title_btn ? this.title_btn.roll : false) ||
                  (this.pauser_btn ? this.pauser_btn.roll : false) ||
                  (this.againr_btn ? this.againr_btn.roll : false) ||
                  (this.quality_btn ? this.quality_btn.roll : false) ||
                  (this.sound_btn ? this.sound_btn.roll : false);
      this.openstatus = true;
      // Show and enable buttons.
      if (this.pauser_btn) { this.pauser_btn._visible = true; this.pauser_btn.enabled = true; }
      if (this.title_btn) { this.title_btn._visible = true; this.title_btn.enabled = true; }
      if (this.meter_btn) { this.meter_btn._visible = true; this.meter_btn.enabled = true; }
      if (this.againr_btn) { this.againr_btn._visible = true; this.againr_btn.enabled = true; }
      if (this.quality_btn) { this.quality_btn._visible = true; this.quality_btn.enabled = true; }
      if (this.sound_btn) { this.sound_btn._visible = true; this.sound_btn.enabled = true; }
   };

   /**
    * Handles actions when the game starts (from a menu perspective).
    */
   this.gamestart = function() {
      // Adjust visibility/enabled state for 'again' and 'pause' buttons.
      // Assumes `again_btn`, `againd_btn`, `pause_btn`, `paused_btn` are child MovieClips.
      if (this.again_btn) { this.again_btn.roll = false; } // Reset roll state.
      this.againr_btn = this.again_btn; // Assign again_btn to againr_btn (retry button).
      if (this.again_btn && this.againd_btn) {
         this.again_btn._visible = this.againd_btn._visible;
         this.again_btn.enabled = this.againd_btn.enabled;
         this.againd_btn._visible = false;
         this.againd_btn.enabled = false;
      }
      if (this.pause_btn) { this.pause_btn.roll = false; } // Reset roll state.
      this.pauser_btn = this.pause_btn; // Assign pause_btn to pauser_btn (pause button).
      if (this.pause_btn && this.paused_btn) {
         this.pause_btn._visible = this.paused_btn._visible;
         this.pause_btn.enabled = this.paused_btn.enabled;
         this.paused_btn._visible = false;
         this.paused_btn.enabled = false;
      }
   };

   /**
    * Handles actions when the game is over (from a menu perspective).
    */
   this.gameover = function() {
      // Adjust visibility/enabled state for 'pause' buttons after game over.
      if (this.paused_btn) { this.paused_btn.roll = false; } // Reset roll state.
      this.pauser_btn = this.paused_btn; // Assign paused_btn to pauser_btn.
      if (this.paused_btn && this.pause_btn) {
         this.paused_btn._visible = this.pause_btn._visible;
         this.paused_btn.enabled = this.pause_btn.enabled;
         this.pause_btn._visible = false;
         this.pause_btn.enabled = false;
      }
      this.hideenable = false; // Disable auto-hiding.
      this.viewbtn(); // Show all menu buttons.
   };

   /**
    * Handles mouse rollover event for menu buttons.
    */
   this.rollover = function() {
      this.roll = true; // Set roll state to true.
      if (typeof this.viewsub === 'function') {
         this.viewsub(); // Call `viewsub` (e.g., qualitytext or soundtext).
      }
      this.viewbtn(); // Show all menu buttons.
   };

   /**
    * Handles mouse rollout event for menu buttons.
    */
   this.rollout = function() {
      this.roll = false; // Set roll state to false.
      this.hidebtn(); // Attempt to hide buttons.
   };

   /**
    * Updates quality text based on `_quality` setting.
    */
   this.qualitytext = function() {
      let qtxt = "";
      // Assumes `_quality` is a global variable.
      switch (window._quality) {
         case "HIGH":
            qtxt = "HIGH > MEDIUM";
            break;
         case "MEDIUM":
            qtxt = "MEDIUM > LOW";
            break;
         case "LOW":
            qtxt = "LOW > HIGH";
            break;
         default:
            qtxt = "> HIGH"; // Fallback.
      }
      // This `qtxt` would typically be assigned to a TextField. Not explicitly done here in AS.
      console.log(`Quality text: ${qtxt}`); // For conceptual conversion.
   };

   /**
    * Updates sound text based on global sound volume.
    */
   this.soundtext = function() {
      let stxt = "";
      // Assumes `control` has a `globalsound` property with `getVolume()` method.
      if (typeof control !== 'undefined' && control.globalsound && typeof control.globalsound.getVolume === 'function') {
         if (control.globalsound.getVolume() === 0) {
            stxt = "OFF > ON";
         } else {
            stxt = "ON > OFF";
         }
      }
      // This `stxt` would typically be assigned to a TextField. Not explicitly done here in AS.
      console.log(`Sound text: ${stxt}`); // For conceptual conversion.
   };

   // --- Initial Event Listener Setup ---

   // Assign rollover/out/releaseOutside handlers to various buttons.
   // Assumes these are child button MovieClips.
   // Using arrow functions to preserve 'this' context for methods like `rollover`, `rollout`.
   if (this.menu_btn) {
      this.menu_btn.onRollOver = this.rollover.bind(this);
      this.menu_btn.onRollOut = this.rollout.bind(this);
      this.menu_btn.onReleaseOutside = this.rollout.bind(this);
   }
   if (this.pause_btn) {
      this.pause_btn.onRollOver = this.rollover.bind(this);
      this.pause_btn.onRollOut = this.rollout.bind(this);
      this.pause_btn.onReleaseOutside = this.rollout.bind(this);
   }
   if (this.paused_btn) { // Assuming this is distinct from pause_btn, perhaps for a paused state visual.
      this.paused_btn.onRollOver = this.rollover.bind(this);
      this.paused_btn.onRollOut = this.rollout.bind(this);
      this.paused_btn.onReleaseOutside = this.rollout.bind(this);
   }
   if (this.title_btn) {
      this.title_btn.onRollOver = this.rollover.bind(this);
      this.title_btn.onRollOut = this.rollout.bind(this);
      this.title_btn.onReleaseOutside = this.rollout.bind(this);
   }
   if (this.meter_btn) {
      this.meter_btn.onRollOver = this.rollover.bind(this);
      this.meter_btn.onRollOut = this.rollout.bind(this);
      this.meter_btn.onReleaseOutside = this.rollout.bind(this);
   }
   if (this.again_btn) {
      this.again_btn.onRollOver = this.rollover.bind(this);
      this.again_btn.onRollOut = this.rollout.bind(this);
      this.again_btn.onReleaseOutside = this.rollout.bind(this);
   }
   if (this.againd_btn) { // Assuming this is distinct from again_btn.
      this.againd_btn.onRollOver = this.rollover.bind(this);
      this.againd_btn.onRollOut = this.rollout.bind(this);
      this.againd_btn.onReleaseOutside = this.rollout.bind(this);
   }
   if (this.quality_btn) {
      this.quality_btn.onRollOver = this.rollover.bind(this);
      this.quality_btn.onRollOut = this.rollout.bind(this);
      this.quality_btn.onReleaseOutside = this.rollout.bind(this);
      this.quality_btn.viewsub = this.qualitytext.bind(this); // Assign qualitytext as viewsub.
   }
   if (this.sound_btn) {
      this.sound_btn.onRollOver = this.rollover.bind(this);
      this.sound_btn.onRollOut = this.rollout.bind(this);
      this.sound_btn.onReleaseOutside = this.rollout.bind(this);
      this.sound_btn.viewsub = this.soundtext.bind(this); // Assign soundtext as viewsub.
   }

   // Final initializations.
   this.hideenable = true; // Ensure hideenable is true.
   this.againr_btn = this.againd_btn; // Assign againd_btn to againr_btn.
   if (this.againd_btn) {
      this.againd_btn.stop();
      this.againd_btn.useHandCursor = false; // Disable hand cursor for disabled button.
   }
   if (this.again_btn) {
      this.again_btn._visible = false;
      this.again_btn.enabled = false;
   }
   this.pauser_btn = this.paused_btn; // Assign paused_btn to pauser_btn.
   if (this.paused_btn) {
      this.paused_btn.stop();
      this.paused_btn.useHandCursor = false;
   }
   if (this.pause_btn) {
      this.pause_btn._visible = false;
      this.pause_btn.enabled = false;
   }
   this.hidebtn(); // Call hidebtn initially to hide buttons.
}

// How this might be structured in a JavaScript class (conceptual):
/*
class GameMenu extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      // Mock child button MovieClips
      this.menu_btn = { roll: false, onRollOver: null, onRollOut: null, onReleaseOutside: null };
      this.meter_btn = { roll: false, _visible: true, enabled: true };
      this.pauser_btn = { roll: false, _visible: true, enabled: true };
      this.title_btn = { roll: false, _visible: true, enabled: true };
      this.againr_btn = { roll: false, _visible: true, enabled: true };
      this.quality_btn = { roll: false, _visible: true, enabled: true, viewsub: null };
      this.sound_btn = { roll: false, _visible: true, enabled: true, viewsub: null };
      this.again_btn = { roll: false, _visible: true, enabled: true };
      this.againd_btn = { stop: () => {}, useHandCursor: false, _visible: true, enabled: true };
      this.pause_btn = { roll: false, _visible: true, enabled: true };
      this.paused_btn = { stop: () => {}, useHandCursor: false, _visible: true, enabled: true };

      this.roll = false;
      this.openstatus = false; // Initial state will be overridden by hidebtn
      this.hideenable = true;

      // External dependencies
      window.control = window.control || { globalsound: { getVolume: () => 100 } };
      window._quality = "MEDIUM";

      this.onFrame1Action();
   }

   onFrame1Action() {
      // Bind methods to `this`
      this.hidebtn = this.hidebtn.bind(this);
      this.viewbtn = this.viewbtn.bind(this);
      this.gamestart = this.gamestart.bind(this);
      this.gameover = this.gameover.bind(this);
      this.rollover = this.rollover.bind(this);
      this.rollout = this.rollout.bind(this);
      this.qualitytext = this.qualitytext.bind(this);
      this.soundtext = this.soundtext.bind(this);

      // Set up event listeners using `addEventListener` for robustness in JS
      if (this.menu_btn) {
         this.menu_btn.onRollOver = this.rollover; // Assuming direct property assignment is how these are triggered
         this.menu_btn.onRollOut = this.rollout;
         this.menu_btn.onReleaseOutside = this.rollout;
      }
      // ... similar for other buttons ...

      // Assign viewsub functions
      if (this.quality_btn) this.quality_btn.viewsub = this.qualitytext;
      if (this.sound_btn) this.sound_btn.viewsub = this.soundtext;

      // Final initializations
      this.againr_btn = this.againd_btn;
      if (this.againd_btn) { this.againd_btn.stop(); this.againd_btn.useHandCursor = false; }
      if (this.again_btn) { this.again_btn._visible = false; this.again_btn.enabled = false; }
      this.pauser_btn = this.paused_btn;
      if (this.paused_btn) { this.paused_btn.stop(); this.paused_btn.useHandCursor = false; }
      if (this.pause_btn) { this.pause_btn._visible = false; this.pause_btn.enabled = false; }

      this.hidebtn(); // Initial call to hide buttons
   }

   hidebtn() { /* ... conversion of AS function ... */ }
   viewbtn() { /* ... conversion of AS function ... */ }
   gamestart() { /* ... conversion of AS function ... */ }
   gameover() { /* ... conversion of AS function ... */ }
   rollover() { /* ... conversion of AS function ... */ }
   rollout() { /* ... conversion of AS function ... */ }
   qualitytext() { /* ... conversion of AS function ... */ }
   soundtext() { /* ... conversion of AS function ... */ }
}
*/