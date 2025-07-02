/**
 * ActionScript code for `DefineSprite_489`, frame 1's `DoAction` script.
 * This script defines a `view` function for displaying special character states.
 * It controls the visibility of various character-related MovieClips (base_mc, youko_mc,
 * nanaka_mc, misato_mc, touko_mc, kiri_mc, miki_mc, and their "d" (disabled) versions)
 * based on the `control.youko` and other `control` character flags (misato, touko, etc.).
 *
 * In JavaScript, this would be part of a UI component or character state display manager.
 * It assumes `this` refers to the `DefineSprite_489` MovieClip instance, and it interacts with
 * `control` (GameControl object) and various child MovieClips.
 */
function DoAction_DefineSprite_489_frame_1() {
   // Assuming 'this' refers to the MovieClip that manages the display of character special states.

   this.stop(); // Stop the MovieClip's timeline by default.

   /**
    * Updates the display of character special states based on `control` flags.
    */
   this.view = function() {
      // Assumes `control` is a global or accessible instance of GameControl.

      // Check `control.youko` flag first.
      if (typeof control !== 'undefined' && control.youko !== undefined) {
         if (control.youko) {
            // If Youko's special is active, adjust visibility accordingly.
            if (this.base_mc) { this.base_mc._visible = false; }
            if (this.youko_mc) { this.youko_mc._visible = true; }
            if (this.misato_mc) { this.misato_mc._visible = false; }
            if (this.touko_mc) { this.touko_mc._visible = false; }
            if (this.kiri_mc) { this.kiri_mc._visible = false; }
            if (this.miki_mc) { this.miki_mc._visible = false; }

            // Sub-check for `control.nanaka` when `control.youko` is true.
            if (control.nanaka !== undefined && control.nanaka) {
               if (this.nanaka_mc) { this.nanaka_mc._visible = true; }
               if (this.misatod_mc) { this.misatod_mc._visible = false; }
               if (this.toukod_mc) { this.toukod_mc._visible = false; }
               if (this.kirid_mc) { this.kirid_mc._visible = false; }
               if (this.mikid_mc) { this.mikid_mc._visible = false; }
            } else {
               // If Nanaka is NOT active when Youko is active.
               if (this.nanaka_mc) { this.nanaka_mc._visible = false; }
               if (this.misatod_mc) { this.misatod_mc._visible = true; }
               if (this.toukod_mc) { this.toukod_mc._visible = true; }
               if (this.kirid_mc) { this.kirid_mc._visible = true; }
               if (this.mikid_mc) { this.mikid_mc._visible = true; }
            }
         } else {
            // If Youko's special is NOT active.
            if (this.youko_mc) { this.youko_mc._visible = false; }
            if (this.nanaka_mc) { this.nanaka_mc._visible = false; }
            if (this.base_mc) { this.base_mc._visible = true; } // Show base if Youko is not active.

            // Adjust visibility of other character icons based on their special flags.
            // Assumes `control` has `misato`, `touko`, `kiri`, `miki` flags.
            // And corresponding "d" (disabled) versions of MovieClips.
            if (this.misato_mc) { this.misato_mc._visible = control.misato; }
            if (this.touko_mc) { this.touko_mc._visible = control.touko; }
            if (this.kiri_mc) { this.kiri_mc._visible = control.kiri; }
            if (this.miki_mc) { this.miki_mc._visible = control.miki; }

            if (this.misatod_mc) { this.misatod_mc._visible = !control.misato; }
            if (this.toukod_mc) { this.toukod_mc._visible = !control.touko; }
            if (this.kirid_mc) { this.kirid_mc._visible = !control.kiri; }
            if (this.mikid_mc) { this.mikid_mc._visible = !control.miki; }
         }
      }
   };

   // Initial call to view to set up initial display based on default values.
   this.view();
}

// How this might be structured in a JavaScript class (conceptual):
/*
class CharacterSpecialDisplay extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();
      // Mock child MovieClips
      this.base_mc = { _visible: true };
      this.youko_mc = { _visible: false };
      this.nanaka_mc = { _visible: false };
      this.misato_mc = { _visible: false }; this.misatod_mc = { _visible: true };
      this.touko_mc = { _visible: false }; this.toukod_mc = { _visible: true };
      this.kiri_mc = { _visible: false }; this.kirid_mc = { _visible: true };
      this.miki_mc = { _visible: false }; this.mikid_mc = { _visible: true };

      // External `control` object
      window.control = window.control || {
          youko: false, nanaka: false, misato: false, touko: false, kiri: false, miki: false
      };

      this.onFrame1Action(); // Mimic AS execution
   }

   onFrame1Action() {
      this.view(); // Initial view call
   }

   view() {
      if (window.control && window.control.youko !== undefined) {
         if (window.control.youko) {
            if (this.base_mc) this.base_mc._visible = false;
            if (this.youko_mc) this.youko_mc._visible = true;
            if (this.misato_mc) this.misato_mc._visible = false;
            if (this.touko_mc) this.touko_mc._visible = false;
            if (this.kiri_mc) this.kiri_mc._visible = false;
            if (this.miki_mc) this.miki_mc._visible = false;

            if (window.control.nanaka !== undefined && window.control.nanaka) {
               if (this.nanaka_mc) this.nanaka_mc._visible = true;
               if (this.misatod_mc) this.misatod_mc._visible = false;
               if (this.toukod_mc) this.toukod_mc._visible = false;
               if (this.kirid_mc) this.kirid_mc._visible = false;
               if (this.mikid_mc) this.mikid_mc._visible = false;
            } else {
               if (this.nanaka_mc) this.nanaka_mc._visible = false;
               if (this.misatod_mc) this.misatod_mc._visible = true;
               if (this.toukod_mc) this.toukod_mc._visible = true;
               if (this.kirid_mc) this.kirid_mc._visible = true;
               if (this.mikid_mc) this.mikid_mc._visible = true;
            }
         } else {
            if (this.youko_mc) this.youko_mc._visible = false;
            if (this.nanaka_mc) this.nanaka_mc._visible = false;
            if (this.base_mc) this.base_mc._visible = true;

            if (this.misato_mc) this.misato_mc._visible = window.control.misato;
            if (this.touko_mc) this.touko_mc._visible = window.control.touko;
            if (this.kiri_mc) this.kiri_mc._visible = window.control.kiri;
            if (this.miki_mc) this.miki_mc._visible = window.control.miki;

            if (this.misatod_mc) this.misatod_mc._visible = !window.control.misato;
            if (this.toukod_mc) this.toukod_mc._visible = !window.control.touko;
            if (this.kirid_mc) this.kirid_mc._visible = !window.control.kiri;
            if (this.mikid_mc) this.mikid_mc._visible = !window.control.miki;
         }
      }
   }
}
*/