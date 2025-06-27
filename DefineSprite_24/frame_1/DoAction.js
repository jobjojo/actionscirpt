/**
 * ActionScript code for `DefineSprite_24`, frame 1's `DoAction` script.
 * This script is typically used for a loading bar or progress display.
 * It defines a `view` function that updates the position of a mask (`mask_mc`)
 * and the text of three number MovieClips (n1_mc, n2_mc, n3_mc)
 * to display a percentage loaded.
 *
 * In JavaScript, this would be part of a loading screen UI component.
 * Assumes `this` refers to the MovieClip instance, and it has child
 * display objects `mask_mc`, `n1_mc`, `n2_mc`, `n3_mc`.
 */
function DoAction_DefineSprite_24_frame_1() {
   // Assuming 'this' refers to the MovieClip that manages the loading display.
   // `inity` is the initial Y position of the mask, set once at the start.
   let inity = this.mask_mc._y; // Store initial Y position of the mask.

   this.stop(); // Stop the MovieClip's timeline by default.

   /**
    * Updates the loading progress display.
    * @param {number} loaded - A value between 0 and 1 representing the loading progress (e.g., bytesLoaded / bytesTotal).
    */
   this.view = function(loaded) {
      // Move the mask to reflect progress.
      // `mask_mc._height` is assumed to be the full height of the mask.
      if (this.mask_mc) {
         this.mask_mc._y = inity - loaded * this.mask_mc._height;
      }

      // Display the percentage loaded using individual number MovieClips.
      let _loc1_ = Math.floor(loaded * 100).toString(); // Convert to percentage string.

      // Assign characters of the percentage string to individual number MovieClips.
      // The original code uses negative indices for `charAt` which works in AS,
      // but in JS, it's safer to ensure string length or use padding.
      // Assuming _loc1_ will be "X", "XX", or "XXX" (e.g., "5", "50", "100").
      // charAt(length - 1) is the last digit (ones place).
      // charAt(length - 2) is the second to last digit (tens place).
      // charAt(length - 3) is the third to last digit (hundreds place).
      if (this.n1_mc) { this.n1_mc.num = _loc1_.charAt(_loc1_.length - 1); }
      if (this.n2_mc) { this.n2_mc.num = _loc1_.charAt(_loc1_.length - 2); } // Will be empty string if length < 2
      if (this.n3_mc) { this.n3_mc.num = _loc1_.charAt(_loc1_.length - 3); } // Will be empty string if length < 3
   };

   // No initial call to `view` here as it's likely called externally
   // during the loading process (e.g., `load_mc.view(this.getBytesLoaded() / this.getBytesTotal());` from frame_1/DoAction.txt).
}

// How this might be structured in a JavaScript class (conceptual):
/*
class LoadingBarDisplay extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();
      // Assume mask_mc, n1_mc, etc., are child display objects.
      this.mask_mc = { _y: 0, _height: 100 }; // Mock
      this.n1_mc = { num: '' };
      this.n2_mc = { num: '' };
      this.n3_mc = { num: '' };

      this.inity = this.mask_mc._y; // Capture initial mask position.
   }

   view(loaded) {
      if (this.mask_mc) {
         this.mask_mc._y = this.inity - loaded * this.mask_mc._height;
      }

      let percentageStr = Math.floor(loaded * 100).toString().padStart(3, ' '); // Pad to ensure length for charAt.

      if (this.n1_mc) { this.n1_mc.num = percentageStr.charAt(percentageStr.length - 1); }
      if (this.n2_mc) { this.n2_mc.num = percentageStr.charAt(percentageStr.length - 2); }
      if (this.n3_mc) { this.n3_mc.num = percentageStr.charAt(percentageStr.length - 3); }
   }
}
*/