import './index.styl';
import {Map,Sector,maps} from '@ion-cloud/core';
import * as THREE from 'three/build/three';
import {Controls} from './Controls';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {UnrealBloomPass} from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const mapSize = 20,
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
    renderPass, bloomPass, composer, // rendering pipeline: 1. render, 2. bloom
    controls = null,
    initialized = false,
    renderer = new THREE.WebGLRenderer({antialias: true});

main();

function main(){
  if(!initialized) initialize();
  controls.processTick(map,sectorSize);
  composer.render();
  //renderer.render(scene,camera);
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
  const geometryWall = new THREE.BoxBufferGeometry(sectorSize,sectorHeight,sectorSize),
        geometryFloor = new THREE.BoxBufferGeometry(sectorSize,2,sectorSize);

  let playerPlaced = false;

  console.log(geometryWall,geometryFloor);
  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      const material = new THREE.MeshPhysicalMaterial({flatShading: true});

      let entity;

      if(sector.isEmpty()){
        material.color = new THREE.Color(0x000000);
        entity = new THREE.Mesh(geometryFloor,material);
      }else if(sector.isRemoved()){
        material.color = new THREE.Color(0x803030);
        entity = new THREE.Mesh(geometryFloor,material);
      }else if(sector.isDoor()){
        material.color = new THREE.Color(0xb09040);
        entity = new THREE.Mesh(geometryWall,material);
      }else if(sector.isWallSpecial()){
        material.color = new THREE.Color(0x404050);
        entity = new THREE.Mesh(geometryWall,material);
      }else if(sector.isWall()){
        material.color = new THREE.Color(0x303040);
        entity = new THREE.Mesh(geometryWall,material);
      }else if(sector.isWaterSpecial()){
        material.color = new THREE.Color(0x303090);
        entity = new THREE.Mesh(geometryFloor,material);
      }else if(sector.isWater()){
        material.color = new THREE.Color(0x3030b0);
        entity = new THREE.Mesh(geometryFloor,material);
      }else if(sector.isFloorSpecial()){
        material.color = new THREE.Color(0x506030);
        entity = new THREE.Mesh(geometryFloor,material);
        if(!playerPlaced){
          controls.pointerLock.getObject().position.x = x*sectorSize;
          controls.pointerLock.getObject().position.z = y*sectorSize;
          playerPlaced = true;
          console.log('Player placed @',{x,y});
        } //end if
      }else if(sector.isFloor()){
        material.color = new THREE.Color(0x307030);
        entity = new THREE.Mesh(geometryFloor,material);
        if(!playerPlaced){
          controls.pointerLock.getObject().position.x = x*sectorSize;
          controls.pointerLock.getObject().position.z = y*sectorSize;
          playerPlaced = true;
          console.log('Player placed @',{x,y});
        } //end if
      }else{
        material.color = new THREE.Color(0xf00000);
        entity = new THREE.Mesh(geometryFloor,material);
      } //end if
      entity.position.set(x*sectorSize,0,y*sectorSize);
      scene.add(entity);
    });
  })
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  renderPass = new RenderPass(scene, camera);
  bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth,window.innerHeight),1.5,0.4,0.85);
  bloomPass.exposure = 1;
  bloomPass.threshold = 0;
  bloomPass.strength = 2;
  bloomPass.radius = 0.82;
  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  initialized = true;
} //end initialize()
