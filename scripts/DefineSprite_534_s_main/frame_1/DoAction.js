/**
 * ActionScript code for `DefineSprite_534_s_main`, frame 1's `DoAction` script.
 * This script defines several core functions for the main game scene or interface:
 * - `backeffect(effect, param)`: Triggers a background visual effect.
 * - `moveobj(px, py, r, scale, changescale)`: Moves various game objects (character, background)
 * based on player position and scene scale.
 * - `changecolor(color)`: Applies a color transform to `out_mc.taichi_mc`.
 * - `viewscore(px, py, breakscore, vx, vy)`: Updates and displays various scores (player position, best record, speed).
 * - `gameover()`: Handles the game over sequence, including score animation and sound fading.
 * It also initializes the scene by stopping the timeline, playing all paused clips,
 * setting initial states for character and background, and initializing sound.
 *
 * In JavaScript, these would be methods of the `s_main` class (which extends `GamePauseClip`).
 * It assumes `this` refers to the `s_main` MovieClip instance, and it interacts with
 * `control` (GameControl object), `chara_mc`, `back_mc`, `out_mc`, `highscore_mc`, `score_mc`,
 * `speed_mc`, `specialchara_mc`, `menu_mc` (child MovieClips/objects), `Sound` class, and internal properties.
 */
