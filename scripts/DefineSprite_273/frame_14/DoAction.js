/**
 * ActionScript code for `DefineSprite_273`, frame 14's `DoAction` script.
 * This script is likely executed when transitioning from a "how-to" section
 * back to a main game state or menu. It stops the MovieClip's timeline,
 * starts playing background music (BGM) from a specific track, and hides/stops
 * the "how-to" MovieClip.
 *
 * In JavaScript, this would be part of a scene or UI manager's transition logic.
 * Assumes `this` refers to the MovieClip instance, and it interacts with `bgm_mc`
 * (a sound control object) and `howto_mc` (the how-to panel).
 */
function DoAction_DefineSprite_273_frame_14() {
   // Assuming 'this' refers to the MovieClip instance.
   this.stop(); // Stop the MovieClip's timeline.

   // Start background music.
   // Assumes `bgm_mc` is a child MovieClip or accessible object with `soundStart` method.
   if (this.bgm_mc && typeof this.bgm_mc.soundStart === 'function') {
      this.bgm_mc.soundStart(1); // Start BGM track 1.
   }

   // Hide and stop the "how-to" MovieClip.
   // Assumes `howto_mc` is a child MovieClip with `_visible` and `stop` properties.
   if (this.howto_mc) {
      this.howto_mc._visible = false;
      if (typeof this.howto_mc.stop === 'function') {
         this.howto_mc.stop();
      }
   }
}

// How this might be structured in a JavaScript class (conceptual):
/*
class UiSceneManager extends MovieClip { // Assuming MovieClip base
   constructor() {
      super();
      // Assume bgm_mc and howto_mc are child objects
      this.bgm_mc = { soundStart: (track) => console.log(`Starting BGM track ${track}`) }; // Mock
      this.howto_mc = { _visible: true, stop: () => console.log("Stopping howto_mc") }; // Mock
   }

   // Method called when frame 14's action script executes
   onFrame14Action() {
      this.stop();
      if (this.bgm_mc) {
         this.bgm_mc.soundStart(1);
      }
      if (this.howto_mc) {
         this.howto_mc._visible = false;
         this.howto_mc.stop();
      }
   }
}
*/