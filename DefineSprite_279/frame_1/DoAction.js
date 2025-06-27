/**
 * ActionScript code for `DefineSprite_279`, frame 1's `DoAction` script.
 * This script defines a `moveobj` function used for parallax scrolling or
 * moving background elements. It calculates the x-position of the MovieClip
 * based on a `ppx` (player position x) value and then controls the visibility
 * of child "unit" MovieClips based on their position relative to certain bounds.
 *
 * This is similar to `DefineSprite_277/frame_1/DoAction.txt` but with different
 * scaling factors (e.g., `ppx / 200` vs `ppx / 300`).
 *
 * In JavaScript, this would be part of a background element's class or a parallax manager.
 * Assumes `this` refers to the MovieClip instance, and it has child MovieClips
 * like `unit1_mc`, `unit2_mc` and properties `unitwidth` and `mcwidth`.
 */
function DoAction_DefineSprite_279_frame_1() {
   // Assuming 'this' refers to the MovieClip instance (e.g., a background layer).

   // Properties for calculating movement and visibility.
   // These are initialized once when the script runs.
   let unitwidth = this.unit2_mc._x - this.unit1_mc._x; // Distance between unit MovieClips.
   let mcwidth = this.unit1_mc._width; // Width of a single unit MovieClip.

   this.stop(); // Stop the MovieClip's timeline by default.

   /**
    * Moves the background object and controls visibility of its units for parallax.
    * @param {number} ppx - Player's X position, used as a reference for background movement.
    */
   this.moveobj = function(ppx) {
      // Calculate the MovieClip's X position based on ppx, creating a repeating pattern.
      // The modulo operator `%` creates the repeating effect.
      this._x = Math.floor(ppx / 200) % unitwidth; // Different scaling factor here (200 vs 300 in 277).

      // Define bounds for child unit visibility.
      let _loc2_ = 450 - this._x; // Right boundary.
      let _loc3_ = -250 - this._x - mcwidth; // Left boundary.

      // Control visibility of child unit MovieClips.
      // Assumes `unit1_mc` and `unit2_mc` are child MovieClips with `_visible` properties.
      if (this.unit1_mc) { this.unit1_mc._visible = this.unit1_mc._x > _loc3_; }
      if (this.unit2_mc) { this.unit2_mc._visible = this.unit2_mc._x < _loc2_; }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class ParallaxBackgroundLayer279 extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      // Assume child unit MovieClips are already attached or dynamically created.
      this.unit1_mc = { _x: 0, _width: 100, _visible: true }; // Mock
      this.unit2_mc = { _x: 100, _width: 100, _visible: true }; // Mock

      this.unitwidth = this.unit2_mc._x - this.unit1_mc._x;
      this.mcwidth = this.unit1_mc._width;
   }

   moveobj(ppx) {
      this._x = Math.floor(ppx / 200) % this.unitwidth;

      const rightBound = 450 - this._x;
      const leftBound = -250 - this._x - this.mcwidth;

      if (this.unit1_mc) { this.unit1_mc._visible = this.unit1_mc._x > leftBound; }
      if (this.unit2_mc) { this.unit2_mc._visible = this.unit2_mc._x < rightBound; }
   }
}
*/