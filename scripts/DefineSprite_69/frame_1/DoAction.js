/**
 * ActionScript code for `DefineSprite_69`, frame 1's `DoAction` script.
 * This script defines functions for a sound control UI element (e.g., a mute/unmute button).
 * It includes:
 * - `init()`: Initializes the visual state of the button based on global sound volume.
 * - `viewin(target_mc)`: Makes a target MovieClip visible.
 * - `viewout(target_mc)`: Creates a duplicate of a MovieClip, animates it out,
 * and makes the original invisible. This creates a "fly-out" effect for the button.
 * - `viewstart()`: Sets up an `onEnterFrame` loop to monitor global sound volume
 * and trigger the `viewout`/`viewin` animations when the volume state changes.
 * - `viewstop()`: Clears the `onEnterFrame` listener from `viewstart`.
 * It also initializes internal properties and calls `init()` and `viewstart()`.
 *
 * In JavaScript, these would be methods of a sound control UI component class.
 * It assumes `this` refers to the `DefineSprite_69` MovieClip instance, and it interacts with
 * `control` (GameControl object), `on_mc`, `off_mc` (child MovieClips for on/off states),
 * `MovieClip` class (for duplication), and global `getTimer()`.
 */
function DoAction_DefineSprite_69_frame_1() {
   // Assuming 'this' refers to the MovieClip instance of the sound control.

   this.stop(); // Stop the MovieClip's timeline by default.

   // Internal state properties.
   let currentmode; // Tracks the current sound mode (true for on, false for off).
   let depth = 0; // For managing duplicated MovieClip depth.


   /**
    * Initializes the visual state of the sound button based on global sound volume.
    */
   this.init = function() {
      // Assumes `control` has `globalsound` property with `getVolume()` method.
      if (typeof control !== 'undefined' && control.globalsound && typeof control.globalsound.getVolume === 'function') {
         if (control.globalsound.getVolume() === 0) {
            // Sound is off.
            if (this.on_mc) { this.on_mc._visible = false; }
            if (this.off_mc) { this.off_mc._visible = true; }
            currentmode = false;
         } else {
            // Sound is on.
            if (this.on_mc) { this.on_mc._visible = true; }
            if (this.off_mc) { this.off_mc._visible = false; }
            currentmode = true;
         }
      }
   };

   /**
    * Makes a target MovieClip visible.
    * @param {MovieClip} target_mc - The MovieClip to make visible.
    */
   this.viewin = function(target_mc) {
      if (target_mc) {
         target_mc._visible = true;
      }
   };

   /**
    * Creates a duplicate of a MovieClip, animates it out, and hides the original.
    * @param {MovieClip} target_mc - The MovieClip to animate out.
    */
   this.viewout = function(target_mc) {
      if (!target_mc) return;

      depth = (depth + 1) % 100; // Cycle depth for duplicated clips.
      // `duplicateMovieClip` creates a new instance on the stage.
      // In JS, this would involve creating a new display object and adding it to the scene.
      // Assumes `target_mc.duplicateMovieClip` exists.
      let copy_mc = null;
      if (typeof target_mc.duplicateMovieClip === 'function') {
          copy_mc = target_mc.duplicateMovieClip(getTimer(), depth); // Conceptual `MovieClip.duplicateMovieClip`
      }
      target_mc._visible = false; // Hide original.

      if (copy_mc) {
          // Iterate through properties of the copied MovieClip.
          // This assumes the copy contains nested MovieClips (e.g., visual parts of the button).
          for (let i in copy_mc) {
              // Check if it's a MovieClip instance (conceptual).
              if (typeof copy_mc[i] === "object" && copy_mc[i] !== null && copy_mc[i].px !== undefined) {
                  const clipPart = copy_mc[i];
                  // Store initial position if not already set.
                  if (clipPart.px === null || clipPart.py === undefined) {
                      clipPart.px = clipPart._x;
                      clipPart.py = clipPart._y;
                  }
                  clipPart._rotation = 0;
                  clipPart.r = Math.random() * 20; // Random rotation speed.
                  clipPart._x = clipPart.px;
                  clipPart._y = clipPart.py;
                  clipPart.orgscale = clipPart._yscale;
                  clipPart.count = 0;

                  // `onEnterFrame` for animating the duplicated part.
                  clipPart.onEnterFrame = () => { // Use arrow function to preserve 'this' context.
                      clipPart.count++;
                      // Animate position and scale outwards.
                      clipPart._x = clipPart.px + clipPart.px * clipPart.count / 30;
                      clipPart._y = clipPart.py + clipPart.count * clipPart.count / 3;
                      clipPart._rotation = clipPart.r * clipPart.count;
                      clipPart._xscale = (1 + clipPart.count / 30) * clipPart.orgscale;
                      clipPart._yscale = clipPart._xscale;

                      if (clipPart._y >= 200) {
                          // Animation complete: reset properties and remove the MovieClip.
                          clipPart._xscale = 100;
                          clipPart._yscale = 100;
                          clipPart._rotation = 0;
                          clipPart._x = clipPart.px;
                          clipPart._y = clipPart.py;
                          clipPart.onEnterFrame = null; // Clear listener.
                          // Remove the duplicated MovieClip from its parent.
                          if (clipPart._parent && typeof clipPart._parent.removeMovieClip === 'function') {
                              clipPart._parent.removeMovieClip();
                          }
                      }
                  };
              }
          }
      }
   };

   /**
    * Sets up an `onEnterFrame` loop to monitor global sound volume changes.
    */
   this.viewstart = function() {
      // `onEnterFrame` logic for monitoring sound changes.
      this.onEnterFrame = () => { // Use arrow function to preserve 'this' context.
         // Check if global sound volume state has changed.
         // Assumes `control` has `globalsound` property with `getVolume()` method.
         if (typeof control !== 'undefined' && control.globalsound && typeof control.globalsound.getVolume === 'function') {
            if ((control.globalsound.getVolume() !== 0) !== currentmode) { // If global volume state is different from currentmode
               currentmode = !currentmode; // Toggle current mode.
               if (typeof this.gotoAndPlay === 'function') {
                  this.gotoAndPlay("change"); // Play "change" animation.
               }
               // Trigger viewout/viewin based on the new mode.
               if (currentmode) { // Sound is now ON.
                  this.viewout(this.off_mc);
                  this.viewin(this.on_mc);
               } else { // Sound is now OFF.
                  this.viewout(this.on_mc);
                  this.viewin(this.off_mc);
               }
            }
         }
      };
   };

   /**
    * Clears the `onEnterFrame` listener from `viewstart`, stopping sound monitoring.
    */
   this.viewstop = function() {
      this.onEnterFrame = null; // Or `delete this.onEnterFrame;`
   };

   // Initial calls to setup the sound control.
   this.init(); // Initialize visual state.
   this.viewstart(); // Start monitoring sound changes.
}

