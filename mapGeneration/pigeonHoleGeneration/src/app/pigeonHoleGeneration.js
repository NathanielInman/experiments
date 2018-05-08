const hallwayLengthMean = 5;
const hallwayLengthSigma = 1.4; //standard deviation = sigma
const minRoomSize = 2;
const maxRoomSize = 5;
const directions = ['north','south','east','west'];

// Given a mean and standard deviation, compute a random length
function getHallwayLength(){
  let X = Math.random()*Math.PI*2,
      Y = Math.random(),
      r = hallwayLengthSigma*Math.sqrt(-2*Math.log(Y)),
      //x = r*Math.cos(X)+hallwayLengthMean,
      y = r*Math.sin(X)+hallwayLengthMean;

  return y|0||1; //we're on a grid, can't have partial/0 hallway lengths
} //end getHallwayLength()

function getRandomDirection(){
  let randomIndex = Math.floor(Math.random()*directions.length);

  return directions[randomIndex];
} //end getRandomDirection()

function getTargetCoordinates({x,y,direction,length,w,h}){
  let result, r = Math.random()<0.5?1:-1;

  if(direction==='north'){
    result = {x: x+r*(w||0),y: y-(length||h)};
  }else if(direction==='south'){
    result = {x: x+r*(w||0),y: y+(length||h)};
  }else if(direction==='east'){
    result = {x: x+(length||w),y: y+r*(h||0)};
  }else if(direction==='west'){
    result = {x: x-(length||w),y: y+r*(h||0)};
  } //end if
  return result;
} //end getTargetCoordinates()

// shuffles an array in place
function shuffle(array){
  for(let i = array.length - 1,j; i > 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  } //end for
  return array;
} //end shuffle()


export function PHG(map){
  let x=Math.floor(Math.random()*map.width/2)+Math.floor(map.width/4),
      y=Math.floor(Math.random()*map.height/2)+Math.floor(map.height/4),
      nodes = [], leafs = [], direction, target, path;

  nodes.push({x,y,direction: 'north'});
  nodes.push({x,y,direction: 'south'});
  nodes.push({x,y,direction: 'east'});
  nodes.push({x,y,direction: 'west'});
  shuffle(nodes);
  do{
    if(!direction){
      [x,y,direction]=Object.values(nodes.pop());
    }else if(map.isPathEmpty(path)){
      x = target.x; y = target.y;
      nodes.push({x,y,direction: 'north'});
      nodes.push({x,y,direction: 'south'});
      nodes.push({x,y,direction: 'east'});
      nodes.push({x,y,direction: 'west'});
      path.forEach(p=> map.setFloor(p.x,p.y));
      shuffle(nodes);
      [x,y,direction]=Object.values(nodes.pop());
      buildRooms(path);
    }else if(nodes.length){
      [x,y,direction]=Object.values(nodes.pop());
    }else if(leafs.length){
      [x,y,direction]=Object.values(leafs.pop());
    }//end if
    length = getHallwayLength();
    target = getTargetCoordinates({x,y,direction,length});
    path = map.getPath(x,y,target.x,target.y);
    if(nodes.length){
      leafs = [].concat(
        leafs,
        ...path.map(p=>directions.map(direction=>{
          return {x: p.x,y: p.y,direction};
        }))
      );
    } //end if
  }while(nodes.length||leafs.length) //end for

  function buildRooms(path){
    while(path.length){
      shuffle(path);
      shuffle(directions);
      let [x,y] = Object.values(path.pop()),
          w, h, t; //width and height and target(x,y)

      directions.find(direction=>{
        let result = false;

        w = Math.floor(Math.random()*(maxRoomSize-minRoomSize)+minRoomSize);
        h = Math.floor(Math.random()*(maxRoomSize-minRoomSize)+minRoomSize);
        t = getTargetCoordinates({x,y,direction,w,h});
        if(direction==='north'){
          y-=1; t.y-=1; x-=w/2|0; t.x-=w/2|0;
        }else if(direction==='south'){
          y+=1; t.y+=1; x-=w/2|0; t.x-=w/2|0;
        }else if(direction==='east'){
          x+=1; t.x+=1; y-=h/2|0; t.y-=h/2|0;
        }else if(direction==='west'){
          x-=1; t.x-=1; y-=h/2|0; t.y-=h/2|0;
        } //end if
        if(map.isSquareEmpty(x,y,t.x,t.y)){
          map.fillRoom(x,y,t.x,t.y);
          result = true;
          if(direction==='north'||direction==='south'){
            map.setCorridor((x+t.x)/2|0,y);
          }else if(direction==='east'||direction==='west'){
            map.setCorridor(x,(y+t.y)/2|0);
          } //end if
        } //end if
        return result;
      });
    } //end while()
  } //end buildRoom()
} //end function
