/**
 * ActionScript code for `DefineSprite_388_mc_sakuraba`, frame 11's `DoAction` script.
 * This script calculates and applies new `vx` and `vy` (velocities) for `control`
 * based on the current velocities, and then adjusts `up_mc` and `down_mc` visibility
 * based on the calculated angle. It also applies a slow-motion effect and sets a
 * special flag for 'youko' to false. Finally, it sets up a `moveobjsub` function
 * to animate 'curry' MovieClips with random positions and rotations.
 * This likely represents a special attack or movement sequence for Sakuraba.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_sakuraba` class.
 * It assumes `this` refers to the `mc_sakuraba` MovieClip instance, and it interacts with
 * `control` (GameControl object), `up_mc`, `down_mc`, `curryX_mc` (child MovieClips), and `code`.
 */
function DoAction_DefineSprite_388_mc_sakuraba_frame_11() {
   // Assuming 'this' refers to the mc_sakuraba MovieClip instance.

   // Calculate new angle based on current velocities.
   // Assumes `control` has `vx` and `vy` properties.
   if (typeof control !== 'undefined' && control.vx !== undefined && control.vy !== undefined) {
      // The constant 0.017453292519943295 is Math.PI / 180 (degrees to radians conversion).
      let angle = (Math.abs(Math.atan2(control.vy, control.vx)) / (Math.PI / 180) + 45) % 90 * 70 / 90 + 10;

      // Calculate magnitude of velocity vector.
      let v = Math.sqrt(control.vx * control.vx + control.vy * control.vy);

      // Apply new velocities based on calculated angle and magnitude.
      control.vx = v * Math.cos(angle * Math.PI / 180);
      control.vy = v * Math.sin(angle * Math.PI / 180);

      // Control visibility of `up_mc` and `down_mc` based on angle.
      // Assumes `up_mc` and `down_mc` are child MovieClips with `_visible` property.
      if (this.up_mc && this.down_mc) {
         if (angle >= 45) {
            this.up_mc._visible = true;
            this.down_mc._visible = false;
         } else {
            this.up_mc._visible = false;
            this.down_mc._visible = true;
         }
      }
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

   let movecount = 0; // Animation frame counter for `moveobjsub`.
   let x1a = 300 + 100 * Math.random(); // Random X offset for curry1a.
   let x1b = 50 + 300 * Math.random(); // Random X offset for curry1b.
   let x2 = 100 + 100 * Math.random(); // Random X offset for curry2.
   let moveobjsub = null; // Function to be set dynamically for 'curry' animation.

   // `moveobjsub` is an internal function for animating 'curry' MovieClips.
   moveobjsub = () => { // Use arrow function to preserve 'this' context.
      movecount++;
      // Animate position and rotation for `curry1a_mc`.
      if (this.curry1a_mc) {
         this.curry1a_mc._x = movecount / 30 * x1a;
         this.curry1a_mc._y = (movecount - 10) * (movecount - 10) / 20 / 20 * 200 - 200;
         this.curry1a_mc._rotation += 5;
      }
      // Animate position and rotation for `curry1b_mc`.
      if (this.curry1b_mc) {
         this.curry1b_mc._x = movecount / 30 * x1b;
         this.curry1b_mc._y = (movecount - 10) * (movecount - 10) / 20 / 20 * 200 - 200;
         this.curry1b_mc._rotation += 10;
      }
      // Animate position and rotation for `curry2_mc`.
      if (this.curry2_mc) {
         this.curry2_mc._x = movecount / 30 * x2;
         this.curry2_mc._y = (movecount - 10) * (movecount - 10) / 20 / 20 * 200 - 200;
         this.curry2_mc._rotation += 15;
      }

      if (movecount === 30) {
         moveobjsub = null; // Animation complete: delete the reference.
      }
   };
}

// How this might be structured in a JavaScript class (conceptual, part of mc_sakuraba):
/*
class mc_sakuraba extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization from frame 1 ...
      // Mock child MovieClips
      this.up_mc = { _visible: false };
      this.down_mc = { _visible: false };
      this.curry1a_mc = { _x: 0, _y: 0, _rotation: 0 };
      this.curry1b_mc = { _x: 0, _y: 0, _rotation: 0 };
      this.curry2_mc = { _x: 0, _y: 0, _rotation: 0 };

      // External `control` object
      window.control = window.control || {
          vx: 0, vy: 0,
          slow2: (f, d) => console.log(`Control slow2: ${f}, ${d}`),
          setspecial: (ch, flag) => console.log(`Set special ${ch}: ${flag}`),
          characode: { youko: 5 }
      };
      this.code = window.control.characode;

      this.moveobjsub = null; // Internal property for animation function
   }

   onFrame11Action() {
      if (window.control) {
         let angle = (Math.abs(Math.atan2(window.control.vy, window.control.vx)) / (Math.PI / 180) + 45) % 90 * 70 / 90 + 10;
         let v = Math.sqrt(window.control.vx * window.control.vx + window.control.vy * window.control.vy);
         window.control.vx = v * Math.cos(angle * Math.PI / 180);
         window.control.vy = v * Math.sin(angle * Math.PI / 180);

         if (this.up_mc && this.down_mc) {
            if (angle >= 45) {
               this.up_mc._visible = true;
               this.down_mc._visible = false;
            } else {
               this.up_mc._visible = false;
               this.down_mc._visible = true;
            }
         }
         if (window.control.slow2) {
            window.control.slow2(30, 1);
         }
         if (window.control.setspecial && this.code) {
            window.control.setspecial(this.code.youko, false);
         }
      }

      let movecount = 0;
      const x1a = 300 + 100 * Math.random();
      const x1b = 50 + 300 * Math.random();
      const x2 = 100 + 100 * Math.random();

      this.moveobjsub = () => { // This will be the actual onEnterFrame logic for this animation
         movecount++;
         if (this.curry1a_mc) {
            this.curry1a_mc._x = (movecount / 30) * x1a;
            this.curry1a_mc._y = (Math.pow(movecount - 10, 2) / 400) * 200 - 200; // (movecount-10)^2 / (20^2) * 200
            this.curry1a_mc._rotation += 5;
         }
         if (this.curry1b_mc) {
            this.curry1b_mc._x = (movecount / 30) * x1b;
            this.curry1b_mc._y = (Math.pow(movecount - 10, 2) / 400) * 200 - 200;
            this.curry1b_mc._rotation += 10;
         }
         if (this.curry2_mc) {
            this.curry2_mc._x = (movecount / 30) * x2;
            this.curry2_mc._y = (Math.pow(movecount - 10, 2) / 400) * 200 - 200;
            this.curry2_mc._rotation += 15;
         }

         if (movecount === 30) {
            this.moveobjsub = null; // Stop animation
         } else {
            requestAnimationFrame(this.moveobjsub); // Schedule next frame
         }
      };
      // To start this animation, you would call:
      // requestAnimationFrame(this.moveobjsub);
   }
}
*/