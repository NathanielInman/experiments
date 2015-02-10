var Database;
/*
Elementalist  Nihilist  Sorcerer  Arcanist  Myrmidon 
  The class starts as elementalist, nihilist, sorcerer, arcanist, and eventually becomes a Myrmidon. Myrmidons are reflexive casters adept in warfare who relish the power and naturally carry their abilities into the battlefield with almost a nonchalant manner. Myrmidons may speak a number of languages innately, unknowingly perhaps, and are quit adept at counter spelling mages or necromancer's natural elements. A Myrmidon may only have one type of shield on at a time. They also may immolate only one kind at a time. They may cast any element spell under any kind of shield or immolation. If they, however, cast a fire spell under a fire shield, that spell is amplified by 10 in damage. Any element that is received, as an example under the fire shield will be reduced by 10 damage save for fire in which damage would be thenceforth amplified by 10 damage. Outgoing magic of non-fire elements are not diminished in power when under the fire shield. This works for all elements respectfully. Elemental Specification stacks with the damage amplified and diminished by the shields. Saturation deducts all amplification of incoming spells when under effect of a shield. Elemental Allocation completely bypasses all incoming amplifications of shields and moves the elemental type into the type with most resistance. The most efficient races for the Myrmidon are Human, Dwarf, Goblin, Troll, Half-Orc, and the most common race: Orc.


  "Proficiencies"
Hand-to-hand    Allows combat when unarmed.
Wands     Allows usage of magical wands.
Light Armor   Allows light armor to be worn efficiently as equipment
Medium Armor    Allows medium armor to be worn efficiently as equipment
Heavy Armor   Allows heavy armor to be worn efficiently as equipment
All Slashing    Allows combat with all slashing weapons.
Basic Piercing    Allows combat with basic piercing weapons.
Common    Language proficiency.
Celestial   Language proficiency.
Infernal    Language proficiency.
Arcanic   Language proficiency.
  "Immolation"
0 50RSP Immolate Fire A Sphere of fire engulfs player causes 1d20 damage to enemy on contact
20  50RSP Immolate Ice  A Sphere of Magical ice engulfs player causing 1d20 damage to enemy on contact
40  50RSP Immolate Sparks A Sphere of Magical electricity engulfs player causing 1d20 damage to enemy on contact
60  50RSP Immolate Pulses A Sphere of Earth-elemental energy courses around player causing 1d20 damage on contact
80  50RSP Immolate Darkness A Sphere of Necromantic energy courses around player causing 1d20 damage on contact
100 Passive Elemental Precision Allows all immolations to apply dots on contact to attacking target causing 1d4/Rnd.
  "Viceration"
0 5SP Vicerating Fire Target becomes -10 resistant to fire and takes little damage, stacks 5 times.
10  5SP Vicerating Ice  Target becomes -10 resistant to ice and takes little damage, stacks 5 times.
20  5SP Vicerating Lightning  Target becomes -10 resistant to air and takes little damage, stacks 5 times.
30  5SP Vicerating Pulse  Target becomes -10 resistant to earth and takes little damage, stacks 5 times.
40  5SP Vicerating Darkness Target becomes -10 resistant to poison and takes little damage, stacks 5 times.
50  Passive Elemental Amplitude Dots deal 10 more damage/Rnd.
  "Elements"
0 25WP  Fireball  1d16+Int Mod fire elemental damage
10  30WP  Frostcone 3d8+Int Mod ice elemental damage
20  40WP  Lightning Ball  2d20+Int Mod air elemental damage
30  20WP  Earthquake  1d4+Int Mod earth elemental damage up to 4 enemies
40  30WP  Plague  1d8+Int Mod poison elemental damage transmutable disease
50  Passive Elemental Specification Forces Myrmidons to choose an element by which to specialize in, x2 Def, x2 attack.
  "Shields"
45  10RWP Fire Shield Gives a 10% chance to ignore fire elemental attack, or -10 Dmg
46  10RWP Ice Shield  Gives a 10% chance to ignore ice elemental attack, or -10 Dmg
47  10RWP Lightning Shield  Gives a 10% chance to ignore air elemental attack, or -10 Dmg
48  10RWP Earth Shield  Gives a 10% chance to ignore earth elemental attack, or -10 Dmg
49  10RWP Poison Shield Gives a 10% chance to ignore poison elemental attack, or -10 Dmg
50  Passive Elemental Protection  Immune to current immolation if it’s also a shield, or absorbed into health if it’s a Specification
  "Mastery"
50  Passive Reflex Casting  Gives DC15 chance to allow counterspell opportunity
60  Passive Elemental Spontaneity Makes spells harder to dispel or counterspell by DC15
70  Passive Saturation  Immolated elements take some of the magic out of incoming attacks by 10 Dmg
80  Passive Simplify Energies Immolated elements enhance energies making sub-elemental attacks into elemental
90  Passive Natural Reflection  Gives DC15 chance to allow reflection of spells not successfully counterspelled
100 Passive Elemental Allocation  Allows incoming attacks to distribute amongst your most powerful resistance.
  "Presence"
50  50RWP Intimidation Presence Add Charisma mod to all damage and increases critical strike damage by current Charisma
60  50RWP Demand Presence Halts all aggro for 5 rounds or until enemies are attacked or Myrmidon attacks, in which all      affected targets exit demand.
70  50RWP Darkness Presence All abilities must beat a Charisma + 1d20 vs. Charisma + 1d20 in order to cast, else abilities still      cost, but don't activate.
80  50RWP Blood Presence  All attacking enemies within 10 yards take 1d4 damage per round, and if enemy is subject to       presence for 4 rounds, it opens a wound causing an additional 1d4 per round.
90  50RWP Infectious Presence All attacking enemies within 10 yards take 1d4 damage per round, and 1d12 if enemy is affected      by a wound.
100 50WP  Pulse of Disease  All attacking enemies who are affected by an open wound gain plague based on the myrmidons      level. Level 1-20 gets level 1 poison, 21-40 gets level 2 poison, 41-60 : 3, 61-80 : 4, 81-100 : 5.

 */
