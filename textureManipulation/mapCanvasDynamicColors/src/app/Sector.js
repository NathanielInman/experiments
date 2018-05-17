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
      result.foregroundShadowColor = ink('#000',{a: 0.4});
      result.foregroundShadowBlur = 3;
      a = 0.75;
    }else{
      result.backgroundShadowColor = ink('#000',{a: 1});
      result.backgroundShadowBlur = 10;
      result.foregroundShadowColor = ink('#000',{a: 1});
      result.foregroundShadowBlur = 3;
      a = 0.07;
    } //end if
    if(this.type!=='none'){
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
  setDoor(){
    this.category = 'door';
    this.type = walls.find(w=> w.name==='wood');
    this.type.character = '+'; //override wooden wall with door symbol
  }
  isVisible(){ return this.visible; }
  setVisible(){ this.visible = true; }
  unsetVisible(){ this.visible = false; }
  isWalkable(){
    let walkable = false;

    if(this.isFloor()) walkable = true;
    if(this.isCorridor()) walkable = true;
    if(this.isDoor()) walkable = true;
    return walkable;
  }
}
