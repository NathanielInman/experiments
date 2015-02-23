var Database;
(function(Database){
  var SpellEffect = function(script){
    this.script=script; //this is the script that will be ran when the effect is called.
  };
  Database.spellEffects={};
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
            return 'The '+this.spell+' deals {R|'+dmg+'|} damage to '+this.actor.name+' as it surges strongly (x'+stacks+').';
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
            return 'The '+this.spell+' deals {R|'+dmg+'|} damage to '+this.actor.name+' as it surges more strongly (x'+stacks+').';
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
            return 'The '+this.spell+' deals {R|'+dmg+'|} damage to '+this.actor.name+' as it surges.';
          }
          :
          function(){
            var dmg = r(1,4,1);
            var element = this.spell.split(' ')[1];
            if(this.actor.effects['vicerating '+element]){
              dmg+=10*this.actor.effects['vicerating '+element].stacks;
            } //end if
            this.actor.health -= dmg;
            return 'The '+this.spell+' deals {R|'+dmg+'|} damage to '+this.actor.name+' as it surges.';
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
      return this.target.name+' becomes {X|INCREDIBLY|} susceptible to '+this.element+' damage.';
    }else{ //this is the first time that the affect has been applied to the target
      this.target.effects['vicerating '+this.element] = {
        timer:15,
        stacks:1
      };
      return this.target.name+' becomes susceptible to '+this.element+' damage.';
    } //end if
  });
  Database.spellEffects.immolation=immolation; //link immolation to the spell effects collection
  Database.spellEffects.viceration=viceration; //link viceration to the spell effects collection
})(Database||(Database={}));
