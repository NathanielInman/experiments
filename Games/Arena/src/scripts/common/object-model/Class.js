var Database;
(function(Database){
  /**
   * Class is a base class that all classes are built
   * upon. It contains generic functions that they all
   * use.
   */
  class Class {
    getClass(){
      console.log('My class is '+this.name);
    }
    addAbility(config){
      var name = config.name || 'error';
      config.actor = this.actor; //insert the actor into the spell as it's scoped in
      this.abilities[name]=new Database.Spell(name,config);
      console.log('Added skill '+name+' to '+this.actor.name+'.');
    }
  }
  Database.Class=Class;
})(Database||(Database={}));
