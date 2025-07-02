/**
 * ActionScript code for `DefineSprite_369_mc_misato`, frame 88's `DoAction` script.
 * This script initializes or sets to zero `taichi_mc`'s movement and rotation speeds,
 * applies a "vertical push" effect, enables speed blindness, calculates a new
 * `vx` (horizontal velocity) for `control`, sets `vy` to zero, disables gravity,
 * and applies a slow-motion effect. This likely prepares Misato for a specific
 * attack or movement sequence.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_misato` class.
 * It assumes `this` refers to the `mc_misato` MovieClip instance, and it interacts with
 * `control` (GameControl object) and `taichi_mc` (child MovieClip).
 */
function DoAction_DefineSprite_369_mc_misato_frame_88() {
   // Assuming 'this' refers to the mc_misato MovieClip instance.

   // Initialize or set to zero `taichi_mc`'s movement and rotation speeds.
   // Assumes `taichi_mc` is a child MovieClip with `dx`, `dy`, `dr` properties.
   if (this.taichi_mc) {
      this.taichi_mc.dx = 0;
      this.taichi_mc.dy = 0;
      this.taichi_mc.dr = 0;
   }

   // Apply vertical push effect (store current velocities).
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `vpush` method.
   if (typeof control !== 'undefined' && control.vpush) {
      control.vpush();
   }

   // Enable speed blindness (visual effect related to speed display).
   // Assumes `control` has a `speedblind` method.
   if (typeof control !== 'undefined' && control.speedblind) {
      control.speedblind(true);
   }

   // Calculate and set `control.vx`.
   // Assumes `control` has `px` and `vx` properties, and `this.px` is Misato's px.
   if (typeof control !== 'undefined' && control.px !== undefined && control.vx !== undefined) {
      control.vx = (this.px - control.px) / 39 / 0.01;
      // Ensure `control.vx` is not negative.
      if (control.vx < 0) {
         control.vx = 0;
      }
   }

   // Set `control.vy` to zero and disable gravity.
   // Assumes `control` has `vy` and `nogravity` properties.
   if (typeof control !== 'undefined' && control.vy !== undefined && control.nogravity !== undefined) {
      control.vy = 0;
      control.nogravity = true;
   }

   // Apply slow-motion effect.
   // Assumes `control` has a `slow` method.
   if (typeof control !== 'undefined' && control.slow) {
      control.slow(50, 0.01); // Slow for 50 frames with 0.01 interval.
   }
}

// How this might be structured in a JavaScript class (conceptual, part of mc_misato):
/*
class mc_misato extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      this.taichi_mc = { dx: 0, dy: 0, dr: 0 }; // Mock child MovieClip.
      window.control = window.control || {
          vpush: () => console.log("Control vpush called"),
          speedblind: (b) => console.log(`Speed blind: ${b}`),
          px: 0, vx: 0, vy: 0, nogravity: false,
          slow: (f, i) => console.log(`Control slow: ${f}, ${i}`)
      };
   }

   // Method that gets called when this frame's action executes
   onFrame88Action() {
      if (this.taichi_mc) {
         this.taichi_mc.dx = 0;
         this.taichi_mc.dy = 0;
         this.taichi_mc.dr = 0;
      }
      if (window.control) {
         if (window.control.vpush) {
            window.control.vpush();
         }
         if (window.control.speedblind) {
            window.control.speedblind(true);
         }
         if (this.px !== undefined) { // Ensure Misato's px is set
             window.control.vx = (this.px - window.control.px) / 39 / 0.01;
         }
         if (window.control.vx < 0) {
            window.control.vx = 0;
         }
         window.control.vy = 0;
         window.control.nogravity = true;
         if (window.control.slow) {
            window.control.slow(50, 0.01);
         }
      }
   }
}
*/