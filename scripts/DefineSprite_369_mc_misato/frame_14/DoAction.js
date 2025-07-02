/**
 * ActionScript code for `DefineSprite_369_mc_misato`, frame 14's `DoAction` script.
 * This script modifies game control properties (`vx`, `vy`, `py`, `slow`)
 * and conditionally jumps to a "cffb" frame based on `control.cffs` value,
 * and controls visibility of `hittarget` and `stop_mc`.
 * This likely represents a specific state during Misato's actions, possibly
 * related to a "Character Flash" (CFF) effect.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_misato` class.
 * It assumes `this` refers to the `mc_misato` MovieClip instance, and it interacts with
 * `control` (GameControl object), `hittarget`, and `stop_mc` (display object).
 */
function DoAction_DefineSprite_369_mc_misato_frame_14() {
   // Assuming 'this' refers to the mc_misato MovieClip instance.

   // Set control's velocities and player Y position to zero.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has `vx`, `vy`, `py` properties.
   if (typeof control !== 'undefined' && control.vx !== undefined && control.vy !== undefined && control.py !== undefined) {
      control.vx = 0;
      control.vy = 0;
      control.py = 0;
   }

   // Apply slow effect to game control.
   // Assumes `control` has a `slow` method.
   if (typeof control !== 'undefined' && control.slow) {
      control.slow(0, 0.03333333333333333); // Instant slow, with a standard interval.
   }

   // Conditional logic based on `control.cffs`.
   // Assumes `control` has a `cffs` property.
   if (typeof control !== 'undefined' && control.cffs !== undefined) {
      if (control.cffs === 1) { // If Character Flash type is 1 (cffb)
         // Make hit target visible.
         // Assumes `hittarget` is an accessible display object.
         if (typeof hittarget !== 'undefined') {
            hittarget._visible = true;
         }
         // Make `stop_mc` invisible.
         // Assumes `stop_mc` is an accessible display object.
         if (typeof stop_mc !== 'undefined') { // Assuming stop_mc is globally accessible
            stop_mc._visible = false;
         }
         // Play to "cffb" frame.
         if (typeof this.gotoAndPlay === 'function') {
            this.gotoAndPlay("cffb");
         }
      }
   }
}

// How this might be structured in a JavaScript class (conceptual, part of mc_misato):
/*
class mc_misato extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      // Mock external dependencies if needed for testing
      window.control = window.control || {
          vx: 0, vy: 0, py: 0,
          slow: (f, i) => console.log(`Control slow: ${f}, ${i}`),
          cffs: null // Mock initial cffs value
      };
      this.hittarget = { _visible: false }; // Mock hittarget
      window.stop_mc = { _visible: true }; // Mock global stop_mc
   }

   // Method that gets called when this frame's action executes
   onFrame14Action() {
      if (window.control) {
         window.control.vx = 0;
         window.control.vy = 0;
         window.control.py = 0;
         window.control.slow(0, 0.03333333333333333);

         if (window.control.cffs === 1) {
            if (this.hittarget) {
               this.hittarget._visible = true;
            }
            if (window.stop_mc) {
               window.stop_mc._visible = false;
            }
            this.gotoAndPlay("cffb");
         }
      }
   }
}
*/