/**
 * ActionScript code for `DefineSprite_421_mc_touko`, frame 145's `DoAction` script.
 * This script is executed to make the `hittarget` visible, disable gravity,
 * apply a "vertical pop" effect (restoring previous velocities), apply a "boost" effect,
 * disable speed blindness, apply a "slow" effect, and finally apply a "metu" (destruction)
 * background effect. This likely signifies the powerful end of a special movement/attack
 * sequence for Touko.
 *
 * In JavaScript, this would be part of a method or state logic within the `mc_touko` class.
 * It assumes `this` refers to the `mc_touko` MovieClip instance, and it interacts with
 * `control` (GameControl object), `hittarget`, and has access to `s_power` and `s_angle`
 * (defined in frame 1).
 */
function DoAction_DefineSprite_421_mc_touko_frame_145() {
   // Assuming 'this' refers to the mc_touko MovieClip instance.

   // Make hit target visible.
   // Assumes `hittarget` is an accessible display object.
   if (typeof hittarget !== 'undefined') {
      hittarget._visible = true;
   }

   // Re-enable gravity.
   // Assumes `control` is a global or accessible instance of GameControl
   // and has a `nogravity` property.
   if (typeof control !== 'undefined' && control.nogravity !== undefined) {
      control.nogravity = false;
   }

   // Apply vertical pop effect (restoring previous velocities).
   // Assumes `control` has a `vpop` method.
   if (typeof control !== 'undefined' && control.vpop) {
      control.vpop();
   }

   // Apply boost effect.
   // Assumes `s_power` and `s_angle` are properties defined on `this` (from frame 1).
   if (typeof control !== 'undefined' && control.boost) {
      control.boost(this.s_power, this.s_angle);
   }

   // Disable speed blindness.
   // Assumes `control` has a `speedblind` method.
   if (typeof control !== 'undefined' && control.speedblind) {
      control.speedblind(false);
   }

   // Apply a slow effect (slow2 means slow down by distance).
   // Assumes `control` has a `slow2` method.
   if (typeof control !== 'undefined' && control.slow2) {
      control.slow2(20, 1); // Slow for 20 frames, with a distance factor of 1.
   }

   // Apply a "metu" (destruction) background effect.
   // Assumes `control` has a `backeffect` method.
   if (typeof control !== 'undefined' && control.backeffect) {
      control.backeffect("metu");
   }
}

// How this might be structured in a JavaScript class (conceptual, part of mc_touko):
/*
class mc_touko extends GameCharacter { // Extending GameCharacter as per previous conversion
   constructor() {
      super();
      // ... other initialization from frame 1 ...
      // Mock external dependencies if needed for testing
      window.control = window.control || {
          nogravity: true, // Mock initial state
          vpop: () => console.log("Control vpop called"),
          boost: (p, a) => console.log(`Control boost: ${p}, ${a}`),
          speedblind: (b) => console.log(`Speed blind: ${b}`),
          slow2: (f, d) => console.log(`Control slow2: ${f}, ${d}`),
          backeffect: (effect) => console.log(`Back effect: ${effect}`)
      };
      this.hittarget = { _visible: false }; // Mock hittarget
      this.s_power = 25; // Example initial value from frame 1
      this.s_angle = 30; // Example initial value from frame 1
   }

   // Method representing the actions of frame 145
   onFrame145Action() {
      if (this.hittarget) {
         this.hittarget._visible = true;
      }
      if (window.control) {
         window.control.nogravity = false;
         if (window.control.vpop) {
            window.control.vpop();
         }
         if (window.control.boost) {
            window.control.boost(this.s_power, this.s_angle);
         }
         if (window.control.speedblind) {
            window.control.speedblind(false);
         }
         if (window.control.slow2) {
            window.control.slow2(20, 1);
         }
         if (window.control.backeffect) {
            window.control.backeffect("metu");
         }
      }
   }
}
*/