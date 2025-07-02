/**
 * ActionScript code for `DefineSprite_350_mc_miki`, frame 37's `DoAction` script.
 * This script sets up a "combo" attack animation for the 'miki' character.
 * It applies a "push" effect, enables speed blindness, sets a combo flag,
 * transforms Taichi's color, hides the hit target, sets game control slow-motion,
 * sets game control velocities (`vx`, `vy`), disables gravity, sets Taichi's
 * initial position and rotation, defines its movement and rotation speed,
 * and then sets up an `moveobjsub` function for complex, multi-part animation
 * of 'miki' MovieClips.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_miki` class.
 * It assumes `this` refers to the `mc_miki` MovieClip instance, and it interacts with
 * `control` (GameControl object), `hittarget`, `taichi_mc`, `mikiX_mc` (child MovieClips),
 * and `Color` class.
 */
function DoAction_DefineSprite_350_mc_miki_frame_37() {
   // Assuming 'this' refers to the mc_miki MovieClip instance.

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

   // Set combo flag.
   // Assumes `control` has a `combo` property.
   if (typeof control !== 'undefined' && control.combo !== undefined) {
      control.combo = true;
   }

   // Hide the hit target.
   if (hittarget) {
      hittarget._visible = false;
   }

   // Apply slow-motion effect.
   // Assumes `control` has a `slow` method.
   if (typeof control !== 'undefined' && control.slow) {
      control.slow(100, 0.01); // Slow for 100 frames with 0.01 interval.
   }

   // Set control's velocities and gravity state.
   // Assumes `control` has `vx`, `vy`, `nogravity` properties.
   if (typeof control !== 'undefined' && control.vx !== undefined && control.vy !== undefined) {
      // Calculate `vx` based on Miki's and control's px.
      control.vx = ((this.px - control.px) * 150 + 250) / 30 / 150 / 0.01;
      control.vy = 0; // Set vertical velocity to 0.
      control.nogravity = true; // Disable gravity.
   }

   // Color transformation for `taichi_mc`.
   // Assumes `taichi_mc` is a child MovieClip and `Color` class is available.
   // And `hittarget` exists and has a `getTransform` method.
   if (this.taichi_mc && hittarget && typeof Color !== 'undefined') {
      new Color(this.taichi_mc).setTransform(new Color(hittarget).getTransform());
   }

   // Set initial position and rotation for `taichi_mc`.
   // Assumes `control` has `r`, `py`, `px` properties.
   if (this.taichi_mc && control) {
      this.taichi_mc._y = (-control.py) * 150;
      this.taichi_mc._rotation = control.r;
      this.taichi_mc._x = (control.px - this.px) * 150; // `this.px` is Miki's px.
   }

   // Define movement and rotation speeds for `taichi_mc`.
   if (this.taichi_mc && control) {
      this.taichi_mc.dx = (225 - this.taichi_mc._x) / 30;
      this.taichi_mc.dy = (control.py * 150 - 525) / 13;
      this.taichi_mc.dr = 15;
   }

   let movecount = 0; // Animation frame counter for `moveobjsub`.
   let moveobjsub = null; // Function to be set dynamically for complex animation.

   // `moveobjsub` is a complex internal function for animating Miki's parts.
   moveobjsub = () => { // Use arrow function to preserve 'this' context.
      // Animate Miki's trail/copies (miki3_mc, miki2_mc, miki1_mc).
      if (this.miki3_mc && this.miki2_mc) {
         this.miki3_mc._y = this.miki2_mc._y;
         this.miki3_mc._x = this.miki2_mc._x;
         this.miki3_mc._xscale = this.miki2_mc._xscale;
      }
      if (this.miki2_mc && this.miki1_mc) {
         this.miki2_mc._y = this.miki1_mc._y;
         this.miki2_mc._x = this.miki1_mc._x;
         this.miki2_mc._xscale = this.miki1_mc._xscale;
      }

      // Specific animation steps for miki1_mc based on `movecount`.
      if (movecount <= 14) {
         if (this.miki1_mc) {
            this.miki1_mc._y = (-movecount) / 14 * 450;
            this.miki1_mc._xscale = 100 * Math.cos(movecount / 14 * 2 * Math.PI); // Math.PI for 3.14...
         }
      } else if (movecount <= 23) {
         if (this.miki1_mc) {
            this.miki1_mc._y = -450 + (movecount - 14) / 9 * 450;
         }
      } else if (movecount <= 31) {
         if (this.miki1_mc) {
            this.miki1_mc._x = (movecount - 23) / 8 * 300;
            this.miki1_mc._y = (-(movecount - 23)) / 8 * 175;
            this.miki1_mc._xscale = -100; // Flip horizontally.
         }
      }

      // Update Taichi's position and rotation based on its dx, dy, dr.
      if (this.taichi_mc) {
         this.taichi_mc._x += this.taichi_mc.dx;
         this.taichi_mc._y += this.taichi_mc.dy;
         this.taichi_mc._rotation += this.taichi_mc.dr;
      }
      movecount++; // Increment overall animation counter.
   };
}

