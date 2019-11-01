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
  const light = new THREE.PointLight(0xFFFFFF,2,300,10);

  light.castShadow = true;
  camera.add(light);
  controls = new Controls(renderer,camera);
  scene.add(controls.pointerLock.getObject());
  const material = new THREE.MeshPhysicalMaterial({color: 0x00FFFF,flatShading: true}),
        geometry = new THREE.BoxBufferGeometry(sectorSize,sectorHeight,sectorSize);

  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(!sector.isWalkable()){
        const entity = new THREE.Mesh(geometry,material);

        entity.castShadow = true;
        entity.receiveShadow = true;
        entity.position.set(x*sectorSize,0,y*sectorSize);
        scene.add(entity);
      }else{
        const geometry = new THREE.BoxBufferGeometry(sectorSize,2,sectorSize),
              entity = new THREE.Mesh(geometry,material);

        entity.castShadow = false;
        entity.receiveShadow = true;
        entity.position.set(x*sectorSize,0,y*sectorSize);
        scene.add(entity);
        controls.pointerLock.getObject().position.x = x*sectorSize;
        controls.pointerLock.getObject().position.z = y*sectorSize;
      } //end if
    });
  })
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  initialized = true;
} //end initialize()
