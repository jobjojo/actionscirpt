/**
 * ActionScript code for `DefineSprite_269`, frame 1's `DoAction` script.
 * This script likely manages a visual "slide-in/slide-out" effect for UI elements,
 * possibly related to a menu or content panel, including color transformations.
 * It defines functions `viewslide`, `inslide`, `outslide`, and an `init` function
 * for setting up buttons.
 *
 * In JavaScript, this would be part of a UI component or manager class.
 * Assumes `this` refers to the MovieClip instance, and it interacts with child MovieClips
 * (like `target_mc`, `unit1_mc`, etc.) and a global `Color` class.
 */
function DoAction_DefineSprite_269_frame_1() {
   // Assuming 'this' refers to the MovieClip that manages the sliding effects.

   // Properties for color transformation.
   // In JS, this would be an object with properties representing color matrix values.
   let colorobj = { aa: 100, ab: 0 }; // Initialize with alpha (aa) and alpha offset (ab).

   // Properties to track current slide-in/out states.
   let out_mc = null; // MovieClip currently sliding out.
   let in_mc = null; // MovieClip currently sliding in.
   let currentbtn_mc = this.aboutbtn_mc; // The currently active button/panel.

   // Constants for slide animation.
   const max = 10;
   const frames = 5;

   this.stop(); // Stop the MovieClip's timeline by default.

   /**
    * Updates the visual state of a sliding MovieClip.
    * @param {MovieClip} target_mc - The MovieClip being animated.
    */
   this.viewslide = function(target_mc) {
      if (!target_mc) return; // Defensive check.

      if (target_mc.pos === frames || target_mc.pos === -frames) {
         target_mc._visible = false;
         if (typeof target_mc.gotoAndStop === 'function') {
            target_mc.gotoAndStop(1); // Reset to first frame if at extremes.
         }
      } else {
         target_mc._visible = true;
         // Calculate X position based on `pos` and `max`/`frames`.
         target_mc._x = target_mc.pos * max / frames - 350;

         // Calculate color transformation values.
         // In JS, a `Color` class or direct manipulation of CSS/canvas context.
         colorobj.ra = 100 * (1 - Math.abs(target_mc.pos) / frames);
         colorobj.rb = 255 * Math.abs(target_mc.pos) / frames;
         colorobj.ga = colorobj.ra;
         colorobj.gb = colorobj.rb;
         colorobj.ba = colorobj.ra;
         colorobj.bb = colorobj.rb;

         // Apply color transformation. Assumes `target_mc.mycolor` is a Color instance.
         if (target_mc.mycolor && typeof target_mc.mycolor.setTransform === 'function') {
            target_mc.mycolor.setTransform(colorobj);
         }
      }
   };

   /**
    * Initiates a slide-in animation for a target MovieClip.
    * @param {MovieClip} target_mc - The MovieClip to slide in.
    */
   this.inslide = function(target_mc) {
      in_mc = target_mc; // Set the current "in" MovieClip.
      if (out_mc === target_mc) {
         out_mc = null; // Clear "out" if it's the same clip.
      }

      // `onEnterFrame` logic for continuous animation.
      // In JS, this would be a requestAnimationFrame loop or a ticker callback.
      target_mc.onEnterFrame = () => { // Using arrow function to preserve 'this' context.
         if (out_mc === null) { // Only animate if no other clip is sliding out.
            if (target_mc.pos > 0) {
               target_mc.pos -= 1;
            } else if (target_mc.pos < 0) {
               target_mc.pos += 1;
            } else {
               // Animation complete.
               in_mc = null;
               if (typeof target_mc.play === 'function') {
                  target_mc.play(); // Play the timeline after sliding in.
               }
               // Remove the `onEnterFrame` listener.
               target_mc.onEnterFrame = null; // or `delete target_mc.onEnterFrame;`
            }
            this.viewslide(target_mc); // Update visual state.
         }
      };
   };

   /**
    * Initiates a slide-out animation for a target MovieClip.
    * @param {MovieClip} target_mc - The MovieClip to slide out.
    */
   this.outslide = function(target_mc) {
      if (in_mc && in_mc.onEnterFrame) {
          in_mc.onEnterFrame = null; // Stop any ongoing slide-in for the current 'in_mc'.
      }

      if (out_mc === null) { // Only animate if no other clip is sliding out.
         if (typeof target_mc.stop === 'function') {
            target_mc.stop(); // Stop its timeline before sliding out.
         }
         out_mc = target_mc; // Set the current "out" MovieClip.

         // `onEnterFrame` logic for continuous animation.
         target_mc.onEnterFrame = () => {
            if ((target_mc.pos >= 0 && target_mc.pos < frames) ||
                (target_mc.pos < 0 && target_mc.pos > -frames)) {
               // Move away from center.
               if (target_mc.pos >= 0) {
                   target_mc.pos += 1;
               } else { // target_mc.pos < 0
                   target_mc.pos -= 1;
               }
            } else {
               // Animation complete.
               out_mc = null;
               // If a clip was sliding in, reverse its position for next slide.
               if (in_mc) {
                   in_mc.pos = -target_mc.pos;
               }
               // Remove the `onEnterFrame` listener.
               target_mc.onEnterFrame = null;
            }
            this.viewslide(target_mc); // Update visual state.
         };
      }
   };

   /**
    * Initializes a button for slide control.
    * @param {MovieClip} targetslide_mc - The MovieClip associated with this button (the content panel).
    */
   this.init = function(targetslide_mc) {
      this.useHandCursor = false; // Disable hand cursor for the button.
      this.targetslide_mc = targetslide_mc; // Associate button with its content panel.

      // Initial state of the button and its associated content panel.
      if (this === currentbtn_mc) {
         if (typeof this.gotoAndStop === 'function') {
            this.gotoAndStop(2); // Set button to "active" frame.
         }
         // Assumes Color class for `mycolor`.
         targetslide_mc.mycolor = new Color(targetslide_mc); // conceptual Color.
         targetslide_mc.pos = 0; // Set content panel to initial position.
         this.viewslide(targetslide_mc); // Update content panel visual.
      } else {
         targetslide_mc._visible = false;
         if (typeof this.gotoAndStop === 'function') {
            this.gotoAndStop(1); // Set button to "inactive" frame.
         }
         targetslide_mc.mycolor = new Color(targetslide_mc); // conceptual Color.
         targetslide_mc.pos = -frames; // Set content panel to off-screen position.
         this.viewslide(targetslide_mc); // Update content panel visual.
         if (typeof targetslide_mc.stop === 'function') {
            targetslide_mc.stop(); // Stop content panel timeline.
         }
      }

      // Event listener for mouse roll over.
      // In JS, typically `onmouseover`.
      this.onRollOver = () => {
         if (this !== currentbtn_mc) { // Only react if not already the current button.
            if (typeof this.gotoAndStop === 'function') {
               this.gotoAndStop(2); // Set button to "hover" or "active" frame.
            }
            this.outslide(currentbtn_mc.targetslide_mc); // Slide out the old content.
            if (typeof currentbtn_mc.gotoAndStop === 'function') {
               currentbtn_mc.gotoAndStop(1); // Set old button to "inactive" frame.
            }
            currentbtn_mc = this; // Update the current active button.
            this.inslide(currentbtn_mc.targetslide_mc); // Slide in the new content.
         }
      };
   };

   // Initialize all buttons/panels with the `init` function.
   // Assumes `aboutbtn_mc`, `aerialbtn_mc`, etc. are child MovieClips.
   // And `about_mc`, `aerial_mc`, etc. are the associated content MovieClips.
   this.aboutbtn_mc.init = this.init;
   this.aerialbtn_mc.init = this.init;
   this.specialbtn_mc.init = this.init;
   this.charabtn_mc.init = this.init;

   // Call init for each button with its respective target content.
   this.aboutbtn_mc.init(this.about_mc);
   this.aerialbtn_mc.init(this.aerial_mc);
   this.specialbtn_mc.init(this.special_mc);
   this.charabtn_mc.init(this.chara_mc);
}

