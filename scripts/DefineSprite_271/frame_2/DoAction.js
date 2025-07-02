/**
 * ActionScript code for `DefineSprite_271`, frame 2's `DoAction` script.
 * This script is part of a UI animation, likely a mask or panel contracting/hiding.
 * It initializes a counter and then sets up an `onEnterFrame` loop to animate
 * the `_xscale` and `_yscale` of all MovieClips inside `mask_mc` in reverse
 * compared to frame 18. It also has an `onMouseDown` handler to fast-forward
 * the animation.
 *
 * In JavaScript, this would be part of a UI component class.
 * Assumes `this` refers to the MovieClip instance, `mask_mc` is a child,
 * and it interacts with an animation loop (e.g., `requestAnimationFrame`) and event listeners.
 */
function DoAction_DefineSprite_271_frame_2() {
   // Assuming 'this' refers to the MovieClip instance.
   // Assume `mask_mc` is a child MovieClip.

   let count = 15; // Initialize counter (starting from the end state of the animation).
   let frames = 15; // Total frames for the animation (used in frame 18 as well).

   // `onEnterFrame` logic for continuous animation (contracting).
   // In JS, this would be hooked into a game loop or `requestAnimationFrame`.
   this.onEnterFrame = () => {
      count--; // Decrement frame counter.
      if (this.mask_mc) { 
         // Iterate through children of mask_mc (assuming they are MovieClips).
         for (let i in this.mask_mc) {
            if (typeof this.mask_mc[i] === "object" && this.mask_mc[i] !== null && this.mask_mc[i]._xscale !== undefined) {
               // Apply scaling animation based on a quartic ease-in function (reverse of frame 18).
               this.mask_mc[i]._xscale = 0.05925925925925926 * count * count * count * count + 100;
               this.mask_mc[i]._yscale = this.mask_mc[i]._xscale;

               if (count === 0) {
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
      count = 1; // Set count to almost complete the animation (close to 0).
      // Call the `onEnterFrame` function once to immediately apply the nearly final state.
      // The next natural `onEnterFrame` tick will then finalize it.
      if (typeof this.onEnterFrame === 'function') {
         this.onEnterFrame();
      }
   };
}

// How this might be structured in a JavaScript class (conceptual, similar to frame 18's conversion):
/*
class MaskHideAnimationComponent extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      // Assume mask_mc is a child object.
      this.mask_mc = {
         _xscale: 100, _yscale: 100,
         child1: { _xscale: 100, _yscale: 100 }, // Mock child
         child2: { _xscale: 100, _yscale: 100 }  // Mock child
      };

      this.count = 15; // Starting count for hiding animation
      this.frames = 15;

      this.initHideAnimation();
   }

   initHideAnimation() {
      this.animationFrameHandler = () => {
         this.count--;
         if (this.mask_mc) {
            for (let i in this.mask_mc) {
                const child = this.mask_mc[i];
                if (typeof child === "object" && child !== null && child._xscale !== undefined) {
                    child._xscale = 0.05925925925925926 * Math.pow(this.count, 4) + 100;
                    child._yscale = child._xscale;
                }
            }
         }

         if (this.count === 0) {
            console.log("Hide animation completed, clearing frame handler.");
            this.onEnterFrame = null;
            this.onMouseDown = null;
            return;
         }
         if (this.onEnterFrame) {
             requestAnimationFrame(this.animationFrameHandler);
         }
      };

      this.mouseHandler = () => {
         this.count = 1;
         if (this.animationFrameHandler) {
             this.animationFrameHandler();
         }
         // Assumes it also triggers a scene change
         // this.gotoAndStop("hideend"); // Example from other frames
      };

      requestAnimationFrame(this.animationFrameHandler);
      // this.element.addEventListener('mousedown', this.mouseHandler);
   }

   set onEnterFrame(callback) { this._onEnterFrameCallback = callback; if(callback) requestAnimationFrame(this.animationFrameHandler); }
   get onEnterFrame() { return this._onEnterFrameCallback; }
   set onMouseDown(callback) { this._onMouseDownCallback = callback; /* Attach event listener */ }
   get onMouseDown() { return this._onMouseDownCallback; }
}
*/