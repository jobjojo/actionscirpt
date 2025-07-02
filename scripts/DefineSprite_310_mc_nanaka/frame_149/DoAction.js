/**
 * ActionScript code for `DefineSprite_310_mc_nanaka`, frame 149's `DoAction` script.
 * This script is executed to apply a "boost" effect, a "slow" effect,
 * and a "backeffect" to the game, specifically for the 'nanaka' character.
 * It uses `power`, `angle`, `cfftype` which would have been set in previous frames.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_nanaka` class.
 * It assumes `control` is an instance of `GameControl`.
 */
function DoAction_DefineSprite_310_mc_nanaka_frame_149() {
   // Assuming 'this' refers to the mc_nanaka MovieClip instance.
   // Assume `power`, `angle`, and `cfftype` are properties set on `this`
   // from previous frames or externally. For direct conversion, using placeholder values if not explicitly found.
   const power = this.power || 0; // Assuming 'power' property is set on `this`.
   const angle = this.angle || 0; // Assuming 'angle' property is set on `this`.
   const cfftype = this.cfftype; // 'cfftype' is explicitly passed to `cff` in frame 1.

   // Apply boost effect.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `boost` method.
   if (typeof control !== 'undefined' && control.boost) {
      control.boost(power, angle);
   }

   // Apply a slow effect (slow2 means slow down by distance).
   // Assumes `control` has a `slow2` method.
   if (typeof control !== 'undefined' && control.slow2) {
      control.slow2(70, 0.8); // Slow for 70 frames, with a distance factor of 0.8.
   }

   // Apply a background effect related to "cff" (Character Flash) and its type.
   // Assumes `control` has a `backeffect` method.
   if (typeof control !== 'undefined' && control.backeffect) {
      control.backeffect("cff", cfftype);
   }
}

// How this might be structured in a JavaScript class (conceptual, part of mc_nanaka):
/*
class mc_nanaka extends GamePauseClip { // Assuming GamePauseClip base
   constructor() {
      super();
      // ... other initialization ...
      this.power = 15; // Example initial value, could be set by other frames
      this.angle = 45; // Example initial value
      this.cfftype = null; // Example, would be set by cff() call
   }

   // Method representing the actions of frame 149
   onFrame149Action() {
      const power = this.power;
      const angle = this.angle;
      const cfftype = this.cfftype;

      if (window.control) {
         if (window.control.boost) {
            window.control.boost(power, angle);
         }
         if (window.control.slow2) {
            window.control.slow2(70, 0.8);
         }
         if (window.control.backeffect) {
            window.control.backeffect("cff", cfftype);
         }
      }
   }
}
*/