// How this might be structured in a JavaScript class (conceptual):
/*
class PanelSlider extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      this.colorobj = { aa: 100, ab: 0, ra: 0, rb: 0, ga: 0, gb: 0, ba: 0, bb: 0 };
      this.out_mc = null;
      this.in_mc = null;

      this.max = 10;
      this.frames = 5;

      // Assuming child buttons and panels are already attached or dynamically created
      // this.aboutbtn_mc = new Button(); this.about_mc = new MovieClip(); // Mocks
      // ... similar for other buttons and panels

      this.currentbtn_mc = this.aboutbtn_mc; // Initial active button.

      // Bind 'this' to methods if they are passed as callbacks
      this.viewslide = this.viewslide.bind(this);
      this.inslide = this.inslide.bind(this);
      this.outslide = this.outslide.bind(this);
      this.init = this.init.bind(this);

      // Initialize all buttons
      this.aboutbtn_mc.init = this.init;
      this.aerialbtn_mc.init = this.init;
      this.specialbtn_mc.init = this.init;
      this.charabtn_mc.init = this.init;

      this.aboutbtn_mc.init(this.about_mc);
      this.aerialbtn_mc.init(this.aerial_mc);
      this.specialbtn_mc.init(this.special_mc);
      this.charabtn_mc.init(this.chara_mc);
   }

   viewslide(target_mc) {
      if (!target_mc) return;

      if (target_mc.pos === this.frames || target_mc.pos === -this.frames) {
         target_mc._visible = false;
         target_mc.gotoAndStop(1);
      } else {
         target_mc._visible = true;
         target_mc._x = target_mc.pos * this.max / this.frames - 350;

         this.colorobj.ra = 100 * (1 - Math.abs(target_mc.pos) / this.frames);
         this.colorobj.rb = 255 * Math.abs(target_mc.pos) / this.frames;
         this.colorobj.ga = this.colorobj.ra;
         this.colorobj.gb = this.colorobj.rb;
         this.colorobj.ba = this.colorobj.ra;
         this.colorobj.bb = this.colorobj.rb;

         if (target_mc.mycolor && typeof target_mc.mycolor.setTransform === 'function') {
            target_mc.mycolor.setTransform(this.colorobj);
         }
      }
   }

   inslide(target_mc) {
      this.in_mc = target_mc;
      if (this.out_mc === target_mc) {
         this.out_mc = null;
      }
      target_mc.onEnterFrame = () => {
         if (this.out_mc === null) {
            if (target_mc.pos > 0) {
               target_mc.pos -= 1;
            } else if (target_mc.pos < 0) {
               target_mc.pos += 1;
            } else {
               this.in_mc = null;
               target_mc.play();
               target_mc.onEnterFrame = null;
            }
            this.viewslide(target_mc);
         }
      };
   }

   outslide(target_mc) {
      if (this.in_mc && this.in_mc.onEnterFrame) {
          this.in_mc.onEnterFrame = null;
      }

      if (this.out_mc === null) {
         target_mc.stop();
         this.out_mc = target_mc;
         target_mc.onEnterFrame = () => {
            if ((target_mc.pos >= 0 && target_mc.pos < this.frames) ||
                (target_mc.pos < 0 && target_mc.pos > -this.frames)) {
               if (target_mc.pos >= 0) {
                   target_mc.pos += 1;
               } else {
                   target_mc.pos -= 1;
               }
            } else {
               this.out_mc = null;
               if (this.in_mc) {
                   this.in_mc.pos = -target_mc.pos;
               }
               target_mc.onEnterFrame = null;
            }
            this.viewslide(target_mc);
         };
      }
   }

   init(targetslide_mc) {
      this.useHandCursor = false;
      this.targetslide_mc = targetslide_mc;

      if (this === this.currentbtn_mc) {
         this.gotoAndStop(2);
         targetslide_mc.mycolor = new Color(targetslide_mc);
         targetslide_mc.pos = 0;
         this.viewslide(targetslide_mc);
      } else {
         targetslide_mc._visible = false;
         this.gotoAndStop(1);
         targetslide_mc.mycolor = new Color(targetslide_mc);
         targetslide_mc.pos = -this.frames;
         this.viewslide(targetslide_mc);
         targetslide_mc.stop();
      }

      this.onRollOver = () => {
         if (this !== this.currentbtn_mc) {
            this.gotoAndStop(2);
            this.outslide(this.currentbtn_mc.targetslide_mc);
            this.currentbtn_mc.gotoAndStop(1);
            this.currentbtn_mc = this;
            this.inslide(this.currentbtn_mc.targetslide_mc);
         }
      };
   }
}
*/