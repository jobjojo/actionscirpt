/**
 * ActionScript code for `DefineSprite_534_s_main`, frame 15's `DoAction` script.
 * This script is part of a game over or crash sequence for the main game scene.
 * It makes the background (`back_mc`) invisible initially, then sets up an `onEnterFrame`
 * loop to animate the alpha and position of `crash_mc`, and the position of `chara_mc`.
 * The animation changes visibility of `back_mc` and `crash_mc` based on `_alpha` thresholds.
 *
 * In JavaScript, this would be part of a method or state logic within the `s_main` class.
 * It assumes `this` refers to the `s_main` MovieClip instance, and it interacts with
 * `back_mc`, `crash_mc`, `chara_mc` (child MovieClips), and `control` (GameControl object).
 */
function DoAction_DefineSprite_534_s_main_frame_15() {
   // Assuming 'this' refers to the s_main MovieClip instance.

   // Make background invisible initially.
   if (this.back_mc) {
      this.back_mc._visible = false;
   }

   let count = 0; // Animation frame counter.

   // `onEnterFrame` logic for the crash animation.
   this.onEnterFrame = () => { // Use arrow function to preserve 'this' context.
      count++; // Increment frame counter.

      // Animate `crash_mc`'s alpha and X position.
      // Assumes `control` has an `i_power` property.
      if (this.crash_mc && typeof control !== 'undefined' && control.i_power !== undefined) {
         this.crash_mc._alpha = (control.i_power * 25 - 100 * count) / 5 + 100;
         this.crash_mc._x = -200 * count / 30 + 450;
      }

      // Animate `chara_mc`'s X position.
      if (this.chara_mc) {
         this.chara_mc._x = 450 - 6.666666666666667 * count;
      }

      // Adjust `back_mc` visibility based on `crash_mc._alpha`.
      if (this.crash_mc && this.back_mc) {
         if (this.crash_mc._alpha < 100) {
            this.back_mc._visible = true; // Make background visible if crash is fading.
         }
      }

      // Adjust `crash_mc` visibility based on `_alpha`.
      if (this.crash_mc) {
         if (this.crash_mc._alpha <= 0) {
            this.crash_mc._visible = false; // Hide crash when fully faded.
         }
      }

      if (count >= 30) {
         // Animation complete: remove the onEnterFrame listener.
         this.onEnterFrame = null;
      }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class MainGameScene extends GamePauseClip { // Extending GamePauseClip as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      // Mock child MovieClips
      this.back_mc = { _visible: true };
      this.crash_mc = { _alpha: 100, _x: 0, _visible: true };
      this.chara_mc = { _x: 0 };

      // External `control` object
      window.control = window.control || { i_power: 100 }; // Mock initial power
   }

   onFrame15Action() {
      if (this.back_mc) {
         this.back_mc._visible = false;
      }

      let count = 0;
      const animateCrash = () => {
         count++;
         if (this.crash_mc && window.control && window.control.i_power !== undefined) {
            this.crash_mc._alpha = (window.control.i_power * 25 - 100 * count) / 5 + 100;
            this.crash_mc._x = -200 * count / 30 + 450;
         }
         if (this.chara_mc) {
            this.chara_mc._x = 450 - (6.666666666666667 * count);
         }

         if (this.crash_mc && this.back_mc) {
            if (this.crash_mc._alpha < 100) {
               this.back_mc._visible = true;
            }
         }
         if (this.crash_mc) {
            if (this.crash_mc._alpha <= 0) {
               this.crash_mc._visible = false;
            }
         }

         if (count >= 30) {
            this.onEnterFrame = null; // End animation loop
         } else {
            requestAnimationFrame(animateCrash);
         }
      };
      this.onEnterFrame = animateCrash; // Assign property for external calls
      requestAnimationFrame(animateCrash); // Start the JS animation loop
   }

   // Define onEnterFrame setter/getter to emulate AS behavior
   set onEnterFrame(callback) { this._onEnterFrameCallback = callback; }
   get onEnterFrame() { return this._onEnterFrameCallback; }
}
*/