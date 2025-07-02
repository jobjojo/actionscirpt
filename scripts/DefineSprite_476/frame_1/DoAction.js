/**
 * ActionScript code for `DefineSprite_476`, frame 1's `DoAction` script.
 * This script defines a `getchara` function that acts as a factory or lookup
 * for character face MovieClips based on a `charatype` code. It returns a
 * specific child MovieClip (`misato_mc`, `touko_mc`, etc.) that corresponds
 * to the given character type.
 *
 * In JavaScript, this would be a method of a character face manager class
 * or a utility function within the game.
 * It assumes `this` refers to the `DefineSprite_476` MovieClip instance (which
 * likely contains all the character face MovieClips), and it has `code` (character
 * code mapping) and various character face MovieClip children.
 */
function DoAction_DefineSprite_476_frame_1() {
   // Assuming 'this' refers to the MovieClip instance that contains character faces.

   this.stop(); // Stop the MovieClip's timeline by default.

   // Initialize `code` with character codes from `control`.
   // Assumes `control` is a global or accessible instance of GameControl.
   const code = control.characode; // Assuming 'control' is available.

   /**
    * Retrieves a character face MovieClip based on its character type code.
    * @param {number} charatype - The numerical code representing the character type.
    * @returns {MovieClip|null} The corresponding character face MovieClip, or null if not found.
    */
   this.getchara = function(charatype) {
      // Assumes `misato_mc`, `touko_mc`, etc., are child MovieClips of 'this'.
      switch (charatype) {
         case code.misato:
            return this.misato_mc;
         case code.touko:
            return this.touko_mc;
         case code.kiri:
            return this.kiri_mc;
         case code.miki:
            return this.miki_mc;
         case code.youko:
            return this.youko_mc;
         case code.sakuraba:
            return this.sakuraba_mc;
         case code.tomoki:
            return this.tomoki_mc;
         default:
            return null; // Return null if character type is not recognized.
      }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class CharaFaceManager extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();
      // Mock child MovieClips (character faces)
      this.misato_mc = {}; this.touko_mc = {}; this.kiri_mc = {};
      this.miki_mc = {}; this.youko_mc = {}; this.sakuraba_mc = {}; this.tomoki_mc = {};

      // External `control` object
      window.control = window.control || {
          characode: { misato:1, touko:2, kiri:3, miki:4, youko:5, sakuraba:6, tomoki:7 }
      };
      this.code = window.control.characode; // Store characode
   }

   getchara(charatype) {
      switch (charatype) {
         case this.code.misato: return this.misato_mc;
         case this.code.touko: return this.touko_mc;
         case this.code.kiri: return this.kiri_mc;
         case this.code.miki: return this.miki_mc;
         case this.code.youko: return this.youko_mc;
         case this.code.sakuraba: return this.sakuraba_mc;
         case this.code.tomoki: return this.tomoki_mc;
         default: return null;
      }
   }
}
*/