import {floors} from './floors';
import {walls} from './walls';
import {ink} from 'ion-cloud';

// blend top and bottom colors together
function getBlendedHSL(topColor,bottomColor,topWeight){
  let top = ink(topColor,{format: 'object'}),
      bottom = ink(bottomColor,{format: 'object'}),
      r = top.r*topWeight+bottom.r*(1-topWeight),
      g = top.g*topWeight+bottom.g*(1-topWeight),
      b = top.b*topWeight+bottom.b*(1-topWeight);

  return getHSLFromHex(ink(`rgb(${r},${g},${b})`,{format: 'hex'}));
} //end getBlendedHSL()

function getHSLFromHex(hex){
  return ink(hex,{format: 'hsl'}).replace(/(hsl\(|\))/g,'').split(',');
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
    let result = {},
        h = this.environment.color.hue,
        s = this.environment.color.saturation,
        l = this.environment.color.lightness.ambient,
        f = this.environment.color.fog,
        color = this.type.color,
        colorEnv = ink(`hsl(${h},${s},${l})`,{format: 'hex'});

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
      [h,s] = getBlendedHSL(colorEnv,color,f);
      l = this.environment.color.lightness.floorVisible;
      result.backgroundColor = ink(`hsl(${h},${s},${l})`);
      if(this.isDoor()){
        l += this.environment.color.lightness.floorLetterActive;
      }else{
        l += this.environment.color.lightness.floorLetter;
      } //end if
      result.foregroundColor = ink(`hsl(${h},${s},${l})`);
    }else if(!this.isVisible()&&this.isWalkable()){
      [h,s] = getBlendedHSL(colorEnv,color,f);
      l = this.environment.color.lightness.floorHidden;
      result.backgroundColor = ink(`hsla(${h},${s},${l},0.3)`);
      result.foregroundColor = ink('rgba(0,0,0,0)');
    }else if(this.isVisible()&&(this.isWall()||this.isDoor())){
      [h,s] = getBlendedHSL(colorEnv,color,f);
      l = this.environment.color.lightness.wallVisible;
      result.backgroundColor = ink(`hsl(${h},${s},${l})`);
      if(this.isDoor()){
        l += this.environment.color.lightness.wallLetterActive;
      }else{
        l += this.environment.color.lightness.wallLetter;
      } //end if
      result.foregroundColor = ink(`hsl(${h},${s},${l})`);
    }else if(!this.isVisible()&&(this.isWall()||this.isDoor())){
      [h,s] = getBlendedHSL(colorEnv,color,f);
      l = this.environment.color.lightness.wallHidden;
      result.backgroundColor = ink(`hsla(${h},${s},${l},0.2)`);
      result.foregroundColor = ink('rgba(0,0,0,0)');
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
