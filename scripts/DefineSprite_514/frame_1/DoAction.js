/**
 * ActionScript code for `DefineSprite_514`, frame 1's `DoAction` script.
 * This script defines functions and behavior for an input meter component,
 * likely for setting initial angle and power before a game action.
 * It includes:
 * - `clearevent()`: Clears a `setInterval` timer.
 * - `meter1()`: Updates the rotation of `meter1_mc` for angle input.
 * - `meter2()`: Updates the scaling of `meter2_mc` for power input.
 * It also initializes various properties, sets up event handlers for mouse
 * interaction (down and up) to transition between angle and power input,
 * and triggers game start.
 *
 * In JavaScript, this would be part of an input meter UI component class.
 * It assumes `this` refers to the `DefineSprite_514` MovieClip instance, and it interacts with
 * `control` (GameControl object), `meter1_mc`, `meter2_mc`, `release_mc`, `press_mc` (child MovieClips),
 * `btn` (a button object), and global `getTimer()`, `setInterval()`, `clearInterval()` functions.
 */
function DoAction_DefineSprite_514_frame_1() {
   // Assuming 'this' refers to the MovieClip instance of the input meter.

   this.stop(); // Stop the MovieClip's timeline by default.

   let intervalid; // Variable to hold the setInterval ID.
   let starttime; // Timestamp for animation timing.
   const rate1 = 0.18; // Rate for meter1 rotation.
   const rate2 = 0.3; // Rate for meter2 scaling.

   // Initial cleanup of any existing interval.
   this.clearevent(); // Call clearevent to ensure a clean state.

   // Clear existing mouse event handlers (if any were set externally or on previous frames).
   this.onMouseUp = null; // Or `delete this.onMouseUp;`
   this.onMouseDown = null; // Or `delete this.onMouseDown;`

   // Set initial visibility for release_mc.
   if (this.release_mc) { this.release_mc._visible = false; }

   // Reset scale for meter2_mc.
   if (this.meter2_mc) {
      this.meter2_mc._xscale = 0;
      this.meter2_mc._yscale = 0;
   }

   // Initialize start time and start the first meter animation.
   starttime = getTimer(); // Conceptual `Date.now()` or `performance.now()`.
   intervalid = setInterval(this.meter1.bind(this), 1); // Start meter1 updates every 1ms.


   /**
    * Clears the active `setInterval` timer.
    */
   this.clearevent = function() {
      if (intervalid !== undefined) {
         clearInterval(intervalid);
      }
   };

   /**
    * Updates the rotation of `meter1_mc` for angle input.
    * This function is designed to be called by `setInterval`.
    */
   this.meter1 = function() {
      let time = getTimer() - starttime;
      // Calculate value based on time and rate, then modulo 180 for rotation within range.
      let val = Math.round(time * rate1 % 180);
      // Rotate meter1_mc based on the value, clamping within a range (-90 to 90 degrees if center is 0).
      if (this.meter1_mc) {
         this.meter1_mc._rotation = -Math.min(val, 180 - val);
      }
      // `updateAfterEvent()` is an AS2 function to force a screen update.
      // In JS, this is typically handled by the animation loop (`requestAnimationFrame`).
      // For conversion, this is a conceptual hint.
      if (typeof updateAfterEvent === 'function') { updateAfterEvent(); } // Conceptual
   };

   /**
    * Updates the scaling of `meter2_mc` for power input.
    * This function is designed to be called by `setInterval`.
    */
   this.meter2 = function() {
      let time = getTimer() - starttime;
      // Calculate value based on time and rate, then modulo 200 for scale within range.
      let val = Math.round(time * rate2 % 200);
      // Scale meter2_mc, clamping within a range.
      if (this.meter2_mc) {
         this.meter2_mc._xscale = Math.min(val, 200 - val);
         this.meter2_mc._yscale = this.meter2_mc._xscale;
      }
      if (typeof updateAfterEvent === 'function') { updateAfterEvent(); } // Conceptual
   };

   // `onUnload` handler for cleanup.
   this.onUnload = this.clearevent; // Ensure interval is cleared when MovieClip is unloaded.

   // `onMouseDown` handler to transition from angle input to power input.
   this.onMouseDown = () => { // Use arrow function to preserve 'this' context.
      // Check if button is not rolled over (assuming `btn` is a button object).
      if (!this.btn || !this.btn.roll) {
         clearInterval(intervalid); // Stop meter1 interval.
         this.onMouseDown = null; // Clear this mouse down listener.

         // Update visibility of UI elements.
         if (this.release_mc) { this.release_mc._visible = true; }
         if (this.press_mc) { this.press_mc._visible = false; }

         starttime = getTimer(); // Reset start time for meter2.
         intervalid = setInterval(this.meter2.bind(this), 1); // Start meter2 updates every 1ms.

         // Set up `onMouseUp` handler to finalize input and start game.
         this.onMouseUp = () => { // Use arrow function to preserve 'this' context.
            clearInterval(intervalid); // Stop meter2 interval.
            this.onMouseDown = null; // Clear mouse listeners.
            this.onMouseUp = null;

            // Store final angle and power in `control` object.
            // Assumes `control` has `i_angle`, `i_power` properties.
            if (control) {
               if (this.meter1_mc) { control.i_angle = -this.meter1_mc._rotation; } // Store angle.
               if (this.meter2_mc) { control.i_power = this.meter2_mc._xscale; } // Store power.
               // Start the game via `control`.
               if (typeof control.gamestart === 'function') {
                  control.gamestart();
               }
            }

            // Update UI element visibility.
            if (this.press_mc) { this.press_mc._visible = false; }
            if (this.release_mc) { this.release_mc._visible = false; }

            if (typeof this.play === 'function') {
               this.play(); // Play the MovieClip's timeline.
            }
         };
      }
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class InputMeter extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.stop();

      // Mock child MovieClips
      this.meter1_mc = { _rotation: 0 };
      this.meter2_mc = { _xscale: 0, _yscale: 0 };
      this.release_mc = { _visible: false };
      this.press_mc = { _visible: true }; // Assuming initial visibility

      // Internal state
      this.intervalid = null;
      this.starttime = 0;
      this.rate1 = 0.18;
      this.rate2 = 0.3;

      // External dependencies mock
      window.getTimer = () => performance.now(); // Mock getTimer
      window.control = window.control || { // Mock control
          i_angle: 0, i_power: 0,
          gamestart: () => console.log("Game started")
      };
      this.btn = { roll: false }; // Mock button state
      window.updateAfterEvent = () => {}; // Mock for AS function

      this.onFrame1Action(); // Mimic AS execution
   }

   onFrame1Action() {
      // Bind methods to 'this'
      this.clearevent = this.clearevent.bind(this);
      this.meter1 = this.meter1.bind(this);
      this.meter2 = this.meter2.bind(this);

      this.clearevent(); // Initial clear
      this.onMouseUp = null;
      this.onMouseDown = null;

      if (this.release_mc) this.release_mc._visible = false;
      if (this.meter2_mc) { this.meter2_mc._xscale = 0; this.meter2_mc._yscale = 0; }

      this.starttime = window.getTimer();
      this.intervalid = setInterval(this.meter1, 1); // Bind for setInterval

      // Re-assign onMouseDown after initial clears, binding `this`
      this.onMouseDown = this._handleMouseDown.bind(this);
   }

   clearevent() {
      if (this.intervalid !== null) {
         clearInterval(this.intervalid);
         this.intervalid = null;
      }
   }

   meter1() {
      const time = window.getTimer() - this.starttime;
      const val = Math.round(time * this.rate1 % 180);
      if (this.meter1_mc) {
         this.meter1_mc._rotation = -Math.min(val, 180 - val);
      }
      window.updateAfterEvent();
   }

   meter2() {
      const time = window.getTimer() - this.starttime;
      const val = Math.round(time * this.rate2 % 200);
      if (this.meter2_mc) {
         this.meter2_mc._xscale = Math.min(val, 200 - val);
         this.meter2_mc._yscale = this.meter2_mc._xscale;
      }
      window.updateAfterEvent();
   }

   // Internal handler for onMouseDown to manage context
   _handleMouseDown() {
      if (!this.btn || !this.btn.roll) {
         clearInterval(this.intervalid);
         this.onMouseDown = null;

         if (this.release_mc) this.release_mc._visible = true;
         if (this.press_mc) this.press_mc._visible = false;

         this.starttime = window.getTimer();
         this.intervalid = setInterval(this.meter2, 1);

         this.onMouseUp = this._handleMouseUp.bind(this);
      }
   }

   // Internal handler for onMouseUp
   _handleMouseUp() {
      clearInterval(this.intervalid);
      this.onMouseDown = null;
      this.onMouseUp = null;

      if (window.control) {
         if (this.meter1_mc) window.control.i_angle = -this.meter1_mc._rotation;
         if (this.meter2_mc) window.control.i_power = this.meter2_mc._xscale;
         if (window.control.gamestart) window.control.gamestart();
      }

      if (this.press_mc) this.press_mc._visible = false;
      if (this.release_mc) this.release_mc._visible = false;

      this.play();
   }

   // onUnload property can be set externally, e.g., in a framework lifecycle hook
   // this.onUnload = this.clearevent;

   // Define onMouseDown/onMouseUp setters/getters to emulate AS behavior
   set onMouseDown(callback) { this._onMouseDownCallback = callback; /* Attach event listener */ }
   get onMouseDown() { return this._onMouseDownCallback; }
   set onMouseUp(callback) { this._onMouseUpCallback = callback; /* Attach event listener */ }
   get onMouseUp() { return this._onMouseUpCallback; }
}
*/