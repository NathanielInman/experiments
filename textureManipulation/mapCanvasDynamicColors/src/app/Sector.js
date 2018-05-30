import {floors} from './floors';
import {walls} from './walls';
import {ink} from 'ion-cloud';

function getBlendedHue(hue1,hue2,hue1weight){
  if(hue1===0||hue2===0) return hue1||hue2; //ignore grays
  let [radius1,radius2] = [
    hue1*hue1weight+hue2*(1-hue1weight),
    ((hue1*hue1weight+hue2*(1-hue1weight)+360)/2)%360
  ];

  if(Math.min(Math.abs(hue1-radius1),Math.abs(hue2-radius1))<Math.min(Math.abs(hue1-radius2),Math.abs(hue2-radius2)))
    return radius1
  else
    return radius2
} //end getBlendedHue()

function getHueFromHex(hex){
  return +ink(hex,{format: 'hsl'}).replace(/(hsl\(|\))/g,'').split(',')[0];
} //end getHueFromHex()

export class Sector{
  constructor(map){
    this.map = map;
    this.environment = this.map.environment;
    this.category = 'empty';
    this.type = 'none';
    this.roomNumber = 0;
  }
  getColors(){
    let result = {}, color = this.type.color,
        h = this.environment.color.hue,
        s = this.environment.color.saturation,
        l = 0;

    // set character defaults and override color
    // if it's a dynamic sector like a door
    result.character = this.type.character;
    if(this.isDoorClosed()){
      color = this.typeOpen.color;
      result.character = '+';
    }else if(this.isDoorOpen()){
      color = this.typeClosed.color;
      result.character = '-';
    } //end if

    // now acquire the color based on whether its visible and either a floor
    // or a wall
    if(this.isVisible()&&this.isWalkable()){
      let hue = getHueFromHex(color);

      h = getBlendedHue(hue,h,this.environment.color.strength);
      l = this.environment.color.lightness.floorVisible;
      result.backgroundColor = ink(`hsl(${h},${s},${l})`);
      result.foregroundColor = ink(`hsl(${h},${s},${l+0.2})`);
    }else if(!this.isVisible()&&this.isWalkable()){
      let hue = getHueFromHex(color);

      h = getBlendedHue(hue,h,this.environment.color.strength);
      l = this.environment.color.lightness.floorHidden;
      result.backgroundColor = ink(`hsl(${h},${s},${l})`);
      result.foregroundColor = ink(`hsl(${h},${s},${l+0.2})`);
    }else if(this.isVisible()&&(this.isWall()||this.isDoor())){
      let hue = getHueFromHex(color);

      h = getBlendedHue(hue,h,this.environment.color.strength);
      l = this.environment.color.lightness.wallVisible;
      result.backgroundColor = ink(`hsl(${h},${s},${l})`);
      result.foregroundColor = ink(`hsl(${h},${s},${l+0.2})`);
    }else if(!this.isVisible()&&(this.isWall()||this.isDoor())){
      let hue = getHueFromHex(color);

      h = getBlendedHue(hue,h,this.environment.color.strength);
      l = this.environment.color.lightness.wallHidden;
      result.backgroundColor = ink(`hsl(${h},${s},${l})`);
      result.foregroundColor = ink(`hsl(${h},${s},${l+0.2})`);
    }else{
      result = null;
    } //end if
    return result;
  }
  getRandomFloorType(){
    let randomIndex = Math.floor(Math.random()*this.environment.floors.length);

    return floors.find(f=> f.name===this.environment.floors[randomIndex]);
  }
  getRandomWallType(){
    let randomIndex = Math.floor(Math.random()*this.environment.walls.length);

    return walls.find(w=> w.name===this.environment.walls[randomIndex]);
  }
  isEmpty(){ return this.category === 'empty'; }
  setEmpty(){
    this.category = 'empty';
    this.type = 'none';
  }
  isFloor(){ return this.category === 'floor'; }
  setFloor(){
    this.category = 'floor';
    this.type = this.getRandomFloorType();
  }
  isWall(){ return this.category === 'wall'; }
  setWall(){
    this.category = 'wall';
    this.type = this.getRandomWallType();
  }
  isCorridor(){ return this.category === 'corridor'; }
  setCorridor(){
    this.category = 'corridor';
    this.type = this.getRandomFloorType();
  }
  isDoor(){ return this.category === 'door'; }
  isDoorClosed(){ return this.category==='door'&&!this.doorOpen; }
  isDoorOpen(){ return this.category==='door'&&this.doorOpen; }
  setDoorOpen(){ this.doorOpen = true; }
  setDoorClosed(){ this.doorOpen = false; }
  setDoor(){
    this.category = 'door';
    this.typeOpen = walls.find(w=> w.name==='wood');
    this.typeClosed = floors.find(w=> w.name==='wood');
    this.doorOpen = Math.random()<0.5?true:false; //random
  }
  isSeen(){ return this.seen; }
  isVisible(){ return this.visible; }
  setVisible(){ this.visible = true; this.seen = true; }
  unsetVisible(){ this.visible = false; }
  isWalkable(){
    let walkable = false;

    if(this.isFloor()) walkable = true;
    if(this.isCorridor()) walkable = true;
    if(this.isDoorOpen()) walkable = true;
    return walkable;
  }
}
