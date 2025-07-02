/**
 * ActionScript code for `DefineSprite_421_mc_touko`, frame 100's `DoAction` script.
 * This script applies a "slow" effect to game control, calculates and sets
 * `control.vx` (horizontal velocity) and `control.vy` (vertical velocity),
 * disables gravity, and applies a "white" background effect.
 * This likely represents a special attack or movement sequence for Touko.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_touko` class.
 * It assumes `this` refers to the `mc_touko` MovieClip instance, and it interacts with
 * `control` (GameControl object).
 */
function DoAction_DefineSprite_421_mc_touko_frame_100() {
   // Assuming 'this' refers to the mc_touko MovieClip instance.

   // Apply slow effect to game control.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `slow` method.
   if (typeof control !== 'undefined' && control.slow) {
      control.slow(50, 0.01); // Slow for 50 frames with 0.01 interval.
   }

   // Calculate and set `control.vx` and `control.vy`.
   // Assumes `control` has `px`, `vx`, `vy` properties, and `this.px` is Touko's px.
   if (typeof control !== 'undefined' && control.px !== undefined && control.vx !== undefined && control.vy !== undefined) {
      control.vx = ((this.px - control.px) * 150 + 275) / 45 / 150 / 0.01;
      control.vy = 0; // Set vertical velocity to 0.
   }

   // Disable gravity.
   // Assumes `control` has a `nogravity` property.
   if (typeof control !== 'undefined' && control.nogravity !== undefined) {
      control.nogravity = true;
   }

   // Apply a "white" background effect.
   // Assumes `control` has a `backeffect` method.
   if (typeof control !== 'undefined' && control.backeffect) {
      control.backeffect("white");
   }
}

// How this might be structured in a JavaScript class (conceptual, part of mc_touko):
/*
class mc_touko extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      window.control = window.control || { /* ... properties from GameControl ... */ };
   }

   onFrame100Action() {
      if (window.control) {
         window.control.slow(50, 0.01);

         if (window.control.px !== undefined && window.control.vx !== undefined && window.control.vy !== undefined) {
            window.control.vx = ((this.px - window.control.px) * 150 + 275) / 45 / 150 / 0.01;
            window.control.vy = 0;
         }
         window.control.nogravity = true;
         if (window.control.backeffect) {
            window.control.backeffect("white");
         }
      }
   }
}
*/