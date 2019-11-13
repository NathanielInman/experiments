import './index.styl';
import {maps,Map,Sector} from '@ion-cloud/compass';
import * as THREE from 'three/build/three.module';
import fontDefinition from 'three/examples/fonts/helvetiker_bold.typeface.json';
import {Controls} from './Controls';

const mapSize = 10,
      sectorSize = 30;

// Start by generating the map itself
const map = new Map({width:mapSize,height:mapSize}),
      binarySpacePartitioning = maps.find(map=> map.name==='caldera');

for(let y=0;y<map.height;y++){
  map.sectors[y]=[];
  for(let x=0;x<map.width;x++){
    map.sectors[y][x]=new Sector({x,y,map});
  } //end for
} //end for
binarySpacePartitioning.generator({map});

const renderer = new THREE.WebGLRenderer({antialias: true}),
      scene = new THREE.Scene(),
      camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1000),
      controls = new Controls(renderer,camera),
      light = new THREE.PointLight(0xFFFFFF,2,1300,10),
      font = new THREE.Font(fontDefinition);

light.castShadow = true;
camera.add(light);
scene.add(controls.pointerLock.getObject());
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
createScene();
main();

function main(){
  controls.processTick(map,sectorSize);
  renderer.render(scene,camera);
  requestAnimationFrame(main);
} //end main()

