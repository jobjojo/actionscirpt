/**
 * ActionScript code for `DefineSprite_350_mc_miki`, frame 1's `DoAction` script.
 * This script initializes various properties and defines functions specific to the 'miki' character:
 * - `stand()`: A function that sets a special flag for 'kiri' if 'control.lastchara' was 'kiri'.
 * - `passact()`: A function that sets a special flag for 'miki' to false.
 * It also initializes `code` from `control.characode`, hit detection parameters (`hity`, `hitx`),
 * and various maximum values for combat/interaction (`power`, `angle`, `s_power`, `s_angle`,
 * `crashmaxx`, `blockmaxx`, `specialmaxx`, `combomaxx`).
 *
 * In JavaScript, these would be methods and properties of the `mc_miki` class (which extends `GameCharacter`).
 * It assumes `this` refers to the `mc_miki` MovieClip instance, and it interacts with
 * `control` (GameControl object) and `code` (character code mapping).
 */
function DoAction_DefineSprite_350_mc_miki_frame_1() {
   // Assuming 'this' refers to the mc_miki MovieClip instance.
   this.stop(); // Stop the MovieClip's timeline by default.

   /**
    * Handles actions when Miki is in a 'stand' state.
    * This function is often called by the GameCharacter's `setposition` or `stand` method.
    */
   this.stand = function() {
      // Check if the last character was 'kiri' and set 'kiri's special flag if so.
      // Assumes `control` is a global or accessible instance of GameControl
      // and has `lastchara` property, `setspecial` method, and `characode` mapping.
      if (typeof control !== 'undefined' && control.lastchara !== undefined && control.setspecial && control.characode) {
         if (control.lastchara === control.characode.kiri) {
            control.setspecial(control.characode.kiri, true);
         }
      }
   };

   /**
    * Handles actions when Miki "passes" (e.g., moves past another character).
    */
   this.passact = function() {
      // Set Miki's special flag to false.
      // Assumes `control` is a global or accessible instance of GameControl
      // and has `setspecial` method and `characode` mapping.
      if (typeof control !== 'undefined' && control.setspecial && control.characode) {
         control.setspecial(control.characode.miki, false);
      }
   };

   // Initialize character properties.
   // `code` is a reference to `control.characode`.
   // `hity`, `hitx` are hit detection offsets.
   // `power`, `angle` are for normal attacks/abilities.
   // `s_power`, `s_angle` are for special attacks/abilities.
   // `crashmaxx`, `blockmaxx`, `specialmaxx`, `combomaxx` are maximum ranges
   // for different combat states/effects.
   if (typeof control !== 'undefined' && control.characode) {
      this.code = control.characode;
   }
   this.hity = 0.8333333333333334;
   this.hitx = 0;
   this.power = 11;
   this.angle = 70;
   this.s_power = 24;
   this.s_angle = 45;
   this.crashmaxx = 288.6;
   this.blockmaxx = 245.8;
   this.specialmaxx = 726.1;
   this.combomaxx = 714.3;
}

// How this might be structured in a JavaScript class (conceptual, part of mc_miki):
/*
class mc_miki extends GameCharacter { // Extending GameCharacter as per previous conversion
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
      this.blockmaxx = 0;
      this.specialmaxx = 0;
      this.combomaxx = 0;

      // Mock control object for demonstration
      window.control = window.control || {
          lastchara: null,
          setspecial: (ch, flag) => console.log(`Set special ${ch}: ${flag}`),
          characode: { kiri: 3, miki: 4 }
      };

      this.onFrame1Action(); // Call this method on instantiation, similar to DoAction on frame 1
   }

   onFrame1Action() {
      this.stop(); // AS stop action
      if (window.control) {
         this.code = window.control.characode;
      }
      this.hity = 0.8333333333333334;
      this.hitx = 0;
      this.power = 11;
      this.angle = 70;
      this.s_power = 24;
      this.s_angle = 45;
      this.crashmaxx = 288.6;
      this.blockmaxx = 245.8;
      this.specialmaxx = 726.1;
      this.combomaxx = 714.3;
   }

   stand() {
      if (window.control && window.control.setspecial && this.code) {
         if (window.control.lastchara === this.code.kiri) {
            window.control.setspecial(this.code.kiri, true);
         }
      }
   }

   passact() {
      if (window.control && window.control.setspecial && this.code) {
         window.control.setspecial(this.code.miki, false);
      }
   }
}
*/