/**
 * ActionScript code for `DefineSprite_399_mc_tomoki`, frame 11's `DoAction` script.
 * This script modifies `control.vx` (horizontal velocity) and `control.vy` (vertical velocity)
 * using an `e` (elasticity/energy retention) factor. It also applies a slow-motion effect
 * and sets a special flag for 'youko' to false.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_tomoki` class.
 * It assumes `this` refers to the `mc_tomoki` MovieClip instance, and it interacts with
 * `control` (GameControl object) and `code` (character code mapping).
 * The `e` property is expected to be defined on `this` (from frame 1).
 */
function DoAction_DefineSprite_399_mc_tomoki_frame_11() {
   // Assuming 'this' refers to the mc_tomoki MovieClip instance.
   // `e` is a property set on `this` from a previous frame (e.g., frame 1).
   const e = this.e || 0; // Default to 0 if not set.

   // Modify control velocities.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has `vx` and `vy` properties.
   if (typeof control !== 'undefined' && control.vx !== undefined && control.vy !== undefined) {
      control.vx *= e; // Apply elasticity to horizontal velocity.
      control.vy = Math.abs(control.vy) * e; // Apply elasticity to absolute vertical velocity.
   }

   // Apply slow effect (slow2 means slow down by distance).
   // Assumes `control` has a `slow2` method.
   if (typeof control !== 'undefined' && control.slow2) {
      control.slow2(30, 1); // Slow for 30 frames, with a distance factor of 1.
   }

   // Set special flag for 'youko' to false.
   // Assumes `control` has a `setspecial` method and `code` maps character types.
   if (typeof control !== 'undefined' && control.setspecial && code) {
      control.setspecial(code.youko, false);
   }
}

// How this might be structured in a JavaScript class (conceptual, part of mc_tomoki):
/*
class mc_tomoki extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization from frame 1 ...
      this.e = 0.7; // Example initial value from frame 1
      window.control = window.control || { /* ... properties from GameControl ... */ };
      this.code = window.control.characode;
   }

   onFrame11Action() {
      const e_factor = this.e;

      if (window.control) {
         if (window.control.vx !== undefined && window.control.vy !== undefined) {
            window.control.vx *= e_factor;
            window.control.vy = Math.abs(window.control.vy) * e_factor;
         }
         if (window.control.slow2) {
            window.control.slow2(30, 1);
         }
         if (window.control.setspecial && this.code) {
            window.control.setspecial(this.code.youko, false);
         }
      }
   }
}
*/