function createScene(){
  const material = new THREE.MeshLambertMaterial({color: 0x00FFFF}),
        geometryWall = new THREE.BoxBufferGeometry(sectorSize,sectorSize,sectorSize),
        geometryFloor = new THREE.BoxBufferGeometry(sectorSize,2,sectorSize);

  let playerPlaced = false;

  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      const material = new THREE.MeshLambertMaterial(),
            symbolOptions = {font,size:12,height:2,curveSegments:20},
            group = new THREE.Group();

      if(sector.isEmpty()){
        material.color = new THREE.Color(0x000000);
        group.add(new THREE.Mesh(geometryFloor,material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('&',symbolOptions),material));
        group.children[1].rotateX(-Math.PI/2);
        group.children[1].geometry.center();
        group.children[1].position.set(0,2,0);
      }else if(sector.isRemoved()){
        material.color = new THREE.Color(0x803030);
        group.add(new THREE.Mesh(geometryFloor,material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('X',symbolOptions),material));
        group.children[1].rotateX(-Math.PI/2);
        group.children[1].geometry.center();
        group.children[1].position.set(0,2,0);
      }else if(sector.isDoor()){
        material.color = new THREE.Color(0xb09040);
        group.add(new THREE.Mesh(geometryWall,material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('%',symbolOptions),material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('%',symbolOptions),material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('%',symbolOptions),material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('%',symbolOptions),material));
        group.children[0].translateY(sectorSize/2-1);
        group.children[1].geometry.center();
        group.children[1].position.set(0,sectorSize/2,-sectorSize/2);
        group.children[2].geometry.center();
        group.children[2].position.set(0,sectorSize/2,sectorSize/2);
        group.children[3].geometry.center();
        group.children[3].rotateY(-Math.PI/2);
        group.children[3].position.set(sectorSize/2,sectorSize/2,0);
        group.children[4].geometry.center();
        group.children[4].rotateY(-Math.PI/2);
        group.children[4].position.set(-sectorSize/2,sectorSize/2,0);
      }else if(sector.isWallSpecial()){
        material.color = new THREE.Color(0x404050);
        group.add(new THREE.Mesh(geometryWall,material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('%',symbolOptions),material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('%',symbolOptions),material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('%',symbolOptions),material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('%',symbolOptions),material));
        group.children[0].translateY(sectorSize/2-1);
        group.children[1].geometry.center();
        group.children[1].position.set(0,sectorSize/2,-sectorSize/2);
        group.children[2].geometry.center();
        group.children[2].position.set(0,sectorSize/2,sectorSize/2);
        group.children[3].geometry.center();
        group.children[3].rotateY(-Math.PI/2);
        group.children[3].position.set(sectorSize/2,sectorSize/2,0);
        group.children[4].geometry.center();
        group.children[4].rotateY(-Math.PI/2);
        group.children[4].position.set(-sectorSize/2,sectorSize/2,0);
      }else if(sector.isWall()){
        material.color = new THREE.Color(0x303040);
        group.add(new THREE.Mesh(geometryWall,material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('#',symbolOptions),material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('#',symbolOptions),material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('#',symbolOptions),material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('#',symbolOptions),material));
        group.children[0].translateY(sectorSize/2-1);
        group.children[1].geometry.center();
        group.children[1].position.set(0,sectorSize/2,-sectorSize/2);
        group.children[2].geometry.center();
        group.children[2].position.set(0,sectorSize/2,sectorSize/2);
        group.children[3].geometry.center();
        group.children[3].rotateY(-Math.PI/2);
        group.children[3].position.set(sectorSize/2,sectorSize/2,0);
        group.children[4].geometry.center();
        group.children[4].rotateY(-Math.PI/2);
        group.children[4].position.set(-sectorSize/2,sectorSize/2,0);
      }else if(sector.isWaterSpecial()){
        material.color = new THREE.Color(0x303090);
        group.add(new THREE.Mesh(geometryFloor,material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('~',symbolOptions),material));
        group.children[1].rotateX(-Math.PI/2);
        group.children[1].rotateZ(Math.random()*2*Math.PI);
        group.children[1].geometry.center();
        group.children[1].position.set(0,2,0);
      }else if(sector.isWater()){
        const waterMaterial = new THREE.MeshLambertMaterial({opacity:0.5,transparent:true,color:0x3030b0}),
              waterGeometry = new THREE.PlaneBufferGeometry(sectorSize,sectorSize),
              groundMaterial = new THREE.MeshLambertMaterial({color: 0x482A17}),
              groundGeometry = new THREE.PlaneBufferGeometry(sectorSize,sectorSize);

        symbolOptions.height = 1;
        material.color = new THREE.Color(0x3030b0);
        group.add(new THREE.Mesh(groundGeometry,groundMaterial));
        group.add(new THREE.Mesh(waterGeometry,waterMaterial));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('w',symbolOptions),material));
        group.children[0].position.set(0,-1,0);
        group.children[0].rotateX(-Math.PI/2);
        group.children[1].rotateX(-Math.PI/2);
        group.children[2].rotateX(-Math.PI/2);
        group.children[2].rotateZ(Math.random()*2*Math.PI);
        group.children[2].geometry.center();
      }else if(sector.isFloorSpecial()){
        material.color = new THREE.Color(0x506030);
        group.add(new THREE.Mesh(geometryFloor,material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry(';',symbolOptions),material));
        group.children[1].rotateX(-Math.PI/2);
        group.children[1].rotateZ(Math.random()*2*Math.PI);
        group.children[1].geometry.center();
        group.children[1].position.set(0,2,0);
        if(!playerPlaced&&x>map.width/4&&x<map.width/4*3&&y>map.height/4&&y<map.height/4*3){
          controls.pointerLock.getObject().position.x = x*sectorSize;
          controls.pointerLock.getObject().position.z = y*sectorSize;
          playerPlaced = true;
          console.log('Player placed @',{x,y,group});
        } //end if
      }else if(sector.isFloor()){
        material.color = new THREE.Color(0x307030);
        group.add(new THREE.Mesh(geometryFloor,material));
        group.add(new THREE.Mesh(new THREE.TextBufferGeometry('"',symbolOptions),material));
        group.children[1].rotateX(-Math.PI/2);
        group.children[1].rotateZ(Math.random()*2*Math.PI);
        group.children[1].geometry.center();
        group.children[1].position.set(0,2,0);
        if(!playerPlaced&&x>map.width/4&&x<map.width/4*3&&y>map.height/4&&y<map.height/4*3){
          controls.pointerLock.getObject().position.x = x*sectorSize;
          controls.pointerLock.getObject().position.z = y*sectorSize;
          playerPlaced = true;
          console.log('Player placed @',{x,y,group});
        } //end if
      }else{
        material.color = new THREE.Color(0xf00000);
        group.add(new THREE.Mesh(geometryFloor,material));
        group.add(new THREE.TextBufferGeometry('?',symbolOptions));
        group.children[1].rotateX(-Math.PI/2);
        group.children[1].geometry.center();
        group.children[1].position.set(0,2,0);
      } //end if
      group.position.set(x*sectorSize,-2,y*sectorSize);
      scene.add(group);
    });
  })
} //end initialize()
