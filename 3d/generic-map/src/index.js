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
    renderer = new THREE.WebGLRenderer({antialias: true}),
    prevTime = performance.now(), //used to determine moving velocity
    velocity = new THREE.Vector3(); //helps with player movement

main();

function main(){
  let time = performance.now(),
      timeDelta = (time-prevTime)/1000;

  if(!initialized) initialize();
  if(controls.pointerLock.enabled){
    let geoSize = mapSize*10,
        controlClone = controls.pointerLock.getObject().clone();

    velocity.x -= velocity.x * 10.0 * timeDelta;
    velocity.z -= velocity.z * 10.0 * timeDelta;
    velocity.y -= 9.8 * 100.0 * timeDelta; // 100.0 = mass
    if(controls.moveLeftward) velocity.x -= 500.0 * timeDelta;
    if(controls.moveForward) velocity.z -= 500.0 * timeDelta;
    if(controls.moveBackward) velocity.z += 500.0 * timeDelta;
    if(controls.moveRightward) velocity.x += 500.0 * timeDelta;
    controlClone.translateX(velocity.x*timeDelta);
    controlClone.translateZ(velocity.z*timeDelta);
    controlClone.translateY(velocity.y*timeDelta);
    if(
      map.isWalkable({
        x: Math.floor(controlClone.position.x/sectorSize+0.5),
        y: Math.floor(controlClone.position.z/sectorSize+0.5)
      })
    ){
      controls.pointerLock.getObject().translateX(velocity.x*timeDelta);
      controls.pointerLock.getObject().translateZ(velocity.z*timeDelta);
      controls.pointerLock.getObject().translateY(velocity.y*timeDelta);
    } //end if
    if(controls.pointerLock.getObject().position.y<10){
      velocity.y = 0;
      controls.pointerLock.getObject().position.y = 10;
    } //end if
    prevTime = time;
  } //end if
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
