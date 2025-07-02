/**
 * ActionScript code for `DefineSprite_287`, frame 1's `DoAction` script.
 * This script defines a `moveobj` function used for parallax scrolling or
 * moving background elements. It calculates the `_x`, `_y`, `_xscale`, `_yscale`
 * of the MovieClip based on `ppx` (player position x), `py` (player position y),
 * `scale`, and `scalechange` parameters. It also controls the visibility
 * of child "unit" MovieClips (`unit1_mc`, `unit2_mc`, etc.) based on their position
 * relative to certain calculated bounds.
 *
 * This is similar to `DefineSprite_283/frame_1/DoAction.txt` but with different
 * calculations and unit MovieClips involved.
 *
 * In JavaScript, this would be part of a background element's class or a parallax manager.
 * Assumes `this` refers to the MovieClip instance, and it has child MovieClips
 * like `unit1_mc`, `unit2_mc`, etc., and a `unitwidth` property.
 */
function DoAction_DefineSprite_287_frame_1() {
   // Assuming 'this' refers to the MovieClip instance (e.g., a background layer).

   this.stop(); // Stop the MovieClip's timeline by default.

   // Properties initialized once when the script runs.
   // `unitwidth` is the distance between `unit1_mc` and `unit2_mc`.
   let unitwidth = this.unit2_mc._x - this.unit1_mc._x;

   /**
    * Moves the background object and controls visibility of its units for parallax.
    * @param {number} ppx - Player's X position.
    * @param {number} py - Player's Y position.
    * @param {number} scale - Scale factor for the object.
    * @param {boolean} scalechange - Flag indicating if scale should be updated.
    */
   this.moveobj = function(ppx, py, scale, scalechange) {
      if (scalechange) {
         // Apply scale to both X and Y.
         this._yscale = scale;
         this._xscale = scale;
      }

      // Calculate X and Y positions based on `ppx` (player position x) and `py` (player position y).
      // The modulo operator `%` creates a repeating pattern.
      this._x = ppx % unitwidth * scale / 100;
      this._y = py * 150 * scale / 100;

      // Define bounds for child unit visibility.
      let _loc3_ = (450 - this._x) * 100 / scale; // Right boundary.
      let _loc4_ = (-250 - this._x) * 100 / scale - unitwidth; // Left boundary.

      // Control visibility of child unit MovieClips.
      // Assumes `unitX_mc` are child MovieClips with `_visible` and `_x` properties.
      if (this.unit1_mc) { this.unit1_mc._visible = this.unit1_mc._x > _loc4_; }
      if (this.unit2_mc) { this.unit2_mc._visible = this.unit2_mc._x > _loc4_; }
      if (this.unit4_mc) { this.unit4_mc._visible = this.unit4_mc._x < _loc3_; }
      if (this.unit5_mc) { this.unit5_mc._visible = this.unit5_mc._x < _loc3_; }
      if (this.unit6_mc) { this.unit6_mc._visible = this.unit6_mc._x < _loc3_; }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class ParallaxLayer287 extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      // Mock child unit MovieClips
      this.unit1_mc = { _x: 0, _visible: true };
      this.unit2_mc = { _x: 100, _visible: true };
      this.unit4_mc = { _x: 300, _visible: true };
      this.unit5_mc = { _x: 400, _visible: true };
      this.unit6_mc = { _x: 500, _visible: true };

      this.unitwidth = this.unit2_mc._x - this.unit1_mc._x;
   }

   moveobj(ppx, py, scale, scalechange) {
      if (scalechange) {
         this._yscale = scale;
         this._xscale = scale;
      }

      this._x = (ppx % this.unitwidth) * scale / 100;
      this._y = py * 150 * scale / 100;

      const rightBound = (450 - this._x) * 100 / scale;
      const leftBound = (-250 - this._x) * 100 / scale - this.unitwidth;

      if (this.unit1_mc) { this.unit1_mc._visible = this.unit1_mc._x > leftBound; }
      if (this.unit2_mc) { this.unit2_mc._visible = this.unit2_mc._x > leftBound; }
      if (this.unit4_mc) { this.unit4_mc._visible = this.unit4_mc._x < rightBound; }
      if (this.unit5_mc) { this.unit5_mc._visible = this.unit5_mc._x < rightBound; }
      if (this.unit6_mc) { this.unit6_mc._visible = this.unit6_mc._x < rightBound; }
   }
}
*/