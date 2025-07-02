/**
 * ActionScript code for `DefineSprite_343_mc_kiri`, frame 78's `DoAction` script.
 * This script modifies game control properties (`nogravity`, `vx`, `vy`, `py`, `r`),
 * controls the visibility of `hittarget` and `taichi_mc`, and deletes a `moveobjsub` property.
 * This likely signifies a transition out of a special movement/attack and a return
 * to more standard physics and state.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_kiri` class.
 * It assumes `this` refers to the `mc_kiri` MovieClip instance, and it interacts with
 * `control` (GameControl object), `hittarget`, and `taichi_mc` (child MovieClip).
 */
function DoAction_DefineSprite_343_mc_kiri_frame_78() {
   // Assuming 'this' refers to the mc_kiri MovieClip instance.

   // Re-enable gravity.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `nogravity` property.
   if (typeof control !== 'undefined' && control.nogravity !== undefined) {
      control.nogravity = false;
   }

   // Set control's velocities.
   // Assumes `control` has `vx` and `vy` properties.
   if (typeof control !== 'undefined' && control.vx !== undefined && control.vy !== undefined) {
      control.vx = 30;
      control.vy = 1;
   }

   // Apply a slow effect (slow2 means slow down by distance).
   // Assumes `control` has a `slow2` method.
   if (typeof control !== 'undefined' && control.slow2) {
      control.slow2(20, 1); // Slow for 20 frames, with a distance factor of 1.
   }

   // Transfer Taichi's Y position and rotation to control's properties.
   // Assumes `taichi_mc` is a child MovieClip with `_y` and `_rotation` properties.
   // And `control` has `py` and `r` properties.
   if (this.taichi_mc && typeof control !== 'undefined' && control.py !== undefined && control.r !== undefined) {
      control.py = (-this.taichi_mc._y) / 150;
      control.r = this.taichi_mc._rotation;
   }

   // Make hit target visible.
   // Assumes `hittarget` is an accessible display object.
   if (typeof hittarget !== 'undefined') {
      hittarget._visible = true;
   }

   // Make Taichi MovieClip invisible.
   if (this.taichi_mc) {
      this.taichi_mc._visible = false;
   }

   // Delete the `moveobjsub` property.
   // This would typically be a function assigned to it (e.g., this.moveobjsub = function() { ... }).
   // In JavaScript, setting to `null` or `undefined` is often preferred for cleanup.
   this.moveobjsub = null; // Or `delete this.moveobjsub;`
}

// How this might be structured in a JavaScript class (conceptual, part of mc_kiri):
/*
class mc_kiri extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      // Mock external dependencies if needed for testing
      window.control = window.control || {
          nogravity: true, // Mock initial state
          vx: 0, vy: 0,
          slow2: (f, d) => console.log(`Control slow2: ${f}, ${d}`),
          py: 0, r: 0
      };
      this.hittarget = { _visible: false }; // Mock hittarget
      this.taichi_mc = { _y: 0, _rotation: 0, _visible: true }; // Mock taichi_mc
      this.moveobjsub = null; // Initialize this property
   }

   // Method representing the actions of frame 78
   onFrame78Action() {
      if (window.control) {
         window.control.nogravity = false;
         window.control.vx = 30;
         window.control.vy = 1;
         window.control.slow2(20, 1);
         if (this.taichi_mc) {
            window.control.py = (-this.taichi_mc._y) / 150;
            window.control.r = this.taichi_mc._rotation;
         }
      }
      if (this.hittarget) {
         this.hittarget._visible = true;
      }
      if (this.taichi_mc) {
         this.taichi_mc._visible = false;
      }
      this.moveobjsub = null;
   }
}
*/