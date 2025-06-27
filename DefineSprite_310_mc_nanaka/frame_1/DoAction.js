/**
 * ActionScript code for `DefineSprite_310_mc_nanaka`, frame 1's `DoAction` script.
 * This script defines functions specific to the 'nanaka' character's abilities,
 * including `aerial` (for aerial crash animations) and `cff` (likely for "Character Flash" or special effects).
 * It also defines a `moveobj` function to control Nanaka's position and visibility.
 *
 * In JavaScript, these would be methods of the `mc_nanaka` class (which extends `GamePauseClip`).
 * It assumes `this` refers to the `mc_nanaka` MovieClip instance, and it interacts with
 * `control` (GameControl object), `hittarget` (the target for hits), and has internal
 * properties like `maxx`, `code`, `charatype`, `px`.
 */
function DoAction_DefineSprite_310_mc_nanaka_frame_1() {
   // Assuming 'this' refers to the mc_nanaka MovieClip instance.

   this.stop(); // Stop the MovieClip's timeline by default.

   // Properties initialized once when the script runs.
   let maxx = 103; // Max X position for visibility.
   let code = control.characode; // Reference to character codes from GameControl.
   let charatype = code.nanaka; // Set this character's type.
   let px = -0.6666666666666666; // Initial X position (player position x, relative).
   let movecount = 0; // Counter for internal move animations.
   let moveobjsub = null; // Function to be set dynamically for internal animation.

   /**
    * Initiates an aerial crash animation for Nanaka.
    * @param {boolean} upper - True if it's an "upper" aerial crash, false otherwise.
    */
   this.aerial = function(upper) {
      // Disable hit detection and slow down game control.
      if (control) {
         control.hitenabled = false;
         control.slow(1000, 0); // Slow down for 1000 frames with 0 interval.
      }

      movecount = 0; // Reset animation counter.

      // `moveobjsub` is an internal function for animating Nanaka's appearance
      // during the aerial crash.
      moveobjsub = () => { // Use arrow function to preserve 'this' context.
         movecount++;
         // Scale animation: xscale shrinks, yscale expands.
         this._xscale = (1 - movecount / 10) * 100;
         this._yscale = movecount / 10 * 200 + 100;

         if (movecount >= 10) {
            // Animation complete: reset properties and delete the sub-animation.
            this._xscale = 100;
            this._yscale = 100;
            this._rotation = 0;
            // Set object position relative to control's px/py.
            this.px = control.px;
            this._x = 0;
            this._y = (-control.py) * 150;
            moveobjsub = null; // Delete the reference to stop the sub-animation.

            // Play specific aerial animation based on `upper` flag.
            if (upper) {
               if (typeof this.gotoAndPlay === 'function') {
                  this.gotoAndPlay("aerialu"); // Go to "aerial up" animation.
               }
            } else {
               if (typeof this.gotoAndPlay === 'function') {
                  this.gotoAndPlay("aeriald"); // Go to "aerial down" animation.
               }
            }
         }
      };
   };

   /**
    * Initiates a "Character Flash" (cff) special effect for Nanaka.
    * @param {number} typecode - Code indicating the type of CFF effect.
    */
   this.cff = function(typecode) {
      // Assumes `hittarget` and `control.taichi` are accessible.
      hittarget = control.taichi; // Set hit target.
      this._rotation = 0;
      this.px = control.px;
      this._x = 0;
      this._y = 0;
      this.cfftype = typecode; // Set the CFF type.
      maxx = 401.1; // Update maxx for this special state.

      // Go to the "special" animation frame.
      if (typeof this.gotoAndPlay === 'function') {
         this.gotoAndPlay("special");
      }
   };

   /**
    * Moves the Nanaka object and controls its visibility.
    * This function is intended to be called frequently (e.g., onEnterFrame).
    * @param {number} px - Player's X position.
    * @param {number} xMin - Minimum X boundary for visibility.
    */
   this.moveobj = function(px, xMin) {
      this._x = (this.px - px) * 150; // Calculate new X position.
      this._visible = this._x + maxx > xMin; // Set visibility based on position and maxx.

      // If `moveobjsub` exists, call it to run its internal animation.
      if (typeof moveobjsub === 'function') {
         moveobjsub();
      }
   };

   // Initial setup calls:
   // Assuming 'control' is a global or accessible object.
   // This `code` and `charatype` initialization will occur when the MovieClip is loaded.
   // `px` is initialized here as well.
}

// How this might be structured in a JavaScript class (conceptual, part of mc_nanaka):
/*
class mc_nanaka extends GamePauseClip { // Extending GamePauseClip as per previous conversion
   constructor() {
      super();
      this.stop();

      this.maxx = 103;
      this.code = window.control ? window.control.characode : {}; // Mock if control isn't ready
      this.charatype = this.code.nanaka;
      this.px = -0.6666666666666666;

      this.movecount = 0;
      this.moveobjsubInternal = null; // Internal method for sub-animations

      // Mock dependencies
      window.control = window.control || { // Ensure control exists
          hitenabled: true, slow: (f, i) => console.log(`Control slow: ${f}, ${i}`),
          px: 0, py: 0, taichi: {}, characode: this.code
      };
      let hittarget = null; // Would be passed or referenced

      // `this.aerial` and `this.cff` and `this.moveobj` become class methods.
   }

   aerial(upper) {
      if (window.control) {
         window.control.hitenabled = false;
         window.control.slow(1000, 0);
      }
      this.movecount = 0;
      this.moveobjsubInternal = () => {
         this.movecount++;
         this._xscale = (1 - this.movecount / 10) * 100;
         this._yscale = this.movecount / 10 * 200 + 100;

         if (this.movecount >= 10) {
            this._xscale = 100;
            this._yscale = 100;
            this._rotation = 0;
            this.px = window.control.px;
            this._x = 0;
            this._y = (-window.control.py) * 150;
            this.moveobjsubInternal = null; // Stop the sub-animation

            if (typeof this.gotoAndPlay === 'function') {
               this.gotoAndPlay(upper ? "aerialu" : "aeriald");
            }
         }
      };
      // In a game loop, you'd call a method that checks and runs this.moveobjsubInternal if it's set.
   }

   cff(typecode) {
      // Assuming 'hittarget' is a reference to a specific object.
      // This part needs external context for 'hittarget' to be fully functional.
      // E.g., `this.hittarget = window.control.taichi;`
      this._rotation = 0;
      this.px = window.control.px;
      this._x = 0;
      this._y = 0;
      this.cfftype = typecode;
      this.maxx = 401.1; // Update max X for this effect

      if (typeof this.gotoAndPlay === 'function') {
         this.gotoAndPlay("special");
      }
   }

   moveobj(pxRef, xMin) {
      this._x = (this.px - pxRef) * 150;
      this._visible = this._x + this.maxx > xMin;

      if (typeof this.moveobjsubInternal === 'function') {
         this.moveobjsubInternal();
      }
   }
}
*/