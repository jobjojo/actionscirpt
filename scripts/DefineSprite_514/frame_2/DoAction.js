/**
 * ActionScript code for `DefineSprite_514`, frame 2's `DoAction` script.
 * This script retrieves the `i_angle` (initial angle) and `i_power` (initial power)
 * properties from the `control` object and then assigns them to local variables
 * `angle` and `power`. It then formats these values into strings with units
 * ("°" and "%") and assigns them to text fields (likely child text fields).
 *
 * In JavaScript, this would be part of a method or state logic within the input meter
 * UI component class.
 * It assumes `this` refers to the `DefineSprite_514` MovieClip instance, and it interacts with
 * `control` (GameControl object) and has `angle`, `power` (text fields or properties).
 */
function DoAction_DefineSprite_514_frame_2() {
   // Assuming 'this' refers to the MovieClip instance of the input meter.

   // Retrieve initial angle and power from `control`.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has `i_angle` and `i_power` properties.
   let angleVal = 0; // Use a distinct variable name to avoid conflict with potential 'angle' text field.
   let powerVal = 0; // Use a distinct variable name to avoid conflict with potential 'power' text field.

   if (typeof control !== 'undefined' && control.i_angle !== undefined) {
      angleVal = control.i_angle;
   }
   if (typeof control !== 'undefined' && control.i_power !== undefined) {
      powerVal = control.i_power;
   }

   // Format values into strings with units.
   const angleText = angleVal + "°";
   const powerText = powerVal + "%";

   // Assign formatted strings to display properties.
   // Assuming `angle` and `power` are direct properties that represent text fields.
   // If they are separate TextField MovieClips, it would be `this.angle_txt.text = angleText;`
   // For direct conversion, assuming `this.angle = ...` means updating the object property that holds the text.
   this.angle = angleText;
   this.power = powerText;
}

// How this might be structured in a JavaScript class (conceptual):
/*
class InputMeter extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      // ... other initialization ...
      // Mock properties if they are text fields (e.g., this.angle_txt.text)
      this.angle = ""; // Represents a displayable angle string
      this.power = ""; // Represents a displayable power string

      // External `control` object
      window.control = window.control || { // Mock control
          i_angle: 0, i_power: 0
      };
   }

   // Method that gets called when this frame's action executes
   onFrame2Action() {
      let angleValue = 0;
      let powerValue = 0;

      if (window.control && window.control.i_angle !== undefined) {
         angleValue = window.control.i_angle;
      }
      if (window.control && window.control.i_power !== undefined) {
         powerValue = window.control.i_power;
      }

      this.angle = angleValue + "°";
      this.power = powerValue + "%";
   }
}
*/