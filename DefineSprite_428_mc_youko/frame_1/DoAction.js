/**
 * ActionScript code for `DefineSprite_428_mc_youko`, frame 1's `DoAction` script.
 * This script initializes various properties specific to the 'youko' character,
 * including `code` from `control.characode`, hit detection parameters (`hity`, `hitx`),
 * `special` (initially null), and `crashmaxx` (maximum range for a crash effect).
 *
 * In JavaScript, these would be properties of the `mc_youko` class (which extends `GameCharacter`).
 * It assumes `this` refers to the `mc_youko` MovieClip instance, and it interacts with
 * `control` (GameControl object) and `code` (character code mapping).
 */
function DoAction_DefineSprite_428_mc_youko_frame_1() {
   // Assuming 'this' refers to the mc_youko MovieClip instance.
   this.stop(); // Stop the MovieClip's timeline by default.

   // Initialize character properties.
   // `code` is a reference to `control.characode`.
   // `hity`, `hitx` are hit detection offsets.
   // `special` is initially null.
   // `crashmaxx` is a maximum range for a combat state/effect.
   if (typeof control !== 'undefined' && control.characode) {
      this.code = control.characode;
   }
   this.hity = 0.8333333333333334;
   this.hitx = -0.16666666666666666;
   this.special = null;
   this.crashmaxx = 0; // Unusual value, possibly indicating no direct crash effect from this state.
}

// How this might be structured in a JavaScript class (conceptual, part of mc_youko):
/*
class mc_youko extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // Initialize properties
      this.code = null;
      this.hity = 0;
      this.hitx = 0;
      this.special = null;
      this.crashmaxx = 0;

      // Mock control object for demonstration
      window.control = window.control || {
          characode: { youko: 5 }
      };

      this.onFrame1Action(); // Call this method on instantiation, similar to DoAction on frame 1
   }

   onFrame1Action() {
      this.stop(); // AS stop action
      if (window.control) {
         this.code = window.control.characode;
      }
      this.hity = 0.8333333333333334;
      this.hitx = -0.16666666666666666;
      this.special = null;
      this.crashmaxx = 0;
   }
}
*/