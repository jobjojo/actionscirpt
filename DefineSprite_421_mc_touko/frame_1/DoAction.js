/**
 * ActionScript code for `DefineSprite_421_mc_touko`, frame 1's `DoAction` script.
 * This script initializes various properties specific to the 'touko' character,
 * including `code` from `control.characode`, hit detection parameters (`hity`, `hitx`),
 * `power`, `angle` (for normal attacks), `s_power`, `s_angle` (for special attacks),
 * and maximum values for combat (`crashmaxx`, `specialmaxx`, `blockmaxx`).
 *
 * In JavaScript, these would be properties of the `mc_touko` class (which extends `GameCharacter`).
 * It assumes `this` refers to the `mc_touko` MovieClip instance, and it interacts with
 * `control` (GameControl object) and `code` (character code mapping).
 */
function DoAction_DefineSprite_421_mc_touko_frame_1() {
   // Assuming 'this' refers to the mc_touko MovieClip instance.
   this.stop(); // Stop the MovieClip's timeline by default.

   // Initialize character properties.
   // `code` is a reference to `control.characode`.
   // `hity`, `hitx` are hit detection offsets.
   // `power`, `angle` are for normal attacks/abilities.
   // `s_power`, `s_angle` are for special attacks/abilities.
   // `crashmaxx`, `specialmaxx`, `blockmaxx` are maximum ranges
   // for different combat states/effects.
   if (typeof control !== 'undefined' && control.characode) {
      this.code = control.characode;
   }
   this.hity = 0.8333333333333334;
   this.hitx = 0.16666666666666666;
   this.power = 11;
   this.angle = 20;
   this.s_power = 25;
   this.s_angle = 30;
   this.crashmaxx = 526;
   this.specialmaxx = 605.65;
   this.blockmaxx = 245.8;
}

// How this might be structured in a JavaScript class (conceptual, part of mc_touko):
/*
class mc_touko extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // Initialize properties
      this.code = null;
      this.hity = 0;
      this.hitx = 0;
      this.power = 0;
      this.angle = 0;
      this.s_power = 0;
      this.s_angle = 0;
      this.crashmaxx = 0;
      this.specialmaxx = 0;
      this.blockmaxx = 0;

      // Mock control object for demonstration
      window.control = window.control || {
          characode: { touko: 2 }
      };

      this.onFrame1Action(); // Call this method on instantiation, similar to DoAction on frame 1
   }

   onFrame1Action() {
      this.stop(); // AS stop action
      if (window.control) {
         this.code = window.control.characode;
      }
      this.hity = 0.8333333333333334;
      this.hitx = 0.16666666666666666;
      this.power = 11;
      this.angle = 20;
      this.s_power = 25;
      this.s_angle = 30;
      this.crashmaxx = 526;
      this.specialmaxx = 605.65;
      this.blockmaxx = 245.8;
   }
}
*/