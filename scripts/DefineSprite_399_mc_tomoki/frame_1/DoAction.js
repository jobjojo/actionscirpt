/**
 * ActionScript code for `DefineSprite_399_mc_tomoki`, frame 1's `DoAction` script.
 * This script initializes various properties specific to the 'tomoki' character,
 * including `code` from `control.characode`, hit detection parameters (`hity`, `hitx`),
 * `special` (initially null), `e` (elasticity/energy retention factor),
 * and maximum values for combat (`crashmaxx`, `blockmaxx`).
 *
 * In JavaScript, these would be properties of the `mc_tomoki` class (which extends `GameCharacter`).
 * It assumes `this` refers to the `mc_tomoki` MovieClip instance, and it interacts with
 * `control` (GameControl object) and `code` (character code mapping).
 */
function DoAction_DefineSprite_399_mc_tomoki_frame_1() {
   // Assuming 'this' refers to the mc_tomoki MovieClip instance.
   this.stop(); // Stop the MovieClip's timeline by default.

   // Initialize character properties.
   // `code` is a reference to `control.characode`.
   // `hity`, `hitx` are hit detection offsets.
   // `special` is initially null.
   // `e` is an elasticity or energy retention factor, likely used in velocity calculations.
   // `crashmaxx`, `blockmaxx` are maximum ranges for combat states/effects.
   if (typeof control !== 'undefined' && control.characode) {
      this.code = control.characode;
   }
   this.special = null;
   this.hity = 1;
   this.hitx = -0.16666666666666666;
   const e = 0.7; // Elasticity/energy factor.
   this.crashmaxx = 217.9;
   this.blockmaxx = 217.9;
}

// How this might be structured in a JavaScript class (conceptual, part of mc_tomoki):
/*
class mc_tomoki extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // Initialize properties
      this.code = null;
      this.special = null;
      this.hity = 0;
      this.hitx = 0;
      this.e = 0.7; // Store 'e' as a class property
      this.crashmaxx = 0;
      this.blockmaxx = 0;

      // Mock control object for demonstration
      window.control = window.control || {
          characode: { tomoki: 7 }
      };

      this.onFrame1Action(); // Call this method on instantiation, similar to DoAction on frame 1
   }

   onFrame1Action() {
      this.stop(); // AS stop action
      if (window.control) {
         this.code = window.control.characode;
      }
      this.special = null;
      this.hity = 1;
      this.hitx = -0.16666666666666666;
      this.e = 0.7;
      this.crashmaxx = 217.9;
      this.blockmaxx = 217.9;
   }
}
*/