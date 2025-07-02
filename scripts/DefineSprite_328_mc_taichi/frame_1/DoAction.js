/**
 * ActionScript code for `DefineSprite_328_mc_taichi`, frame 1's `DoAction` script.
 * This script defines several functions related to the 'taichi' MovieClip's behavior:
 * - `bound(vx, vy)`: Plays sound effects based on impact velocities.
 * - `moveobj(py, rot, scale)`: Controls the Taichi MovieClip's visibility, Y position, and rotation based on input parameters.
 * - `changecolor(newcolor, frame)`: Animates a color transformation for the Taichi MovieClip over a specified number of frames.
 * - `setcff(oldtype, newtype, power)`: Sets up CFF (Character Flash) effects based on type, controlling visibility of 'rv' and 'cv' text.
 * - `cffa()`, `cffbc()`, `cffbd()`, `cffc()`, `cffd()`: Functions for specific CFF visual/gameplay effects.
 * - `cffcstop()`, `cffcview()`: Control functions for the 'cffc' effect.
 *
 * In JavaScript, these would be methods of the `mc_taichi` class (which extends `GamePauseClip`).
 * It assumes `this` refers to the `mc_taichi` MovieClip instance, and it interacts with
 * `se1_mc`, `se2_mc` (sound effect MovieClips), `control` (GameControl object),
 * `hittarget`, and has internal properties like `taichi_mc`, `mycolor`, `rv`, `cv`, `count_txt`,
 * `light1_mc`, `light2_mc`, `light3_mc`.
 */
