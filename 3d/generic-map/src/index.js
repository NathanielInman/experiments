import './index.styl';
import {Map,Sector,maps} from '@ion-cloud/core';
import * as StackBlur from 'stackblur-canvas';
import * as THREE from 'three/build/three';
import {loadPointerLockControls} from './PointerLockControls';

const mapSize = 100;

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
let controlsEnabled=false, // Assume controls disabled until user allows
    camera,scene,controls,mouseX=0,mouseY=0,
    initialized = false,
    moveForward = false,
    moveBackward = false,
    moveLeftward = false,
    moveRightward = false,
    renderer = new THREE.WebGLRenderer({antialias: true}),
    instructions = document.querySelector('#instructions'),
    prevTime = performance.now(), //used to determine moving velocity
    velocity = new THREE.Vector3(), //helps with player movement
    playerPlaced = false, //keep track of whether player was placed on map
    raycaster, //make sure we can't walk into walls
    onKeyDown = e=>{
      if(e.keyCode===38||e.keyCode===87){ //up / w
        moveForward = true;
      }else if(e.keyCode===37||e.keyCode===65){ //left / a
        moveLeftward = true;
      }else if(e.keyCode===40||e.keyCode===83){ //down  s
        moveBackward = true;
      }else if(e.keyCode===39||e.keyCode===68){ //right / d
        moveRightward = true;
      }else if(e.keyCode===32){ //space
      } //end if
    },
    onKeyUp = e=>{
      if(e.keyCode===38||e.keyCode===87){ //up / w
        moveForward = false;
      }else if(e.keyCode===37||e.keyCode===65){ //left / a
        moveLeftward = false;
      }else if(e.keyCode===40||e.keyCode===83){ //down  s
        moveBackward = false;
      }else if(e.keyCode===39||e.keyCode===68){ //right / d
        moveRightward = false;
      }else if(e.keyCode===32){ //space
      } //end if
    };

instructions.style.display = 'flex';
acquirePointerLock(); //ask the user to user pointer lock
document.addEventListener('keydown',onKeyDown,false);
document.addEventListener('keyup',onKeyUp,false);
loadPointerLockControls();
window.addEventListener('resize',onWindowResize,true);
main();

function main(){
  let time = performance.now(),
      timeDelta = (time-prevTime)/1000,
      forwardWalkable = true,
      backwardWalkable = true,
      leftwardWalkable = true,
      rightwardWalkable = true;

  if(!initialized) initialize();
  if(controlsEnabled){
    let geoSize = mapSize*10,
        controlClone = controls.getObject().clone();

    velocity.x -= velocity.x * 10.0 * timeDelta;
    velocity.z -= velocity.z * 10.0 * timeDelta;
    velocity.y -= 9.8 * 100.0 * timeDelta; // 100.0 = mass
    if(moveLeftward) velocity.x -= 500.0 * timeDelta;
    if(moveForward) velocity.z -= 500.0 * timeDelta;
    if(moveBackward) velocity.z += 500.0 * timeDelta;
    if(moveRightward) velocity.x += 500.0 * timeDelta;
    controlClone.translateX(velocity.x*timeDelta);
    controlClone.translateZ(velocity.z*timeDelta);
    controlClone.translateY(velocity.y*timeDelta);
    if(map.isWalkable({x:Math.floor(controlClone.position.x/10+0.5),y:Math.floor(controlClone.position.z/10+0.5)})){
      controls.getObject().translateX(velocity.x*timeDelta);
      controls.getObject().translateZ(velocity.z*timeDelta);
      controls.getObject().translateY(velocity.y*timeDelta);
    } //end if
    if(controls.getObject().position.y<10){
      velocity.y = 0;
      controls.getObject().position.y = 10;
    } //end if
    prevTime = time;
  } //end if
  renderer.render(scene,camera);
  requestAnimationFrame(main);
} //end main()

function initialize(){
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
  camera.add(new THREE.PointLight(0xFFFFFF,2,800));
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());
  const material = new THREE.MeshPhysicalMaterial({color: 0x00FFFF,flatShading: true}),
        geometry = new THREE.BoxBufferGeometry(10,30,10);

  map.sectors.forEach((row,y)=>{
    row.forEach((sector,x)=>{
      if(!sector.isWalkable()){
        const entity = new THREE.Mesh(geometry,material);

        entity.castShadow = true;
        entity.receiveShadow = true;
        entity.position.set(x*10,0,y*10);
        scene.add(entity);
      }else{
        const geometry = new THREE.BoxBufferGeometry(10,2,10),
              entity = new THREE.Mesh(geometry,material);

        entity.castShadow = false;
        entity.receiveShadow = true;
        entity.position.set(x*10,0,y*10);
        scene.add(entity);
        controls.getObject().position.x = x*10;
        controls.getObject().position.z = y*10;
      } //end if
    });
  })
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  initialized = true;
} //end initialize()

function onWindowResize(){
  let w = window.innerWidth,
      h = window.innerHeight;

  renderer.setSize(w,h);
  camera.aspect = w/h;
  camera.updateProjectionMatrix();
} //end onWindowResize()

function acquirePointerLock(){
  let havePointerLock = 'pointerLockElement' in document ||
                        'mozPointerLockElement' in document ||
                        'webkitPointerLockElement' in document;

  if(havePointerLock){
    let element = document.body,
        pointerlockchange = (event)=>{
          if(document.pointerLockElement === element ||
             document.mozPointerLockElement === element ||
             document.webkitPointerLockElement === element){
            controlsEnabled = true;
            controls.enabled = true;
            instructions.style.display = 'none';
          } else {
            controls.enabled = false;
            instructions.style.display = 'flex';
          } //end if
        },
        pointerlockerror = (event) => instructions.style.display = '';

    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange',pointerlockchange,false);
    document.addEventListener('mozpointerlockchange',pointerlockchange,false);
    document.addEventListener('webkitpointerlockchange',pointerlockchange,false);
    document.addEventListener('pointerlockerror',pointerlockerror,false);
    document.addEventListener('mozpointerlockerror',pointerlockerror,false);
    document.addEventListener('webkitpointerlockerror',pointerlockerror,false);

    instructions.addEventListener('click',function(event){
      instructions.style.display = 'none';

      // Ask the browser to lock the pointer
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
      element.requestPointerLock();
    },false);
  }else{
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
  } //end if
}
