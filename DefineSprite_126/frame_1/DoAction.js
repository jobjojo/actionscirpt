/**
 * ActionScript code for `DefineSprite_126`, frame 1's `DoAction` script.
 * This script is responsible for displaying a "best record" score.
 * It retrieves the 'best' score from a 'control' object (GameControl),
 * formats it to display with decimal places, and then assigns individual
 * characters of the score string to number-displaying MovieClips (n1_mc, n2_mc, etc.).
 *
 * In JavaScript, this would be part of a class that represents the score display
 * UI component, and `view()` would be a method called to update it.
 * Assumes `control` is an instance of `GameControl`, and `nX_mc` are child
 * display objects with a `num` property to set the displayed digit.
 */
function DoAction_DefineSprite_126_frame_1() {
   // Assuming 'this' refers to the MovieClip containing the score display.
   // And `control` is a global or accessible instance of GameControl.

   /**
    * Updates the displayed best score.
    */
   this.view = function() {
      let best;
      // Check if 'control' exists and is not null.
      if (typeof control === 'undefined' || control === null) {
         best = "0.00"; // Default best score if control is not available.
      } else {
         best = control.best; // Get the best score from the control object.
      }

      // Assign characters of the 'best' score string to individual number MovieClips.
      // This assumes a fixed format for 'best' (e.g., "XX.YY" or similar, where length determines digit position).
      // The original code uses negative indices for `charAt` which works in AS, but might need adjustment for robustness in JS if string is shorter.
      // For direct conversion, assuming `best` is always long enough or `charAt` handles out-of-bounds gracefully (returns empty string).
      // Note: JavaScript's charAt behaves slightly differently with negative indices (returns empty string),
      // so we assume the string length is sufficient for these accesses.
      if (this.n1_mc) { this.n1_mc.num = best.charAt(best.length - 1); }
      if (this.n2_mc) { this.n2_mc.num = best.charAt(best.length - 2); }
      if (this.n4_mc) { this.n4_mc.num = best.charAt(best.length - 4); }
      if (this.n5_mc) { this.n5_mc.num = best.charAt(best.length - 5); }
      if (this.n6_mc) { this.n6_mc.num = best.charAt(best.length - 6); }
      if (this.n7_mc) { this.n7_mc.num = best.charAt(best.length - 7); }
      if (this.n8_mc) { this.n8_mc.num = best.charAt(best.length - 8); }
      if (this.n9_mc) { this.n9_mc.num = best.charAt(best.length - 9); }
      if (this.n10_mc) { this.n10_mc.num = best.charAt(best.length - 10); }
   };

   this.stop(); // Stop the MovieClip's timeline.
   this.view(); // Call the view function immediately to display the score.
}

// How this might be structured in a JavaScript class (conceptual):
/*
class ScoreDisplay extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      // Assume n1_mc, n2_mc etc. are properties (child display objects)
      // initialized elsewhere or created dynamically.
      this.n1_mc = { num: '' }; // Mock for demonstration
      this.n2_mc = { num: '' };
      this.n4_mc = { num: '' };
      // ... and so on for n5 to n10

      this.stop();
      this.view(); // Initial display
   }

   view() {
      let bestScore;
      if (typeof window.control === 'undefined' || window.control === null) {
         bestScore = "0.00";
      } else {
         bestScore = window.control.best; // Assuming window.control is the GameControl instance
      }

      // Safe access using optional chaining or defensive checks
      if (this.n1_mc) { this.n1_mc.num = bestScore.charAt(bestScore.length - 1); }
      if (this.n2_mc) { this.n2_mc.num = bestScore.charAt(bestScore.length - 2); }
      if (this.n4_mc) { this.n4_mc.num = bestScore.charAt(bestScore.length - 4); }
      if (this.n5_mc) { this.n5_mc.num = bestScore.charAt(bestScore.length - 5); }
      if (this.n6_mc) { this.n6_mc.num = bestScore.charAt(bestScore.length - 6); }
      if (this.n7_mc) { this.n7_mc.num = bestScore.charAt(bestScore.length - 7); }
      if (this.n8_mc) { this.n8_mc.num = bestScore.charAt(bestScore.length - 8); }
      if (this.n9_mc) { this.n9_mc.num = bestScore.charAt(bestScore.length - 9); }
      if (this.n10_mc) { this.n10_mc.num = bestScore.charAt(bestScore.length - 10); }
   }
}
*/