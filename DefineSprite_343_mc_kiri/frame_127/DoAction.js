/**
 * ActionScript code for `DefineSprite_343_mc_kiri`, frame 127's `DoAction` script.
 * This script is executed to apply specific movement and rotation parameters
 * to the `taichi_mc` (Taichi MovieClip), and also adjusts game control
 * properties like `slow` effect, `vx`, `vy`, `nogravity`, and `py`.
 * This likely represents a special movement or attack sequence for Kiri.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_kiri` class.
 * It assumes `this` refers to the `mc_kiri` MovieClip instance, and it interacts with
 * `control` (GameControl object) and `taichi_mc` (child MovieClip).
 */
function DoAction_DefineSprite_343_mc_kiri_frame_127() {
   // Assuming 'this' refers to the mc_kiri MovieClip instance.

   // Apply slow effect to game control.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `slow` method.
   if (typeof control !== 'undefined' && control.slow) {
      control.slow(30, 0.002); // Slow for 30 frames with a very small interval.
   }

   // Set control's velocities and gravity state.
   // Assumes `control` has `vx`, `vy`, `nogravity`, `py` properties.
   if (typeof control !== 'undefined' && control.vx !== undefined && control.vy !== undefined) {
      // Calculate `vx` based on Kiri's and control's px.
      control.vx = (this.px + 2.1666666666666665 - control.px) / 0.034;
      control.vy = 0; // Set vertical velocity to 0.
      control.nogravity = true; // Disable gravity.
      control.py = 2.3333333333333335; // Set player Y position.
   }

   // Adjust `taichi_mc` position and movement properties.
   // Assumes `taichi_mc` is a child MovieClip with `_x`, `_y`, `dx`, `dy`, `dr` properties.
   if (this.taichi_mc) {
      this.taichi_mc._x += 20; // Increment x position.
      this.taichi_mc._y += -20; // Decrement y position.
      this.taichi_mc.dx = 3.235294117647059; // Set x movement speed.
      this.taichi_mc.dy = -1.7647058823529411; // Set y movement speed.
      this.taichi_mc.dr = 3; // Set rotation speed.
   }
}

// How this might be structured in a JavaScript class (conceptual, part of mc_kiri):
/*
class mc_kiri extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      // Mock child MovieClips and external dependencies if needed for testing
      this.taichi_mc = { _x: 0, _y: 0, dx: 0, dy: 0, dr: 0 };
      window.control = window.control || {
          slow: (f, i) => console.log(`Control slow: ${f}, ${i}`),
          vx: 0, vy: 0, nogravity: false, py: 0, px: 0
      };
   }

   // Method representing the actions of frame 127
   onFrame127Action() {
      if (window.control) {
         window.control.slow(30, 0.002);

         if (this.px !== undefined) { // Ensure Kiri's px is set
             window.control.vx = (this.px + 2.1666666666666665 - window.control.px) / 0.034;
         }
         window.control.vy = 0;
         window.control.nogravity = true;
         window.control.py = 2.3333333333333335;
      }

      if (this.taichi_mc) {
         this.taichi_mc._x += 20;
         this.taichi_mc._y += -20;
         this.taichi_mc.dx = 3.235294117647059;
         this.taichi_mc.dy = -1.7647058823529411;
         this.taichi_mc.dr = 3;
      }
   }
}
*/