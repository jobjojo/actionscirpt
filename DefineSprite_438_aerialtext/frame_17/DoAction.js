/**
 * ActionScript code for `DefineSprite_438_aerialtext`, frame 17's `DoAction` script.
 * This script controls the visibility of two MovieClips, `crashr_mc` (crash red)
 * and `crashb_mc` (crash blue), based on the `upper` property of the current MovieClip (`this`).
 * It likely represents a visual distinction for different types of aerial crashes.
 *
 * In JavaScript, this translates to direct assignments to visibility properties
 * of display objects.
 * It assumes `this` refers to the `aerialtext` MovieClip instance, and it has
 * `crashr_mc` and `crashb_mc` children, as well as an `upper` boolean property.
 */
function DoAction_DefineSprite_438_aerialtext_frame_17() {
   // Assuming 'this' refers to the aerialtext MovieClip instance.
   // And `crashr_mc` and `crashb_mc` are child MovieClips.
   // `upper` is a property set on `this` (e.g., in frame 1's view function).

   if (this.crashr_mc) {
      this.crashr_mc._visible = this.upper; // Show red crash if `upper` is true.
   }
   if (this.crashb_mc) {
      this.crashb_mc._visible = !this.upper; // Show blue crash if `upper` is false.
   }
}

// How this might be structured in a JavaScript class (conceptual):
/*
class AerialTextDisplay extends GamePauseClip { // Extending GamePauseClip as per previous conversion
   constructor() {
      super();
      // ... other initialization ...
      this.crashr_mc = { _visible: false }; // Mock child MovieClip.
      this.crashb_mc = { _visible: false }; // Mock child MovieClip.
      this.upper = false; // Mock initial value.
   }

   // Method that gets called when this frame's action executes
   onFrame17Action() {
      if (this.crashr_mc) {
         this.crashr_mc._visible = this.upper;
      }
      if (this.crashb_mc) {
         this.crashb_mc._visible = !this.upper;
      }
   }
}
*/