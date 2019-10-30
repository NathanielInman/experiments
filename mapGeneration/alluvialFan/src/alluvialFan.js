import {Noise} from 'noisejs';

//eslint-disable-next-line complexity
export function alluvialFan({map}){
  const viableStartSectors = [],
        viableEndSectors = [],
        alluvialDistance = 15,
        riverSectors = [];

  let startSector,endSector,terminalSector,a1,a2,riverSuccess,mapSuccess;

  // very rarely we get all the way down to the bottom and the map failed
  // because the continents weren't appropriately placed
  //eslint-disable-next-line no-labels
  generator:
  do{
    mapSuccess = false;

    // we keep generating continent maps until we get one where there's
    // land on the wall that a be a start of the stream and a water area
    // near the middle of the screen it can outlet into
    do{
      map.noise = new Noise(Math.random());
      viableStartSectors.length = 0;
      viableEndSectors.length = 0;
      map.sectors.forEach(row=>{
        row.forEach(sector=>{
          const n = (1+map.noise.simplex2(sector.x/map.width,sector.y/map.height))/2;

          if(n<0.5){
            sector.setWall();
            if(
              sector.x===0||sector.x===map.width-1||
              sector.y===0||sector.y===sector.height-1
            ){
              viableStartSectors.push(sector);
            } //end if
          }else if(n<0.53){
            sector.setFloor();
          }else if(n<0.55&&Math.random()<0.2){
            sector.setFloor();
          }else{
            sector.setWaterSpecial();
            if(
              sector.x>alluvialDistance&&sector.x<map.width-alluvialDistance&&
              sector.y>alluvialDistance&&sector.y<map.height-alluvialDistance
            ){
              viableEndSectors.push(sector);
            } //end if
          } //end if
        });
      });
    }while(!viableStartSectors.length||!viableEndSectors.length)

    // now get a drunken path between a random start and end sector

    // we continue looping until we find a stream that outlets far enough
    // from the edge of the screen and where the start and end sectors
    // are far enough from each other
    do{
      riverSuccess = false;
      riverSectors.length = 0;
      terminalSector = null;
      do{

        /*eslint-disable no-labels*/
        if(!viableStartSectors.length) continue generator;
        if(!viableEndSectors.length) continue generator;
        /*eslint-enable no-labels*/

        startSector = map.constructor.shuffle(viableStartSectors).pop();
        endSector = map.constructor.shuffle(viableEndSectors).pop();
        a1 = Math.pow(endSector.x-startSector.x,2);
        a2 = Math.pow(endSector.y-startSector.y,2);
      }while(Math.sqrt(a1+a2)<=alluvialDistance*2)
      let terminateEarly = false;

      map.drunkenPath({
        x1: endSector.x, y1: endSector.y,
        x2: startSector.x, y2: startSector.y,

        //eslint-disable-next-line no-loop-func
        draw(sector){
          if(!terminateEarly){
            const count = map.getNeighbors({
              x: sector.x, y: sector.y,self: true,
              test(sector){
                return sector.isWater();
              }
            }).length;

            if(count){
              terminalSector = sector;
              terminateEarly = true;
            }else{
              riverSectors.push(sector);
            } //end if
          } //end if
        }
      });
      if(!terminalSector) terminalSector = endSector;
      a1 = Math.pow(terminalSector.x-startSector.x,2);
      a2 = Math.pow(terminalSector.y-startSector.y,2);
      riverSuccess = Math.sqrt(a1+a2)>alluvialDistance*2;
    }while(!riverSuccess);

    // this restarts the generation if the river flows through
    // a body of water. This works because the river automatically
    // stops when it hits water, if the length of the river is
    // less than the straightest distance between two points then
    // it's obviously wrong
    if(riverSectors.length>=Math.sqrt(a1+a2)) mapSuccess = true;
  }while(!mapSuccess); //will always exit

  // now we'll draw the actual alluvial fan
  const r = Math.floor(alluvialDistance/2), //radius
        sx = terminalSector.x-r, //start x
        ex = terminalSector.x+r, //end x
        sy = terminalSector.y-r, //start y
        ey = terminalSector.y+r, //end y
        cx = sx+(ex-sx)/2, //center x float
        cy = sy+(ey-sy)/2, //center y float
        sa1 = (ex-sx)/2, //semi-axis 1
        sa2 = (ey-sy)/2; //semi-axis 2

  let hypotenuse, theta, foci, p1, p2,
      endTerminalSector;

  for(let y=sy;y<ey;y++){
    for(let x=sx;x<ex;x++){
      hypotenuse = Math.sqrt(Math.pow(x-cx,2)+Math.pow(y-cy,2));
      theta = Math.asin(Math.abs(y-cy)/hypotenuse);
      p1 = Math.pow(sa1,2)*Math.pow(Math.sin(theta),2);
      p2 = Math.pow(sa2,2)*Math.pow(Math.cos(theta),2);
      foci = (sa1*sa2)/Math.sqrt(p1+p2);
      if(hypotenuse<(foci/4*3)&&map.isInbounds({x,y})&&map.isWater({x,y})){
        map.setWaterSpecial({x,y});
      }else if(hypotenuse<(foci/4*3)&&map.isInbounds({x,y})){
        map.setWater({x,y});
      } //end if
      if(
        hypotenuse<foci&&Math.random()<0.85&&
        map.isInbounds({x,y})&&map.isWater({x,y})||
        hypotenuse<foci&&!endTerminalSector&&
        map.isInbounds({x,y})&&map.isWater({x,y})
      ){
        endTerminalSector = map.getSector({x,y});
        endTerminalSector.setWater();
      } //end if
      if(hypotenuse<foci&&map.isInbounds({x,y})){
        map.setWater();
      } //end if
      if(isNaN(foci)) map.setWater({x,y}); //center of circle
    } //end for
  } //end for
  const finishedRiverSectors = [];

  riverSectors.forEach(sector=>{
    map.getNeighbors({
      x: sector.x, y: sector.y, self: true,
      test(sector){
        const count = map.getNeighbors({
          x: sector.x, y: sector.y, self: true,
          test(sector){
            return sector.isWater();
          }
        }).length;

        return !count;
      }
    }).forEach(sector=> Math.random()<0.5?finishedRiverSectors.push(sector):null);
  });
  finishedRiverSectors.forEach((sector,i)=>{
    sector.setWater();
    if(i===finishedRiverSectors.length-1){
      map.getNeighbors({
        x: sector.x,y: sector.y, self: true
      }).forEach(sector=> sector.setWater());
    }
  });

  const d = Math.random()<0.5, //noise direction
        h = d?7:10, //horizontal
        v = d?10:7; //vertical

  map.noise = new Noise(Math.random());
  map.sectors.forEach(row=>{
    row.forEach(sector=>{
      const n = (1+map.noise.simplex2(sector.x/map.width*h,sector.y/map.height*v))/2;

      if(n<0.6&&sector.isWall()&&Math.random()<0.4){
        sector.setFloor();
      }else if(n<0.7&&Math.random()<0.4&&sector.isWall()){
        sector.setFloorSpecial();
      }else if(n<0.7&&sector.isWall()){
        sector.setFloor();
      }else if(n<0.8&&sector.isWall()){
        sector.setFloorSpecial();
      } //end if
    });
  });
} //end function