function DoAction_DefineSprite_534_s_main_frame_1() {
   // Assuming 'this' refers to the s_main MovieClip instance.

   this.stop(); // Stop the MovieClip's timeline by default.

   // Initial scene setup.
   // Assumes `allpauseplay()` is a method available on 'this' (from GamePauseClip).
   if (typeof this.allpauseplay === 'function') {
      this.allpauseplay(); // Play all paused MovieClips.
   }

   // Set initial states for child MovieClips.
   // Assumes `chara_mc` and `back_mc` are child MovieClips with `gotoAndStop` methods.
   if (this.chara_mc) { this.chara_mc.gotoAndStop("stop"); }
   if (this.back_mc) {
      this.back_mc.gotoAndStop("stop");
      this.back_mc._visible = true; // Ensure background is visible.
   }

   // Delete any existing `onEnterFrame` listener.
   this.onEnterFrame = null;

   // Initialize global sound volume.
   // Assumes `Sound` can be instantiated and `setVolume` exists.
   // `new Sound(this)` would typically refer to a sound instance associated with this MovieClip.
   new Sound(this).setVolume(100); // Conceptual Sound class.


   // Properties for effects and scaling.
   let effectparam; // Parameter for background effect.
   let scale; // Current scene scale.

   /**
    * Triggers a background visual effect.
    * @param {string} effect - The name of the effect (e.g., "misato", "combo").
    * @param {*} param - A parameter for the effect.
    */
   this.backeffect = function(effect, param) {
      this.effectparam = param;
      if (typeof this.gotoAndPlay === 'function') {
         this.gotoAndPlay(effect); // Play to the frame corresponding to the effect.
      }
   };

   /**
    * Moves various game objects for parallax/scene adjustment.
    * @param {number} px - Player's X position.
    * @param {number} py - Player's Y position.
    * @param {number} r - Rotation.
    * @param {number} scale - Overall scene scale.
    * @param {boolean} changescale - True if the scale has changed and needs to be applied.
    */
   this.moveobj = function(px, py, r, scale, changescale) {
      // Assumes `chara_mc` and `back_mc` are child MovieClips with `moveobj` methods.
      if (this.chara_mc && typeof this.chara_mc.moveobj === 'function') {
         this.chara_mc.moveobj(px, py, r, scale, changescale);
      }
      if (this.back_mc && typeof this.back_mc.moveobj === 'function') {
         this.back_mc.moveobj((-px) * 150, scale, changescale); // Background moves opposite to player.
      }
      this.scale = scale; // Update internal `scale` property.
   };

   /**
    * Applies a color transformation to `out_mc.taichi_mc`.
    * @param {object} color - The color transformation object.
    */
   this.changecolor = function(color) {
      // Assumes `out_mc.taichi_mc` exists and `Color` class is available.
      if (this.out_mc && this.out_mc.taichi_mc && typeof Color !== 'undefined') {
         new Color(this.out_mc.taichi_mc).setTransform(color);
      }
   };

   /**
    * Updates and displays various scores.
    * @param {number} px - Player's X position (for score).
    * @param {number} py - Player's Y position (for height display).
    * @param {boolean} breakscore - True if best score was broken.
    * @param {number} vx - X velocity (for speed display).
    * @param {number} vy - Y velocity (for speed display).
    */
   this.viewscore = function(px, py, breakscore, vx, vy) {
      // Assumes `out_mc`, `highscore_mc`, `score_mc`, `speed_mc`, `specialchara_mc`
      // are child MovieClips/objects with `view` or `init` methods.
      if (this.out_mc && typeof this.out_mc.view === 'function') {
         this.out_mc.view(py); // Update height display.
      }
      if (this.highscore_mc && this.score_mc && typeof this.highscore_mc.view === 'function' && typeof this.score_mc.view === 'function') {
         // Update high score and main score.
         this.highscore_mc.view(this.score_mc.view(px, breakscore));
      }
      if (this.speed_mc && typeof this.speed_mc.view === 'function') {
         this.speed_mc.view(vx, vy); // Update speed display.
      }
      if (this.specialchara_mc && typeof this.specialchara_mc.view === 'function') {
         this.specialchara_mc.view(); // Update special character display.
      }
   };

   /**
    * Handles the game over sequence.
    */
   this.gameover = function() {
      // Game over for menu.
      if (this.menu_mc && typeof this.menu_mc.gameover === 'function') {
         this.menu_mc.gameover();
      }
      // Animate score display.
      // Assumes `score_mc` is a child MovieClip with `count` and `onEnterFrame` properties.
      if (this.score_mc) {
         this.score_mc.count = 0; // Reset counter for score animation.
         this.score_mc.onEnterFrame = () => { // Use arrow function to preserve 'this' context.
            this.score_mc.count++;
            // Scale and position animation for score_mc.
            this.score_mc._xscale = 100 + 100 * this.score_mc.count / 10;
            this.score_mc._yscale = 100 + 100 * this.score_mc.count / 10;
            this.score_mc._x = -87.5 * this.score_mc.count / 10 + 687.5;
            this.score_mc._y = 159.4 * this.score_mc.count / 10 + 25.6;

            if (this.score_mc.count >= 10) {
               this.score_mc.onEnterFrame = null; // Animation complete.
            }
         };
      }
      // Fade out background music.
      // Assumes `mysound` (a new Sound instance here) has `setVolume` and `getVolume` methods.
      const mysound = new Sound(this); // Conceptual Sound instance.
      this.onEnterFrame = () => { // Use arrow function for game over sound fade.
         if (mysound && typeof mysound.getVolume === 'function' && typeof mysound.setVolume === 'function') {
            mysound.setVolume(Math.max(mysound.getVolume() - 1, 0));
            if (mysound.getVolume() <= 0) {
               this.onEnterFrame = null; // Fade complete.
            }
         }
      };
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class MainGameScene extends GamePauseClip { // Extending GamePauseClip as per previous conversion
   constructor() {
      super();
      this.stop();

      // Mock child MovieClips/objects
      this.chara_mc = { gotoAndStop: (f) => console.log(`chara_mc gotoAndStop: ${f}`), moveobj: () => {} };
      this.back_mc = { gotoAndStop: (f) => console.log(`back_mc gotoAndStop: ${f}`), _visible: true, moveobj: () => {} };
      this.out_mc = { view: () => {} };
      this.highscore_mc = { view: () => {}, init: null };
      this.score_mc = { view: () => {}, count: 0, _xscale: 100, _yscale: 100, _x: 0, _y: 0, onEnterFrame: null };
      this.speed_mc = { view: () => {} };
      this.specialchara_mc = { view: () => {} };
      this.menu_mc = { gameover: () => {} };

      // External `control` object
      window.control = window.control || { /* ... properties from GameControl ... * / };

      this.effectparam = null;
      this.scale = 0; // Initial scale

      this.onFrame1Action(); // Mimic AS execution
   }

   onFrame1Action() {
      this.allpauseplay();
      if (this.chara_mc) this.chara_mc.gotoAndStop("stop");
      if (this.back_mc) {
         this.back_mc.gotoAndStop("stop");
         this.back_mc._visible = true;
      }
      this.onEnterFrame = null; // Clear any default onEnterFrame

      const bgmSoundMock = new MockSound(this); // Conceptual Sound
      bgmSoundMock.setVolume(100);

      // Bind specific elements to control (if they are children of s_main)
      if (this.special_mc) window.control.special = this.special_mc;
      if (this.menu_mc) { // Assuming menu_mc's 'btn' property refers to 'this.menu_mc'
         if (this.special_mc) this.special_mc.btn = this.menu_mc;
         if (this.meter_mc) this.meter_mc.btn = this.menu_mc;
         if (this.aerial_mc) this.aerial_mc.btn = this.menu_mc;
      }
      if (this.contact) window.control.contact = this.contact_mc; // Assuming this.contact_mc exists
      if (this.aerial_mc) window.control.aerial = this.aerial_mc;
      if (this.speed_mc) window.control.speed = this.speed_mc;
      if (this.chara_mc) this.chara_mc.gotoAndPlay("standby"); // This is from frame_2's DoAction.txt
      if (this.back_mc) this.back_mc.gotoAndPlay("standby"); // This is from frame_2's DoAction.txt
   }

   backeffect(effect, param) {
      this.effectparam = param;
      this.gotoAndPlay(effect);
   }

   moveobj(px, py, r, scale, changescale) {
      if (this.chara_mc) this.chara_mc.moveobj(px, py, r, scale, changescale);
      if (this.back_mc) this.back_mc.moveobj((-px) * 150, scale, changescale);
      this.scale = scale;
   }

   changecolor(color) {
      if (this.out_mc && this.out_mc.taichi_mc && window.Color) {
         new window.Color(this.out_mc.taichi_mc).setTransform(color);
      }
   }

   viewscore(px, py, breakscore, vx, vy) {
      if (this.out_mc) this.out_mc.view(py);
      if (this.highscore_mc && this.score_mc) {
         this.highscore_mc.view(this.score_mc.view(px, breakscore));
      }
      if (this.speed_mc) this.speed_mc.view(vx, vy);
      if (this.specialchara_mc) this.specialchara_mc.view();
   }

   gameover() {
      if (this.menu_mc) this.menu_mc.gameover();
      if (this.score_mc) {
         this.score_mc.count = 0;
         const animateScore = () => {
            this.score_mc.count++;
            this.score_mc._xscale = 100 + 100 * this.score_mc.count / 10;
            this.score_mc._yscale = 100 + 100 * this.score_mc.count / 10;
            this.score_mc._x = -87.5 * this.score_mc.count / 10 + 687.5;
            this.score_mc._y = 159.4 * this.score_mc.count / 10 + 25.6;

            if (this.score_mc.count >= 10) {
               this.score_mc.onEnterFrame = null;
            } else {
               requestAnimationFrame(animateScore);
            }
         };
         this.score_mc.onEnterFrame = animateScore; // Assign for external loop
         requestAnimationFrame(animateScore); // Start JS loop
      }

      const mysound = new MockSound(this);
      const fadeSound = () => {
         if (mysound.getVolume() > 0) {
            mysound.setVolume(Math.max(mysound.getVolume() - 1, 0));
            requestAnimationFrame(fadeSound);
         } else {
            this.onEnterFrame = null; // Clear this specific onEnterFrame
         }
      };
      this.onEnterFrame = fadeSound; // This overwrites any previous onEnterFrame, so order matters.
      requestAnimationFrame(fadeSound); // Start JS loop
   }

   // Define onEnterFrame setter/getter to emulate AS behavior
   set onEnterFrame(callback) { this._onEnterFrameCallback = callback; }
   get onEnterFrame() { return this._onEnterFrameCallback; }
}

// Mock Sound class
// class MockSound {
//    constructor(source) { console.log("Mock Sound created for", source); this.volume = 100; }
//    setVolume(vol) { this.volume = vol; console.log("Setting volume to", vol); }
//    getVolume() { return this.volume; }
//    stop() { console.log("Stopping sound"); }
//    start() { console.log("Starting sound"); }
// }

// Mock Color class
// class Color {
//    constructor(target) { this.target = target; }
//    getTransform() { return { ra:100, rb:0, ga:100, gb:0, ba:100, bb:0, aa:100, ab:0 }; }
//    setTransform(transform) { console.log("Applying color transform:", transform); }
// }
*/