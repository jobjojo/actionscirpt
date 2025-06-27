/**
 * ActionScript code for `DefineSprite_350_mc_miki`, frame 120's `DoAction` script.
 * This script is executed to apply specific movement and rotation parameters
 * to the `taichi_mc` (Taichi MovieClip), and also adjusts game control
 * properties like `slow` effect, `vx`, `vy`, `nogravity`, and `py`.
 * This likely represents a special movement or attack sequence for Miki.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_miki` class.
 * It assumes `this` refers to the `mc_miki` MovieClip instance, and it interacts with
 * `control` (GameControl object) and `taichi_mc` (child MovieClip).
 */
function DoAction_DefineSprite_350_mc_miki_frame_120() {
   // Assuming 'this' refers to the mc_miki MovieClip instance.

   // Set control's player Y position and apply slow effect.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has `py` property and `slow` method.
   if (typeof control !== 'undefined' && control.py !== undefined && control.slow) {
      control.py = 2.3333333333333335; // Set player Y position.
      control.slow(30, 0.002); // Slow for 30 frames with a very small interval.
   }

   // Set control's velocities and gravity state.
   // Assumes `control` has `vx`, `vy`, `nogravity` properties.
   if (typeof control !== 'undefined' && control.vx !== undefined && control.vy !== undefined) {
      // Calculate `vx` based on Miki's and control's px.
      control.vx = (this.px + 2.1666666666666665 - control.px) / 0.034;
      control.vy = 0; // Set vertical velocity to 0.
      control.nogravity = true; // Disable gravity.
   }

   // Re-set control's player Y position (redundant with first line, but kept as-is from AS).
   if (typeof control !== 'undefined' && control.py !== undefined) {
      control.py = 2.3333333333333335;
   }

   // Adjust `taichi_mc` position and movement properties.
   // Assumes `taichi_mc` is a child MovieClip with `_x`, `_y`, `dx`, `dy`, `dr` properties.
   if (this.taichi_mc) {
      this.taichi_mc._x += 20; // Increment x position.
      this.taichi_mc._y += -20; // Decrement y position.
      this.taichi_mc.dx = 1.7647058823529411; // Set x movement speed.
      this.taichi_mc.dy = -1.7647058823529411; // Set y movement speed.
      this.taichi_mc.dr = 3; // Set rotation speed.
   }
}

// How this might be structured in a JavaScript class (conceptual, part of mc_miki):
/*
class mc_miki extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      // Mock child MovieClips and external dependencies if needed for testing
      this.taichi_mc = { _x: 0, _y: 0, dx: 0, dy: 0, dr: 0 };
      window.control = window.control || {
          py: 0, slow: (f, i) => console.log(`Control slow: ${f}, ${i}`),
          vx: 0, vy: 0, nogravity: false, px: 0
      };
   }

   // Method representing the actions of frame 120
   onFrame120Action() {
      if (window.control) {
         window.control.py = 2.3333333333333335;
         window.control.slow(30, 0.002);

         if (this.px !== undefined) { // Ensure Miki's px is set
             window.control.vx = (this.px + 2.1666666666666665 - window.control.px) / 0.034;
         }
         window.control.vy = 0;
         window.control.nogravity = true;
         window.control.py = 2.3333333333333335; // Redundant line, kept for exact conversion.
      }

      if (this.taichi_mc) {
         this.taichi_mc._x += 20;
         this.taichi_mc._y += -20;
         this.taichi_mc.dx = 1.7647058823529411;
         this.taichi_mc.dy = -1.7647058823529411;
         this.taichi_mc.dr = 3;
      }
   }
}
*/