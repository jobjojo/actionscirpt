/**
 * ActionScript code for `DefineSprite_135`, frame 3's `DoAction` script.
 * This script is part of a background music (BGM) control system.
 * It attaches a sound asset named "bgm1", sets its volume, and sets up
 * a callback function (`onSoundComplete`) to restart the sound after a delay
 * once it finishes playing. It then starts playing the sound.
 *
 * This is very similar to the script for frame 2, just with different sound asset and volume.
 *
 * In JavaScript, this would be part of a sound manager or BGM control module.
 * It assumes `bgm_sound` is an instance of a Sound class that can handle audio playback.
 */
function DoAction_DefineSprite_135_frame_3() {
   // Assuming 'bgm_sound' is an instance of a Sound class (e.g., from a Web Audio API wrapper or library).
   // It would have been initialized in frame 1 (DefineSprite_135/frame_1/DoAction.txt).

   if (typeof bgm_sound !== 'undefined' && bgm_sound !== null) {
      // Attach sound asset. In JS, this might be a `load` or `setSource` method.
      if (typeof bgm_sound.attachSound === 'function') {
         bgm_sound.attachSound("bgm1");
      }

      // Set volume.
      if (typeof bgm_sound.setVolume === 'function') {
         bgm_sound.setVolume(25);
      }

      // Define what happens when the sound completes.
      // In JS, this is typically an event listener (e.g., 'ended' event for Audio/Video elements).
      // Here, it's a direct property assignment of a function.
      bgm_sound.onSoundComplete = () => {
         // Call the `start` method with specific parameters (24 seconds, loop 1 time).
         // This implies a looping mechanism or a timed restart.
         // In JS, `start` might take different parameters, like `(delay, offset, duration)`.
         // The original (24, 1) likely means start at 24s offset, play once.
         if (typeof bgm_sound.start === 'function') {
            bgm_sound.start(24, 1); // Conceptual parameters based on AS context.
         }
      };

      // Start playing the sound immediately.
      if (typeof bgm_sound.start === 'function') {
         bgm_sound.start();
      }
   }
}

// How this might be structured in a JavaScript class (conceptual, building on BgmControl):
/*
// Assuming this code runs in the context of an BgmControl instance
// or is part of its internal frame logic.

// Inside BgmControl's internal frame update logic, when it processes frame 3:
// this.bgm_sound.attachSound("bgm1");
// this.bgm_sound.setVolume(25);
// this.bgm_sound.on('ended', () => { // Or 'onSoundComplete' if it's a custom event
//    this.bgm_sound.start(24, 1); // Or appropriate JS audio API call
// });
// this.bgm_sound.start(); // Initial start
*/