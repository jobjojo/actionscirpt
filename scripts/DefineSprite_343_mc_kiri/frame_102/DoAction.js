/**
 * ActionScript code for `DefineSprite_343_mc_kiri`, frame 102's `DoAction` script.
 * This script sets up a "combo" attack animation for the 'kiri' character.
 * It sets a special flag for 'misato', transforms the Taichi MovieClip's color,
 * hides the hit target, sets Taichi's initial position and rotation, defines
 * its movement and rotation speed, and then sets up an `moveobjsub` function
 * for complex, multi-part animation of 'kiri' and 'miki' MovieClips.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_kiri` class.
 * It assumes `this` refers to the `mc_kiri` MovieClip instance, and it interacts with
 * `control` (GameControl object), `hittarget`, `taichi_mc`, `mikiX_mc`, `kiriX_mc` (child MovieClips),
 * and `Color` class.
 */
function DoAction_DefineSprite_343_mc_kiri_frame_102() {
   // Assuming 'this' refers to the mc_kiri MovieClip instance.

   // Set special flag for 'misato' character.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `setspecial` method and `characode` mapping.
   if (typeof control !== 'undefined' && control.setspecial && control.characode) {
      control.setspecial(control.characode.misato, true);
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

   // Set initial position and rotation for `taichi_mc`.
   // Assumes `control` has `py`, `px`, `r` properties.
   if (this.taichi_mc && control) {
      this.taichi_mc._y = (-control.py) * 150;
      this.taichi_mc._x = (control.px - this.px) * 150; // `this.px` is Kiri's px.
      this.taichi_mc._rotation = control.r;
   }

   // Define movement and rotation speeds for `taichi_mc`.
   if (this.taichi_mc && control) {
      this.taichi_mc.dx = (250 - (control.px - this.px) * 150) / 24;
      this.taichi_mc.dy = (control.py * 150 - 300) / 24;
      this.taichi_mc.dr = 15;
   }

   // Apply a "combo" background effect.
   if (control && typeof control.backeffect === 'function') {
      control.backeffect("combo");
   }

   let movecount = 0; // Animation frame counter for `moveobjsub`.
   let moveobjsub = null; // Function to be set dynamically for complex animation.

   // `moveobjsub` is a complex internal function for animating Kiri and Miki's parts.
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

      // Animate Miki's trail/copies (miki3_mc, miki2_mc, miki1_mc).
      if (this.miki3_mc && this.miki2_mc) {
         this.miki3_mc._y = this.miki2_mc._y;
         this.miki3_mc._x = this.miki2_mc._x;
      }
      if (this.miki2_mc && this.miki1_mc) {
         this.miki2_mc._y = this.miki1_mc._y;
         this.miki2_mc._x = this.miki1_mc._x;
      }
      // Set visibility of Miki's trail parts.
      if (this.miki3 && this.miki3_mc && this.miki2_mc) {
         this.miki3._visible = this.miki3_mc._y === this.miki2_mc._y && this.miki3_mc._x === this.miki2_mc._x;
      }
      if (this.miki2 && this.miki2_mc && this.miki1_mc) {
         this.miki2._visible = this.miki2_mc._y === this.miki1_mc._y && this.miki2_mc._x === this.miki1_mc._x;
      }

      // Specific animation steps for kiri1_mc based on `movecount`.
      if (movecount <= 40) {
         if (this.kiri1_mc) {
            this.kiri1_mc._y = ((movecount - 20) * (movecount - 20) / 400 - 1) * 175;
            this.kiri1_mc._x = movecount * 350 / 40;
         }
      }

      // Specific animation steps for miki1_mc based on `movecount`.
      if (movecount >= 6) {
         if (movecount <= 17) {
            if (this.miki1_mc) {
               this.miki1_mc._y = -125 + (movecount - 6) / 11 * 125;
               this.miki1_mc._x = -375 + (movecount - 6) / 11 * 375;
            }
         } else if (movecount <= 25) {
            if (this.miki1_mc) {
               this.miki1_mc._y = (-(movecount - 17)) / 8 * 275;
               this.miki1_mc._x = (movecount - 17) / 8 * 275;
            }
         } else if (movecount <= 34) {
            if (this.miki1_mc) {
               this.miki1_mc._y = -275 - (movecount - 25) / 9 * 25;
               this.miki1_mc._x = 275 + (movecount - 25) / 9 * 75;
            }
         } else if (movecount <= 55) {
            if (this.miki1_mc) {
               this.miki1_mc._y = -300 + (movecount - 34) * (movecount - 34) / 441 * 300;
               this.miki1_mc._x = 350 + (movecount - 34) / 21 * 125;
            }
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
      this.miki1_mc = { _x: 0, _y: 0, _xscale: 100 };
      this.miki2_mc = { _x: 0, _y: 0, _xscale: 100 };
      this.miki3_mc = { _x: 0, _y: 0, _xscale: 100 };
      this.miki2 = { _visible: true };
      this.miki3 = { _visible: true };

      // External dependencies
      window.control = window.control || { /* ... properties from GameControl ... */ };
      let hittarget = {}; // Mock hittarget
   }

   onFrame102Action() {
      if (window.control) {
         window.control.setspecial(window.control.characode.misato, true);
      }
      if (this.taichi_mc && hittarget && window.Color) {
         new window.Color(this.taichi_mc).setTransform(new window.Color(hittarget).getTransform());
      }
      if (hittarget) {
         hittarget._visible = false;
      }

      if (this.taichi_mc && window.control) {
         this.taichi_mc._y = (-window.control.py) * 150;
         this.taichi_mc._x = (window.control.px - this.px) * 150;
         this.taichi_mc._rotation = window.control.r;
         this.taichi_mc.dx = (250 - (window.control.px - this.px) * 150) / 24;
         this.taichi_mc.dy = (window.control.py * 150 - 300) / 24;
         this.taichi_mc.dr = 15;
      }

      if (window.control && window.control.backeffect) {
         window.control.backeffect("combo");
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

         // Miki trail animation
         if (this.miki3_mc && this.miki2_mc) {
            this.miki3_mc._y = this.miki2_mc._y; this.miki3_mc._x = this.miki2_mc._x;
         }
         if (this.miki2_mc && this.miki1_mc) {
            this.miki2_mc._y = this.miki1_mc._y; this.miki2_mc._x = this.miki1_mc._x;
         }
         if (this.miki3 && this.miki3_mc && this.miki2_mc) {
            this.miki3._visible = this.miki3_mc._y === this.miki2_mc._y && this.miki3_mc._x === this.miki2_mc._x;
         }
         if (this.miki2 && this.miki2_mc && this.miki1_mc) {
            this.miki2._visible = this.miki2_mc._y === this.miki1_mc._y && this.miki2_mc._x === this.miki1_mc._x;
         }

         // Kiri1_mc animation
         if (movecount <= 40) {
            if (this.kiri1_mc) {
               this.kiri1_mc._y = ((movecount - 20) * (movecount - 20) / 400 - 1) * 175;
               this.kiri1_mc._x = movecount * 350 / 40;
            }
         }

         // Miki1_mc animation
         if (movecount >= 6) {
            if (movecount <= 17) {
               if (this.miki1_mc) {
                  this.miki1_mc._y = -125 + (movecount - 6) / 11 * 125;
                  this.miki1_mc._x = -375 + (movecount - 6) / 11 * 375;
               }
            } else if (movecount <= 25) {
               if (this.miki1_mc) {
                  this.miki1_mc._y = (-(movecount - 17)) / 8 * 275;
                  this.miki1_mc._x = (movecount - 17) / 8 * 275;
               }
            } else if (movecount <= 34) {
               if (this.miki1_mc) {
                  this.miki1_mc._y = -275 - (movecount - 25) / 9 * 25;
                  this.miki1_mc._x = 275 + (movecount - 25) / 9 * 75;
               }
            } else if (movecount <= 55) {
               if (this.miki1_mc) {
                  this.miki1_mc._y = -300 + (movecount - 34) * (movecount - 34) / 441 * 300;
                  this.miki1_mc._x = 350 + (movecount - 34) / 21 * 125;
               }
            }
         }

         // Taichi movement
         if (this.taichi_mc) {
            this.taichi_mc._x += this.taichi_mc.dx;
            this.taichi_mc._y += this.taichi_mc.dy;
            this.taichi_mc._rotation += this.taichi_mc.dr;
         }
         movecount++;

         // Schedule next frame if not finished, otherwise stop
         if (movecount <= 55 || (movecount > 40 && movecount <= 55)) { // Need to consider when this animation actually ends based on its stages
             requestAnimationFrame(this.moveobjsubInternal);
         } else {
             console.log("Combo animation finished for Kiri.");
             this.moveobjsubInternal = null; // Clear the reference to stop loop
         }
      };
      // To start this combo animation, you would call:
      // requestAnimationFrame(this.moveobjsubInternal);
   }
}
*/