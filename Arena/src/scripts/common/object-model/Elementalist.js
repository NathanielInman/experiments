var Database;
(function(Database){
  /**
   * Elementalist class extends the generic Class so it
   * inherits some of the basic functions that all classes
   * share. The Elementalist can be created given a
   * specialty to limit its skills down to a certain set
   * that they prefer. This is common for mobiles.
   */
  class Elementalist extends Database.Class {
    constructor(actor,specialty){
      var t;
      this.actor = actor;
      this.name = 'Elementalist';
      this.abilities = {}; //start out with a blank slate
      this.specialty = (specialty = specialty || 'none');
      if(specialty=='none'||specialty=='fire'){
        this.addAbility({
          name:'immolate fire',
          element:'fire',
          effects:[Database.spellEffects.immolation],
          damage:r(1,20,1)
        });
        this.addAbility({
          name:'vicerating fire',
          element:'fire',
          effects:[Database.spellEffects.viceration]
        });
        this.addAbility({
          name:'fireball',
          element:'fire',
          damage:r(1,17,1)+Math.floor(this.actor.intelligence/5)
        });
        this.addAbility({
          name:'fire shield',
          levelReq:45,
          enhancement:function(){
            this.actor.effects['fire shield']={
              timer: 5 //lasts an infinite amount of time, it's a passive
            };
            return this.actor.name+' gains fire shield.';
          }
        });
      } //end if
      if(specialty=='none'||specialty=='water'){
        this.addAbility({
          name:'immolate ice',
          levelReq:20,
          element:'water',
          effects:[Database.spellEffects.immolation],
          damage:r(1,20,1)
        });
        this.addAbility({
          name:'vicerating ice',
          levelReq:10,
          element:'water',
          effects:[Database.spellEffects.viceration]
        });
        this.addAbility({
          name:'frostcone',
          levelReq:10,
          element:'water',
          damage:r(3,25,1)+Math.floor(this.actor.intelligence/5)
        });
        this.addAbility({
          name:'ice shield',
          levelReq:46,
          enhancement:function(){
            this.actor.effects['ice shield']={
              timer: 5 //lasts an infinite amount of time, it's a passive
            };
            return this.actor.name+' gains ice shield.';
          }
        });
      } //end if
      if(specialty=='none'||specialty=='air'){
        this.addAbility({
          name:'immolate sparks',
          levelReq:40,
          element:'air',
          effects:[Database.spellEffects.immolation],
          damage:r(1,20,1)
        });
        this.addAbility({
          name:'vicerating sparks',
          levelReq:20,
          element:'air',
          effects:[Database.spellEffects.viceration]
        });
        this.addAbility({
          name:'lightning ball',
          levelReq:20,
          element:'air',
          damage:r(2,41,1)+Math.floor(this.actor.intelligence/5)
        });
        this.addAbility({
          name:'lightning shield',
          levelReq:47,
          enhancement:function(){
            this.actor.effects['lightning shield']={
              timer: 5 //lasts an infinite amount of time, it's a passive
            };
            return this.actor.name+' gains lightning shield.';
          }
        });
      } //end if
      if(specialty=='none'||specialty=='earth'){
        this.addAbility({
          name:'immolate pulse',
          levelReq:60,
          element:'earth',
          effects:[Database.spellEffects.immolation],
          damage:r(1,20,1)
        });
        this.addAbility({
          name:'vicerating pulse',
          levelReq:30,
          element:'earth',
          effects:[Database.spellEffects.viceration]
        });
        this.addAbility({
          name:'earthquake',
          levelReq:30,
          element:'earth',
          damage:r(1,5,1)+Math.floor(this.actor.intelligence/5)
        });
        this.addAbility({
          name:'earth shield',
          levelReq:48,
          enhancement:function(){
            this.actor.effects['earth shield']={
              timer: 5 //lasts an infinite amount of time, it's a passive
            };
            return this.actor.name+' gains earth shield.';
          }
        });
      } //end if
      if(specialty=='none'||specialty=='spirit'){
        this.addAbility({
          name:'immolate darkness',
          levelReq:80,
          element:'spirit',
          effects:[Database.spellEffects.immolation],
          damage:r(1,20,1)
        });
        this.addAbility({
          name:'vicerating darkness',
          levelReq:40,
          element:'spirit',
          effects:[Database.spellEffects.viceration]
        });
        this.addAbility({
          name:'plague',
          levelReq:40,
          element:'spirit',
          damage:r(1,9,1)+Math.floor(this.actor.intelligence/5)
        });
        this.addAbility({
          name:'poison shield',
          levelReq:49,
          enhancement:function(){
            this.actor.effects['poison shield']={
              timer: 5 //lasts an infinite amount of time, it's a passive
            };
            return this.actor.name+' gains poison shield.';
          }
        });
      } //end if
      // Now abilities that all specializations will have
      this.addAbility({
        name:'elemental precision',
        levelReq:100,
        enhancement:function(){
          this.actor.effects['elemental precision']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains elemental precision.';
        }
      });
      this.addAbility({
        name:'elemental amplitude',
        levelReq:50,
        enhancement:function(){
          this.actor.effects['elemental amplitude']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains elemental amplitude.';
        }
      });
      this.addAbility({
        name:'elemental protection',
        levelReq:50,
        enhancement:function(){
          this.actor.effects['elemental protection']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains elemental protection.';
        }
      });
      this.addAbility({
        name:'reflex casting',
        levelReq:50,
        enhancement:function(){
          this.actor.effects['reflex casting']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains reflex casting.';
        }
      });
      this.addAbility({
        name:'elemental spontaneity',
        levelReq:60,
        enhancement:function(){
          this.actor.effects['elemental spontaneity']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains elemental spontaneity.';
        }
      });
      this.addAbility({
        name:'saturation',
        levelReq:70,
        enhancement:function(){
          this.actor.effects['saturation']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains saturation.';
        }
      });
      this.addAbility({
        name:'simplify energies',
        levelReq:80,
        enhancement:function(){
          this.actor.effects['simplify energies']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains simplify energies.';
        }
      });
      this.addAbility({
        name:'natural reflection',
        levelReq:90,
        enhancement:function(){
          this.actor.effects['natural reflection']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains natural reflection.';
        }
      });
      this.addAbility({
        name:'elemental allocation',
        levelReq:100,
        enhancement:function(){
          this.actor.effects['elemental allocation']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains elemental allocation.';
        }
      });
      this.addAbility({
        name:'intimidation presence',
        levelReq:50,
        enhancement:function(){
          this.actor.effects['intimidation presence']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains intimidation presence.';
        }
      });
      this.addAbility({
        name:'demand presence',
        levelReq:60,
        enhancement:function(){
          this.actor.effects['demand presence']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains demand presence.';
        }
      });
      this.addAbility({
        name:'darkness presence',
        levelReq:70,
        enhancement:function(){
          this.actor.effects['darkness presence']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains darkness presence.';
        }
      });
      this.addAbility({
        name:'blood presence',
        levelReq:80,
        enhancement:function(){
          this.actor.effects['blood presence']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains blood presence.';
        }
      });
      this.addAbility({
        name:'infectious presence',
        levelReq:90,
        enhancement:function(){
          this.actor.effects['infectious presence']={
            timer: -1 //lasts an infinite amount of time, it's a passive
          };
          return this.actor.name+' gains infectious presence.';
        }
      });
      this.addAbility({
        name:'pulse of disease',
        levelReq:100
        //TODO: FINISH ABILITY
      });
    }
    ai(target){
      var result=[];
      if(r(0,2,1)===0){ //50% to physical attack
        result.push(this.actor.attack(target)); //return the result string
      }else{ //50% to cast a spell instead
        // First make sure both buffs are active before beginning to use damaging attacks
        // these buffs are Elemental Precision and Elemental Amplitude
        if(!this.actor.effects['elemental precision']){ //always cast elemental precision before immolate spells
          result.push(this.actor.cast('elemental precision',this));
        }else if(!this.actor.effects['elemental amplitude']){ //always cast elemental amplitude before immolate spells
          result.push(this.actor.cast('elemental amplitude',this));
        }else{
          // If this creature doesn't have a specialty, this means we need to essentially
          // be smart about how we use the spells. It wouldn't make sense to cast viceration ice
          // and then go about casting fireballs, as the viceration wouldn't be helping at all
          // so far, the best way to handle it is to randomly assign an element for the ai to use
          if(this.specialty=='none')this.specialty=(['fire','water','air','earth','spirit'])[r(0,5,1)];
          // We are currently buffed, lets determine if we have a specialty,
          // if so we'll apply viceration of that specialty to the target, then
          // we'll begin casting immolate and the elemental damaging attack
          if(this.specialty=='fire'){
            if(!target.effects['vicerating fire']){ //step 1
              result.push(this.actor.cast('vicerating fire',target));
            }else if(!target.effects['immolate fire']){
              result.push(this.actor.cast('immolate fire',target));
            }else{
              result.push(this.actor.cast('fireball',target));
            } //end if
          }else if(this.specialty=='water'){
            if(!target.effects['vicerating water']){ //step 1
              result.push(this.actor.cast('vicerating ice',target));
            }else if(!target.effects['immolate water']){
              result.push(this.actor.cast('immolate ice',target));
            }else{
              result.push(this.actor.cast('frostcone',target));
            } //end if
          }else if(this.specialty=='air'){
            if(!target.effects['vicerating air']){ //step 1
              result.push(this.actor.cast('vicerating sparks',target));
            }else if(!target.effects['immolate air']){
              result.push(this.actor.cast('immolate sparks',target));
            }else{
              result.push(this.actor.cast('lightning ball',target));
            } //end if
          }else if(this.specialty=='earth'){
            if(!target.effects['vicerating earth']){ //step 1
              result.push(this.actor.cast('vicerating pulse',target));
            }else if(!target.effects['immolate earth']){
              result.push(this.actor.cast('immolate pulse',target));
            }else{
              result.push(this.actor.cast('earthquake',target));
            } //end if
          }else if(this.specialty=='spirit'){
            if(!target.effects['vicerating spirit']){ //step 1
              result.push(this.actor.cast('vicerating darkness',target));
            }else if(!target.effects['immolate spirit']){ //step 2
              result.push(this.actor.cast('immolate darkness',target));
            }else{
              result.push(this.actor.cast('plague',target));
            } //end if
          } //end if
        } //end if
      } //end if
      return result.join('|||');
    }
  };
  Database.classes = Database.classes || {};
  Database.classes.Elementalist = Elementalist;
})(Database||(Database={}));
