import 'file-loader?name=[name].html!./index.jade';
import './app.styl';
window.M = Math;
window.r = function randomInteger(f,g,e){
  f = !g ? 0 * (g = f) : f > g ? g + (d = f) - g : f;
  e = e || 0;
  g = M.random() * (g - f) + f;
  return e ? g | 0 : g;
};
import {Map} from './Map';
import * as THREE from 'three/build/three';
window.THREE = THREE;
import {loadPointerLockControls} from './PointerLockControls';
import {generateNoise} from './generateNoise';

let controlsEnabled=false, // Assume controls disabled until user allows
    camera,scene,mesh,controls,mouseX=0,mouseY=0,
    initialized = false,
    moveForward = false,
    moveBackward = false,
    moveLeftward = false,
    moveRightward = false,
    renderer = new THREE.WebGLRenderer({antialias: true}),
    noscript = document.querySelector('#noscript'),
    instructions = document.querySelector('#instructions'),
    mapSize=100,
    prevTime = performance.now(), //used to determine moving velocity
    velocity = new THREE.Vector3(), //helps with player movement
    map = new Map(0,mapSize,mapSize),
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
noscript.style.display = 'none';
acquirePointerLock(); //ask the user to user pointer lock
document.addEventListener('keydown',onKeyDown,false);
document.addEventListener('keyup',onKeyUp,false);
loadPointerLockControls();
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
    let geoSize = mesh.geometry.parameters.width,
        controlClone = controls.getObject().clone(),
        px,py,position; //testing potential player x and y

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
    position = controlClone.position;
    px = Math.floor((position.x+geoSize/2)/20+0.5);
    py = Math.floor((position.z+geoSize/2)/20+0.5);
    if(map.getSector(px,py).isWalkable()){
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
  let data = generateHeightTexture(2048,2048),
      texture = new THREE.CanvasTexture(generateTexture(data,2048,2048)),
      material = new THREE.MeshBasicMaterial({map: texture,overdraw: 0.5}),
      geometry = new THREE.PlaneGeometry(2000,2000,mapSize*2,mapSize*2);

  initialized = true;
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff,0,750);
  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());
  geometry.rotateX(-Math.PI/2);
  raycaster = new THREE.Raycaster(new THREE.Vector3(),new THREE.Vector3(0,-1,0),0,10);
  for(let i=0,x,y,mx,my,face;i<geometry.faces.length;i++){
    face = geometry.faces[i].b;
    x = geometry.vertices[face].x+geometry.parameters.width/2;
    y = geometry.vertices[face].z+geometry.parameters.width/2;
    mx = Math.floor(x/20);
    my = Math.floor(y/20);
    if(map.getSector(mx,my).isFloor()){
      geometry.vertices[face].y=0;

      // always update camera with latest floor so the last floor is the camera,
      // which will face the camera towards the scene as the center scene is origin
      controls.getObject().position.x = geometry.vertices[face].x;
      controls.getObject().position.z = geometry.vertices[face].z;
    }else if(map.getSector(Math.ceil(x/20),Math.ceil(y/20)).isFloor()){
      geometry.vertices[face].y=0;
    }else{
      geometry.vertices[face].y=50;
    } //end if
  } //end for
  mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setClearColor(0xbfd1e5);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  window.camera = camera;
  window.scene = scene;
  window.mesh = mesh;
  window.controls = controls;
  window.map = map;
} //end initialize()

function generateHeightTexture(width,height){
  let data = new Uint8Array(width*height),
      perlin = generateNoise(),
      size = width * height, quality = 2, z = Math.random() * 100;

  for(let j=0;j<4;j++){
    quality *= 4;
    for(let i=0,x,y;i<size;i++){
      x = i % width;
      y = Math.floor(i/width);
      data[i] += Math.abs(perlin.noise(x/quality,y/quality,z)*0.5)*quality+10;
    } //end for
  } //end for
  return data;
} //end generateHeight()

function generateTexture(data,width,height){
  let canvas, ctx, image, imageData,
      level, diff, 
      vector3 = new THREE.Vector3(0,0,0),
      sun = new THREE.Vector3(1,1,1),
      shade;

  sun.normalize();
  canvas = document.createElement( 'canvas' );
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,width,height);
  image = ctx.getImageData(0,0,width,height);
  imageData = image.data;
  for(let i=0,j=0;i<imageData.length;i+=4,j++) {
    vector3.x = data[j-1]-data[j+1];
    vector3.y = 2;
    vector3.z = data[j-width]-data[j+width];
    vector3.normalize();
    shade = vector3.dot(sun);
    imageData[i] = (96+shade*128)*(data[j]*0.007);
    imageData[i+1] = (32+ shade*96)*(data[j]*0.007);
    imageData[i+2] = (shade*96)*(data[j]*0.007);
  }
  ctx.putImageData( image, 0, 0 );
  return canvas;
} //end generateTexture()

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
            instructions.style.display = '';
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
