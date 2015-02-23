var Database;
(function(Database){
  class Creature {
    constructor(name,num){
      var creatures    = Database.creatures;
      var type         = creatures[104]; //num?creatures[num]:creatures[r(0,creatures.length,1)];
      this.level       = 100;
      this.type        = type;
      this.name        = name || type.name;
      this.weight      = type.weight;
      this.height      = type.height;
      this.health      = 1000; //type.health;
      this.healthMax   = 1000; //type.health;
      this.damage      = type.damage;
      this.symbol      = type.symbol;
      this.resistance  = { fire: 2 };
      this.amplitude   = { fire: 1 };
      this.effects     = { }; //no current effects
      this.description = type.description;
      this.class       = new Database.classes.Elementalist(this); //new Elementalist(this,'fire')
      this.actions     = {
        cur:0,
        list:[]
      };
    }
    cast(name,target){
      console.log(this,'--->',name,target);
      var result = [];
      result.push(this.name+' casts {M|"{m|'+name+'|}"|} at '+(target.specialty?'itself.':target.name+'.'));
      result.push(this.class.abilities[name].cast(target));
      return result.join('|||');
    }
    attack(target){
      var result=[];
      var attackRoll = r(1,101,1);
      var damage = this.damage>5?r(this.damage-5,this.damage+1,1):r(0,this.damage+1,1);
      if(attackRoll<5){ //critical miss
        attackRoll = r(1,101,1);
        if(attackRoll>=95){
          this.health -= (damage=(damage+1)*2);
          result.push(this.name+' strikes wildly and {R|CRITICALLY|} damages itself for {R|'+damage+'|} hp.');
        }else{
          this.health -= ++damage; //add 1 to ensure it always deals damage
          result.push(this.name+' strikes wildly and damages itself for {R|'+damage+'|} hp.');
        } //end if
      }else if(attackRoll<15){ //miss
        result.push(this.name+' attacks and misses '+target.name+'.');
      }else if(attackRoll>=95){ //critical strike x2damage
        damage*=2;
        target.health -= damage;
        result.push(this.name+' {R|CRITICALLY|} attacks '+target.name+' for {R|'+damage+'|} hp.');
      }else{
        if(damage===0){
          result.push(this.name+' weakly attacks '+target.name+' and deals no damage.');
        }else{
          target.health -= damage;
          result.push(this.name+' attacks '+target.name+' for {R|'+damage+'|} hp.');
        } //end if
      } //end if
      return result.join('|||');
    }
    process(target){
      var result = [];
      // Start processing the mobiles actions by iterating through the effects that
      // they're currently under and applying them. If they die during this section
      // then their AI routines aren't executed
      if(this.health<=0)return this.name+' hits the ground in a heap.';
      // Start by applying any effects the creature has on it before they decide to act
      for(var spell in this.effects){
        // Run the script if it's an executable affect
        if(this.effects[spell].script){ //the affect has a script to run
          result.push(this.effects[spell].script.call({actor:this,spell:spell}));
        } //end if
        // Decrement the timer for the affect or remove it if it expires
        if(this.effects[spell].timer>0){
          this.effects[spell].timer--; //decrement the timer on spells that don't last forever
        }else if(this.effects[spell].timer===0){
          delete this.effects[spell]; //remove the node from the object that has expired
        } //end if
      } //end for
      result.push(this.class.ai(target)); //run the ai routines
      return result.join('|||');
    }
  }
  Database.Creature = Creature; //give the Creature class to the Database
})(Database||(Database={}));
