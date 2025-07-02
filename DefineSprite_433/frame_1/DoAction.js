/**
 * ActionScript code for `DefineSprite_433`, frame 1's `DoAction` script.
 * This script defines a `view` function for displaying a numerical value,
 * likely a height or score. It controls the visibility of the MovieClip
 * based on the input `y` value and formats the `height_txt` text field
 * to display the value with two decimal places, right-aligned.
 *
 * In JavaScript, this would be part of a UI component class responsible for
 * numerical displays.
 * It assumes `this` refers to the MovieClip instance, and it has a `height_txt`
 * child text field.
 */
function DoAction_DefineSprite_433_frame_1() {
   // Assuming 'this' refers to the MovieClip that manages the display.

   this.stop(); // Stop the MovieClip's timeline by default.

   // Initialize text field's autoSize for right alignment.
   // In JS, this would be a CSS property or a rendering library setting.
   if (this.height_txt) {
      this.height_txt.autoSize = "right";
   }

   let val = 0; // Stores the current displayed value, initialized to 0.

   /**
    * Updates the displayed numerical value (e.g., height).
    * @param {number} y - The numerical value to display.
    */
   this.view = function(y) {
      // Control visibility based on `y` value.
      if (y > 14) {
         this._visible = true; // Make visible if `y` is greater than 14.
         if (val !== y) { // Only update text if value has changed.
            val = y;
            // Format the number to two decimal places (e.g., "1.23").
            // `Math.floor((Math.abs(y) + 1) * 100).toString().substr(-2)`
            // extracts the last two digits of (abs(y)+1)*100, which is a common
            // trick in ActionScript 2.0 for fixed-decimal formatting.
            const decimalPart = String(Math.floor((Math.abs(y) + 1) * 100)).slice(-2);
            if (this.height_txt) {
               this.height_txt.text = `${Math.floor(y)}.${decimalPart}`;
            }
         }
      } else {
         this._visible = false; // Hide if `y` is 14 or less.
      }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class HeightDisplay extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();
      // Mock text field
      this.height_txt = { autoSize: "", text: "" };
      this._visible = false; // Initial state.

      this.currentVal = 0; // Internal state for 'val'
      this.onFrame1Action(); // Mimic AS execution
   }

   onFrame1Action() {
      if (this.height_txt) {
         this.height_txt.autoSize = "right";
      }
   }

   view(y) {
      if (y > 14) {
         this._visible = true;
         if (this.currentVal !== y) {
            this.currentVal = y;
            const decimalPart = String(Math.floor((Math.abs(y) + 1) * 100)).slice(-2);
            if (this.height_txt) {
               this.height_txt.text = `${Math.floor(y)}.${decimalPart}`;
            }
         }
      } else {
         this._visible = false;
      }
   }
}
*/