/**
 * ActionScript code for `DefineSprite_328_mc_taichi`, frame 80's `DoAction` script.
 * This script is executed to set up an animation for a "boost" effect,
 * likely associated with Taichi's movements. It applies a slow-motion effect,
 * enables hit detection, and then sets up an `onEnterFrame` loop to animate
 * the scaling and positioning of `taichi_mc` and `boost_mc` to create a pulsing visual.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_taichi` class.
 * It assumes `this` refers to the `mc_taichi` MovieClip instance, and it interacts with
 * `control` (GameControl object), `taichi_mc`, and `boost_mc` (child MovieClips).
 */
function DoAction_DefineSprite_328_mc_taichi_frame_80() {
   // Assuming 'this' refers to the mc_taichi MovieClip instance.

   // Apply slow-motion effect.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `slow` method.
   if (typeof control !== 'undefined' && control.slow) {
      control.slow(14, 0); // Slow for 14 frames with 0 interval.
   }

   // Enable hit detection.
   // Assumes `control` has a `hitenabled` property.
   if (typeof control !== 'undefined' && control.hitenabled !== undefined) {
      control.hitenabled = true;
   }

   let count = 0; // Animation frame counter.

   // Initial scaling and positioning for animation.
   // Assumes `taichi_mc` and `boost_mc` are child MovieClips.
   if (this.taichi_mc) {
      this.taichi_mc._xscale = 100;
      this.taichi_mc._yscale = 100;
   }
   if (this.boost_mc) {
      this.boost_mc._xscale = 70;
      this.boost_mc._yscale = 70;
      this.boost_mc._x = -80;
      this.boost_mc._y = -50;
   }

   // `onEnterFrame` logic for the pulsing animation.
   this.onEnterFrame = () => { // Use arrow function to preserve 'this' context.
      if (count < 20) {
         count++;
         // Animate scaling of `taichi_mc` using a sine wave (pulsing effect).
         if (this.taichi_mc) {
            const sinVal = Math.sin(0.3141592653589793 * count); // 0.314... is PI/10
            this.taichi_mc._xscale = 100 + 50 * sinVal;
            this.taichi_mc._yscale = 100 - 50 * sinVal;
         }
         // Animate scaling and positioning of `boost_mc` relative to `taichi_mc`.
         if (this.boost_mc && this.taichi_mc) {
            this.boost_mc._xscale = 100 / this.taichi_mc._xscale * 70;
            this.boost_mc._yscale = 100 / this.taichi_mc._yscale * 70;
            this.boost_mc._x = 100 / this.taichi_mc._xscale * -80;
            this.boost_mc._y = 100 / this.taichi_mc._yscale * -50 - count * 5;
         }
      } else {
         // Animation complete: remove the onEnterFrame listener.
         count = null; // Clear count.
         this.onEnterFrame = null;
      }
   };
}

// How this might be structured in a JavaScript class (conceptual, part of mc_taichi):
/*
class mc_taichi extends GamePauseClip { // Extending GamePauseClip as per previous conversion
   constructor() {
      super();
      // Mock child MovieClips
      this.taichi_mc = { _xscale: 100, _yscale: 100, _x: 0, _y: 0, onEnterFrame: null };
      this.boost_mc = { _xscale: 70, _yscale: 70, _x: -80, _y: -50 };

      // External `control` object
      window.control = window.control || {
         slow: (f, i) => console.log(`Control slow: ${f}, ${i}`),
         hitenabled: true
      };
   }

   onFrame80Action() {
      if (window.control) {
         window.control.slow(14, 0);
         window.control.hitenabled = true;
      }

      let count = 0;

      if (this.taichi_mc) {
         this.taichi_mc._xscale = 100;
         this.taichi_mc._yscale = 100;
      }
      if (this.boost_mc) {
         this.boost_mc._xscale = 70;
         this.boost_mc._yscale = 70;
         this.boost_mc._x = -80;
         this.boost_mc._y = -50;
      }

      const animatePulse = () => {
         if (count < 20) {
            count++;
            if (this.taichi_mc) {
               const sinVal = Math.sin(0.3141592653589793 * count);
               this.taichi_mc._xscale = 100 + 50 * sinVal;
               this.taichi_mc._yscale = 100 - 50 * sinVal;
            }
            if (this.boost_mc && this.taichi_mc) {
               this.boost_mc._xscale = (100 / this.taichi_mc._xscale) * 70;
               this.boost_mc._yscale = (100 / this.taichi_mc._yscale) * 70;
               this.boost_mc._x = (100 / this.taichi_mc._xscale) * -80;
               this.boost_mc._y = (100 / this.taichi_mc._yscale) * -50 - count * 5;
            }
            requestAnimationFrame(animatePulse);
         } else {
            this.onEnterFrame = null; // Stop this specific animation
            console.log("Pulse animation completed.");
         }
      };
      this.onEnterFrame = animatePulse; // Assign for external calls
      requestAnimationFrame(animatePulse); // Start the JS animation loop
   }

   // Define onEnterFrame setter/getter to emulate AS behavior
   set onEnterFrame(callback) { this._onEnterFrameCallback = callback; }
   get onEnterFrame() { return this._onEnterFrameCallback; }
}
*/