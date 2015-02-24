var Database;
(function(Database){
  class ImageCollection {
    constructor(list,callback){
      this.total = 0, this.images = {};
      for(var i = 0; i < list.length; i++){
        var img = new Image();
        this.images[list[i].name] = img;
        img.onload = function(){
          this.total++;
          if(this.total == list.length)callback && callback();
        };
        img.src = list[i].url;
      } //end for
    }
    get(name){
      return this.images[name] || (function(){throw "Image requested doesn't exist."})();
    }
    draw(name,snipx,snipy,snipw,sniph,x,y,w,h){
      if(!this.images[name])throw "Image requested doesn't exist.";
      if(x!=undefined&&y!=undefined&&w!=undefined&&h!=undefined){
        ctx.drawImage(this.images[name],snipx,snipy,snipw,sniph,x,y,w,h);
      }else{
        ctx.drawImage(this.images[name],snipx,snipy,snipw,sniph);
      } //end if
    }
  }
  Database.ImageCollection = ImageCollection;
})(Database||(Database={}));
