/**
 * ActionScript code for `DefineSprite_273`, frame 15's `DoAction` script.
 * This script is executed to initiate a scene transition after the main menu
 * or intro. It stops several UI elements, disables buttons, prepares an animation
 * for a "start" MovieClip, and then triggers a scene change via `changer`.
 *
 * In JavaScript, this would be part of a scene manager or transition controller.
 * It assumes `this` refers to the MovieClip instance, and it interacts with
 * `start_mc`, `start_btn`, `quality_mc`, `sound_mc`, `changer`, `Sound`, and `control`.
 */
function DoAction_DefineSprite_273_frame_15() {
   // Assuming 'this' refers to the MovieClip instance (the scene container).

   this.stop(); // Stop the MovieClip's timeline.

   // Stop and hide various UI elements.
   if (this.start_mc) {
      if (typeof this.start_mc.stop === 'function') {
         this.start_mc.stop();
      }
   }
   if (this.start_btn) {
      this.start_btn._visible = false;
   }
   if (this.quality_mc && typeof this.quality_mc.viewstop === 'function') {
      this.quality_mc.viewstop(); // Stop quality text animation/updates.
   }
   if (this.sound_mc && typeof this.sound_mc.viewstop === 'function') {
      this.sound_mc.viewstop(); // Stop sound text animation/updates.
   }

   // Disable all UI elements using a method on 'this'.
   if (typeof this.allenabled === 'function') {
      this.allenabled(false);
   }

   // Animation parameters for `start_mc`.
   const frames = 20; // Total frames for this animation.
   let vy = (-this.start_mc._y) / frames; // Vertical velocity.
   let count = 0; // Animation frame counter.

   // Position and scale parameters for `start_mc` animation.
   const pt = 47; // Point parameter (likely pivot or reference point).
   let sx = this._x + this.start_mc._x + this.start_mc._xscale / 100 * pt;
   const ex = 350; // Target X position.
   const vs = 1.26; // Velocity scale for X-axis.

   // Trigger scene change.
   // Assumes `changer` is a child MovieClip or accessible object with `changescene` method.
   // And `Sound` can be instantiated.
   if (this.changer && typeof this.changer.changescene === 'function') {
      // `new Sound(this)` is a conceptual sound instance.
      this.changer.changescene("start", new Sound(this)); // conceptual Sound.
   }

   // `onEnterFrame` logic for animating `start_mc`.
   // In JS, this would be hooked into a game loop or `requestAnimationFrame`.
   if (this.start_mc) { // Ensure start_mc exists before assigning to its onEnterFrame
      this.start_mc.onEnterFrame = () => { // Use arrow function to preserve 'this' context.
         count++;
         // Scale animation.
         this.start_mc._xscale *= vs;
         this.start_mc._yscale *= vs;

         // X position animation (parabolic-like motion).
         this.start_mc._x = (ex - sx) * count * count / frames / frames + sx - this._x - this.start_mc._xscale / 100 * pt;
         // Y position animation (linear motion).
         this.start_mc._y += vy;

         if (count >= frames) {
            // Animation complete: remove the onEnterFrame listener.
            this.start_mc.onEnterFrame = null;
         }
      };
   }
}

// How this might be structured in a JavaScript class (conceptual):
/*
class SceneTransitionManager extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      // Assume child MovieClips/objects are initialized
      this.start_mc = { _y: 0, _x: 0, _xscale: 100, _yscale: 100, stop: () => console.log("start_mc stopped") }; // Mock
      this.start_btn = { _visible: true }; // Mock
      this.quality_mc = { viewstop: () => console.log("quality_mc view stopped") }; // Mock
      this.sound_mc = { viewstop: () => console.log("sound_mc view stopped") }; // Mock
      this.changer = { changescene: (scene, sound) => console.log(`Changing scene to ${scene}`) }; // Mock
      // this.allenabled = (enable) => console.log(`All enabled: ${enable}`); // Mock method from parent
   }

   startTransition() {
      this.stop();

      if (this.start_mc) {
         this.start_mc.stop();
      }
      if (this.start_btn) {
         this.start_btn._visible = false;
      }
      if (this.quality_mc) {
         this.quality_mc.viewstop();
      }
      if (this.sound_mc) {
         this.sound_mc.viewstop();
      }
      if (typeof this.allenabled === 'function') {
         this.allenabled(false);
      }

      const frames = 20;
      let vy = (-this.start_mc._y) / frames;
      let count = 0;
      const pt = 47;
      let sx = this._x + this.start_mc._x + this.start_mc._xscale / 100 * pt;
      const ex = 350;
      const vs = 1.26;

      if (this.changer) {
         this.changer.changescene("start", new MockSound(this)); // Use a mock Sound
      }

      if (this.start_mc) {
         const animateStartMc = () => {
            count++;
            this.start_mc._xscale *= vs;
            this.start_mc._yscale *= vs;
            this.start_mc._x = (ex - sx) * Math.pow(count / frames, 2) + sx - this._x - this.start_mc._xscale / 100 * pt;
            this.start_mc._y += vy;

            if (count >= frames) {
               this.start_mc.onEnterFrame = null;
            } else {
               requestAnimationFrame(animateStartMc);
            }
         };
         requestAnimationFrame(animateStartMc); // Start the animation loop
      }
   }
}

// Mock Sound class if needed for conceptual conversion.
// class MockSound {
//    constructor(source) { console.log("MockSound created for", source); }
//    // Add mock methods if they are called (e.g., play, stop, setVolume)
// }
*/