(function(Database){
  var SpellEffect = function(script){
    this.script=script; //this is the script that will be ran when the effect is called.
  };
  var spell = function(){
    var t;
    for(var i=0;i<this.affects.length;i++)outputCache.push(this.affects[i].script.call(this)); //call each spell affect given current context
    if(this.levelReq&&this.actor.level&&this.actor.level<this.levelReq)return false; //failed level requirement
    if(this.damage){
      if(this.actor.amplitude&&this.actor.amplitude[this.element]>0){
        this.damage+=t=this.actor.amplitude[this.element];
        outputCache.push(this.actor.name+' increases the potency of '+this.name+' by '+t+'.');
      } //end if
      if(this.target.resistance&&this.target.resistance[this.element]>0){
        this.damage-=t=this.actor.resistance[this.element];
        outputCache.push(this.target.name+' reflects '+t+' damage of '+this.name+'.');
      } //end if
      if(this.damage>0){
        this.target.health-=this.damage;
        return this.actor.name+' casts '+this.name+' and deals '+this.damage+' damage to '+this.target.name+'.';  
      }else{
        return this.actor.name+' attempts casting '+this.name+' but it has no affect on '+this.target.name+'.';
      } //end if
    }else if(this.enhancement){
      return this.enhancement.call(this);
    } //end if  
  };
  Database.spells={};
  Database.spells.effects={};
  var immolation=new SpellEffect(function(){
    var minDamage;
    // if this affect already exists on the target, then ensure
    // that it stacks for a maximum of 5 times
    if(this.target.affect['immolate '+this.element] &&
       this.target.affect['immolate '+this.element].stack<5){
      minDamage=this.target.affect['immolate '+this.element].stack;
      this.target.affect['immolate '+this.element] = {
        timer:5,
        stack:++this.target.affect['immolate '+this.element].stack,
        name:'immolate '+this.element,
        script:function(name){
          var stacks = this.actor.affect[this.spell].stack;
          var dmg = r(stacks,stacks*4,1);
          this.actor.health -= dmg;
          return 'The '+this.spell+' deals an extra '+dmg+' damage to '+this.actor.name+' as it surges more strongly (x'+stacks+').';
        }
      };
      console.log(this.target);
      return this.target.name+' begins to REALLY suffer from '+this.element+' damage.';
    }else{ //this is the first time that the affect has been applied to the target
      this.target.affect['immolate '+this.element] = {
        timer:5,
        stack:1,
        script:function(){
          var dmg = r(1,4,1);
          this.actor.health -= dmg;
          return 'The '+this.spell+' deals an extra '+dmg+' damage to '+this.actor.name+' as it surges.';
        }
      };
      return this.target.name+' begins to suffer from '+this.element+' damage.';
    } //end if
  });
  Database.spells.effects.immolation=immolation; //link immolation to the spell effects collection
  Database.spells.elementalist={
    'immolate fire': function(){
      this.element = 'fire';
      this.affects = [immolation];
      this.damage = r(1,20,1);
      return spell.call(this);
    },
    'immolate ice': function(){
      this.levelReq = 20;
      this.element = 'water';
      this.affects = [immolation];
      this.damage = r(1,20,1);
      return spell.call(this);
    }, 
    'immolate sparks': function(){
      this.levelReq = 40;
      this.element = 'air';
      this.affects = [immolation];
      this.damage = r(1,20,1);
      return spell.call(this);
    }, 
    'immolate pulses': function(){
      this.levelReq = 60;
      this.element = 'earth';
      this.affects = [immolation];
      this.damage = r(1,20,1);
      return spell.call(this);
    },
    'immolate darkness': function(){
      this.levelReq = 80;
      this.element = 'spirit';
      this.affects = [immolation];
      this.damage = r(1,20,1);
      return spell.call(this);
    } ,
    'elemental precision': function(){
      this.levelReq = 100;
      this.affects = [];
      this.enhancement = function(){
        console.log('applied affect');
        this.actor.affect['elemental precision']={
          timer:-1 //lasts an infinite amount of time, it's a passive
        };
        return this.actor.name+' gains elemental precision.';
      };
      return spell.call(this);
    } /*,, //100
    'vicerating fire': function(actor, target) {}, //0
    'vicerating ice': function(actor, target) {}, //10
    'vicerating lightning': function(actor, target) {}, //20
    'vicerating pulse': function(actor, target) {}, //30
    'vicerating darkness': function(actor, target) {}, //40
    'vicerating amplitude': function(actor, target) {}, //50
    'fireball': function(actor, target) {}, //0
    'frostcone': function(actor, target) {}, //10
    'lightning ball': function(actor, target) {}, //20
    'earthquake': function(actor, target) {}, //30
    'plague': function(actor, target) {}, //40
    'elemental specification': function(actor, target) {}, //50
    'fire shield': function(actor, target) {}, //45
    'ice shield': function(actor, target) {}, //46
    'lightning shield': function(actor, target) {}, //47
    'earth shield': function(actor, target) {}, //48
    'poison shield': function(actor, target) {}, //49
    'elemental protection': function(actor, target) {}, //50
    'reflex casting': function(actor, target) {}, //60
    'elemental spontaneity': function(actor, target) {}, //70
    'saturation': function(actor, target) {}, //80
    'simplify energies': function(actor, target) {}, //90
    'natural reflection': function(actor, target) {}, //100
    'elemental allocation': function(actor, target) {} //100 */
  };
})(Database||(Database={}));
