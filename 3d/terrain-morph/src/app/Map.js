import {Sector} from './Sector';
//import {Actor} from '../object-model/Actor';
import {Point} from './Point';
//import {Entity,randomDrop} from '../object-model/Entity';
//import {bsp} from '../../generation-algorithms/binarySpacePartitioning';
//import {dhg} from '../../generation-algorithms/drunkardHallwayGeneration';
//import {drg} from '../../generation-algorithms/drunkardRoomGeneration';
import {bsp} from './binarySpacePartitioning';
//import {pcg} from '../../generation-algorithms/proceduralContentGeneration';
//import {dla} from './diffusionLimitedAggregation';
//import {phs} from '../../generation-algorithms/pigeonHoleStepping';
//import {cag} from '../../generation-algorithms/cellularAutomataGeneration';
//import {Heap} from '../object-model/Heap';

// The Map class holds a collection of sectors that comprise a single depth.
// This is often times called a 'level'.
// cDepth Indicates the current depth or level of the map
// height Indicates the max height or columns allocated for the map
// width Indicates the max width or rows allocated for the map
export class Map{
  constructor(cDepth,height,width /*,world,duplicate*/){
    //let environment = world.engine.environments;

    this.depth=cDepth;
    //this.world=world; //retain reference to parent world
    //this.environment=environment[r(0,environment.length,1)];
    this.actors=[]; //an array that holds all the actors contained on that map
    this.generate=[bsp/*bsp,dhg,drg,dcg,pcg,dla,phs,cag*/];
    this.sector=this.initialize(cDepth,height,width);
    if(/*!duplicate&&*/this.generate.length>0){
      let x,y;

      this.generate[r(0,this.generate.length,1)].apply(this);
      do{
        y = r(0,this.getHeight(),1);
        x = r(0,this.getWidth(),1);
      }while(!this.getSector(x,y).isFloor());
      this.getSector(x,y).setPortal();
      //this.populate(25);
    } //end if
  }

  // initialize the map by spanning the sector array to fit the desired sizes
  initialize(cDepth,h,w){
    var x,y,sector=[];

    for(y=0;y<h;y++){
      sector[y]=[];
      for(x=0;x<w;x++){
        sector[y][x]=new Sector(cDepth,y,x,this);
      } //end for
    } //end for
    return sector;
  }

  // Doesn't return a deep copy or even shallow copy, but returns a new map
  // using the same parameters used to create this map
  /*
  duplicate(){
    return new Map(this.depth,this.getHeight(),this.getWidth(),this.world,true);
  }
  */

  // Returns a list of sectors that neighbor the given sector. This is
  // used in pathfinding particularly.
  getPathableNeighbors(sector){
    var list=[],
        x=sector.location.x,y=sector.location.y,
        w = this.getWidth(), h = this.getHeight(),
        sx=M.min(M.max(x-1,0),w-1),
        sy=M.min(M.max(y-1,0),h-1),
        ex=M.min(M.max(x+1,0),w-1),
        ey=M.min(M.max(y+1,0),w-1),
        s; //short placeholder for the cloneable sector

    for(y=sy;y<=ey;y++){
      for(x=sx;x<=ex;x++){
        s = this.getSector(x,y);
        if(s.isWalkable()) list.push(this.getSector(x,y));
      } //end for
    } //end for
    return list;
  }

  // return the sector given a specific coordinate
  getSector(x,y){
    var result;

    if(x>=0&&y>=0&&x<this.getWidth()&&y<this.getHeight()){
      result = this.sector[y][x];
    }else{
      result = new Sector(); //returns a new void sector
    } //end if
    return result;
  }

  // Get the width of the map
  getWidth(){
    return this.sector[0].length;
  }

  // Get the height of the map
  getHeight(){
    return this.sector.length;
  }

  // Populate the map with mobiles and items
  /*
  populate(amount){
    var current,x,y,failure,item,
        creature = this.world.engine.creatures;

    // Start with populating the map with mobiles
    failure=0;
    for(current=0;current<amount;current++){
      do{
        failure++;
        x=r(0,this.getWidth(),1);
        y=r(0,this.getHeight(),1);
      }while(!this.getSector(x,y).isWalkable()&&failure<100);
      if(failure<100){
        this.actors.push(new Actor(new Point(x,y,this.depth),r(0,creature.length,1),this));
        this.getSector(x,y).occupied=this.actors[current];
      } //end if
    } //end for

    // Now populate the map with items
    failure=0;
    for(current=0;current<amount;current++){
      do{
        failure++;
        x=r(0,this.getWidth(),1);
        y=r(0,this.getHeight(),1);
      }while(!this.getSector(x,y).isWalkable()&&failure<100);
      item = randomDrop(this.world.engine);
      if(failure<100&&item){
        this.getSector(x,y).items.push(item);
      } //end if
    } //end for
  }
  */
  isContained(x,y){
    return x>=0&&y>=0&&x<this.getWidth()&&y<this.getHeight();
  }
  isOccupied(x,y){
    return this.isContained(x,y)?this.sector[y][x].isOccupied():false;
  }
  isWalkable(x,y){
    return this.isContained(x,y)?this.sector[y][x].isWalkable():false;
  }
  isRoomEqual(x1,y1,x2,y2){
    let result = this.isContained(x1,y1)&&this.isContained(x2,y2);

    return result?this.sector[y1][x1].room===this.sector[y2][x2].room:false;
  }
  isRoom(x,y){
    return this.isContained(x,y)?this.sector[y][x].isRoom():false;
  }
  setRoom(x,y,id){
    return this.isContained(x,y)?this.sector[y][x].setRoom(id):false;
  }
  getRoom(x,y){
    return this.isContained(x,y)?this.sector[y][x].room:null;
  }
  getLocation(x,y){
    return this.isContained(x,y)?this.sector[y][x].getLocation():false;
  }
  setLocation(x,y,id){
    return this.isContained(x,y)?this.sector[y][x].setLocation(id):false;
  }
  isVoid(x,y){
    return this.isContained(x,y)?this.sector[y][x].isVoid():false;
  }
  setVoid(x,y){
    return this.isContained(x,y)?this.sector[y][x].setVoid():false;
  }
  isFloor(x,y){
    return this.isContained(x,y)?this.sector[y][x].isFloor():false;
  }
  setFloor(x,y){
    return this.isContained(x,y)?this.sector[y][x].setFloor():false;
  }
  isWall(x,y){
    return this.isContained(x,y)?this.sector[y][x].isWall():false;
  }
  setWall(x,y){
    return this.isContained(x,y)?this.sector[y][x].setWall():false;
  }
  isCorridor(x,y){
    return this.isContained(x,y)?this.sector[y][x].isCorridor():false;
  }
  setCorridor(x,y){
    return this.isContained(x,y)?this.sector[y][x].setCorridor():false;
  }
  isWater(x,y){
    return this.isContained(x,y)?this.sector[y][x].isWater():false;
  }
  setWater(x,y){
    return this.isContained(x,y)?this.sector[y][x].setWater():false;
  }
  isDoor(x,y){
    return this.isContained(x,y)?this.sector[y][x].isDoor():false;
  }
  setDoor(x,y){
    return this.isContained(x,y)?this.sector[y][x].setDoor():false;
  }
  isPortal(x,y){
    return this.isContained(x,y)?this.sector[y][x].isPortal():false;
  }
  setPortal(x,y){
    return this.isContained(x,y)?this.sector[y][x].setPortal():false;
  }
}

