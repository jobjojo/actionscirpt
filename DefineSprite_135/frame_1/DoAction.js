/**
 * ActionScript code for `DefineSprite_135`, frame 1's `DoAction` script.
 * This script is for sound control within the game, specifically for background music (BGM).
 * It provides functions to stop, start (by track number), and restart the BGM.
 *
 * In JavaScript, this would be part of a sound manager class or a BGM control module.
 * It assumes `Sound` is a class that can handle audio playback.
 */
function DoAction_DefineSprite_135_frame_1() {
   // Assuming 'this' refers to the MovieClip containing the BGM sound.
   // And `bgm_sound` is an instance of a Sound class.
   let bgm_sound = null; // Initialize to null; will be created below.

   /**
    * Stops the background music.
    */
   this.soundStop = function() {
      if (bgm_sound && typeof bgm_sound.stop === 'function') {
         bgm_sound.stop();
      }
   };

   /**
    * Starts playing background music from a specific track.
    * @param {number} track - The track number to play (e.g., 1 for "bgm1", 2 for "bgm2").
    */
   this.soundStart = function(track) {
      // Assumes that frame numbers correspond to track numbers + 1.
      // So, track 1 goes to frame 2, track 2 goes to frame 3, etc.
      // `gotoAndStop` on 'this' (the MovieClip) implies changing the BGM source
      // or configuration based on the MovieClip's timeline frames.
      if (typeof this.gotoAndStop === 'function') {
         this.gotoAndStop(track + 1);
      }
   };

   /**
    * Restarts the currently playing background music.
    */
   this.soundRestart = function() {
      if (bgm_sound && typeof bgm_sound.stop === 'function') {
         bgm_sound.stop();
      }
      if (bgm_sound && typeof bgm_sound.start === 'function') {
         bgm_sound.start();
      }
   };

   this.stop(); // Stop the MovieClip's timeline by default.
   this._visible = false; // Make the MovieClip invisible.

   // Create a new Sound instance, associated with 'this' (the MovieClip).
   // In JS, `Sound` would be a Web Audio API or similar audio library wrapper.
   // For conversion, this is a conceptual instantiation.
   bgm_sound = new Sound(this); // conceptual Sound class.

   // Event handler for when the MovieClip is unloaded.
   // In JS, this would be a cleanup method (e.g., in a class destructor or component unmount).
   this.onUnload = function() {
      if (bgm_sound && typeof bgm_sound.stop === 'function') {
         bgm_sound.stop();
      }
      // Also, potentially nullify the reference to aid garbage collection.
      bgm_sound = null;
   };
}

// How this might be structured in a JavaScript class (conceptual):
/*
class BgmControl extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      this.bgm_sound = null; // Private/protected member

      this.stop();
      this._visible = false;

      // Initialize sound; this part is highly dependent on actual JS audio library.
      this.bgm_sound = new Sound(this); // Example: new Howl({ src: ['bgm.mp3'] });

      // Handle cleanup on destruction/unmount
      // this.onUnload = this.cleanup.bind(this); // Or integrated into a framework's lifecycle.
   }

   // cleanup() {
   //    if (this.bgm_sound) {
   //       this.bgm_sound.stop();
   //       this.bgm_sound = null;
   //    }
   // }

   soundStop() {
      if (this.bgm_sound && typeof this.bgm_sound.stop === 'function') {
         this.bgm_sound.stop();
      }
   }

   soundStart(track) {
      // Logic to load/play a specific track based on the 'track' number
      // This might involve changing the source of `bgm_sound` or selecting from preloaded sounds.
      // The AS `gotoAndStop(track + 1)` implies timeline management for sound.
      // In JS, it would be more direct sound playback.
      console.log(`Starting BGM track: ${track}`); // Placeholder
      // Example: this.bgm_sound.playTrack(track);
   }

   soundRestart() {
      if (this.bgm_sound) {
         if (typeof this.bgm_sound.stop === 'function') {
            this.bgm_sound.stop();
         }
         if (typeof this.bgm_sound.start === 'function') {
            this.bgm_sound.start(); // Or resume current track
         }
      }
   }
}
*/