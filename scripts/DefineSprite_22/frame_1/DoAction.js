/**
 * ActionScript code for `DefineSprite_22`, frame 1's `DoAction` script.
 * This script is typically used for a numeric display MovieClip (like a single digit).
 * It defines a `numberwatcher` function that acts as a property change listener for a `num` property.
 * When `num` changes, it checks if the new value is a valid number; if not, it hides the MovieClip.
 * If it's a number, it makes the MovieClip visible and jumps its timeline to a specific frame
 * based on the number (newVal + 2).
 *
 * In JavaScript, this would be implemented using a setter for the `num` property
 * or a direct update function.
 * Assumes `this` refers to the MovieClip instance, and it has a `_visible` property
 * and `gotoAndStop` method.
 */
function DoAction_DefineSprite_22_frame_1() {
   this.stop(); // Stop the MovieClip's timeline by default.

   // The 'numberwatcher' function.
   // In modern JavaScript, this logic would typically be inside a setter for `num`.
   const numberwatcher = (prop, oldVal, newVal) => {
      // In JS, property watchers aren't a native feature like in AS2.
      // This is the core logic that should be applied when 'num' changes.
      let numVal = Number(newVal);

      if (isNaN(numVal)) {
         this._visible = false; // Hide if not a valid number.
      } else {
         this._visible = true; // Show if it's a number.
         // Assuming 'this' refers to the MovieClip that contains different digit frames.
         // gotoAndStop(numVal + 2) implies that frame 2 is for digit 0, frame 3 for digit 1, etc.
         if (typeof this.gotoAndStop === 'function') {
            this.gotoAndStop(numVal + 2); // Jump to the frame corresponding to the number.
         }
      }
      return newVal; // Return newVal to complete the watch (AS specific).
   };

   // To emulate `this.watch("num", numberwatcher);` in modern JavaScript:
   // You would typically define a setter for 'num' on this class/object.
   Object.defineProperty(this, 'num', {
      set: function(value) {
         this._numValue = value; // Store the actual value.
         numberwatcher.call(this, 'num', this._numValue, value); // Call the logic in the context of 'this'.
      },
      get: function() {
         return this._numValue;
      },
      configurable: true // Allows re-defining if needed
   });

   // Trigger the setter once with the initial 'num' value, as in ActionScript.
   // This assumes 'num' might already have a value assigned when this script runs.
   // If 'num' is not explicitly declared as a var or initialized before this script,
   // it might be undefined, leading to `isNaN(undefined)` being true and `_visible` becoming false.
   if (typeof this.num !== 'undefined') {
       this.num = this.num; // Trigger the setter
   } else {
       // If `num` is truly undefined initially, you might want a default.
       // e.g., this.num = 0; // Or whatever default is appropriate for your number display
   }
}

// How this might be structured in a JavaScript class (conceptual, assuming MovieClip base):
/*
class NumberDisplayClip extends MovieClip {
   constructor() {
      super();
      this.stop();
      this._numValue = undefined; // Internal storage for the 'num' value.

      Object.defineProperty(this, 'num', {
         set: function(value) {
            this._numValue = value;
            let numVal = Number(value);

            if (isNaN(numVal)) {
               this._visible = false;
            } else {
               this._visible = true;
               this.gotoAndStop(numVal + 2); // Assuming this.gotoAndStop exists
            }
         },
         get: function() {
            return this._numValue;
         },
         configurable: true
      });

      // Initialize 'num' to a default or trigger the setter if already set.
      // Example: this.num = 0; // Set a default initial number
   }
}
*/