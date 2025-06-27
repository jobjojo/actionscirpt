/**
 * ActionScript code for `DefineSprite_273`, frame 1's `DoAction` script.
 * This script defines utility functions for a menu or UI scene.
 * It includes:
 * - `allenabled(enable)`: A function to enable or disable a set of buttons.
 * - `hop(base_mc)`: A function to apply a "hop" animation effect to a MovieClip.
 * - `hopset(targetmc, basemc)`: A function to apply the `hop` effect to all MovieClip children of a target.
 * It also initializes sound volume, disables all buttons initially, and applies `hopset`
 * to various UI elements for an introductory animation.
 *
 * In JavaScript, these would be functions or methods within a UI manager or scene class.
 * It assumes `this` refers to the MovieClip instance, and it interacts with child MovieClips
 * (like `start_btn`, `howto_btn`, `clear_btn`, etc.), `Sound` class, and global `control` object.
 */
function DoAction_DefineSprite_273_frame_1() {
   // Assuming 'this' refers to the MovieClip that manages the UI.

   this.stop(); // Stop the MovieClip's timeline by default.

   /**
    * Enables or disables a set of main menu buttons.
    * @param {boolean} enable - True to enable, false to disable.
    */
   this.allenabled = function(enable) {
      // Assuming these are child button MovieClips with an 'enabled' property.
      if (this.start_btn) { this.start_btn.enabled = enable; }
      if (this.howto_btn) { this.howto_btn.enabled = enable; }
      if (this.quality_btn) { this.quality_btn.enabled = enable; }
      if (this.sound_btn) { this.sound_btn.enabled = enable; }
      if (this.clear_btn) { this.clear_btn.enabled = enable; }
   };

   /**
    * Applies a "hop" animation effect to a MovieClip.
    * This function is designed to be set as an `onEnterFrame` listener.
    * @param {MovieClip} base_mc - A reference MovieClip, likely for positional reference.
    */
   this.hop = function(base_mc) {
      // Store initial properties for animation.
      this.py = this._y;
      this.px = this._x;
      this.orgscale = this._yscale;
      this.rot = Math.random() * 20 + 5; // Random rotation.

      this.startx = 225 + this.px / 4;
      this.starty = 100;
      let frames = 40; // Total frames for the hop animation.

      // Calculate peak height for a parabolic hop.
      this.peak = -Math.random() * ((base_mc._y + this.starty) / 2 + 200);

      // Coefficients for parabolic motion (y = at^2 + v0t).
      this.a = (-this.peak) / (frames * frames) * 4;
      this.v0 = this.peak / frames * 4;
      let count = frames; // Counter for animation frames.

      // The `action` function defines the animation logic for each frame.
      this.action = () => { // Use arrow function to maintain `this` context.
         // Update X position (linear motion, relative to base_mc).
         this._x = (this.startx - base_mc._x - this.px) * count / frames + this.px;
         // Update Y position (parabolic motion + linear offset).
         this._y = this.a * count * count + this.v0 * count + (this.starty - base_mc._y - this.py) * count / frames + this.py;

         // Apply scaling and rotation effects.
         this._xscale = this.orgscale * (1 - 0.5 * count / frames);
         this._yscale = this._xscale;
         this._rotation = this.rot * count;

         if (count === 0) {
            // Animation complete.
            base_mc.enabled = true; // Re-enable the base MovieClip/button.
            this.onEnterFrame = null; // Remove the onEnterFrame listener.
         }
         count--; // Decrement counter.
      };

      // Assign the action to `onEnterFrame` and call it once to start.
      this.onEnterFrame = this.action;
      this.action();
   };

   /**
    * Applies the `hop` animation effect to all MovieClip children of a target.
    * @param {MovieClip} targetmc - The MovieClip whose children will hop.
    * @param {MovieClip} basemc - The base MovieClip for position reference.
    */
   this.hopset = function(targetmc, basemc) {
      // In ActionScript, `for...in` iterates over dynamic properties,
      // including numerically indexed children of MovieClips.
      // In JS, you'd iterate over an array of children or use a specific display list API.
      for (let i in targetmc) {
         // Check if it's a MovieClip instance (conceptual).
         // In a JS framework, you might check `instanceof DisplayObject` or similar.
         if (typeof targetmc[i] === "object" && targetmc[i] !== null && typeof targetmc[i].hop === 'undefined') { // Check if it's a MovieClip and doesn't already have hop
            // Assign the hop function and call it for each child.
            targetmc[i].hop = this.hop;
            targetmc[i].hop(basemc);
         }
      }
   };

   // --- Initial Scene Setup ---

   // Initialize global sound volume.
   // Assumes `Sound` can be instantiated and `setVolume` exists.
   // `new Sound(this)` would typically refer to a sound instance associated with this MovieClip.
   new Sound(this).setVolume(100); // Conceptual Sound class.

   this.allenabled(false); // Initially disable all buttons.

   // Apply hop effect to various UI elements for an intro animation.
   // Assumes `clear_btn`, `start_btn`, `title_mc`, `howto_btn`, `quality_btn`, `quality_mc.h_mc`, etc.
   // are child MovieClips and `this` is their container.
   this.hopset(this.clear_btn, this.clear_btn);
   this.hopset(this.start_btn, this.start_btn);
   this.hopset(this.title_mc, this.title_mc);
   this.hopset(this.howto_btn, this.howto_btn);
   this.hopset(this.quality_btn, this.quality_btn);
   this.hopset(this.quality_mc.h_mc, this.quality_mc);
   this.hopset(this.quality_mc.m_mc, this.quality_mc);
   this.hopset(this.quality_mc.l_mc, this.quality_mc);
   this.hopset(this.sound_btn, this.sound_btn);
   this.hopset(this.sound_mc.on_mc, this.sound_mc);
   this.hopset(this.sound_mc.off_mc, this.sound_mc);
   this.hopset(this.best_mc, this.best_mc);

   if (this.quality_mc) {
      this.quality_mc.base_btn = this.quality_btn; // Assign a reference.
   }

   let count = 0; // Local counter for intro animation.

   // `onEnterFrame` logic for the overall scene intro.
   this.onEnterFrame = () => {
      if (count === 0) {
         // Animation complete: remove listeners.
         this.onEnterFrame = null;
         this.onMouseDown = null;
      } else {
         count--; // Decrement counter.
      }
   };

   // `onMouseDown` handler to fast-forward the intro.
   this.onMouseDown = () => {
      count = 0; // Immediately end the intro animation.
      if (typeof this.gotoAndStop === 'function') {
         this.gotoAndStop("introend"); // Jump to the end frame of the intro.
      }
   };
}

