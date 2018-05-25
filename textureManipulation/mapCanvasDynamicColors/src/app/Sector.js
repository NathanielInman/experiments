import {floors} from './floors';
import {walls} from './walls';
import {ink} from 'ion-cloud';

export class Sector{
  constructor(map){
    this.map = map;
    this.environment = this.map.environment;
    this.category = 'empty';
    this.type = 'none';
    this.roomNumber = 0;
  }
  getColors(){
    let result = {}, a; //a(alpha) is represents how strong env color is

    if(this.isVisible()){
      result.backgroundShadowColor = '#000';
      result.backgroundShadowBlur = 0;
      result.foregroundShadowColor = ink(this.type.color,{a: 0.6});
      result.foregroundShadowBlur = 10;
      a = 0.33;
    }else{
      result.backgroundShadowColor = '#000';
      result.backgroundShadowBlur = 0;
      result.foregroundShadowColor = '#000';
      result.foregroundShadowBlur = 0;
      a = 0.07;
    } //end if
    if(this.category==='door'&&!this.doorOpen){
      result.backgroundColor = ink(this.typeOpen.background,{a});
      result.foregroundColor = ink(this.typeOpen.color,{a});
      result.character = '+';
    }else if(this.category==='door'&&this.doorOpen){
      result.backgroundColor = ink(this.typeClosed.background,{a});
      result.foregroundColor = ink(this.typeClosed.color,{a});
      result.character = '-';
    }else if(this.type!=='none'){
      result.backgroundColor = ink(this.type.background,{a});
      result.foregroundColor = ink(this.type.color,{a});
      result.character = this.type.character;
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
  isVisible(){ return this.visible; }
  setVisible(){ this.visible = true; }
  unsetVisible(){ this.visible = false; }
  isWalkable(){
    let walkable = false;

    if(this.isFloor()) walkable = true;
    if(this.isCorridor()) walkable = true;
    if(this.isDoorOpen()) walkable = true;
    return walkable;
  }
}
