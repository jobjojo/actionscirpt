/**
 * ActionScript code for `DefineSprite_421_mc_touko`, frame 37's `DoAction` script.
 * This script sets up a "combo" attack animation for the 'touko' character.
 * It applies a "push" effect, enables speed blindness, applies a slow-motion effect,
 * sets `taichi_mc`'s position based on control, defines its movement and rotation speed,
 * then sets `control.py`, transforms Taichi's color, hides the hit target,
 * initializes a `movecount`, and sets up a `moveobjsub` function for animating `taichi_mc`.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_touko` class.
 * It assumes `this` refers to the `mc_touko` MovieClip instance, and it interacts with
 * `control` (GameControl object), `hittarget`, `taichi_mc` (child MovieClip), and `Color` class.
 */
function DoAction_DefineSprite_421_mc_touko_frame_37() {
   // Assuming 'this' refers to the mc_touko MovieClip instance.

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

   // Apply slow-motion effect.
   // Assumes `control` has a `slow` method.
   if (typeof control !== 'undefined' && control.slow) {
      control.slow(1000, 0); // Slow for 1000 frames with 0 interval.
   }

   // Set `taichi_mc` position relative to control and Touko's own position.
   // Assumes `taichi_mc` is a child MovieClip with `_y` and `_x` properties.
   // Assumes `control` has `py`, `px` properties, and `this.px` is Touko's px.
   if (this.taichi_mc && control) {
      this.taichi_mc._y = (-control.py) * 150;
      this.taichi_mc._x = (control.px - this.px) * 150;
   }

   // Define movement and rotation speeds for `taichi_mc`.
   if (this.taichi_mc && control) {
      this.taichi_mc.dx = (275 - (control.px - this.px) * 150) / 62;
      this.taichi_mc.dy = (control.py * 150 - 100) / 62;
      this.taichi_mc.dr = 5;
   }

   // Set `control.py`.
   // Assumes `control` has a `py` property.
   if (typeof control !== 'undefined' && control.py !== undefined) {
      control.py = 0.6666666666666666;
   }

   // Color transformation for `taichi_mc`.
   // Assumes `taichi_mc` is a child MovieClip and `Color` class is available.
   // And `hittarget` exists and has a `getTransform` method.
   if (this.taichi_mc && hittarget && typeof Color !== 'undefined') {
      new Color(this.taichi_mc).setTransform(new Color(hittarget).getTransform());
   }

   // Hide the hit target.
   if (hittarget) {
      hittarget._visible = false;
   }

   let movecount = 0; // Animation frame counter for `moveobjsub`.
   let moveobjsub = null; // Function to be set dynamically for Taichi's animation.

   // `moveobjsub` is an internal function for animating `taichi_mc`.
   moveobjsub = () => { // Use arrow function to preserve 'this' context.
      // Update Taichi's position and rotation based on its dx, dy, dr properties.
      if (this.taichi_mc) {
         this.taichi_mc._x += this.taichi_mc.dx;
         this.taichi_mc._y += this.taichi_mc.dy;
         this.taichi_mc._rotation += this.taichi_mc.dr;
      }
      movecount++; // Increment animation counter.
   };
}

// How this might be structured in a JavaScript class (conceptual, part of mc_touko):
/*
class mc_touko extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      this.taichi_mc = { _x: 0, _y: 0, _rotation: 0, dx: 0, dy: 0, dr: 0 }; // Mock child MovieClip
      window.control = window.control || { /* ... properties from GameControl ... * / };
      let hittarget = {}; // Mock hittarget
      this.moveobjsub = null; // Internal animation function
   }

   onFrame37Action() {
      if (window.control) {
         window.control.vpush();
         window.control.speedblind(true);
         window.control.slow(1000, 0);
      }
      if (this.taichi_mc && window.control) {
         this.taichi_mc._y = (-window.control.py) * 150;
         this.taichi_mc._x = (window.control.px - this.px) * 150;
      }
      if (this.taichi_mc && window.control) {
         this.taichi_mc.dx = (275 - (window.control.px - this.px) * 150) / 62;
         this.taichi_mc.dy = (window.control.py * 150 - 100) / 62;
         this.taichi_mc.dr = 5;
      }
      if (window.control) {
         window.control.py = 0.6666666666666666;
      }
      if (this.taichi_mc && hittarget && window.Color) {
         new window.Color(this.taichi_mc).setTransform(new window.Color(hittarget).getTransform());
      }
      if (hittarget) {
         hittarget._visible = false;
      }

      let movecount = 0;
      this.moveobjsub = () => { // This will be the actual onEnterFrame logic for this animation
         if (this.taichi_mc) {
            this.taichi_mc._x += this.taichi_mc.dx;
            this.taichi_mc._y += this.taichi_mc.dy;
            this.taichi_mc._rotation += this.taichi_mc.dr;
         }
         movecount++;
         // This animation likely runs for a specific number of frames or until an event.
         // For a loop in JS: requestAnimationFrame(this.moveobjsub);
      };
      // To start this animation, you would typically assign:
      // this.onEnterFrame = this.moveobjsub;
   }
}
*/