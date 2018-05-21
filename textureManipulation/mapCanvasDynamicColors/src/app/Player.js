import Mrpas from 'mrpas';

export class Player{
  constructor(map){
    this.map = map;
    this.sight = 7;
    this.visible = [];
    this.initialize();
  }
  initialize(){
    do{
      this.x = Math.floor(Math.random()*this.map.width);
      this.y = Math.floor(Math.random()*this.map.height);
    }while(!this.map.isWalkable(this.x,this.y));
    this.fov = new Mrpas(this.map.width,this.map.height,(x,y)=>{
      return this.map.isWalkable(x,y);
    });
    this.setVisible();
  }

  // we have to turn off visible sectors before moving to new sectors
  // so the light moves with us
  unsetVisible(){
    this.visible.forEach(s=> this.map.unsetVisible(s.x,s.y));
    this.visible.length=0;
  }

  // this sets sectors as visible if they are walkable
  setVisible(){
    this.fov.compute(this.x,this.y,this.sight,(x,y)=>{
      return this.map.isVisible(x,y);
    },(x,y)=>{
      this.map.setVisible(x,y);
      this.visible.push({x,y});
    });
  }

  //eslint-disable-next-line complexity
  move(direction){
    let result = false;

    if(direction==='north'&&this.map.isWalkable(this.x,this.y-1)){
      if(this.map.isDoorClosed(this.x,this.y-1)){
        this.map.setDoorOpen(this.x,this.y-1);
      }else{
        this.unsetVisible(); this.y-=1; this.setVisible();
      } //end if
      result = true;
    }else if(direction==='east'&&this.map.isWalkable(this.x+1,this.y)){
      if(this.map.isDoorClosed(this.x+1,this.y)){
        this.map.setDoorOpen(this.x+1,this.y);
      }else{
        this.unsetVisible(); this.x+=1; this.setVisible();
      } //end if
      result = true;
    }else if(direction==='west'&&this.map.isWalkable(this.x-1,this.y)){
      if(this.map.isDoorClosed(this.x-1,this.y)){
        this.map.setDoorOpen(this.x-1,this.y);
      }else{
        this.unsetVisible(); this.x-=1; this.setVisible();
      } //end if
      result = true;
    }else if(direction==='south'&&this.map.isWalkable(this.x,this.y+1)){
      if(this.map.isDoorClosed(this.x,this.y+1)){
        this.map.setDoorOpen(this.x,this.y+1);
      }else{
        this.unsetVisible(); this.y+=1; this.setVisible();
      } //end if
      result = true;
    }else if(direction==='northwest'&&this.map.isWalkable(this.x-1,this.y-1)){
      if(this.map.isDoorClosed(this.x-1,this.y-1)){
        this.map.setDoorOpen(this.x-1,this.y-1);
      }else{
        this.unsetVisible(); this.x-=1; this.y-=1; this.setVisible();
      } //end if
      result = true;
    }else if(direction==='northeast'&&this.map.isWalkable(this.x+1,this.y-1)){
      if(this.map.isDoorClosed(this.x+1,this.y-1)){
        this.map.setDoorOpen(this.x+1,this.y-1);
      }else{
        this.unsetVisible(); this.x+=1; this.y-=1; this.setVisible();
      } //end if
      result = true;
    }else if(direction==='southwest'&&this.map.isWalkable(this.x-1,this.y+1)){
      if(this.map.isDoorClosed(this.x-1,this.y+1)){
        this.map.setDoorOpen(this.x-1,this.y+1);
      }else{
        this.unsetVisible(); this.x-=1; this.y+=1; this.setVisible();
      } //end if
      result = true;
    }else if(direction==='southeast'&&this.map.isWalkable(this.x+1,this.y+1)){
      if(this.map.isDoorClosed(this.x+1,this.y+1)){
        this.map.setDoorOpen(this.x+1,this.y+1);
      }else{
        this.unsetVisible(); this.x+=1; this.y+=1; this.setVisible();
      } //end if
      result = true;
    } //end if
    return result;
  }
}
