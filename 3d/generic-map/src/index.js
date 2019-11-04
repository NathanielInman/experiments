import './index.styl';
import {Map,Sector,maps} from '@ion-cloud/core';
import * as THREE from 'three/build/three';
import {Controls} from './Controls';

const mapSize = 100,
      sectorSize = 30,
      sectorHeight = 50;

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
let camera,scene,
    controls = null,
    initialized = false,
    renderer = new THREE.WebGLRenderer({antialias: true});

main();

function main(){
  if(!initialized) initialize();
  controls.processTick(map,sectorSize);
  renderer.render(scene,camera);
  requestAnimationFrame(main);
} //end main()

function initialize(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
  const light = new THREE.PointLight(0xFFFFFF,2,1300,10);

  light.castShadow = true;
  camera.add(light);
  controls = new Controls(renderer,camera);
  scene.add(controls.pointerLock.getObject());
  const material = new THREE.MeshPhysicalMaterial({color: 0x00FFFF,flatShading: true}),
        geometryWall = new THREE.BoxBufferGeometry(sectorSize,sectorHeight,sectorSize),
        geometryFloor = new THREE.BoxBufferGeometry(sectorSize,2,sectorSize);

  let playerPlaced = false;

  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      let material, entity;

      if(sector.isEmpty()){
        material = new THREE.MeshPhysicalMaterial({color: 0x000000,flatShading: true});
        entity = new THREE.Mesh(geometryFloor,material);
      }else if(sector.isRemoved()){
        material = new THREE.MeshPhysicalMaterial({color: 0x803030,flatShading: true});
        entity = new THREE.Mesh(geometryFloor,material);
      }else if(sector.isDoor()){
        material = new THREE.MeshPhysicalMaterial({color: 0xb09040,flatShading: true});
        entity = new THREE.Mesh(geometryWall,material);
        entity.castShadow = true;
      }else if(sector.isWallSpecial()){
        material = new THREE.MeshPhysicalMaterial({color: 0x404050,flatShading: true});
        entity = new THREE.Mesh(geometryWall,material);
        entity.castShadow = true;
      }else if(sector.isWall()){
        material = new THREE.MeshPhysicalMaterial({color: 0x303040,flatShading: true});
        entity = new THREE.Mesh(geometryWall,material);
        entity.castShadow = true;
      }else if(sector.isWaterSpecial()){
        material = new THREE.MeshPhysicalMaterial({color: 0x303090,flatShading: true});
        entity = new THREE.Mesh(geometryFloor,material);
      }else if(sector.isWater()){
        material = new THREE.MeshPhysicalMaterial({color: 0x3030b0,flatShading: true});
        entity = new THREE.Mesh(geometryFloor,material);
      }else if(sector.isFloorSpecial()){
        material = new THREE.MeshPhysicalMaterial({color: 0x506030,flatShading: true});
        entity = new THREE.Mesh(geometryFloor,material);
        if(!playerPlaced){
          controls.pointerLock.getObject().position.x = x*sectorSize;
          controls.pointerLock.getObject().position.z = y*sectorSize;
          playerPlaced = true;
          console.log('Player placed @',{x,y});
        } //end if
      }else if(sector.isFloor()){
        material = new THREE.MeshPhysicalMaterial({color: 0x307030,flatShading: true});
        entity = new THREE.Mesh(geometryFloor,material);
        if(!playerPlaced){
          controls.pointerLock.getObject().position.x = x*sectorSize;
          controls.pointerLock.getObject().position.z = y*sectorSize;
          playerPlaced = true;
          console.log('Player placed @',{x,y});
        } //end if
      }else{
        material = new THREE.MeshPhysicalMaterial({color: 0xf00000,flatShading: true});
        entity = new THREE.Mesh(geometryFloor,material);
      } //end if
      entity.receiveShadow = true;
      entity.position.set(x*sectorSize,0,y*sectorSize);
      scene.add(entity);
    });
  })
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  initialized = true;
} //end initialize()
