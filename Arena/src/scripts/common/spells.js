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
  Database.spells={};
  Database.spells.effects={};
  var immolation=new SpellEffect(function(){
    console.log(this);
    var minDamage;
    // if this affect already exists on the target, then ensure
    // that it stacks for a maximum of 5 times
    if(this.target.effects['immolate '+this.element] &&
       this.target.effects['immolate '+this.element].stacks<5){
      minDamage=this.target.effects['immolate '+this.element].stacks;
      this.target.effects['immolate '+this.element] = {
        timer:5,
        stacks:++this.target.effects['immolate '+this.element].stacks,
        name:'immolate '+this.element,
        script:(
          this.actor.effects['elemental precision']?
          function(name){
            var stacks = this.actor.effects[this.spell].stacks;
            var dmg = 10+r(stacks,stacks*4,1);
            var element = this.spell.split(' ')[1];
            if(this.actor.effects['vicerating '+element]){
              dmg+=10*this.actor.effects['vicerating '+element].stacks;
            } //end if
            this.actor.health -= dmg;
            return '{M|The '+this.spell+' deals an extra '+dmg+' damage to '+this.actor.name+' as it surges more strongly (x'+stacks+').';
          }
          :
          function(name){
            var stacks = this.actor.effects[this.spell].stacks;
            var dmg = r(stacks,stacks*4,1);
            var element = this.spell.split(' ')[1];
            if(this.actor.effects['vicerating '+element]){
              dmg+=10*this.actor.effects['vicerating '+element].stacks;
            } //end if
            this.actor.health -= dmg;
            return '{M|The '+this.spell+' deals an extra '+dmg+' damage to '+this.actor.name+' as it surges more strongly (x'+stacks+').';
          }
        )
      };
      return this.target.name+' begins to REALLY suffer from '+this.element+' damage.';
    }else{ //this is the first time that the affect has been applied to the target
      this.target.effects['immolate '+this.element] = {
        timer:5,
        stacks:1,
        script:(
          this.actor.effects['elemental precision']?
          function(){
            var dmg = 10+r(1,4,1);
            var element = this.spell.split(' ')[1];
            if(this.actor.effects['vicerating '+element]){
              dmg+=10*this.actor.effects['vicerating '+element].stacks;
            } //end if
            this.actor.health -= dmg;
            return '{M|The '+this.spell+' deals an extra '+dmg+' damage to '+this.actor.name+' as it surges.';
          }
          :
          function(){
            var dmg = r(1,4,1);
            var element = this.spell.split(' ')[1];
            if(this.actor.effects['vicerating '+element]){
              dmg+=10*this.actor.effects['vicerating '+element].stacks;
            } //end if
            this.actor.health -= dmg;
            return '{M|The '+this.spell+' deals an extra '+dmg+' damage to '+this.actor.name+' as it surges.';
          }
        )
      };
      return this.target.name+' begins to suffer from '+this.element+' damage.';
    } //end if
  });
  var viceration=new SpellEffect(function(){
    console.log(this);
    var minDamage;
    // if this affect already exists on the target, then ensure
    // that it stacks for a maximum of 5 times
    if(this.target.effects['vicerating '+this.element] &&
       this.target.effects['vicerating '+this.element].stacks<5){
      minDamage=this.target.effects['vicerating '+this.element].stacks;
      this.target.effects['vicerating '+this.element] = {
        timer:15,
        stacks:++this.target.effects['vicerating '+this.element].stacks,
        name:'vicerating '+this.element
      };
      return '{M|'+this.target.name+' becomes INCREDIBLY susceptible to '+this.element+' damage.';
    }else{ //this is the first time that the affect has been applied to the target
      this.target.effects['vicerating '+this.element] = {
        timer:15,
        stacks:1
      };
      return '{M|'+this.target.name+' becomes susceptible to '+this.element+' damage.';
    } //end if
  });
  Database.spells.effects.immolation=immolation; //link immolation to the spell effects collection
  Database.spells.effects.viceration=viceration; //link viceration to the spell effects collection
})(Database||(Database={}));
