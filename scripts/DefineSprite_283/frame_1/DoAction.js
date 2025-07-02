/**
 * ActionScript code for `DefineSprite_283`, frame 1's `DoAction` script.
 * This script defines a `moveobj` function used for parallax scrolling or
 * moving background elements. It calculates the `_x`, `_y`, `_xscale`, `_yscale`
 * of the MovieClip based on `ppx` (player position x), `py` (player position y),
 * `mainscale`, and `scalechange` parameters. It also controls the visibility
 * of child "unit" MovieClips (`unit1_mc`, `unit2_mc`, etc.) based on their position
 * relative to certain calculated bounds.
 *
 * In JavaScript, this would be part of a background element's class or a parallax manager.
 * Assumes `this` refers to the MovieClip instance, and it has child MovieClips
 * like `unit1_mc`, `unit2_mc`, etc., and properties `size`, `z`, `unitwidth`, `mcwidth`, `scale`.
 */
function DoAction_DefineSprite_283_frame_1() {
   // Assuming 'this' refers to the MovieClip instance (e.g., a background layer).

   this.stop(); // Stop the MovieClip's timeline by default.

   // Properties initialized once when the script runs.
   let size = 0.5;
   let z = 1;
   let unitwidth = this.unit2_mc._x - this.unit1_mc._x; // Distance between unit MovieClips.
   let mcwidth = this.unit1_mc._width; // Width of a single unit MovieClip.
   let scale; // Will be calculated in moveobj.

   /**
    * Moves the background object and controls visibility of its units for parallax.
    * @param {number} ppx - Player's X position.
    * @param {number} py - Player's Y position.
    * @param {number} mainscale - Main scale factor for scaling the object.
    * @param {boolean} scalechange - Flag indicating if scale should be updated.
    */
   this.moveobj = function(ppx, py, mainscale, scalechange) {
      if (scalechange) {
         // Calculate new scale based on mainscale and 'z' (depth-like factor).
         this.scale = 100 / (100 / mainscale + z) / size;
         // Apply scale to both X and Y.
         this._yscale = this.scale;
         this._xscale = this.scale;
      }

      // Calculate X and Y positions.
      this._x = ppx / (1 + z) % unitwidth / 100 * this.scale;
      this._y = py * size * 150 * (this.scale / 100);

      // Define bounds for child unit visibility.
      // Note: _loc2_ and _loc3_ are calculated using 'scale', which is 'this.scale' here.
      let _loc2_ = (450 - this._x) * 100 / this.scale; // Right boundary.
      let _loc3_ = (-250 - this._x) * 100 / this.scale - mcwidth; // Left boundary.

      // Control visibility of child unit MovieClips.
      // Assumes `unitX_mc` are child MovieClips with `_visible` and `_x` properties.
      if (this.unit1_mc) { this.unit1_mc._visible = this.unit1_mc._x > _loc3_; }
      if (this.unit2_mc) { this.unit2_mc._visible = this.unit2_mc._x > _loc3_; }
      if (this.unit3_mc) { this.unit3_mc._visible = true; } // unit3_mc is always visible.
      if (this.unit4_mc) { this.unit4_mc._visible = this.unit4_mc._x < _loc2_; }
      if (this.unit5_mc) { this.unit5_mc._visible = this.unit5_mc._x < _loc2_; }
      if (this.unit6_mc) { this.unit6_mc._visible = this.unit6_mc._x < _loc2_; }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class ParallaxLayer283 extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      this.size = 0.5;
      this.z = 1;
      // Mock child unit MovieClips
      this.unit1_mc = { _x: 0, _width: 100, _visible: true };
      this.unit2_mc = { _x: 100, _width: 100, _visible: true };
      this.unit3_mc = { _x: 200, _visible: true };
      this.unit4_mc = { _x: 300, _visible: true };
      this.unit5_mc = { _x: 400, _visible: true };
      this.unit6_mc = { _x: 500, _visible: true };

      this.unitwidth = this.unit2_mc._x - this.unit1_mc._x;
      this.mcwidth = this.unit1_mc._width;
      this.scale = 100; // Default initial scale
   }

   moveobj(ppx, py, mainscale, scalechange) {
      if (scalechange) {
         this.scale = 100 / (100 / mainscale + this.z) / this.size;
         this._yscale = this.scale;
         this._xscale = this.scale;
      }

      this._x = ppx / (1 + this.z) % this.unitwidth / 100 * this.scale;
      this._y = py * this.size * 150 * (this.scale / 100);

      const rightBound = (450 - this._x) * 100 / this.scale;
      const leftBound = (-250 - this._x) * 100 / this.scale - this.mcwidth;

      if (this.unit1_mc) { this.unit1_mc._visible = this.unit1_mc._x > leftBound; }
      if (this.unit2_mc) { this.unit2_mc._visible = this.unit2_mc._x > leftBound; }
      if (this.unit3_mc) { this.unit3_mc._visible = true; }
      if (this.unit4_mc) { this.unit4_mc._visible = this.unit4_mc._x < rightBound; }
      if (this.unit5_mc) { this.unit5_mc._visible = this.unit5_mc._x < rightBound; }
      if (this.unit6_mc) { this.unit6_mc._visible = this.unit6_mc._x < rightBound; }
   }
}
*/