// How this might be structured in a JavaScript class (conceptual, part of mc_miki):
/*
class mc_miki extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization from frame 1 ...
      // Mock child MovieClips for animation parts
      this.taichi_mc = { _x: 0, _y: 0, _rotation: 0, dx: 0, dy: 0, dr: 0 };
      this.miki1_mc = { _x: 0, _y: 0, _xscale: 100 };
      this.miki2_mc = { _x: 0, _y: 0, _xscale: 100 };
      this.miki3_mc = { _x: 0, _y: 0, _xscale: 100 };

      // External dependencies
      window.control = window.control || { /* ... properties from GameControl ... */ };
      let hittarget = {}; // Mock hittarget
   }

   onFrame37Action() {
      if (window.control) {
         window.control.vpush();
         window.control.speedblind(true);
         window.control.combo = true;
      }
      if (this.hittarget) {
         this.hittarget._visible = false;
      }
      if (window.control) {
         window.control.slow(100, 0.01);
         window.control.vx = ((this.px - window.control.px) * 150 + 250) / 30 / 150 / 0.01;
         window.control.vy = 0;
         window.control.nogravity = true;
      }

      if (this.taichi_mc && hittarget && window.Color) {
         new window.Color(this.taichi_mc).setTransform(new window.Color(hittarget).getTransform());
      }
      if (this.taichi_mc && window.control) {
         this.taichi_mc._y = (-window.control.py) * 150;
         this.taichi_mc._rotation = window.control.r;
         this.taichi_mc._x = (window.control.px - this.px) * 150;
         this.taichi_mc.dx = (225 - this.taichi_mc._x) / 30;
         this.taichi_mc.dy = (window.control.py * 150 - 525) / 13;
         this.taichi_mc.dr = 15;
      }

      let movecount = 0;
      this.moveobjsubInternal = () => { // This will be the actual onEnterFrame logic for this animation
         // Miki trail animation
         if (this.miki3_mc && this.miki2_mc) {
            this.miki3_mc._y = this.miki2_mc._y; this.miki3_mc._x = this.miki2_mc._x; this.miki3_mc._xscale = this.miki2_mc._xscale;
         }
         if (this.miki2_mc && this.miki1_mc) {
            this.miki2_mc._y = this.miki1_mc._y; this.miki2_mc._x = this.miki1_mc._x; this.miki2_mc._xscale = this.miki1_mc._xscale;
         }

         // Miki1_mc animation
         if (movecount <= 14) {
            if (this.miki1_mc) {
               this.miki1_mc._y = (-movecount) / 14 * 450;
               this.miki1_mc._xscale = 100 * Math.cos(movecount / 14 * 2 * Math.PI);
            }
         } else if (movecount <= 23) {
            if (this.miki1_mc) {
               this.miki1_mc._y = -450 + (movecount - 14) / 9 * 450;
            }
         } else if (movecount <= 31) {
            if (this.miki1_mc) {
               this.miki1_mc._x = (movecount - 23) / 8 * 300;
               this.miki1_mc._y = (-(movecount - 23)) / 8 * 175;
               this.miki1_mc._xscale = -100;
            }
         }

         // Taichi movement
         if (this.taichi_mc) {
            this.taichi_mc._x += this.taichi_mc.dx;
            this.taichi_mc._y += this.taichi_mc.dy;
            this.taichi_mc._rotation += this.taichi_mc.dr;
         }
         movecount++;

         if (movecount <= 31) { // Based on the last conditional branch
             requestAnimationFrame(this.moveobjsubInternal);
         } else {
             console.log("Combo animation finished for Miki.");
             this.moveobjsubInternal = null;
         }
      };
      // To start this combo animation, you would call:
      // requestAnimationFrame(this.moveobjsubInternal);
   }
}
*/