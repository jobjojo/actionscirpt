/**
 * ActionScript code for `DefineSprite_429_s_chara`, frame 1's `DoAction` script.
 * This script is for managing character MovieClips (`chara_mc`, which contains
 * `taichi_mc`, `nanaka_mc`, `youko_mc`, `miki_mc`, `kiri_mc`, `touko_mc`, `tomoki_mc`, `misato_mc`, `sakuraba_mc`).
 * It defines a `moveobj` function to update the positions and visibility of these
 * character elements for a parallax effect. It also contains logic for an introductory
 * animation where the character display scales and moves.
 *
 * In JavaScript, this would be part of a character manager or scene class.
 * It assumes `this` refers to the MovieClip instance, and it interacts with child MovieClips
 * as well as a global `control` object.
 */
function DoAction_DefineSprite_429_s_chara_frame_1() {
   // Assuming 'this' refers to the MovieClip instance (the character container).

   this.stop(); // Stop the MovieClip's timeline by default.

   // Initial properties and constants for animation.
   let sscale = 7000; // Start scale.
   let escale = 100; // End scale.
   let sx = -84.75; // Start X position.
   let ex = -100; // End X position.
   let sy = -300; // Start Y position.
   let ey = -200; // End Y position.
   const frames = 15; // Total frames for the intro animation.

   // Apply initial scale and position to the main character container.
   this._xscale = sscale;
   this._yscale = sscale;
   this._x = 350 - sx * sscale / 100;
   this._y = 200 - sy * sscale / 100;

   let count = 0; // Counter for the intro animation.

   /**
    * Moves the various character objects within this container.
    * @param {number} px - Player's X position.
    * @param {number} py - Player's Y position.
    * @param {number} r - Rotation.
    * @param {number} scale - Overall scene scale.
    * @param {boolean} changescale - True if the scale has changed and needs to be applied.
    */
   this.moveobj = function(px, py, r, scale, changescale) {
      // Calculate local scaling factors.
      let _loc2_ = -25000 / scale; // X-min for nanaka, etc.
      let _loc3_ = 45000 / scale; // X-max for youko, etc.

      // Assumes `taichi_mc` is a child MovieClip and has a `moveobj` method.
      // Other characters like nanaka_mc, youko_mc, etc., also have `moveobj`.
      if (this.taichi_mc && typeof this.taichi_mc.moveobj === 'function') {
         this.taichi_mc.moveobj(py, r, scale);
      }
      if (changescale) {
         this._xscale = scale;
         this._yscale = scale;
      }
      if (this.nanaka_mc && typeof this.nanaka_mc.moveobj === 'function') {
         this.nanaka_mc.moveobj(px, _loc2_);
      }
      if (this.youko_mc && typeof this.youko_mc.moveobj === 'function') {
         this.youko_mc.moveobj(px, py, scale, _loc2_, _loc3_);
      }
      if (this.miki_mc && typeof this.miki_mc.moveobj === 'function') {
         this.miki_mc.moveobj(px, py, scale, _loc2_, _loc3_);
      }
      if (this.kiri_mc && typeof this.kiri_mc.moveobj === 'function') {
         this.kiri_mc.moveobj(px, py, scale, _loc2_, _loc3_);
      }
      if (this.touko_mc && typeof this.touko_mc.moveobj === 'function') {
         this.touko_mc.moveobj(px, py, scale, _loc2_, _loc3_);
      }
      if (this.tomoki_mc && typeof this.tomoki_mc.moveobj === 'function') {
         this.tomoki_mc.moveobj(px, py, scale, _loc2_, _loc3_);
      }
      if (this.misato_mc && typeof this.misato_mc.moveobj === 'function') {
         this.misato_mc.moveobj(px, py, scale, _loc2_, _loc3_);
      }
      if (this.sakuraba_mc && typeof this.sakuraba_mc.moveobj === 'function') {
         this.sakuraba_mc.moveobj(px, py, scale, _loc2_, _loc3_);
      }
   };

   // `onEnterFrame` logic for the initial intro animation.
   this.onEnterFrame = () => {
      let dt = count * count / frames / frames; // Quadratic ease-in for animation progress.
      let currentScale = 1 / ((1 / escale - 1 / sscale) * dt + 1 / sscale); // Current scale (inverse linear interpolation).
      let px = (ex - sx) * dt + sx; // Current X position.
      let py = (ey - sy) * dt + sy; // Current Y position.

      // Apply calculated position and scale to the main character container.
      this._xscale = currentScale;
      this._yscale = currentScale;
      this._x = 350 - px * currentScale / 100;
      this._y = 200 - py * currentScale / 100;

      count += 1; // Increment frame counter.

      if (count > frames) {
         // Animation complete: remove the onEnterFrame listener.
         this.onEnterFrame = null;
         // Transition to the "standby" state in the main control.
         if (control && control.main && typeof control.main.gotoAndPlay === 'function') {
            control.main.gotoAndPlay("standby");
         }
      }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class CharacterManager extends MovieClip { // Assuming MovieClip base, and s_chara extends GamePauseClip
   constructor() {
      super();
      this.stop();

      // Mock child MovieClips with moveobj methods
      this.taichi_mc = { moveobj: (py, r, s) => console.log('taichi_mc moveobj') };
      this.nanaka_mc = { moveobj: (px, xmin) => console.log('nanaka_mc moveobj') };
      // ... similar mocks for other character MCs

      this.sscale = 7000;
      this.escale = 100;
      this.sx = -84.75;
      this.ex = -100;
      this.sy = -300;
      this.ey = -200;
      this.frames = 15;

      // Initial application of scale/position
      this._xscale = this.sscale;
      this._yscale = this.sscale;
      this._x = 350 - this.sx * this.sscale / 100;
      this._y = 200 - this.sy * this.sscale / 100;

      // External control object
      window.control = window.control || {
         main: { gotoAndPlay: (f) => console.log(`main gotoAndPlay: ${f}`) }
      };

      this.startIntroAnimation();
   }

   moveobj(px, py, r, scale, changescale) {
      const loc2 = -25000 / scale;
      const loc3 = 45000 / scale;

      if (this.taichi_mc) this.taichi_mc.moveobj(py, r, scale);
      if (changescale) {
         this._xscale = scale;
         this._yscale = scale;
      }
      if (this.nanaka_mc) this.nanaka_mc.moveobj(px, loc2);
      if (this.youko_mc) this.youko_mc.moveobj(px, py, scale, loc2, loc3);
      // ... and so on for all character MovieClips
   }

   startIntroAnimation() {
      let count = 0;
      const animateFrame = () => {
         const dt = Math.pow(count / this.frames, 2);
         const currentScale = 1 / ((1 / this.escale - 1 / this.sscale) * dt + 1 / this.sscale);
         const px = (this.ex - this.sx) * dt + this.sx;
         const py = (this.ey - this.sy) * dt + this.sy;

         this._xscale = currentScale;
         this._yscale = currentScale;
         this._x = 350 - px * currentScale / 100;
         this._y = 200 - py * currentScale / 100;

         count++;

         if (count > this.frames) {
            this.onEnterFrame = null; // End animation loop
            if (window.control && window.control.main) {
               window.control.main.gotoAndPlay("standby");
            }
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