// How this might be structured in a JavaScript class (conceptual):
/*
class SoundControlUI extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      // Mock child MovieClips for on/off states
      this.on_mc = { _visible: false };
      this.off_mc = { _visible: false };

      // Internal state properties
      this.currentmode = false;
      this.depth = 0;

      // External `control` object
      window.control = window.control || {
          globalsound: { getVolume: () => 100 } // Mock initial volume
      };
      window.getTimer = () => performance.now(); // Mock getTimer

      this.init(); // Call init directly
      this.viewstart(); // Call viewstart directly
   }

   init() {
      if (window.control && window.control.globalsound) {
         if (window.control.globalsound.getVolume() === 0) {
            if (this.on_mc) this.on_mc._visible = false;
            if (this.off_mc) this.off_mc._visible = true;
            this.currentmode = false;
         } else {
            if (this.on_mc) this.on_mc._visible = true;
            if (this.off_mc) this.off_mc._visible = false;
            this.currentmode = true;
         }
      }
   }

   viewin(target_mc) {
      if (target_mc) target_mc._visible = true;
   }

   viewout(target_mc) {
      if (!target_mc) return;
      this.depth = (this.depth + 1) % 100;

      // In a real JS game, you'd create a new display object here
      // and animate it, then remove.
      // Mocking duplicateMovieClip and its properties
      const copy_mc = { // Mock MovieClip properties
        px: 0, py: 0, _x: 0, _y: 0, _rotation: 0, r: 0, orgscale: 100, count: 0,
        _xscale: 100, _yscale: 100, _parent: { removeMovieClip: () => console.log("Removed mock clip") }
      }; // Simplified mock for demo
      // Assuming nested parts within the mock copy_mc.
      copy_mc[0] = { // Mock child part
        px: target_mc._x, py: target_mc._y, _x: target_mc._x, _y: target_mc._y, _rotation: 0,
        r: Math.random() * 20, orgscale: target_mc._yscale, count: 0, _xscale: 100, _yscale: 100,
        _parent: copy_mc._parent
      };

      target_mc._visible = false;

      // This part would be animated using requestAnimationFrame in JS
      const animateCopy = () => {
        const clipPart = copy_mc[0]; // Assuming one animated child part
        if (clipPart) {
          clipPart.count++;
          clipPart._x = clipPart.px + clipPart.px * clipPart.count / 30;
          clipPart._y = clipPart.py + clipPart.count * clipPart.count / 3;
          clipPart._rotation = clipPart.r * clipPart.count;
          clipPart._xscale = (1 + clipPart.count / 30) * clipPart.orgscale;
          clipPart._yscale = clipPart._xscale;

          if (clipPart._y >= 200) {
            clipPart._xscale = 100; clipPart._yscale = 100; clipPart._rotation = 0;
            clipPart._x = clipPart.px; clipPart._y = clipPart.py;
            // End of this specific part's animation
            if (clipPart._parent) clipPart._parent.removeMovieClip();
            return; // Stop animation for this part
          }
        }
        requestAnimationFrame(animateCopy);
      };
      requestAnimationFrame(animateCopy); // Start animation for mock copy
   }

   viewstart() {
      const monitorSoundChange = () => {
         if (window.control && window.control.globalsound) {
            const currentVolumeIsZero = (window.control.globalsound.getVolume() === 0);
            if (currentVolumeIsZero !== this.currentmode) {
               this.currentmode = !this.currentmode;
               if (typeof this.gotoAndPlay === 'function') this.gotoAndPlay("change");
               if (this.currentmode) { // Sound just turned ON
                  this.viewout(this.off_mc);
                  this.viewin(this.on_mc);
               } else { // Sound just turned OFF
                  this.viewout(this.on_mc);
                  this.viewin(this.off_mc);
               }
            }
         }
         if (this.onEnterFrame) { // Continue if not stopped
             requestAnimationFrame(monitorSoundChange);
         }
      };
      this.onEnterFrame = monitorSoundChange; // Assign property for external loop
      requestAnimationFrame(monitorSoundChange); // Start the JS monitoring loop
   }

   viewstop() {
      this.onEnterFrame = null; // Stop the animation loop
   }

   // Define onEnterFrame setter/getter to emulate AS behavior
   set onEnterFrame(callback) { this._onEnterFrameCallback = callback; }
   get onEnterFrame() { return this._onEnterFrameCallback; }
}
*/