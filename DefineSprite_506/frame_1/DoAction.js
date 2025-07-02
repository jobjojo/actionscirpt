/**
 * ActionScript code for `DefineSprite_506`, frame 1's `DoAction` script.
 * This script defines functions for a "speed meter" UI component.
 * It includes:
 * - `blind(blindflag)`: Controls whether the meter is "blinded" (hides some info).
 * - `modeset()`: Adjusts visibility of various text fields and arrows based on `control.metermode`.
 * - `modechange()`: Cycles through different meter display modes and saves the setting.
 * - `view(horizonal, vertical)`: Updates the displayed scores (horizontal, vertical, total speed)
 * and rotates an arrow based on velocities.
 *
 * In JavaScript, these would be methods of a speed meter UI component class.
 * It assumes `this` refers to the `DefineSprite_506` MovieClip instance, and it interacts with
 * `control` (GameControl object), `blind_txt`, `score_txt`, `hscore_txt`, `vscore_txt` (text fields),
 * and `rightarrow_mc`, `uparrow_mc`, `movearrow_mc` (arrow MovieClips).
 */
function DoAction_DefineSprite_506_frame_1() {
   // Assuming 'this' refers to the MovieClip instance of the speed meter.

   this.stop(); // Stop the MovieClip's timeline by default.

   // Initialize text field autoSize (conceptual).
   if (this.score_txt) { this.score_txt.autoSize = "right"; }

   // Internal state variables.
   let val = null; // Used for general score comparison.
   let vval = null; // Used for vertical score comparison.
   let hval = null; // Used for horizontal score comparison.
   let scorestr = null; // Stores formatted score string.
   let blindmode = false; // Flag for meter blinding.

   // Set initial visibility for text fields.
   if (this.hscore_txt) { this.hscore_txt._visible = false; }
   if (this.vscore_txt) { this.vscore_txt._visible = false; }

   // Initial setup calls.
   this.modeset(); // Set initial display mode based on `control.metermode`.
   this.view(0, 0); // Initial view update with zero velocities.


   /**
    * Controls whether the meter's non-essential information is hidden.
    * @param {boolean} blindflag - True to hide, false to show.
    */
   this.blind = function(blindflag) {
      blindmode = blindflag;
      this.modeset(); // Apply changes.
   };

   /**
    * Adjusts visibility of various text fields and arrows based on `control.metermode`.
    */
   this.modeset = function() {
      // Assumes `control` is a global or accessible instance of GameControl
      // and has a `metermode` property.
      if (typeof control !== 'undefined' && control.metermode !== undefined) {
         switch (control.metermode) {
            case 0: // Mode 0: Horizontal speed emphasis.
               if (this.blind_txt) { this.blind_txt._visible = blindmode; }
               if (this.score_txt) { this.score_txt._visible = false; }
               if (this.hscore_txt) { this.hscore_txt._visible = !blindmode; }
               if (this.vscore_txt) { this.vscore_txt._visible = false; }
               if (this.rightarrow_mc) { this.rightarrow_mc._visible = true; }
               if (this.uparrow_mc) { this.uparrow_mc._visible = false; }
               if (this.movearrow_mc) { this.movearrow_mc._visible = false; }
               break;
            case 1: // Mode 1: Vertical speed emphasis.
               if (this.blind_txt) { this.blind_txt._visible = blindmode; }
               if (this.score_txt) { this.score_txt._visible = false; }
               if (this.hscore_txt) { this.hscore_txt._visible = false; }
               if (this.vscore_txt) { this.vscore_txt._visible = !blindmode; }
               if (this.rightarrow_mc) { this.rightarrow_mc._visible = false; }
               if (this.uparrow_mc) { this.uparrow_mc._visible = true; }
               if (this.movearrow_mc) { this.movearrow_mc._visible = false; }
               break;
            case 2: // Mode 2: Total speed emphasis.
               if (this.blind_txt) { this.blind_txt._visible = blindmode; }
               if (this.score_txt) { this.score_txt._visible = !blindmode; }
               if (this.hscore_txt) { this.hscore_txt._visible = false; }
               if (this.vscore_txt) { this.vscore_txt._visible = false; }
               if (this.rightarrow_mc) { this.rightarrow_mc._visible = false; }
               if (this.uparrow_mc) { this.uparrow_mc._visible = false; }
               if (this.movearrow_mc) { this.movearrow_mc._visible = !blindmode; }
               break;
         }
      }
   };

   /**
    * Cycles through the meter display modes and saves the setting.
    */
   this.modechange = function() {
      // Assumes `control` has `metermode` property and `localset` method.
      if (typeof control !== 'undefined' && control.metermode !== undefined && control.localset) {
         control.metermode = (control.metermode + 1) % 3; // Cycle 0 -> 1 -> 2 -> 0.
         control.localset(); // Save new setting.
      }
      this.modeset(); // Apply new mode.
   };

   /**
    * Updates the displayed scores and arrow rotation.
    * @param {number} horizonal - Horizontal velocity/score.
    * @param {number} vertical - Vertical velocity/score.
    */
   this.view = function(horizonal, vertical) {
      // Update `movearrow_mc` rotation and total score.
      if (vval !== vertical || hval !== horizonal) { // Check if horizontal or vertical values changed.
         if (this.movearrow_mc) {
            // Calculate angle for `movearrow_mc` based on (vx, -vy).
            // `Math.atan2(y, x)` takes y first, so `vertical` would be y, `-horizonal` would be x for typical screen coords.
            // But here it seems to be (vy, vx) so atan2(-vertical, horizonal) then * 180 / PI to degrees.
            this.movearrow_mc._rotation = Math.atan2(-vertical, horizonal) * 180 / Math.PI;
         }
         // Calculate total score magnitude.
         let score = Math.sqrt(vertical * vertical + horizonal * horizonal);
         scorestr = String(Math.floor(score) + "." + String(Math.floor((Math.abs(score) + 1) * 100)).slice(-2));
         if (this.score_txt) { this.score_txt.text = scorestr; }
      }

      // Update `uparrow_mc` rotation and vertical score.
      if (vval !== vertical) {
         if (this.uparrow_mc) {
            if (vval < 0 && vertical >= 0) { // Transition from falling to rising/level.
               this.uparrow_mc._rotation = -90;
            } else if (vval >= 0 && vertical < 0) { // Transition from rising/level to falling.
               this.uparrow_mc._rotation = 90;
            }
         }
         vval = vertical; // Update internal `vval`.
         let score = Math.abs(vertical); // Absolute vertical score.
         scorestr = String(Math.floor(score) + "." + String(Math.floor((Math.abs(score) + 1) * 100)).slice(-2));
         if (this.vscore_txt) { this.vscore_txt.text = scorestr; }
      }

      // Update horizontal score.
      if (hval !== horizonal) {
         hval = horizonal; // Update internal `hval`.
         scorestr = String(Math.floor(horizonal) + "." + String(Math.floor((Math.abs(horizonal) + 1) * 100)).slice(-2));
         if (this.hscore_txt) { this.hscore_txt.text = scorestr; }
      }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class SpeedMeterDisplay extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      // Mock child display objects/text fields
      this.score_txt = { autoSize: "", text: "" };
      this.blind_txt = { _visible: true };
      this.hscore_txt = { _visible: false, text: "" };
      this.vscore_txt = { _visible: false, text: "" };
      this.rightarrow_mc = { _visible: true };
      this.uparrow_mc = { _visible: false, _rotation: 0 };
      this.movearrow_mc = { _visible: false, _rotation: 0 };

      // Internal state properties
      this.val = null;
      this.vval = null;
      this.hval = null;
      this.scorestr = null;
      this.blindmode = false;

      // External `control` object
      window.control = window.control || {
          metermode: 0, // Mock initial mode
          localset: () => console.log("Control localset called")
      };

      this.onFrame1Action(); // Mimic AS execution
   }

   onFrame1Action() {
      if (this.score_txt) this.score_txt.autoSize = "right";

      this.modeset(); // Call modeset during initialization
      this.view(0, 0); // Call view with initial zero velocities
   }

   blind(blindflag) {
      this.blindmode = blindflag;
      this.modeset();
   }

   modeset() {
      if (window.control && window.control.metermode !== undefined) {
         switch (window.control.metermode) {
            case 0:
               if (this.blind_txt) this.blind_txt._visible = this.blindmode;
               if (this.score_txt) this.score_txt._visible = false;
               if (this.hscore_txt) this.hscore_txt._visible = !this.blindmode;
               if (this.vscore_txt) this.vscore_txt._visible = false;
               if (this.rightarrow_mc) this.rightarrow_mc._visible = true;
               if (this.uparrow_mc) this.uparrow_mc._visible = false;
               if (this.movearrow_mc) this.movearrow_mc._visible = false;
               break;
            case 1:
               if (this.blind_txt) this.blind_txt._visible = this.blindmode;
               if (this.score_txt) this.score_txt._visible = false;
               if (this.hscore_txt) this.hscore_txt._visible = false;
               if (this.vscore_txt) this.vscore_txt._visible = !this.blindmode;
               if (this.rightarrow_mc) this.rightarrow_mc._visible = false;
               if (this.uparrow_mc) this.uparrow_mc._visible = true;
               if (this.movearrow_mc) this.movearrow_mc._visible = false;
               break;
            case 2:
               if (this.blind_txt) this.blind_txt._visible = this.blindmode;
               if (this.score_txt) this.score_txt._visible = !this.blindmode;
               if (this.hscore_txt) this.hscore_txt._visible = false;
               if (this.vscore_txt) this.vscore_txt._visible = false;
               if (this.rightarrow_mc) this.rightarrow_mc._visible = false;
               if (this.uparrow_mc) this.uparrow_mc._visible = false;
               if (this.movearrow_mc) this.movearrow_mc._visible = !this.blindmode;
               break;
         }
      }
   }

   modechange() {
      if (window.control && window.control.metermode !== undefined && window.control.localset) {
         window.control.metermode = (window.control.metermode + 1) % 3;
         window.control.localset();
      }
      this.modeset();
   }

   view(horizonal, vertical) {
      if (this.vval !== vertical || this.hval !== horizonal) {
         if (this.movearrow_mc) {
            this.movearrow_mc._rotation = Math.atan2(-vertical, horizonal) * (180 / Math.PI);
         }
         const score = Math.sqrt(vertical * vertical + horizonal * horizonal);
         this.scorestr = `${Math.floor(score)}.${String(Math.floor((Math.abs(score) + 1) * 100)).slice(-2)}`;
         if (this.score_txt) this.score_txt.text = this.scorestr;
      }

      if (this.vval !== vertical) {
         if (this.uparrow_mc) {
            if (this.vval < 0 && vertical >= 0) {
               this.uparrow_mc._rotation = -90;
            } else if (this.vval >= 0 && vertical < 0) {
               this.uparrow_mc._rotation = 90;
            }
         }
         this.vval = vertical;
         const score = Math.abs(vertical);
         this.scorestr = `${Math.floor(score)}.${String(Math.floor((Math.abs(score) + 1) * 100)).slice(-2)}`;
         if (this.vscore_txt) this.vscore_txt.text = this.scorestr;
      }

      if (this.hval !== horizonal) {
         this.hval = horizonal;
         this.scorestr = `${Math.floor(horizonal)}.${String(Math.floor((Math.abs(horizonal) + 1) * 100)).slice(-2)}`;
         if (this.hscore_txt) this.hscore_txt.text = this.scorestr;
      }
   }
}
*/