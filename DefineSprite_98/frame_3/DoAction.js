/**
 * ActionScript code for `DefineSprite_98`, frame 3's `DoAction` script.
 * This is a very simple script that just stops the MovieClip's timeline.
 * It likely marks a specific point in an animation sequence for a quality setting UI element,
 * where it should halt after a visual effect.
 *
 * In JavaScript, this translates to a direct call to a `stop()` method
 * on the corresponding display object.
 */
function DoAction_DefineSprite_98_frame_3() {
   this.stop(); // Stop the MovieClip's timeline.
}

// How this might be structured in a JavaScript class (conceptual):
/*
// Assuming this code is executed within the context of QualitySettingsUI's timeline or state.
class QualitySettingsUI extends MovieClip { // Assuming MovieClip base class
   // ... constructor and other methods ...

   // Method that gets called when this frame's action executes
   onFrame3Action() {
      this.stop();
   }
}
*/