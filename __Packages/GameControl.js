class GameControl {
   constructor() {
      // Properties initialization, as per ActionScript's var declarations
      this.vx = 0;
      this.vy = 0;
      this.px = 0;
      this.py = 0.5;
      this.r = 0;
      this.scale = 100;
      this.toggleflag = true;
      this.slowcount = 0;
      this.charapos = 0;
      this.chara_array = []; // Array in JS
      this.youko = false;
      this.nanaka = false;
      this.nanakasub = 0;
      this.misato = false;
      this.touko = false;
      this.combo = false;
      this.kiri = false;
      this.miki = false;
      this.lastchara = null;
      this.cffcount = 0;
      this.cffs = null;
      this.nogravity = false;
      this.nolimit = false;
      this.hitenabled = true;
      this.metermode = 0; // Initialized in initvalue in AS, but default to 0 here
      this.globalsound = null; // Assuming Sound object would be passed or initialized elsewhere
      this.dataversion = 0; // Placeholder, would be set externally
      this.i_power = 0;
      this.i_angle = 0;
      this.main = null; // Main MovieClip/DisplayObject
      this.speed = null; // Speed display object
      this.tmpx = 0;
      this.tmpy = 0;
      this.taichi = null; // Taichi MovieClip/DisplayObject
      this.nanakaobj = null; // Nanaka object
      this.slowinterval = 0;
      this.contact = null; // Contact object
      this.aerial = null; // Aerial object

      // Static properties, converted to static class properties
      // In ActionScript, these are var declarations outside methods but inside class
      // In JavaScript, these are explicitly static members.
      GameControl.savedata = null; // SharedObject equivalent
      GameControl.commondata = null; // SharedObject equivalent
      GameControl.bestrecord = 0;

      this.characode = {
         misato: 1,
         touko: 2,
         kiri: 3,
         miki: 4,
         youko: 5,
         sakuraba: 6,
         tomoki: 7,
         nanaka: 8
      };

      // Color objects. Assuming these are simple data structures.
      GameControl.color_a = { ra: 100, rb: 0, ga: 100, gb: 128, ba: 100, bb: 0, aa: 100, ab: 0 };
      GameControl.color_b = { ra: 100, rb: 128, ga: 100, gb: 0, ba: 100, bb: 0, aa: 100, ab: 0 };
      GameControl.color_c = { ra: 100, rb: 0, ga: 100, gb: 0, ba: 100, bb: 128, aa: 100, ab: 0 };
      GameControl.color_d = { ra: 100, rb: 64, ga: 100, gb: 64, ba: 100, bb: 0, aa: 100, ab: 0 };
      GameControl.color_n = { ra: 100, rb: 0, ga: 100, gb: 0, ba: 100, bb: 0, aa: 100, ab: 0 };

      GameControl.g = -9.8;
      GameControl.ex = 0.8;
      GameControl.ey = 0.8;
      GameControl.interval = 0.03333333333333333;

      // Note: `bestrecord` is initialized directly to 0 in the static properties above,
      // and then potentially loaded from SharedObject.
   }

   initialize() {
      this.vx = 0;
      this.vy = 0;
      this.px = 0;
      this.py = 0.5;
      this.r = 0;
      this.scale = 100;
      this.toggleflag = true;
      this.slowcount = 0;
      this.charapos = 0;
      this.chara_array = [];
      this.youko = false;
      this.nanaka = false;
      this.nanakasub = 0;
      this.misato = false;
      this.touko = false;
      this.combo = false;
      this.kiri = false;
      this.miki = false;
      this.lastchara = null;
      this.cffcount = 0;
      this.cffs = null;
      this.nogravity = false;
      this.nolimit = false;
      this.hitenabled = true;
   }

   initvalue(val, init) {
      // In JavaScript, `undefined` and `null` checks are common.
      if (val === undefined || val === null) {
         return init;
      }
      return val;
   }

   localload() {
      // SharedObject needs to be replaced with a browser storage equivalent (e.g., localStorage)
      // or a custom persistence solution. This is a conceptual conversion.
      // For demonstration, we'll use a placeholder for SharedObject.
      // In a real browser environment, you might use:
      // GameControl.savedata = JSON.parse(localStorage.getItem("nanaca-crash-save")) || {};
      // GameControl.commondata = JSON.parse(localStorage.getItem("nanaca-crash-common")) || {};

      // Placeholder SharedObject-like structure
      GameControl.savedata = { data: { datarecord: 0 } }; // Simulate default for datarecord
      GameControl.commondata = { data: { qualitysetting: "MEDIUM", soundsetting: 100, metersetting: 0 } }; // Simulate defaults

      GameControl.bestrecord = this.initvalue(GameControl.savedata.data.datarecord, 0);
      // Assuming _quality is a global variable or managed externally
      window._quality = this.initvalue(GameControl.commondata.data.qualitysetting, "MEDIUM");
      this.metermode = this.initvalue(GameControl.commondata.data.metersetting, 0);
      // Assuming globalsound has a setVolume method
      if (this.globalsound && typeof this.globalsound.setVolume === 'function') {
         this.globalsound.setVolume(this.initvalue(GameControl.commondata.data.soundsetting, 100));
      }
   }

   localclear() {
      GameControl.bestrecord = 0;
      this.localsave();
   }

   localsave() {
      this.localset();
      // Simulate flushing to storage (e.g., localStorage.setItem)
      // localStorage.setItem("nanaca-crash-save", JSON.stringify(GameControl.savedata));
      // localStorage.setItem("nanaca-crash-common", JSON.stringify(GameControl.commondata));
   }

   localset() {
      GameControl.savedata.data.dataversion = this.dataversion;
      GameControl.savedata.data.datarecord = GameControl.bestrecord;
      // Assuming _quality is a global variable or managed externally
      GameControl.commondata.data.qualitysetting = window._quality;
      // Assuming globalsound has a getVolume method
      if (this.globalsound && typeof this.globalsound.getVolume === 'function') {
         GameControl.commondata.data.soundsetting = this.globalsound.getVolume();
      }
      GameControl.commondata.data.metersetting = this.metermode;
   }

   gamestart() {
      this.vx = 0.3 * this.i_power * Math.cos(this.i_angle * Math.PI / 180);
      this.vy = 0.3 * this.i_power * Math.sin(this.i_angle * Math.PI / 180);
      // Assuming main object has gotoAndPlay method
      if (this.main && typeof this.main.gotoAndPlay === 'function') {
         this.main.gotoAndPlay("start");
      }
   }

   get best() {
      // The substring logic for numbers is unusual. It converts to string,
      // adds 1, multiplies by 100, then takes the last two characters.
      // This seems to be for fixed-point display.
      return Math.floor(GameControl.bestrecord) + "." +
             String(Math.floor((Math.abs(GameControl.bestrecord) + 1) * 100)).slice(-2);
   }

   speedblind(blind) {
      // Assuming speed object has blind and view methods
      if (this.speed && typeof this.speed.blind === 'function' && typeof this.speed.view === 'function') {
         this.speed.blind(blind);
         this.speed.view(this.vx, this.vy);
      }
   }

   setspecial(chara, flag) {
      switch (chara) {
         case this.characode.misato:
            this.misato = flag;
            break;
         case this.characode.touko:
            this.touko = flag;
            break;
         case this.characode.kiri:
            this.kiri = flag;
            break;
         case this.characode.miki:
            this.miki = flag;
            break;
         case this.characode.youko:
            this.youko = flag;
            break;
         case this.characode.nanaka:
            this.nanaka = flag;
            break;
      }
   }

   boost(power, angle) {
      let boostAmount = this.docffboost(power);
      this.vx += boostAmount * Math.cos(angle * Math.PI / 180);
      this.vy = Math.abs(this.vy) + boostAmount * Math.sin(angle * Math.PI / 180);
   }

   vpush() {
      this.tmpx = this.vx;
      this.tmpy = this.vy;
   }

   vpop() {
      this.vx = this.tmpx;
      this.vy = this.tmpy;
   }

   cffclear() {
      this.cffs = null;
      // Assuming main and taichi objects have changecolor methods
      if (this.main && typeof this.main.changecolor === 'function') {
         this.main.changecolor(GameControl.color_n);
      }
      if (this.taichi && typeof this.taichi.changecolor === 'function') {
         this.taichi.changecolor(GameControl.color_n, 20);
      }
   }

   setcffa() {
      if (this.taichi && typeof this.taichi.setcff === 'function') {
         this.taichi.setcff(this.cffs, 0, this.cffcount);
      }
      this.cffs = 0;
      this.cffcount += 30;
      if (this.main && typeof this.main.changecolor === 'function') {
         this.main.changecolor(GameControl.color_a);
      }
      if (this.taichi && typeof this.taichi.changecolor === 'function') {
         this.taichi.changecolor(GameControl.color_a, 40);
      }
   }

   setcffb() {
      if (this.taichi && typeof this.taichi.setcff === 'function') {
         this.taichi.setcff(this.cffs, 1, this.cffcount);
      }
      this.cffs = 1;
      this.cffcount += 20;
      if (this.main && typeof this.main.changecolor === 'function') {
         this.main.changecolor(GameControl.color_b);
      }
      if (this.taichi && typeof this.taichi.changecolor === 'function') {
         this.taichi.changecolor(GameControl.color_b, 40);
      }
   }

   setcffc() {
      if (this.taichi && typeof this.taichi.setcff === 'function') {
         this.taichi.setcff(this.cffs, 2, this.cffcount);
      }
      this.cffs = 2;
      this.vpush();
      this.speedblind(true);
      this.vx = 10;
      this.vy = 20;
      this.nogravity = true;
      this.cffcount += 30;
      if (this.main && typeof this.main.changecolor === 'function') {
         this.main.changecolor(GameControl.color_c);
      }
      if (this.taichi && typeof this.taichi.changecolor === 'function') {
         this.taichi.changecolor(GameControl.color_c, 40);
      }
   }

   setcffd() {
      if (this.taichi && typeof this.taichi.setcff === 'function') {
         this.taichi.setcff(this.cffs, 3, this.cffcount);
      }
      this.cffs = 3;
      this.cffcount += 30;
      if (this.main && typeof this.main.changecolor === 'function') {
         this.main.changecolor(GameControl.color_d);
      }
      if (this.taichi && typeof this.taichi.changecolor === 'function') {
         this.taichi.changecolor(GameControl.color_d, 40);
      }
   }

   docffboost(b_power) {
      if (this.cffs === 0) {
         this.cffcount -= 10;
         if (this.cffcount <= 0) {
            this.cffcount = 0;
            this.cffclear();
         }
         if (this.taichi && typeof this.taichi.cffa === 'function') {
            this.taichi.cffa();
         }
         return b_power * 2;
      }
      if (this.cffs === 1 && this.cffcount < 60) {
         this.cffcount = Math.min(this.cffcount + b_power * 0.2, 60);
         if (this.taichi && typeof this.taichi.cffbc === 'function') {
            this.taichi.cffbc();
         }
         return b_power * 0.9;
      }
      return b_power;
   }

   docffb() {
      if (this.vx < 2 && this.vy <= 0 && this.py < 5 && this.py <= (-this.vy) * this.vy / GameControl.g && this.hitenabled && this.slowcount === 0 && !this.nogravity) {
         this.cffclear();
         this.boost(this.cffcount, 45);
         this.cffcount = 0;
         if (this.taichi && typeof this.taichi.cffbd === 'function') {
            this.taichi.cffbd();
         }
      }
   }

   docffc() {
      if (this.py > 2.3) {
         this.slowcount = 0;
         this.nolimit = true;
         this.py = 2.3;
         this.vx = 55;
         this.vy = 0;
         if (this.taichi && typeof this.taichi.cffc === 'function') {
            this.taichi.cffc();
         }
      } else {
         this.cffcount -= this.vx * GameControl.interval / 1000 * 30;
         if (this.cffcount <= 0) {
            this.vpop();
            this.speedblind(false);
            this.nogravity = false;
            this.nolimit = false;
            this.cffcount = 0;
            this.cffclear();
            if (this.taichi && typeof this.taichi.cffcstop === 'function') {
               this.taichi.cffcstop();
            }
         } else {
            if (this.taichi && typeof this.taichi.cffcview === 'function') {
               this.taichi.cffcview();
            }
         }
      }
   }

   docffd() {
      this.cffcount -= 6;
      if (this.cffcount <= 0) {
         this.cffcount = 0;
         this.cffclear();
      }
      if (this.taichi && typeof this.taichi.cffd === 'function') {
         this.taichi.cffd();
      }
      this.vy = Math.sqrt(Math.max(this.vy * this.vy - 2 * GameControl.g * this.py, 0)) * 1.1;
      this.vx *= 1.1;
   }

   aerialcrash(upper) {
      if (this.nanakaobj && typeof this.nanakaobj.aerial === 'function') {
         this.nanakaobj.aerial(upper);
      }
   }

   aerialboost() {
      let _loc2_ = Math.atan2(this.vy, this.vx) * 0.9;
      this.vx += 10 * Math.cos(_loc2_);
      this.vy += 10 * Math.sin(_loc2_);
      this.vy = -this.vy;
   }

   cff(charatype) {
      if (this.nanakaobj && typeof this.nanakaobj.cff === 'function') {
         this.nanakaobj.cff(charatype);
      }
   }

   slow(frames, interval) {
      this.slowcount = frames;
      this.slowinterval = interval;
   }

   slow2(frames, distance) {
      this.slowcount = frames;
      this.slowinterval = Math.min(GameControl.interval, distance / Math.sqrt(this.vx * this.vx + this.vy * this.vy) / frames);
   }

   initchara(chara, code) {
      chara.charatype = code;
      // Assuming taichi.taichi_mc is accessible
      if (this.taichi && this.taichi.taichi_mc) {
         chara.hittarget = this.taichi.taichi_mc;
      }

      this.chara_array.splice(Math.floor(Math.random() * (this.chara_array.length + 1)), 0, chara);
      chara.controll = this;
      // Assuming contact.getchara is a method
      if (this.contact && typeof this.contact.getchara === 'function') {
         chara.charaface = this.contact.getchara(code);
      }
   }

   setchara(chara) {
      this.chara_array.splice(Math.floor(Math.random() * (this.chara_array.length + 1)), 0, chara);
   }

   getchara(pos) {
      let _loc2_ = null; // Equivalent to undefined
      if (this.chara_array.length > 0) {
         _loc2_ = this.chara_array.pop(); // Remove and return last element
      }

      if (_loc2_ && typeof _loc2_.setposition === 'function') {
         _loc2_.setposition(pos);
      }
      this.lastchara = _loc2_ ? _loc2_.charatype : null;
      return _loc2_;
   }

   backeffect(effect, param) {
      if (this.main && typeof this.main.backeffect === 'function') {
         this.main.backeffect(effect, param);
      }
   }

   moveobj() {
      let _loc2_ = undefined;
      let _loc3_ = undefined;

      if (this.cffs === 1) {
         this.docffb();
      } else if (this.cffs === 2) {
         this.docffc();
      }

      if (this.py === 0 && this.slowcount === 0 && this.vx < 0.0001 && this.vy < 0.0001) {
         this.vx = 0;
         this.vy = 0;
         if (this.main && typeof this.main.viewscore === 'function') {
            this.main.viewscore(this.px, this.py, GameControl.bestrecord === this.px, this.vx, this.vy);
         }
         this.localset();
         if (this.main && typeof this.main.gameover === 'function') {
            this.main.gameover();
         }
      } else {
         this.toggleflag = !this.toggleflag;
         if (this.slowcount > 0) {
            _loc2_ = Math.min(this.slowinterval, 0.8533333333333334 / Math.max(this.vx, Math.abs(this.vy) - GameControl.g * this.slowinterval));
            this.slowcount--;
         } else if (this.nolimit) {
            _loc2_ = GameControl.interval;
         } else {
            _loc2_ = Math.min(GameControl.interval, 0.8533333333333334 * Math.max(1, -8.2 / this.py + 2.8) / Math.max(this.vx, Math.abs(this.vy) - GameControl.g * GameControl.interval));
         }

         this.px += this.vx * _loc2_;
         if (this.nogravity) {
            this.py += this.vy * _loc2_;
         } else {
            this.py += (GameControl.g * _loc2_ / 2 + this.vy) * _loc2_;
            this.vy += GameControl.g * _loc2_;
            if (this.py < 0) {
               if (this.cffs === 3) {
                  this.docffd();
               } else {
                  this.vy = Math.sqrt(Math.max(this.vy * this.vy - 2 * GameControl.g * this.py, 0)) * GameControl.ey;
                  this.vx *= GameControl.ex;
                  if (this.taichi && typeof this.taichi.bound === 'function') {
                     this.taichi.bound(this.vx, this.vy);
                  }
               }
               this.py = 0;
               this.setspecial(this.characode.misato, false);
            }
         }

         _loc3_ = this.scale;
         this.scale = Math.floor(Math.min(Math.max(205.13 / this.py, 20), Math.max(this.scale - 2, 75)) / 0.1) * 0.1;
         this.r += Math.min(this.vx * _loc2_ * 30, 30);

         if (this.px + 20 >= this.charapos) {
            this.charapos += 10;
            this.getchara(this.charapos);
         }

         GameControl.bestrecord = Math.max(GameControl.bestrecord, this.px);
         if (this.toggleflag) {
            if (this.main && typeof this.main.viewscore === 'function') {
               this.main.viewscore(this.px, this.py, GameControl.bestrecord === this.px, this.vx, this.vy);
            }
         }
         if (this.aerial && typeof this.aerial.view === 'function') {
            this.aerial.view(this.py <= 10 && this.py >= 3 && this.hitenabled, this.vy <= 0, _loc2_);
         }
         if (this.main && typeof this.main.moveobj === 'function') {
            this.main.moveobj(this.px, this.py, Math.round(this.r), this.scale, this.scale !== _loc3_);
         }
      }
   }
}