function DoAction_DefineSprite_328_mc_taichi_frame_1() {
   // Assuming 'this' refers to the mc_taichi MovieClip instance.

   this.stop(); // Stop the MovieClip's timeline by default.

   // Internal properties for color animation
   let mycolor = null; // Will be a Color instance
   let nowcolor = {}; // Object for current color transformation
   let oldcolor = {}; // Object for old color transformation
   let count = 0; // Counter for color animation and cffcview

   /**
    * Triggers sound effects based on impact velocities.
    * @param {number} vx - X velocity.
    * @param {number} vy - Y velocity.
    */
   this.bound = function(vx, vy) {
      // Assuming `se1_mc` and `se2_mc` are child MovieClips (sound effects)
      // and have a `soundplay` method. `Math.min` caps volume at 100.
      if (this.se1_mc && typeof this.se1_mc.soundplay === 'function') {
         this.se1_mc.soundplay(Math.min(vx * 30, 100));
      }
      if (this.se2_mc && typeof this.se2_mc.soundplay === 'function') {
         this.se2_mc.soundplay(Math.min(vy * 30, 100));
      }
   };

   /**
    * Moves the Taichi MovieClip and controls its visibility.
    * @param {number} py - Player's Y position.
    * @param {number} rot - Rotation angle.
    * @param {number} scale - Overall scene scale.
    */
   this.moveobj = function(py, rot, scale) {
      // Assuming `taichi_mc` is a child MovieClip of 'this'.
      if (this.taichi_mc) {
         if (this.taichi_mc._rotation !== rot) {
            this.taichi_mc._rotation = rot; // Update rotation.
         }

         if (py > 14) {
            this._visible = false; // Hide if too high.
         } else {
            // Adjust Y position based on `py` and `scale`.
            if (py > 2.735042735042735 && py < 10.256410256410257) {
               this._y = -100 / scale * 400 / 1.3;
            } else {
               this._y = (-py) * 150;
            }
            this._visible = true; // Make visible.
         }
      }
   };

   /**
    * Animates a color transformation for the Taichi MovieClip.
    * @param {object} newcolor - The target color object (e.g., {ra:100, rb:0, ...}).
    * @param {number} frame - The number of frames over which to animate the color change.
    */
   this.changecolor = function(newcolor, frame) {
      // Assuming `taichi_mc` is a child MovieClip and `Color` is a class for color transforms.
      if (!this.taichi_mc || !newcolor || !Color) return; // Defensive check.

      count = 0; // Reset animation counter.
      mycolor = new Color(this.taichi_mc); // Create a new Color instance for `taichi_mc`.
      oldcolor = mycolor.getTransform(); // Get current color transform.

      // `onEnterFrame` for color animation.
      this.taichi_mc.onEnterFrame = () => {
         if (frame > count) {
            count++;
            // Interpolate color properties (ra, rb, ga, gb, ba, bb, aa, ab).
            // This is a linear interpolation between oldcolor and newcolor over `frame` steps.
            for (let prop in newcolor) {
               if (oldcolor.hasOwnProperty(prop)) {
                  nowcolor[prop] = newcolor[prop] * count / frame + oldcolor[prop] * (1 - count / frame);
               }
            }
            mycolor.setTransform(nowcolor); // Apply the interpolated color.
         } else {
            this.taichi_mc.onEnterFrame = null; // Animation complete.
         }
      };
   };

   /**
    * Sets up CFF (Character Flash) effects based on type.
    * Controls visibility of 'rv' (rotation visibility?) and 'cv' (color visibility?) text.
    * @param {number} oldtype - Previous CFF type.
    * @param {number} newtype - New CFF type.
    * @param {number} power - A power value (unused in this function, but part of AS signature).
    */
   this.setcff = function(oldtype, newtype, power) {
      // Go to the "cff" frame in the MovieClip's timeline.
      if (typeof this.gotoAndPlay === 'function') {
         this.gotoAndPlay("cff");
      }
      // Control `rv` and `cv` properties (likely for UI text visibility).
      if (oldtype === null) {
         this.rv = false;
         this.cv = false;
      } else {
         this.rv = true;
         this.cv = oldtype !== newtype;
      }
   };

   /** Specific CFF effects. */
   this.cffa = function() {
      if (typeof this.gotoAndPlay === 'function') {
         this.gotoAndPlay("cffa");
      }
   };

   this.cffbc = function() {
      if (typeof this.gotoAndPlay === 'function') {
         this.gotoAndPlay("cffbc");
      }
   };

   this.cffbd = function() {
      // Disable hit detection and slow down game.
      if (control) {
         control.hitenabled = false;
         control.slow(1000, 0);
      }
      if (typeof this.gotoAndPlay === 'function') {
         this.gotoAndPlay("cffbd");
      }
   };

   this.cffc = function() {
      count = 0; // Reset counter for this effect.
      if (typeof this.gotoAndPlay === 'function') {
         this.gotoAndPlay("cffc");
      }
   };

   this.cffd = function() {
      // Disable hit detection.
      if (control) {
         control.hitenabled = false;
      }
      if (typeof this.gotoAndPlay === 'function') {
         this.gotoAndPlay("cffd");
      }
   };

   /** Control functions for the 'cffc' effect. */
   this.cffcstop = function() {
      count = null; // Stop animation.
      if (this.taichi_mc) {
         this.taichi_mc._y = 0; // Reset Y position.
      }
      if (typeof this.gotoAndStop === 'function') {
         this.gotoAndStop("normal"); // Go to "normal" state.
      }
   };

   this.cffcview = function() {
      // If `count` is a valid number, continue animation.
      if (count !== null && count !== undefined) {
         count++;
         // Animate Taichi's Y position with a sine wave.
         if (this.taichi_mc) {
            this.taichi_mc._y = 60 * Math.sin(6.283185307179586 * count / 20);
         }
         // Update count text display.
         if (this.count_txt && control) {
            this.count_txt.text = Math.round(control.cffcount / 30 * 100);
         }

         // Animate 'light' MovieClips (moving them left and resetting).
         // Assumes light1_mc, light2_mc, light3_mc are child MovieClips.
         if (this.light1_mc) {
            this.light1_mc._x -= 20;
            if (this.light1_mc._x <= -150) {
               this.light1_mc._x = 0;
               this.light1_mc._y = (this.taichi_mc ? this.taichi_mc._y : 0) - 50 + Math.random() * 100;
            }
         }
         if (this.light2_mc) {
            this.light2_mc._x -= 10;
            if (this.light2_mc._x <= -100) {
               this.light2_mc._x = 0;
               this.light2_mc._y = (this.taichi_mc ? this.taichi_mc._y : 0) - 50 + Math.random() * 100;
            }
         }
         if (this.light3_mc) {
            this.light3_mc._x -= 30;
            if (this.light3_mc._x <= -200) {
               this.light3_mc._x = 0;
               this.light3_mc._y = (this.taichi_mc ? this.taichi_mc._y : 0) - 50 + Math.random() * 100;
            }
         }
      }
   };
}

