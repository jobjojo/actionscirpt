/**
 * ActionScript code for `DefineSprite_271`, frame 18's `DoAction` script.
 * This script is part of a UI animation, likely a mask or panel expanding/contracting.
 * It initializes a `mask_mc` to frame 1, sets the `currentbtn_mc`, and then
 * sets up an `onEnterFrame` loop to animate the `_xscale` and `_yscale` of all
 * MovieClips inside `mask_mc`. It also has an `onMouseDown` handler to
 * fast-forward the animation.
 *
 * In JavaScript, this would be part of a UI component class.
 * Assumes `this` refers to the MovieClip instance, `mask_mc` is a child,
 * `panel_mc.currentbtn_mc` is a UI state variable, and it interacts with
 * an animation loop (e.g., `requestAnimationFrame`) and event listeners.
 */
function DoAction_DefineSprite_271_frame_18() {
   // Assuming 'this' refers to the MovieClip instance.
   // Assume `mask_mc` is a child MovieClip and `panel_mc` is a parent/sibling.

   if (this.mask_mc && typeof this.mask_mc.gotoAndStop === 'function') {
      this.mask_mc.gotoAndStop(1); // Reset mask_mc to frame 1.
   }

   // Update the current active button/panel state.
   if (this.panel_mc) {
      this.panel_mc.currentbtn_mc = this.panel_mc.aboutbtn_mc; // Assuming aboutbtn_mc is a property of panel_mc.
   }

   let count = 0; // Initialize a counter for the animation frames.
   let frames = 15; // Total frames for the animation.

   // `onEnterFrame` logic for continuous animation.
   // In JS, this would be hooked into a game loop or `requestAnimationFrame`.
   this.onEnterFrame = () => {
      count++; // Increment frame counter.
      if (this.mask_mc) {
         // Iterate through children of mask_mc (assuming they are MovieClips).
         // In ActionScript 2.0/3.0, `for...in` iterates over dynamic properties of an object,
         // which for MovieClips often includes numerically indexed children.
         // In JS, you'd iterate over an array of children or use a specific display list API.
         for (let i in this.mask_mc) {
            // Check if it's a MovieClip instance (conceptual).
            // In a JS framework, you might check `instanceof DisplayObject` or similar.
            if (typeof this.mask_mc[i] === "object" && this.mask_mc[i] !== null && this.mask_mc[i]._xscale !== undefined) { // Check for MovieClip-like properties
               // Apply scaling animation based on a quartic ease-out function.
               this.mask_mc[i]._xscale = 0.05925925925925926 * count * count * count * count + 100;
               this.mask_mc[i]._yscale = this.mask_mc[i]._xscale;

               if (count === frames) {
                  // Animation complete: remove the onEnterFrame listener.
                  this.onEnterFrame = null;
                  // Also remove the onMouseDown listener for skipping.
                  this.onMouseDown = null;
               }
            }
         }
      }
   };

   // `onMouseDown` handler to fast-forward the animation.
   // In JS, this would be a mouse event listener.
   this.onMouseDown = () => {
      count = frames - 1; // Set count to almost complete the animation.
      // Call the `onEnterFrame` function once to immediately apply the nearly final state.
      // The next natural `onEnterFrame` tick will then finalize it.
      if (typeof this.onEnterFrame === 'function') {
         this.onEnterFrame();
      }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class MaskAnimationComponent extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      // Assume mask_mc, panel_mc, aboutbtn_mc are child/related objects
      this.mask_mc = {
         gotoAndStop: (f) => console.log(`mask_mc gotoAndStop: ${f}`),
         _xscale: 100, _yscale: 100,
         child1: { _xscale: 100, _yscale: 100 }, // Mock child
         child2: { _xscale: 100, _yscale: 100 }  // Mock child
      };
      this.panel_mc = { aboutbtn_mc: {}, currentbtn_mc: null }; // Mock

      this.count = 0;
      this.frames = 15;

      this.initAnimation();
   }

   initAnimation() {
      if (this.mask_mc && typeof this.mask_mc.gotoAndStop === 'function') {
         this.mask_mc.gotoAndStop(1);
      }
      if (this.panel_mc) {
         this.panel_mc.currentbtn_mc = this.panel_mc.aboutbtn_mc;
      }

      this.animationFrameHandler = () => {
         this.count++;
         if (this.mask_mc) {
            // More robust iteration for children in JS
            // Assuming children are directly accessible or in an array
            // e.g., for (const child of this.mask_mc.children) {
            for (let i in this.mask_mc) { // Fallback for AS-like dynamic properties
                const child = this.mask_mc[i];
                if (typeof child === "object" && child !== null && child._xscale !== undefined) {
                    child._xscale = 0.05925925925925926 * Math.pow(this.count, 4) + 100;
                    child._yscale = child._xscale;
                }
            }
         }

         if (this.count === this.frames) {
            // Stop animation loop (e.g., cancelAnimationFrame)
            console.log("Animation completed, clearing frame handler.");
            this.onEnterFrame = null; // Clear direct reference
            this.onMouseDown = null;  // Clear direct reference
            return; // Stop current frame processing
         }
         // Schedule next frame if not completed
         if (this.onEnterFrame) { // Check if not cleared yet
             requestAnimationFrame(this.animationFrameHandler);
         }
      };

      this.mouseHandler = () => {
         this.count = this.frames - 1;
         // Trigger one last update. The next rAF will complete it.
         if (this.animationFrameHandler) {
             this.animationFrameHandler();
         }
      };

      // Start the animation loop
      requestAnimationFrame(this.animationFrameHandler);
      // Attach mouse down listener (conceptual)
      // this.element.addEventListener('mousedown', this.mouseHandler);
   }

   // The 'onEnterFrame' and 'onMouseDown' properties would be set from outside,
   // and when set, they would likely trigger the `animationFrameHandler` and `mouseHandler`.
   // This redefines them to match the AS structure.
   set onEnterFrame(callback) { this._onEnterFrameCallback = callback; if(callback) requestAnimationFrame(this.animationFrameHandler); }
   get onEnterFrame() { return this._onEnterFrameCallback; }
   set onMouseDown(callback) { this._onMouseDownCallback = callback; /* Attach event listener */ }
   get onMouseDown() { return this._onMouseDownCallback; }
}