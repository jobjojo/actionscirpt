/**
 * ActionScript code for `DefineSprite_343_mc_kiri`, frame 37's `DoAction` script.
 * This script sets up a "combo" attack animation for the 'kiri' character.
 * It applies a "push" effect, enables speed blindness, sets a combo flag,
 * transforms Taichi's color, hides the hit target, sets game control slow-motion,
 * sets game control velocities (`vx`, `vy`), disables gravity, sets Taichi's
 * initial position and rotation, defines its movement and rotation speed,
 * and then sets up an `moveobjsub` function for complex, multi-part animation
 * of 'kiri' MovieClips.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_kiri` class.
 * It assumes `this` refers to the `mc_kiri` MovieClip instance, and it interacts with
 * `control` (GameControl object), `hittarget`, `taichi_mc`, `kiriX_mc` (child MovieClips),
 * and `Color` class.
 */
function DoAction_DefineSprite_343_mc_kiri_frame_37() {
   // Assuming 'this' refers to the mc_kiri MovieClip instance.

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

   // Apply slow-motion effect.
   // Assumes `control` has a `slow` method.
   if (typeof control !== 'undefined' && control.slow) {
      control.slow(100, 0.01); // Slow for 100 frames with 0.01 interval.
   }

   // Set control's velocities and gravity state.
   // Assumes `control` has `vx`, `vy`, `nogravity` properties.
   if (typeof control !== 'undefined' && control.vx !== undefined && control.vy !== undefined) {
      // Calculate `vx` based on Kiri's and control's px.
      control.vx = ((this.px - control.px) * 150 + 700) / 41 / 150 / 0.01;
      control.vy = 0; // Set vertical velocity to 0.
      control.nogravity = true; // Disable gravity.
   }

   // Set initial position and rotation for `taichi_mc`.
   // Assumes `control` has `r`, `py`, `px` properties.
   if (this.taichi_mc && control) {
      this.taichi_mc._rotation = control.r;
      this.taichi_mc._y = (-control.py) * 150;
      this.taichi_mc._x = (control.px - this.px) * 150; // `this.px` is Kiri's px.
   }

   // Define movement and rotation speeds for `taichi_mc`.
   if (this.taichi_mc && control) {
      this.taichi_mc.dx = (550 - (control.px - this.px) * 150) / 41;
      this.taichi_mc.dy = (control.py * 150 - 100) / 41;
      this.taichi_mc.dr = 5;
   }

   let movecount = 0; // Animation frame counter for `moveobjsub`.
   let moveobjsub = null; // Function to be set dynamically for complex animation.

   // `moveobjsub` is a complex internal function for animating Kiri's parts.
   moveobjsub = () => { // Use arrow function to preserve 'this' context.
      // Animate Kiri's trail/copies (kiri3_mc, kiri2_mc, kiri1_mc).
      if (this.kiri3_mc && this.kiri2_mc) {
         this.kiri3_mc._y = this.kiri2_mc._y;
         this.kiri3_mc._x = this.kiri2_mc._x;
         this.kiri3_mc._rotation = this.kiri2_mc._rotation;
      }
      if (this.kiri2_mc && this.kiri1_mc) {
         this.kiri2_mc._y = this.kiri1_mc._y;
         this.kiri2_mc._x = this.kiri1_mc._x;
         this.kiri2_mc._rotation = this.kiri1_mc._rotation;
      }
      // Set visibility of trail parts based on whether they overlap.
      if (this.kiri3 && this.kiri3_mc && this.kiri2_mc) {
         this.kiri3._visible = this.kiri3_mc._y === this.kiri2_mc._y && this.kiri3_mc._x === this.kiri2_mc._x;
      }
      if (this.kiri2 && this.kiri2_mc && this.kiri1_mc) {
         this.kiri2._visible = this.kiri2_mc._y === this.kiri1_mc._y && this.kiri2_mc._x === this.kiri1_mc._x;
      }

      // Specific animation steps for kiri1_mc based on `movecount`.
      if (movecount <= 12) {
         if (this.kiri1_mc) {
            this.kiri1_mc._x = movecount / 12 * 400;
         }
      } else if (movecount <= 23) {
         if (this.kiri1_mc) {
            this.kiri1_mc._y = (-(movecount - 12)) / 11 * 125;
         }
      } else if (movecount <= 34) {
         if (this.kiri1_mc) {
            this.kiri1_mc._y = -125 + (movecount - 23) / 11 * 125;
            this.kiri1_mc._x = 400 + (movecount - 23) / 11 * 175;
            this.kiri1_mc._rotation = (movecount - 23) / 11 * 360;
            // Complex sine/cosine based position adjustment.
            this.kiri1_mc._y += -75 + 79.05694150420949 * Math.sin(1.2490457723982544 + 6.283185307179586 * (movecount - 23) / 11);
            this.kiri1_mc._x += -25 + 79.05694150420949 * Math.cos(1.2490457723982544 + 6.283185307179586 * (movecount - 23) / 11);
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

// How this might be structured in a JavaScript class (conceptual, part of mc_kiri):
/*
class mc_kiri extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization from frame 1 ...
      // Mock child MovieClips for animation parts
      this.taichi_mc = { _x: 0, _y: 0, _rotation: 0, dx: 0, dy: 0, dr: 0 };
      this.kiri1_mc = { _x: 0, _y: 0, _rotation: 0 };
      this.kiri2_mc = { _x: 0, _y: 0, _rotation: 0 };
      this.kiri3_mc = { _x: 0, _y: 0, _rotation: 0 };
      this.kiri2 = { _visible: true }; // Assuming these are separate visibility controls
      this.kiri3 = { _visible: true };

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

      if (this.taichi_mc && hittarget && window.Color) {
         new window.Color(this.taichi_mc).setTransform(new window.Color(hittarget).getTransform());
      }
      if (hittarget) {
         hittarget._visible = false;
      }

      if (window.control) {
         window.control.slow(100, 0.01);
         window.control.vx = ((this.px - window.control.px) * 150 + 700) / 41 / 150 / 0.01;
         window.control.vy = 0;
         window.control.nogravity = true;
      }

      if (this.taichi_mc && window.control) {
         this.taichi_mc._rotation = window.control.r;
         this.taichi_mc._y = (-window.control.py) * 150;
         this.taichi_mc._x = (window.control.px - this.px) * 150;
         this.taichi_mc.dx = (550 - (window.control.px - this.px) * 150) / 41;
         this.taichi_mc.dy = (window.control.py * 150 - 100) / 41;
         this.taichi_mc.dr = 5;
      }

      let movecount = 0;
      this.moveobjsubInternal = () => { // This will be the actual onEnterFrame logic for this animation
         // Kiri trail animation
         if (this.kiri3_mc && this.kiri2_mc) {
            this.kiri3_mc._y = this.kiri2_mc._y; this.kiri3_mc._x = this.kiri2_mc._x; this.kiri3_mc._rotation = this.kiri2_mc._rotation;
         }
         if (this.kiri2_mc && this.kiri1_mc) {
            this.kiri2_mc._y = this.kiri1_mc._y; this.kiri2_mc._x = this.kiri1_mc._x; this.kiri2_mc._rotation = this.kiri1_mc._rotation;
         }
         if (this.kiri3 && this.kiri3_mc && this.kiri2_mc) {
            this.kiri3._visible = this.kiri3_mc._y === this.kiri2_mc._y && this.kiri3_mc._x === this.kiri2_mc._x;
         }
         if (this.kiri2 && this.kiri2_mc && this.kiri1_mc) {
            this.kiri2._visible = this.kiri2_mc._y === this.kiri1_mc._y && this.kiri2_mc._x === this.kiri1_mc._x;
         }

         // Kiri1_mc animation
         if (movecount <= 12) {
            if (this.kiri1_mc) {
               this.kiri1_mc._x = movecount / 12 * 400;
            }
         } else if (movecount <= 23) {
            if (this.kiri1_mc) {
               this.kiri1_mc._y = (-(movecount - 12)) / 11 * 125;
            }
         } else if (movecount <= 34) {
            if (this.kiri1_mc) {
               this.kiri1_mc._y = -125 + (movecount - 23) / 11 * 125;
               this.kiri1_mc._x = 400 + (movecount - 23) / 11 * 175;
               this.kiri1_mc._rotation = (movecount - 23) / 11 * 360;
               this.kiri1_mc._y += -75 + 79.05694150420949 * Math.sin(1.2490457723982544 + 6.283185307179586 * (movecount - 23) / 11);
               this.kiri1_mc._x += -25 + 79.05694150420949 * Math.cos(1.2490457723982544 + 6.283185307179586 * (movecount - 23) / 11);
            }
         }

         // Taichi movement
         if (this.taichi_mc) {
            this.taichi_mc._x += this.taichi_mc.dx;
            this.taichi_mc._y += this.taichi_mc.dy;
            this.taichi_mc._rotation += this.taichi_mc.dr;
         }
         movecount++;

         if (movecount <= 34) { // Based on the last conditional branch
             requestAnimationFrame(this.moveobjsubInternal);
         } else {
             console.log("Combo animation finished for Kiri (frame 37).");
             this.moveobjsubInternal = null;
         }
      };
      // To start this combo animation, you would call:
      // requestAnimationFrame(this.moveobjsubInternal);
   }
}
*/