// How this might be structured in a JavaScript class (conceptual, part of mc_taichi):
/*
class mc_taichi extends GamePauseClip { // Extending GamePauseClip as per previous conversion
   constructor() {
      super();
      this.stop();

      // Mock child MovieClips and external dependencies
      this.se1_mc = { soundplay: (vol) => console.log(`SE1 playing vol: ${vol}`) };
      this.se2_mc = { soundplay: (vol) => console.log(`SE2 playing vol: ${vol}`) };
      this.taichi_mc = { _rotation: 0, _y: 0, onEnterFrame: null }; // Mock
      this.count_txt = { text: '' }; // Mock
      this.light1_mc = { _x: 0, _y: 0 }; // Mock
      this.light2_mc = { _x: 0, _y: 0 }; // Mock
      this.light3_mc = { _x: 0, _y: 0 }; // Mock

      this.rv = false; // Mock properties
      this.cv = false; // Mock properties

      // External `control` object (GameControl instance)
      window.control = window.control || {
         hitenabled: true, slow: (f, i) => console.log(`Control slow: ${f}, ${i}`),
         cffcount: 0
      };

      // Internal state for color animation
      this._mycolor = null;
      this._nowcolor = {};
      this._oldcolor = {};
      this._colorAnimCount = 0;

      // Internal state for cffcview animation
      this._cffcViewCount = null;
   }

   bound(vx, vy) {
      if (this.se1_mc) this.se1_mc.soundplay(Math.min(vx * 30, 100));
      if (this.se2_mc) this.se2_mc.soundplay(Math.min(vy * 30, 100));
   }

   moveobj(py, rot, scale) {
      if (this.taichi_mc) {
         if (this.taichi_mc._rotation !== rot) {
            this.taichi_mc._rotation = rot;
         }
         if (py > 14) {
            this._visible = false;
         } else {
            if (py > 2.735042735042735 && py < 10.256410256410257) {
               this._y = -100 / scale * 400 / 1.3;
            } else {
               this._y = (-py) * 150;
            }
            this._visible = true;
         }
      }
   }

   changecolor(newcolor, frame) {
      if (!this.taichi_mc || !newcolor || !window.Color) return; // Assuming Color is global
      this._colorAnimCount = 0;
      this._mycolor = new window.Color(this.taichi_mc);
      this._oldcolor = this._mycolor.getTransform();
      const animateColor = () => {
         if (frame > this._colorAnimCount) {
            this._colorAnimCount++;
            for (let prop in newcolor) {
               if (this._oldcolor.hasOwnProperty(prop)) {
                  this._nowcolor[prop] = newcolor[prop] * this._colorAnimCount / frame + this._oldcolor[prop] * (1 - this._colorAnimCount / frame);
               }
            }
            this._mycolor.setTransform(this._nowcolor);
            requestAnimationFrame(animateColor);
         } else {
            this.taichi_mc.onEnterFrame = null; // Or stop this specific animation loop
         }
      };
      this.taichi_mc.onEnterFrame = animateColor; // Assign property for external calls
      requestAnimationFrame(animateColor); // Start the animation
   }

   setcff(oldtype, newtype, power) {
      this.gotoAndPlay("cff");
      this.rv = (oldtype !== null); // rv is true if oldtype is not null
      this.cv = (oldtype !== newtype); // cv is true if types are different
   }

   cffa() { this.gotoAndPlay("cffa"); }
   cffbc() { this.gotoAndPlay("cffbc"); }

   cffbd() {
      if (window.control) {
         window.control.hitenabled = false;
         window.control.slow(1000, 0);
      }
      this.gotoAndPlay("cffbd");
   }

   cffc() {
      this._cffcViewCount = 0;
      this.gotoAndPlay("cffc");
   }

   cffd() {
      if (window.control) {
         window.control.hitenabled = false;
      }
      this.gotoAndPlay("cffd");
   }

   cffcstop() {
      this._cffcViewCount = null;
      if (this.taichi_mc) this.taichi_mc._y = 0;
      this.gotoAndStop("normal");
   }

   cffcview() {
      if (this._cffcViewCount !== null && this._cffcViewCount !== undefined) {
         this._cffcViewCount++;
         if (this.taichi_mc) {
            this.taichi_mc._y = 60 * Math.sin(Math.PI * 2 * this._cffcViewCount / 20);
         }
         if (this.count_txt && window.control) {
            this.count_txt.text = Math.round(window.control.cffcount / 30 * 100);
         }
         // Light animations
         if (this.light1_mc) {
            this.light1_mc._x -= 20;
            if (this.light1_mc._x <= -150) {
               this.light1_mc._x = 0;
               this.light1_mc._y = (this.taichi_mc ? this.taichi_mc._y : 0) - 50 + Math.random() * 100;
            }
         }
         // ... similar for light2_mc, light3_mc
      }
   }
}

// Mock Color class for conceptual conversion
// class Color {
//    constructor(target) { this.target = target; console.log("Color instance for", target); }
//    getTransform() { return { ra:100, rb:0, ga:100, gb:0, ba:100, bb:0, aa:100, ab:0 }; } // Mock initial transform
//    setTransform(transform) { /* Apply transform to target here */ console.log("Applying transform:", transform); }
// }
*/