// How this might be structured in a JavaScript class (conceptual, complex UI Scene):
/*
class MainMenuScene extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      // Mock child MovieClips/Buttons
      this.start_btn = { enabled: true, _x: 0, _y: 0, _yscale: 100 };
      this.howto_btn = { enabled: true, _x: 0, _y: 0, _yscale: 100 };
      this.quality_btn = { enabled: true, _x: 0, _y: 0, _yscale: 100 };
      this.sound_btn = { enabled: true, _x: 0, _y: 0, _yscale: 100 };
      this.clear_btn = { enabled: true, _x: 0, _y: 0, _yscale: 100 };
      this.title_mc = { _x: 0, _y: 0, _yscale: 100 };
      this.quality_mc = {
         h_mc: { _x: 0, _y: 0, _yscale: 100 },
         m_mc: { _x: 0, _y: 0, _yscale: 100 },
         l_mc: { _x: 0, _y: 0, _yscale: 100 }
      };
      this.sound_mc = {
         on_mc: { _x: 0, _y: 0, _yscale: 100 },
         off_mc: { _x: 0, _y: 0, _yscale: 100 }
      };
      this.best_mc = { _x: 0, _y: 0, _yscale: 100 };

      this.soundManager = new SoundManager(); // Conceptual SoundManager

      this.initScene();
   }

   initScene() {
      this.soundManager.setGlobalVolume(100);
      this.allenabled(false);

      this.hopset(this.clear_btn, this.clear_btn);
      this.hopset(this.start_btn, this.start_btn);
      this.hopset(this.title_mc, this.title_mc);
      this.hopset(this.howto_btn, this.howto_btn);
      this.hopset(this.quality_btn, this.quality_btn);
      this.hopset(this.quality_mc.h_mc, this.quality_mc);
      this.hopset(this.quality_mc.m_mc, this.quality_mc);
      this.hopset(this.quality_mc.l_mc, this.quality_mc);
      this.hopset(this.sound_btn, this.sound_btn);
      this.hopset(this.sound_mc.on_mc, this.sound_mc);
      this.hopset(this.sound_mc.off_mc, this.sound_mc);
      this.hopset(this.best_mc, this.best_mc);

      this.quality_mc.base_btn = this.quality_btn;

      let introCount = 0;
      this._onEnterFrameMain = () => {
         if (introCount === 0) {
            this.onEnterFrame = null; // Stop the animation loop
            this.onMouseDown = null;   // Remove the mouse listener
         } else {
            introCount--;
         }
      };

      this._onMouseDownMain = () => {
         introCount = 0;
         this.gotoAndStop("introend");
      };

      // Set up listeners (conceptual)
      this.onEnterFrame = this._onEnterFrameMain;
      this.onMouseDown = this._onMouseDownMain; // Attach to actual DOM element or game input
   }

   allenabled(enable) {
      if (this.start_btn) { this.start_btn.enabled = enable; }
      if (this.howto_btn) { this.howto_btn.enabled = enable; }
      if (this.quality_btn) { this.quality_btn.enabled = enable; }
      if (this.sound_btn) { this.sound_btn.enabled = enable; }
      if (this.clear_btn) { this.clear_btn.enabled = enable; }
   }

   hop(base_mc) {
      const clip = this; // 'this' will be the MovieClip being hopped

      clip.py = clip._y;
      clip.px = clip._x;
      clip.orgscale = clip._yscale;
      clip.rot = Math.random() * 20 + 5;

      clip.startx = 225 + clip.px / 4;
      clip.starty = 100;
      const frames = 40;

      clip.peak = -Math.random() * ((base_mc._y + clip.starty) / 2 + 200);

      clip.a = (-clip.peak) / (frames * frames) * 4;
      clip.v0 = clip.peak / frames * 4;
      let count = frames;

      const hopAction = () => {
         clip._x = (clip.startx - base_mc._x - clip.px) * count / frames + clip.px;
         clip._y = clip.a * count * count + clip.v0 * count + (clip.starty - base_mc._y - clip.py) * count / frames + clip.py;

         clip._xscale = clip.orgscale * (1 - 0.5 * count / frames);
         clip._yscale = clip._xscale;
         clip._rotation = clip.rot * count;

         if (count === 0) {
            base_mc.enabled = true;
            // Stop the specific clip's onEnterFrame
            clip.onEnterFrame = null; // Assuming custom `onEnterFrame` per object
         } else {
            count--;
         }
      };
      clip.onEnterFrame = hopAction; // Assign the action, assuming custom per-object loop
   }

   hopset(targetmc, basemc) {
      for (const prop in targetmc) {
         // This assumes children are direct properties. In JS, could be an array.
         if (targetmc.hasOwnProperty(prop) && typeof targetmc[prop] === 'object' && targetmc[prop] !== null && typeof targetmc[prop].hop === 'undefined') {
            // Bind the hop function to the child and call it in the child's context
            targetmc[prop].hop = this.hop.bind(targetmc[prop]); // 'this' inside hop will be the child
            targetmc[prop].hop(basemc);
         }
      }
   }
}
*/