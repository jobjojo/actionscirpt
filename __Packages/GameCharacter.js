/**
 * Represents a game character.
 * This is a JavaScript conversion of the original ActionScript class.
 *
 * It assumes the existence of a base class `GamePauseClip` which would handle
 * display object properties (like x, y, visibility) and animation methods
 * (like play, gotoAndStop, getBounds), similar to a class from a rendering
 * library like PixiJS or Phaser.
 */
class GameCharacter extends GamePauseClip {
   constructor() {
      super();

      // --- Property Initialization ---
      // Flags and state
      this.toggleflag = false;
      this.pass = false;
      this.active = true;
      this.specialwait = false;
      this.busy = false;

      // External dependencies/objects that should be assigned from elsewhere
      this.controll = null;
      this.code = null;
      this.charaface = null; // e.g., another display object for the character's face

      // Position and dimension properties
      this.px = 0;
      this.hitx = 0;
      this.hity = 0;
      this.hitminx = 0;
      this.hitmaxx = 0;
      this.hitmaxy = 0;

      // View and animation-related maximums
      this.viewmaxx = 0;
      this.specialmaxx = 0;
      this.combomaxx = 0;
      this.blockmaxx = 0;
      this.crashmaxx = 0;

      // Character-specific properties
      this.charatype = ""; // e.g., 'youko', 'miki'

      // Placeholder for methods that subclasses are expected to implement
      this.moveobjsub = () => {};
      this.passact = () => {};
      this.stand = () => {}; // Corresponds to the this.stand() call

      // --- Initial State from Original Constructor ---
      // In a modern JS engine, these might be `x`, `y`, and `visible`
      this._x = 5000;
      this._y = 0;
      this._visible = false;

      // In ActionScript, getBounds was a global function. In modern JS libraries,
      // it's typically a method of the object itself.
      const bounds = this.getBounds(); // Changed from getBounds(this)
      this.standminx = bounds.xMin;
      this.standmaxx = bounds.xMax;
   }

   setposition(position) {
      this.busy = true;
      this.active = true;
      this.pass = false;
      this.px = position;
      this.hitminx = position + this.hitx - 0.5;
      this.hitmaxx = position + this.hitx + 0.5;
      this.hitmaxy = this.hity + 0.5;
      this.viewmaxx = this.standmaxx;

      // Assumes the base class has animation methods
      this.gotoAndStop("stand");
      this.stand();
   }

   moveobj(posx, posy, scale, xmin, xmax) {
      this.toggleflag = !this.toggleflag;

      if (this.busy) {
         this._x = (this.px - posx) * 150;

         if (this.pass) {
            this.charaface._visible = false;
            if (this._x + this.viewmaxx > xmin) {
               this._visible = true;
               this.moveobjsub();
            } else {
               this._visible = false;
               if (this._x <= -1350) {
                  if (this.charatype !== this.code.youko || !this.controll.youko) {
                     this.busy = false;
                     this.controll.setchara(this);
                  }
               }
            }
         } else {
            if (this.toggleflag && this.px - posx < 29) {
               this.charaface.view(this._x, scale);
            }

            if (this._x + this.standminx < xmax) {
               this._visible = true;
               this.moveobjsub();

               if (this.px - posx < -1) {
                  this.pass = true;
                  this.controll.setspecial(this.code.nanaka, (this.px % 100) === 90);
                  this.passact();
               } else if (this.specialwait) {
                  switch (this.controll.special.getstatus()) {
                     case 0:
                        this.specialwait = false;
                        this.play();
                        break;
                     case 1:
                        this.specialwait = false;
                        this.viewmaxx = this.specialmaxx;
                        this.gotoAndPlay("special");
                        break;
                  }
               } else if (this.active && this.hitminx < posx && this.hitmaxx > posx && this.hitmaxy > posy && this.controll.hitenabled) {
                  this.active = false;
                  this.controll.slow(1000, 0);

                  if (this.controll.combo) {
                     this.controll.combo = false;
                     this.viewmaxx = this.combomaxx;
                     this.gotoAndPlay("combo");
                  } else if (this.controll.youko) {
                     this.viewmaxx = this.blockmaxx;
                     this.gotoAndPlay("block");
                  } else {
                     this.viewmaxx = this.crashmaxx;
                     this.gotoAndPlay("crash");
                  }
               }
            } else {
               this._visible = false;
            }
         }
      }
   }
}