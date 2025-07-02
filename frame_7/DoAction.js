/**
 * ActionScript code for `frame_7`, `DoAction` script (root timeline).
 * This script defines two core functions related to an "intro" animation for various
 * display objects in the scene:
 * - `hop(x, y)`: Applies a complex hopping and fading animation to a single MovieClip.
 * - `hopset(targetmc, basemc)`: Applies the `hop` effect to all MovieClip children of a target.
 * It also initializes a global `control` object, sets up sound, performs a `hopset` on
 * `load2_mc`, and defines `wait`, `prevact()`, `nextact()`, and `onMouseDown` for scene navigation.
 *
 * In JavaScript, these would be functions or methods within a scene manager or main application class.
 * It assumes `this` refers to the root MovieClip, and it interacts with `control` (GameControl object),
 * `load2_mc` (a child MovieClip), `Sound` class, and global `getTimer()`.
 */
function DoAction_frame_7() {
   // Assuming 'this' refers to the root MovieClip (timeline).

   /**
    * Applies a complex hopping and fading animation to a MovieClip.
    * This function is designed to be set as an `onEnterFrame` listener.
    * @param {number} x - Reference X position.
    * @param {number} y - Reference Y position.
    */
   this.hop = function(x, y) {
      // Store initial properties if not already set.
      if (this.px === null || this.px === undefined) {
         this.py = this._y;
         this.px = this._x;
      }
      // Calculate target end positions (ex, ey) and random rotation (rot).
      this.ex = 575 - x - this.px * 50 / 100;
      this.ey = 300 - y - this.py * 50 / 100;
      this.rot = Math.floor(Math.random() * 4) - 1; // Random rotation direction.

      // Calculate peak positions for a parabolic-like arc.
      this.peakx = Math.random() * 450 - 450;
      this.peaky = Math.random() * 300 - 300;

      // Animation timing and offset properties.
      this.offset = Math.floor((this.px + 150) / 40);
      this.frames = 20; // Frames for the first part of animation.
      this.count = this.frames; // Counter for the first part.
      this.offset2 = Math.floor(Math.random() * 15);
      this.frames2 = 50 - this.offset2; // Frames for the second part.
      this.count2 = this.frames2; // Counter for the second part.

      // The `action` function defines the animation logic for each frame.
      this.action = () => { // Use arrow function to maintain `this` context.
         if (this.count > -10) { // First phase of animation (hopping).
            // Vertical hop using sine wave for Y position.
            this._x = this.px;
            this._y = -100 * Math.max(0, Math.sin(Math.PI * (this.offset + this.count) / this.frames)) + this.py;
            // Squish/stretch effect using cosine for X scale.
            this._xscale = 100 * Math.cos(2 * Math.PI * Math.min(Math.max(this.offset + this.count, 0), this.frames) / this.frames);
            this._yscale = 100; // Y scale remains constant.
            this.count--;
            this._rotation = 0; // No rotation in first phase.
         } else if (this.offset2 > 0) { // Second phase: initial delay/offset.
            this.offset2--;
         } else { // Third phase: move to final position with rotation/scaling.
            // Move using sine wave for arc and linear interpolation to target.
            this._x = this.peakx * Math.sin(Math.PI * (1 - this.count2 / this.frames2)) + this.ex * (1 - this.count2 / this.frames2) + this.px;
            this._y = this.peaky * Math.sin(Math.PI * (1 - this.count2 / this.frames2)) + this.ey * (1 - this.count2 / this.frames2) + this.py;
            // Scale and rotate.
            this._xscale = (99 * this.count2 / this.frames2 + 50 - 49) * Math.sin(2 * Math.PI * (1 - this.count2 / this.frames2)) + 50 * this.count2 / this.frames2 + 50;
            this._yscale = this._xscale;
            this._rotation = -360 * this.rot * this.count2 / this.frames2;
            this.count2--;

            if (this.count2 < -1) {
               this.onEnterFrame = null; // Animation complete.
               if (typeof this.gotoAndStop === 'function') {
                  this.gotoAndStop("title"); // Go to "title" frame.
               }
            }
         }
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
      for (let i in targetmc) {
         // Check if it's a MovieClip instance (conceptual).
         if (typeof targetmc[i] === "object" && targetmc[i] !== null) {
            // Assign the hop function and call it for each child.
            // It explicitly checks if the child `targetmc[i]` has `hop` defined already.
            if (typeof targetmc[i].hop === 'undefined') {
                targetmc[i].hop = this.hop;
                targetmc[i].hop(basemc._x, basemc._y); // Pass x, y of basemc.
            }
         }
      }
   };

   // --- Initial Scene Setup ---

   // Initialize global `control` object and global sound.
   // Assumes `GameControl` and `Sound` classes are available.
   if (typeof control === 'undefined' || control === null) { // Only initialize if not already.
       _global.control = new GameControl(); // Conceptual global object.
   }
   if (typeof control.globalsound === 'undefined' || control.globalsound === null) {
       control.globalsound = new Sound(); // Conceptual Sound class.
   }
   // Load local data for control.
   if (control && typeof control.localload === 'function') {
      control.localload();
   }

   // Apply `hopset` to `load2_mc` for its intro animation.
   // Assumes `load2_mc` is a child MovieClip.
   if (this.load2_mc && typeof this.hopset === 'function') {
      this.hopset(this.load2_mc, this.load2_mc); // `load2_mc` hops relative to itself.
   }

   let wait = "wait1"; // Set a 'wait' state.

   /**
    * Navigates to the previous scene (frame 1).
    */
   this.prevact = function() {
      if (typeof this.gotoAndStop === 'function') {
         this.gotoAndStop(1);
      }
   };

   /**
    * Navigates to the next scene (title scene).
    */
   this.nextact = function() {
      if (typeof this.gotoAndStop === 'function') {
         this.gotoAndStop("title");
      }
   };

   // `onMouseDown` handler to fast-forward to title.
   this.onMouseDown = () => { // Use arrow function to preserve 'this' context.
      if (typeof this.gotoAndStop === 'function') {
         this.gotoAndStop("title");
      }
   };

   // Go to the initial 'wait' frame.
   if (typeof this.gotoAndStop === 'function') {
      this.gotoAndStop(wait);
   }
}

// How this might be structured in a JavaScript class (conceptual, Main Application Scene):
/*
// Global/Window scope for AS-like globals
window._global = window._global || {};
window._global.control = window._global.control || null; // Mock global control
window.GameControl = class { /* ... * / }; // Mock GameControl
window.Sound = class { /* ... * / }; // Mock Sound
window.getTimer = () => performance.now(); // Mock getTimer

class MainApplication extends MovieClip { // Assuming MovieClip base class
   constructor() {
      super();
      // Mock child MovieClips
      this.load2_mc = { _x: 0, _y: 0, px: null, py: null, _xscale: 100, _yscale: 100, _rotation: 0,
                        offset: 0, frames: 0, count: 0, offset2: 0, frames2: 0, count2: 0,
                        action: null, onEnterFrame: null };

      this.wait = ""; // Internal state for 'wait'
      this.prevact = null; // Internal function for previous action
      this.nextact = null; // Internal function for next action

      this.onFrame7Action(); // Call on app start
   }

   onFrame7Action() {
      // Global control initialization
      if (!window._global.control) {
         window._global.control = new window.GameControl();
      }
      if (!window._global.control.globalsound) {
         window._global.control.globalsound = new window.Sound();
      }
      if (window._global.control && typeof window._global.control.localload === 'function') {
         window._global.control.localload();
      }

      this.hopset(this.load2_mc, this.load2_mc); // Pass this instance for access to its properties

      this.wait = "wait1";

      this.prevact = () => { this.gotoAndStop(1); };
      this.nextact = () => { this.gotoAndStop("title"); };

      this.onMouseDown = () => { this.gotoAndStop("title"); };

      this.gotoAndStop(this.wait);
   }

   hop(xRef, yRef) {
      const clip = this; // 'this' will be the MovieClip being hopped

      if (clip.px === null || clip.px === undefined) {
         clip.py = clip._y;
         clip.px = clip._x;
      }
      clip.ex = 575 - xRef - clip.px * 50 / 100;
      clip.ey = 300 - yRef - clip.py * 50 / 100;
      clip.rot = Math.floor(Math.random() * 4) - 1;

      clip.peakx = Math.random() * 450 - 450;
      clip.peaky = Math.random() * 300 - 300;

      clip.offset = Math.floor((clip.px + 150) / 40);
      clip.frames = 20;
      clip.count = clip.frames;
      clip.offset2 = Math.floor(Math.random() * 15);
      clip.frames2 = 50 - clip.offset2;
      clip.count2 = clip.frames2;

      const hopAction = () => {
         if (clip.count > -10) {
            clip._x = clip.px;
            clip._y = -100 * Math.max(0, Math.sin(Math.PI * (clip.offset + clip.count) / clip.frames)) + clip.py;
            clip._xscale = 100 * Math.cos(2 * Math.PI * Math.min(Math.max(clip.offset + clip.count, 0), clip.frames) / clip.frames);
            clip._yscale = 100;
            clip.count--;
            clip._rotation = 0;
         } else if (clip.offset2 > 0) {
            clip.offset2--;
         } else {
            clip._x = clip.peakx * Math.sin(Math.PI * (1 - clip.count2 / clip.frames2)) + clip.ex * (1 - clip.count2 / clip.frames2) + clip.px;
            clip._y = clip.peaky * Math.sin(Math.PI * (1 - clip.count2 / clip.frames2)) + clip.ey * (1 - clip.count2 / clip.frames2) + clip.py;
            clip._xscale = (99 * clip.count2 / clip.frames2 + 50 - 49) * Math.sin(2 * Math.PI * (1 - clip.count2 / clip.frames2)) + 50 * clip.count2 / clip.frames2 + 50;
            clip._yscale = clip._xscale;
            clip._rotation = -360 * clip.rot * clip.count2 / clip.frames2;
            clip.count2--;

            if (clip.count2 < -1) {
               clip.onEnterFrame = null;
               clip.gotoAndStop("title");
            }
         }
         // Schedule next frame if not done
         if (clip.onEnterFrame) {
             requestAnimationFrame(hopAction);
         }
      };
      clip.onEnterFrame = hopAction; // Assign to property, assuming external loop calls this
      requestAnimationFrame(hopAction); // Start the JS animation loop
   }

   hopset(targetmc, basemc) {
      for (const prop in targetmc) {
         if (targetmc.hasOwnProperty(prop) && typeof targetmc[prop] === 'object' && targetmc[prop] !== null) {
            if (typeof targetmc[prop].hop === 'undefined') { // Avoid re-assigning if already has hop
                // Bind the hop function to the child and call it in the child's context
                targetmc[prop].hop = this.hop.bind(targetmc[prop]); // `this` inside hop will be `targetmc[prop]`
                targetmc[prop].hop(basemc._x, basemc._y);
            }
         }
      }
   }

   // Define onEnterFrame/onMouseDown setters/getters to emulate AS behavior
   set onEnterFrame(callback) { this._onEnterFrameCallback = callback; }
   get onEnterFrame() { return this._onEnterFrameCallback; }
   set onMouseDown(callback) { this._onMouseDownCallback = callback; }
   get onMouseDown() { return this._onMouseDownCallback; }
}
*/