/**
 * ActionScript code for `DefineSprite_98`, frame 1's `DoAction` script.
 * This script defines functions for a "quality setting" UI element.
 * It includes:
 * - `init()`: Initializes the visual state of the quality display based on global `_quality` setting.
 * - `viewout(target_mc)`: Creates a duplicate of a MovieClip, animates it out,
 * and makes the original invisible. This creates a "fly-out" effect for quality indicators.
 * - `viewstart()`: Sets up an `onEnterFrame` loop to monitor global `_quality` changes
 * and trigger the `viewout`/`viewin` animations when the quality setting changes.
 * - `viewstop()`: Clears the `onEnterFrame` listener from `viewstart`.
 * It also initializes internal properties and calls `init()` and `viewstart()`.
 *
 * In JavaScript, these would be methods of a quality settings UI component class.
 * It assumes `this` refers to the `DefineSprite_98` MovieClip instance, and it interacts with
 * `MovieClip` class (for duplication), global `_quality` and `control` objects,
 * and `h_mc`, `m_mc`, `l_mc` (child MovieClips for High, Medium, Low quality indicators).
 */
function DoAction_DefineSprite_98_frame_1() {
   // Assuming 'this' refers to the MovieClip instance of the quality setting UI.

   this.stop(); // Stop the MovieClip's timeline by default.

   // Internal state properties.
   let currentmode; // Tracks the current quality mode (e.g., "HIGH", "MEDIUM", "LOW").
   let current_mc; // Reference to the currently visible quality MovieClip.
   let depth = 0; // For managing duplicated MovieClip depth.


   /**
    * Initializes the visual state of the quality display based on the global `_quality` setting.
    */
   this.init = function() {
      // Assumes `_quality` is a global variable.
      currentmode = window._quality;

      // Initially hide all quality MovieClips.
      // Assumes `h_mc`, `m_mc`, `l_mc` are child MovieClips.
      if (this.h_mc) { this.h_mc._visible = false; }
      if (this.m_mc) { this.m_mc._visible = false; }
      if (this.l_mc) { this.l_mc._visible = false; }

      // Set `current_mc` based on `currentmode` and make it visible.
      switch (currentmode) {
         case "HIGH":
            current_mc = this.h_mc;
            break;
         case "MEDIUM":
            current_mc = this.m_mc;
            break;
         case "LOW":
            current_mc = this.l_mc;
            break;
         default:
            current_mc = null; // Fallback.
      }
      if (current_mc) {
         current_mc._visible = true;
      }
   };

   /**
    * Creates a duplicate of a MovieClip, animates it out, and hides the original.
    * This creates a "fly-out" effect for quality indicators.
    * @param {MovieClip} target_mc - The MovieClip to animate out.
    */
   this.viewout = function(target_mc) {
      if (!target_mc) return;

      depth = (depth + 1) % 100; // Cycle depth for duplicated clips.
      // `duplicateMovieClip` creates a new instance on the stage.
      // In JS, this would involve creating a new display object and adding it to the scene.
      let copy_mc = null;
      if (typeof target_mc.duplicateMovieClip === 'function') {
          copy_mc = target_mc.duplicateMovieClip(getTimer(), depth); // Conceptual `MovieClip.duplicateMovieClip`
      }
      target_mc._visible = false; // Hide original.

      if (copy_mc) {
          // Iterate through properties of the copied MovieClip.
          // This assumes the copy contains nested MovieClips (e.g., visual parts of the indicator).
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
    * Sets up an `onEnterFrame` loop to monitor global `_quality` changes.
    */
   this.viewstart = function() {
      // `onEnterFrame` logic for monitoring quality changes.
      this.onEnterFrame = () => { // Use arrow function to preserve 'this' context.
         // Check if global quality setting has changed.
         // Assumes `base_btn.enabled` is accessible (from GameMenu).
         if (window._quality !== currentmode && (this.base_btn ? this.base_btn.enabled : true)) { // Default to true if base_btn is null
            currentmode = window._quality; // Update current mode.
            if (typeof this.gotoAndPlay === 'function') {
               this.gotoAndPlay("change"); // Play "change" animation.
            }
            // Trigger `viewout` for the old quality MovieClip.
            this.viewout(current_mc);
            // Update `current_mc` to the new quality MovieClip and make it visible.
            switch (currentmode) {
               case "HIGH": current_mc = this.h_mc; break;
               case "MEDIUM": current_mc = this.m_mc; break;
               case "LOW": current_mc = this.l_mc; break;
               default: current_mc = null;
            }
            if (current_mc) {
               current_mc._visible = true;
            }
         }
      };
   };

   /**
    * Clears the `onEnterFrame` listener from `viewstart`, stopping quality monitoring.
    */
   this.viewstop = function() {
      this.onEnterFrame = null; // Or `delete this.onEnterFrame;`
   };

   // Initial calls to setup the quality display.
   this.init(); // Initialize visual state.
   this.viewstart(); // Start monitoring quality changes.
}

// How this might be structured in a JavaScript class (conceptual):
/*
class QualitySettingsUI extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      // Mock child MovieClips for quality indicators
      this.h_mc = { _visible: false, _x: 0, _y: 0, _yscale: 100 };
      this.m_mc = { _visible: false, _x: 0, _y: 0, _yscale: 100 };
      this.l_mc = { _visible: false, _x: 0, _y: 0, _yscale: 100 };

      // Internal state properties
      this.currentmode = null;
      this.current_mc = null;
      this.depth = 0;

      // External dependencies
      window._quality = "MEDIUM"; // Mock global quality setting
      window.getTimer = () => performance.now(); // Mock getTimer
      this.base_btn = { enabled: true }; // Mock base_btn state from GameMenu

      this.init(); // Call init directly
      this.viewstart(); // Call viewstart directly
   }

   init() {
      this.currentmode = window._quality;
      if (this.h_mc) this.h_mc._visible = false;
      if (this.m_mc) this.m_mc._visible = false;
      if (this.l_mc) this.l.mc._visible = false;

      switch (this.currentmode) {
         case "HIGH": this.current_mc = this.h_mc; break;
         case "MEDIUM": this.current_mc = this.m_mc; break;
         case "LOW": this.current_mc = this.l_mc; break;
         default: this.current_mc = null;
      }
      if (this.current_mc) this.current_mc._visible = true;
   }

   viewout(target_mc) {
      if (!target_mc) return;
      this.depth = (this.depth + 1) % 100;

      // Mock duplicateMovieClip
      const copy_mc = { // Simplified mock for demo
        px: 0, py: 0, _x: 0, _y: 0, _rotation: 0, r: 0, orgscale: 100, count: 0,
        _xscale: 100, _yscale: 100, _parent: { removeMovieClip: () => console.log("Removed mock clip") }
      };
      copy_mc[0] = { // Mock child part
        px: target_mc._x, py: target_mc._y, _x: target_mc._x, _y: target_mc._y, _rotation: 0,
        r: Math.random() * 20, orgscale: target_mc._yscale, count: 0, _xscale: 100, _yscale: 100,
        _parent: copy_mc._parent
      };

      target_mc._visible = false;

      const animateCopy = () => {
        const clipPart = copy_mc[0];
        if (clipPart) {
          clipPart.count++;
          clipPart._x = clipPart.px + clipPart.px * clipPart.count / 30;
          clipPart._y = clipPart.py + clipPart.count * clipPart.count / 3;
          clipPart._rotation = clipPart.r * clipPart.count;
          clipPart._xscale = (1 + clipPart.count / 30) * clipPart.orgscale;
          clipPart._yscale = clipPart._xscale;

          if (clipPart._y >= 200) {
            if (clipPart._parent) clipPart._parent.removeMovieClip();
            return;
          }
        }
        requestAnimationFrame(animateCopy);
      };
      requestAnimationFrame(animateCopy);
   }

   viewstart() {
      const monitorQualityChange = () => {
         // Assuming this.base_btn provides 'enabled' state.
         const baseBtnEnabled = this.base_btn ? this.base_btn.enabled : true;

         if (window._quality !== this.currentmode && baseBtnEnabled) {
            this.currentmode = window._quality;
            if (typeof this.gotoAndPlay === 'function') this.gotoAndPlay("change");
            this.viewout(this.current_mc);
            switch (this.currentmode) {
               case "HIGH": this.current_mc = this.h_mc; break;
               case "MEDIUM": this.current_mc = this.m_mc; break;
               case "LOW": this.current_mc = this.l_mc; break;
               default: this.current_mc = null;
            }
            if (this.current_mc) this.current_mc._visible = true;
         }
         if (this.onEnterFrame) { // Continue if not stopped
             requestAnimationFrame(monitorQualityChange);
         }
      };
      this.onEnterFrame = monitorQualityChange; // Assign property for external loop
      requestAnimationFrame(monitorQualityChange); // Start the JS monitoring loop
   }

   viewstop() {
      this.onEnterFrame = null; // Stop the animation loop
   }

   // Define onEnterFrame setter/getter to emulate AS behavior
   set onEnterFrame(callback) { this._onEnterFrameCallback = callback; }
   get onEnterFrame() { return this._onEnterFrameCallback; }
}
*/