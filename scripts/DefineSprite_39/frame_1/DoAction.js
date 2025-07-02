/**
 * ActionScript code for `DefineSprite_39`, frame 1's `DoAction` script.
 * This script initializes the `num` property of three number-displaying
 * MovieClips: `n1_mc`, `n2_mc`, and `n3_mc`. This is likely used for
 * setting an initial numerical display, such as a version number or a count.
 *
 * In JavaScript, this translates to direct assignments to properties
 * of display objects.
 * It assumes `this` refers to the MovieClip instance, and it has `n1_mc`, `n2_mc`,
 * and `n3_mc` children, each with a `num` property.
 */
function DoAction_DefineSprite_39_frame_1() {
   // Assuming 'this' refers to the MovieClip instance.
   this.stop(); // Stop the MovieClip's timeline by default.

   // Initialize number MovieClips.
   // Assumes `n1_mc`, `n2_mc`, `n3_mc` are child MovieClips with a `num` property.
   if (this.n1_mc) { this.n1_mc.num = 0; }
   if (this.n2_mc) { this.n2_mc.num = 0; }
   if (this.n3_mc) { this.n3_mc.num = 1; } // Sets to 1, possibly for "1.00" or similar.
}

// How this might be structured in a JavaScript class (conceptual):
/*
class NumberSetDisplay extends MovieClip { // Assuming MovieClip base class
   constructor() {
      super();
      this.stop();
      // Mock child MovieClips with num properties.
      this.n1_mc = { num: null };
      this.n2_mc = { num: null };
      this.n3_mc = { num: null };

      this.onFrame1Action(); // Call on instantiation
   }

   onFrame1Action() {
      if (this.n1_mc) { this.n1_mc.num = 0; }
      if (this.n2_mc) { this.n2_mc.num = 0; }
      if (this.n3_mc) { this.n3_mc.num = 1; }
   }
}
*/