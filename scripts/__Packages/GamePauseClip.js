class GamePauseClip extends MovieClip {
   static masterpauseflag = false;
   static rootclip = null; // Represents the head of a linked list of GamePauseClip instances.

   constructor() {
      super(); // Call the constructor of the MovieClip base class.

      this.addlist(); // Add this instance to the global linked list.
      this.pauseflag = GamePauseClip.masterpauseflag; // Initialize pause state from master flag.
      this.stopflag = false; // Flag to indicate if this clip is explicitly stopped.

      // In ActionScript, watch() is used for property change notification.
      // In JavaScript, a setter for 'onEnterFrame' would be a more direct equivalent
      // to handle when the onEnterFrame function is assigned.
      // For a direct conversion, we'll assume a mechanism where 'onEnterFrame'
      // can be directly assigned as a function. The original watch() setup
      // effectively redirects the 'onEnterFrame' property to call 'enterframe()'
      // while storing the actual assigned function in 'enterframesub'.

      // A simple way to emulate this is to have 'enterframesub' as the actual
      // function that gets called, and 'onEnterFrame' as the entry point
      // that checks the pause flag.
      this.enterframesub = null; // This will hold the user-defined onEnterFrame logic.

      // To replicate the `watch` behavior:
      Object.defineProperty(this, 'onEnterFrame', {
         set: function(newVal) {
            this.enterframesub = newVal;
            // When onEnterFrame is set, it effectively replaces the normal
            // frame-by-frame execution with our controlled 'enterframe' method,
            // which then calls 'enterframesub' if not paused.
            // In a real JS game engine, you'd hook into the engine's update loop here.
            // For this conversion, we assume a system where setting this
            // property automatically registers it for frame updates.
            // Returning `this.enterframe` from an AS3 watch setter makes the
            // original property itself become the wrapper function.
            // Here, we just store `newVal` and rely on a separate loop
            // to call `this.enterframe()` if it's active.
         },
         get: function() {
            // This getter might not be strictly necessary depending on how
            // `onEnterFrame` is consumed, but included for completeness.
            return this.enterframesub;
         }
      });
   }

   onUnload() {
      this.removelist(); // Remove this instance from the global linked list.
      // Assuming a global Sound class with a stop method.
      // In JS, you'd manage sound instances more directly.
      // For now, a placeholder:
      // if (typeof Sound !== 'undefined' && Sound.prototype.stop) {
      //    new Sound(this).stop();
      // }
      console.log("GamePauseClip: onUnload called, sound stopped."); // Placeholder
   }

   addlist() {
      this.prevclip = null;
      this.nextclip = GamePauseClip.rootclip; // New clip points to the current root.
      if (GamePauseClip.rootclip !== null) {
         GamePauseClip.rootclip.prevclip = this; // Old root points back to new clip.
      }
      GamePauseClip.rootclip = this; // New clip becomes the new root.
   }

   removelist() {
      if (this.nextclip !== null) {
         this.nextclip.prevclip = this.prevclip; // Link next clip to previous clip.
      }
      if (this.prevclip !== null) {
         this.prevclip.nextclip = this.nextclip; // Link previous clip to next clip.
      } else {
         GamePauseClip.rootclip = this.nextclip; // If no previous, this was the root, so update root.
      }
   }

   countlist() {
      let current = GamePauseClip.rootclip;
      let count = 0;
      while (current !== null) {
         count++;
         current = current.nextclip;
      }
      return count;
   }

   // This is the actual frame-by-frame update logic that gets triggered
   // by the "engine" if the clip is not paused.
   enterframe() {
      if (!this.pauseflag && this.enterframesub !== null) {
         this.enterframesub(); // Call the user-defined onEnterFrame logic.
      }
   }

   pausetoggle() {
      if (this.pauseflag) {
         this.pauseplay();
      } else {
         this.pausestop();
      }
   }

   pausestop() {
      this.pauseflag = true;
      super.stop(); // Call the base MovieClip's stop method.
   }

   pauseplay() {
      this.pauseflag = false;
      if (!this.stopflag) {
         super.play(); // Call the base MovieClip's play method.
      }
   }

   allpausestop() {
      let current = GamePauseClip.rootclip;
      GamePauseClip.masterpauseflag = true;
      while (current !== null) {
         current.pausestop();
         current = current.nextclip;
      }
   }

   allpauseplay() {
      let current = GamePauseClip.rootclip;
      GamePauseClip.masterpauseflag = false;
      while (current !== null) {
         current.pauseplay();
         current = current.nextclip;
      }
   }

   allpausetoggle() {
      if (GamePauseClip.masterpauseflag) {
         this.allpauseplay();
      } else {
         this.allpausestop();
      }
      return GamePauseClip.masterpauseflag;
   }

   prevFrame() {
      this.stopflag = true;
      super.prevFrame(); // Call base MovieClip's prevFrame.
   }

   nextFrame() {
      this.stopflag = true;
      super.nextFrame(); // Call base MovieClip's nextFrame.
   }

   gotoAndPlay(frame) {
      this.stopflag = false;
      if (!this.pauseflag) {
         super.gotoAndPlay(frame); // Call base MovieClip's gotoAndPlay.
      } else {
         super.gotoAndStop(frame); // If paused, just go to frame and stop.
      }
   }

   gotoAndStop(frame) {
      this.stopflag = true;
      super.gotoAndStop(frame); // Call base MovieClip's gotoAndStop.
   }

   stop() {
      this.stopflag = true;
      super.stop(); // Call base MovieClip's stop.
   }

   play() {
      this.stopflag = false;
      if (!this.pauseflag) {
         super.play(); // Call base MovieClip's play.
      }
   }
}