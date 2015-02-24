var Database;
(function(Database){
  (function addImages(){
    if(!Database.ImageCollection&&!Database.images){
      Database.images = {
        draw:function(){} //defers images that are used before loaded
      };
      setTimeout(addImages,10); //retry momentarily
    }else if(!Database.ImageCollection){
      setTimeout(addImages,10); //retry momentarily
    }else{
      Database.images = new Database.ImageCollection([{
        name: "SpriteSheet", url: "assets/sprites.png"
      }],function(){
        console.log('Sprites loaded successfully.')
      });
    }
  })();
})(Database||(Database={}));
