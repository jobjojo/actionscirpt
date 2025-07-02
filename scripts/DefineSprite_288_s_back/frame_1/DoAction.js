/**
 * ActionScript code for `DefineSprite_288_s_back`, frame 1's `DoAction` script.
 * This script is for managing background elements like trees, rails, mountains, and clouds.
 * It defines a `moveobj` function to update the position and scale of these elements
 * for a parallax effect. It also contains logic for an introductory animation where
 * the background scales and moves.
 *
 * In JavaScript, this would be part of a background manager class for a game scene.
 * It assumes `this` refers to the MovieClip instance, and it interacts with child MovieClips
 * like `tree_mc`, `rail_mc`, `mount_mc`, `cloud1_mc`, `cloud2_mc`.
 */
function DoAction_DefineSprite_288_s_back_frame_1() {
   // Assuming 'this' refers to the MovieClip instance (the background container).

   this.stop(); // Stop the MovieClip's timeline by default.

   // Initial properties and constants for animation.
   let sscale = 7000; // Start scale.
   let escale = 100; // End scale.
   let sx = -84.75 - 100 / (sscale / 100); // Start X position.
   let ex = -200; // End X position.
   let sy = 300 + -200 / (sscale / 100); // Start Y position.
   let ey = 0; // End Y position.
   const frames = 15; // Total frames for the intro animation.

   // Initialize child elements' positions and scales.
   // Assumes `tree_mc`, `rail_mc`, `cloud1_mc`, `cloud2_mc` are child MovieClips
   // and have `moveobj` methods.
   if (this.tree_mc && typeof this.tree_mc.moveobj === 'function') {
      this.tree_mc.moveobj(-sx, sy / 150, sscale, true);
   }
   if (this.rail_mc && typeof this.rail_mc.moveobj === 'function') {
      this.rail_mc.moveobj(-sx, sy / 150, sscale, true); // Note: original used 'scale', assuming 'sscale' is intended here for initial
   }
   if (this.cloud1_mc && typeof this.cloud1_mc.moveobj === 'function') {
      this.cloud1_mc.moveobj(-sx);
   }
   if (this.cloud2_mc && typeof this.cloud2_mc.moveobj === 'function') {
      this.cloud2_mc.moveobj(-sx);
   }

   let count = 0; // Counter for the intro animation.

   /**
    * Moves the various background objects (trees, rails, mountains, clouds).
    * @param {number} ppx - Player's X position.
    * @param {number} scale - Overall scene scale.
    * @param {boolean} scalechange - True if the scale has changed and needs to be applied.
    */
   this.moveobj = function(ppx, scale, scalechange) {
      // Assuming child MovieClips have their own `moveobj` methods.
      // And `mount_mc` is a child MovieClip with a `moveobj` method taking different parameters.
      if (this.tree_mc && typeof this.tree_mc.moveobj === 'function') {
         this.tree_mc.moveobj(ppx, 0, scale, scalechange);
      }
      if (this.rail_mc && typeof this.rail_mc.moveobj === 'function') {
         this.rail_mc.moveobj(ppx, 0, scale, scalechange);
      }
      if (this.mount_mc && typeof this.mount_mc.moveobj === 'function') {
         this.mount_mc.moveobj(ppx, scale, scalechange);
      }
      if (this.cloud1_mc && typeof this.cloud1_mc.moveobj === 'function') {
         this.cloud1_mc.moveobj(ppx);
      }
      if (this.cloud2_mc && typeof this.cloud2_mc.moveobj === 'function') {
         this.cloud2_mc.moveobj(ppx);
      }
   };


   // `onEnterFrame` logic for the initial intro animation.
   this.onEnterFrame = () => {
      let dt = count * count / frames / frames; // Quadratic ease-in for animation progress.
      let px = (ex - sx) * dt + sx; // Current X position.
      let py = (ey - sy) * dt + sy; // Current Y position.
      let currentScale = 1 / ((1 / escale - 1 / sscale) * dt + 1 / sscale); // Current scale (inverse linear interpolation).

      // Apply calculated position and scale to the main background container.
      this._xscale = currentScale;
      this._yscale = currentScale;
      this._x = 350 - px * currentScale / 100; // Position adjusted by scale.
      this._y = 200 - py * currentScale / 100; // Position adjusted by scale.

      // Update child elements with the new position and scale.
      // `moveobj` on children might take relative or absolute positions.
      // Here, it seems to be relative to the scene's `px` and `py`.
      if (this.tree_mc && typeof this.tree_mc.moveobj === 'function') {
         this.tree_mc.moveobj(-px, py / 150, currentScale, true);
      }
      if (this.rail_mc && typeof this.rail_mc.moveobj === 'function') {
         this.rail_mc.moveobj(-px, py / 150, currentScale, true);
      }

      count++; // Increment frame counter.

      if (count > frames) {
         // Animation complete: remove the onEnterFrame listener.
         this.onEnterFrame = null;
      }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class BackgroundManager extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      // Child elements mock
      this.tree_mc = { moveobj: (px, py, s, sc) => console.log(`Tree moved to ${px},${py} scaled ${s}`) };
      this.rail_mc = { moveobj: (px, py, s, sc) => console.log(`Rail moved to ${px},${py} scaled ${s}`) };
      this.mount_mc = { moveobj: (px, s, sc) => console.log(`Mount moved to ${px} scaled ${s}`) };
      this.cloud1_mc = { moveobj: (px) => console.log(`Cloud1 moved to ${px}`) };
      this.cloud2_mc = { moveobj: (px) => console.log(`Cloud2 moved to ${px}`) };

      this.sscale = 7000;
      this.escale = 100;
      this.sx = -84.75 - 100 / (this.sscale / 100);
      this.ex = -200;
      this.sy = 300 + -200 / (this.sscale / 100);
      this.ey = 0;
      this.frames = 15;

      this.initBackgroundElements();
      this.startIntroAnimation();
   }

   initBackgroundElements() {
      if (this.tree_mc) this.tree_mc.moveobj(-this.sx, this.sy / 150, this.sscale, true);
      if (this.rail_mc) this.rail_mc.moveobj(-this.sx, this.sy / 150, this.sscale, true);
      if (this.cloud1_mc) this.cloud1_mc.moveobj(-this.sx);
      if (this.cloud2_mc) this.cloud2_mc.moveobj(-this.sx);
   }

   moveobj(ppx, scale, scalechange) {
      if (this.tree_mc) this.tree_mc.moveobj(ppx, 0, scale, scalechange);
      if (this.rail_mc) this.rail_mc.moveobj(ppx, 0, scale, scalechange);
      if (this.mount_mc) this.mount_mc.moveobj(ppx, scale, scalechange);
      if (this.cloud1_mc) this.cloud1_mc.moveobj(ppx);
      if (this.cloud2_mc) this.cloud2_mc.moveobj(ppx);
   }

   startIntroAnimation() {
      let count = 0;
      const animateFrame = () => {
         const dt = Math.pow(count / this.frames, 2);
         const px = (this.ex - this.sx) * dt + this.sx;
         const py = (this.ey - this.sy) * dt + this.sy;
         const currentScale = 1 / ((1 / this.escale - 1 / this.sscale) * dt + 1 / this.sscale);

         this._xscale = currentScale;
         this._yscale = currentScale;
         this._x = 350 - px * currentScale / 100;
         this._y = 200 - py * currentScale / 100;

         if (this.tree_mc) this.tree_mc.moveobj(-px, py / 150, currentScale, true);
         if (this.rail_mc) this.rail_mc.moveobj(-px, py / 150, currentScale, true);

         count++;

         if (count > this.frames) {
            this.onEnterFrame = null; // End animation loop
         } else {
            requestAnimationFrame(animateFrame);
         }
      };
      this.onEnterFrame = animateFrame; // Assign to property, assuming external loop calls this
      requestAnimationFrame(animateFrame); // Start the JS animation loop
   }

   // Define onEnterFrame setter/getter to emulate AS behavior
   set onEnterFrame(callback) { this._onEnterFrameCallback = callback; }
   get onEnterFrame() { return this._onEnterFrameCallback; }
}
*/