/**
 * ActionScript code for `DefineSprite_343_mc_kiri`, frame 1's `DoAction` script.
 * This script initializes various properties and defines functions specific to the 'kiri' character:
 * - `stand()`: A function that sets a special flag for 'miki' if 'control.lastchara' was 'miki'.
 * - `passact()`: A function that sets a special flag for 'kiri' to false.
 * It also initializes `code` from `control.characode`, hit detection parameters (`hity`, `hitx`),
 * and various maximum values for combat/interaction (`power`, `angle`, `s_power`, `s_angle`,
 * `crashmaxx`, `blockmaxx`, `specialmaxx`, `combomaxx`).
 *
 * In JavaScript, these would be methods and properties of the `mc_kiri` class (which extends `GameCharacter`).
 * It assumes `this` refers to the `mc_kiri` MovieClip instance, and it interacts with
 * `control` (GameControl object) and `code` (character code mapping).
 */
function DoAction_DefineSprite_343_mc_kiri_frame_1() {
   // Assuming 'this' refers to the mc_kiri MovieClip instance.
   this.stop(); // Stop the MovieClip's timeline by default.

   /**
    * Handles actions when Kiri is in a 'stand' state.
    * This function is often called by the GameCharacter's `setposition` or `stand` method.
    */
   this.stand = function() {
      // Check if the last character was 'miki' and set 'miki's special flag if so.
      // Assumes `control` is a global or accessible instance of GameControl
      // and has `lastchara` property, `setspecial` method, and `characode` mapping.
      if (typeof control !== 'undefined' && control.lastchara !== undefined && control.setspecial && control.characode) {
         if (control.lastchara === control.characode.miki) {
            control.setspecial(control.characode.miki, true);
         }
      }
   };

   /**
    * Handles actions when Kiri "passes" (e.g., moves past another character).
    */
   this.passact = function() {
      // Set Kiri's special flag to false.
      // Assumes `control` is a global or accessible instance of GameControl
      // and has `setspecial` method and `characode` mapping.
      if (typeof control !== 'undefined' && control.setspecial && control.characode) {
         control.setspecial(control.characode.kiri, false);
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
   this.hitx = 0.16666666666666666;
   this.power = 10;
   this.angle = 45;
   this.s_power = 25;
   this.s_angle = 60;
   this.crashmaxx = 451.1;
   this.blockmaxx = 245.8;
   this.specialmaxx = 1051.1;
   this.combomaxx = 714.3;
}

// How this might be structured in a JavaScript class (conceptual, part of mc_kiri):
/*
class mc_kiri extends GameCharacter { // Extending GameCharacter as per previous conversion
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
          characode: { miki: 4, kiri: 3 }
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
      this.power = 10;
      this.angle = 45;
      this.s_power = 25;
      this.s_angle = 60;
      this.crashmaxx = 451.1;
      this.blockmaxx = 245.8;
      this.specialmaxx = 1051.1;
      this.combomaxx = 714.3;
   }

   stand() {
      if (window.control && window.control.setspecial && this.code) {
         if (window.control.lastchara === this.code.miki) {
            window.control.setspecial(this.code.miki, true);
         }
      }
   }

   passact() {
      if (window.control && window.control.setspecial && this.code) {
         window.control.setspecial(this.code.kiri, false);
      }
   }
}
*/