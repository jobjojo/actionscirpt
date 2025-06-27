/**
 * ActionScript code for `DefineSprite_350_mc_miki`, frame 156's `DoAction` script.
 * This script is a simple action: it stops the MovieClip's timeline and then
 * deletes a property named `moveobjsub`. This suggests that `moveobjsub` was
 * a dynamically assigned function (an `onEnterFrame` listener or similar)
 * that is no longer needed after this frame.
 *
 * This is identical to the script in `DefineSprite_343_mc_kiri/frame_162/DoAction.txt`.
 *
 * In JavaScript, `delete` on a property attempts to remove it from an object.
 * Setting it to `null` or `undefined` is often a safer practice for cleanup
 * if direct property deletion is not strictly required.
 *
 * It assumes `this` refers to the `mc_miki` MovieClip instance.
 */
function DoAction_DefineSprite_350_mc_miki_frame_156() {
   // Assuming 'this' refers to the mc_miki MovieClip instance.
   this.stop(); // Stop the MovieClip's timeline.

   // Delete the `moveobjsub` property.
   // This would typically be a function assigned to it (e.g., this.moveobjsub = function() { ... }).
   // In JavaScript, setting to `null` or `undefined` is often preferred for functions/references.
   this.moveobjsub = null; // Or `delete this.moveobjsub;`
}

// How this might be structured in a JavaScript class (conceptual, part of mc_miki):
/*
class mc_miki extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      this.moveobjsub = null; // Initialize this property
   }

   // Method that gets called when this frame's action executes
   onFrame156Action() {
      this.stop();
      this.moveobjsub = null; // Clean up the reference.
   }
}
*/