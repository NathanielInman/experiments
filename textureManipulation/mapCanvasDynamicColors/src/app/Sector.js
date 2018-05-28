import {floors} from './floors';
import {walls} from './walls';
import {ink} from 'ion-cloud';

function getAverageHue(hue1,hue2){
  let [radius1,radius2] = [(hue1+hue2)/2,((hue1+hue2+360)/2)%360];

  if(Math.min(Math.abs(hue1-radius1),Math.abs(hue2-radius1))<Math.min(Math.abs(hue1-radius2),Math.abs(hue2-radius2)))
    return radius1
  else
    return radius2
} //end getAverageHue()

function getHueFromHex(hex){
  return ink(hex,{format: 'hsl'}).replace(/(hsl\(|\))/g,'').split(',')[0];
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
    let result = {}, color = this.type.background;

    // set character defaults and override color
    // if it's a dynamic sector like a door
    result.character = this.type.character;
    if(this.category==='door'&&!this.doorOpen){
      color = this.typeOpen.color;
      result.character = '+';
    }else if(this.category==='door'&&this.doorOpen){
      color = this.typeClosed.color;
      result.character = '-';
    } //end if

    // now acquire the color based on whether its visible and either a floor
    // or a wall
    if(this.isVisible()&&this.isWalkable()){
      let hue = getHueFromHex(this.type.background),
          avg = getAverageHue(hue,this.environment.color.hue);

      result.backgroundColor = ink(`hsl(${
        avg},${
        this.environment.color.saturation},${
        this.environment.color.lightness.floorVisible
      })`);
      result.foregroundColor = ink(`hsl(${
        avg},${
        this.environment.color.saturation},${
        this.environment.color.lightness.floorVisible+0.2
      })`);
    }else if(!this.isVisible&&this.isWalkable()){
      let hue = getHueFromHex(this.type.background),
          avg = getAverageHue(hue,this.environment.color.hue);

      result.backgroundColor = ink(`hsl(${
        avg},${
        this.environment.color.saturation},${
        this.environment.color.lightness.floorHidden
      })`);
      result.foregroundColor = ink(`hsl(${
        avg},${
        this.environment.color.saturation},${
        this.environment.color.lightness.floorHidden+0.2
      })`);
    }else if(this.isVisible()&&this.isWall()){
      let hue = getHueFromHex(this.type.background),
          avg = getAverageHue(hue,this.environment.color.hue);

      result.backgroundColor = ink(`hsl(${
        avg},${
        this.environment.color.saturation},${
        this.environment.color.lightness.wallVisible
      })`);
      result.foregroundColor = ink(`hsl(${
        avg},${
        this.environment.color.saturation},${
        this.environment.color.lightness.wallVisible+0.2
      })`);
    }else if(!this.isVisible()&&this.isWall()){
      let hue = getHueFromHex(this.type.background),
          avg = getAverageHue(hue,this.environment.color.hue);

      result.backgroundColor = ink(`hsl(${
        avg},${
        this.environment.color.saturation},${
        this.environment.color.lightness.wallHidden
      })`);
      result.foregroundColor = ink(`hsl(${
        avg},${
        this.environment.color.saturation},${
        this.environment.color.lightness.wallHidden+0.2
      })`);
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
