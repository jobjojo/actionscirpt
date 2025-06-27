/**
 * ActionScript code for `DefineSprite_350_mc_miki`, frame 137's `DoAction` script.
 * This script is executed to apply boost, control visibility and gravity, and
 * transfer Taichi's rotation. It effectively finishes a special movement/attack
 * sequence for Miki by giving a final boost and resetting game control states.
 *
 * This is identical to the script in `DefineSprite_343_mc_kiri/frame_144/DoAction.txt`,
 * suggesting a reusable pattern for ending character special attacks.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_miki` class.
 * It assumes `this` refers to the `mc_miki` MovieClip instance, and it interacts with
 * `control` (GameControl object), `hittarget`, and `taichi_mc` (child MovieClip).
 */
function DoAction_DefineSprite_350_mc_miki_frame_137() {
   // Assuming 'this' refers to the mc_miki MovieClip instance.

   // Apply vertical pop effect (restoring previous velocities).
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `vpop` method.
   if (typeof control !== 'undefined' && control.vpop) {
      control.vpop();
   }

   // Apply boost effect.
   // Assumes `s_power` and `s_angle` are properties defined on `this` (from frame 1).
   if (typeof control !== 'undefined' && control.boost) {
      control.boost(this.s_power, this.s_angle);
   }

   // Disable speed blindness.
   // Assumes `control` has a `speedblind` method.
   if (typeof control !== 'undefined' && control.speedblind) {
      control.speedblind(false);
   }

   // Re-enable gravity.
   // Assumes `control` has a `nogravity` property.
   if (typeof control !== 'undefined' && control.nogravity !== undefined) {
      control.nogravity = false;
   }

   // Make hit target visible.
   // Assumes `hittarget` is an accessible display object.
   if (typeof hittarget !== 'undefined') {
      hittarget._visible = true;
   }

   // Transfer Taichi's rotation to control's rotation property.
   // Assumes `taichi_mc` is a child MovieClip with `_rotation` property.
   // And `control` has an `r` property.
   if (this.taichi_mc && typeof control !== 'undefined' && control.r !== undefined) {
      control.r = this.taichi_mc._rotation;
   }

   // Make Taichi MovieClip invisible.
   if (this.taichi_mc) {
      this.taichi_mc._visible = false;
   }
}

// How this might be structured in a JavaScript class (conceptual, part of mc_miki):
/*
class mc_miki extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization from frame 1 ...
      // Mock external dependencies if needed for testing
      window.control = window.control || {
          vpop: () => console.log("Control vpop called"),
          boost: (p, a) => console.log(`Control boost: ${p}, ${a}`),
          speedblind: (b) => console.log(`Speed blind: ${b}`),
          nogravity: true, // Mock initial state
          r: 0
      };
      // `hittarget` would be a reference to a display object
      this.hittarget = { _visible: false }; // Mock
      this.taichi_mc = { _rotation: 0, _visible: true }; // Mock
   }

   // Method representing the actions of frame 137
   onFrame137Action() {
      if (window.control) {
         if (window.control.vpop) {
            window.control.vpop();
         }
         if (window.control.boost) {
            window.control.boost(this.s_power, this.s_angle);
         }
         if (window.control.speedblind) {
            window.control.speedblind(false);
         }
         window.control.nogravity = false;
         if (this.taichi_mc) {
            window.control.r = this.taichi_mc._rotation;
         }
      }
      if (this.hittarget) {
         this.hittarget._visible = true;
      }
      if (this.taichi_mc) {
         this.taichi_mc._visible = false;
      }
   }
}
*/