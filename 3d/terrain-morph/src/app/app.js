import 'file-loader?name=[name].html!./index.jade';
import './app.styl';
import {Map} from './Map';
import * as THREE from 'three/build/three';
window.THREE = THREE;
import {loadPointerLockControls} from './PointerLockControls';
import {Easel3d} from 'ion-cloud';
import {generateNoise} from './generateNoise';

let easel = new Easel3d(),
    controlsEnabled=false, // Assume controls disabled until user allows
    camera,scene,mesh,controls,mouseX=0,mouseY=0,
    initialized = false,
    instructions = document.getElementById('instructions'), //turns off
    moveForward = false,
    moveBackward = false,
    moveLeftward = false,
    moveRightward = false,
    renderer = new THREE.WebGLRenderer({canvas: window.C}),
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

/*
let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    render = function render(){
      v = {w: window.innerWidth, h: window.innerHeight};
      canvas.width = v.w; canvas.height = v.h;
      return v;
    },
    v=render(); //will hold viewport width and height

document.body.appendChild(canvas);
ctx.fillStyle='#fff';
for(let i=0,width=v.w/mapSize,height=v.h/mapSize;i<100;i++){
  for(let j=0;j<100;j++){
    if(map.getSector(i,j).isFloor()) ctx.fillRect(i*width,j*height,width,height);
  } //end for
} //end for
*/
acquirePointerLock(); //ask the user to user pointer lock
document.addEventListener('keydown',onKeyDown,false);
document.addEventListener('keyup',onKeyUp,false);

// Launch application if easel was able to create a canvas,
// if it wasn't then we know canvas isn't supported
if(!easel.activated){
  let noscript = document.getElementById('noscript');

  noscript.innerHTML = `
  <p class="browsehappy">
    You are using an outdated browser. Please
    <a href="http://browsehappy.com/"> upgrade your browser</a>
    to improve your experience.
    <span style="color:red;"><br/>Canvas isn't supported in your browser.</span>
  </p>`;
}else{
  noscript.style.visibility='hidden';
  loadPointerLockControls();
  main();
} //end if

function main(){
  let time = performance.now(),
      timeDelta = (time-prevTime)/1000,
      intersections; //see if ray hits walls

  if(!initialized) initialize();
  if(controlsEnabled){
    velocity.x -= velocity.x * 10.0 * timeDelta;
    velocity.z -= velocity.z * 10.0 * timeDelta;
    velocity.y -= 9.8 * 100.0 * timeDelta; // 100.0 = mass
    raycaster.ray.origin.copy(controls.getObject().position);
    raycaster.ray.origin.y +=1;
    raycaster.ray.origin.z -=4;
    intersections = raycaster.intersectObjects([mesh],true);
    console.log(intersections);
    if(moveLeftward) velocity.x -= 500.0 * timeDelta;
    if(moveForward&&!intersections.length) velocity.z -= 500.0 * timeDelta;
    if(moveBackward) velocity.z += 500.0 * timeDelta;
    if(moveRightward) velocity.x += 500.0 * timeDelta;
    if(moveForward&&!intersections.length) velocity.x -=180*timeDelta; //forward isn't centered?
    if(moveBackward) velocity.x +=180*timeDelta; //backward isn't centered?
    controls.getObject().translateX(velocity.x*timeDelta);
    controls.getObject().translateY(velocity.y*timeDelta);
    if(!intersections.length) controls.getObject().translateZ(velocity.z*timeDelta);
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
  camera = new THREE.PerspectiveCamera(75,v.w/v.h,1,1000);
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());
  geometry.rotateX(-Math.PI/2);
  raycaster = new THREE.Raycaster(new THREE.Vector3(),new THREE.Vector3(0,-1,0),0,10);
  for(let i=0,x,y,mx,my;i<geometry.faces.length;i++){
    y = i%(mapSize*4);
    x = Math.floor(i/(mapSize*4));
    mx = Math.floor(x/4);
    my = Math.floor(y/4);
    if(map.getSector(mx,my).isFloor()){
      geometry.vertices[geometry.faces[i].b].y=0;
      if(!playerPlaced){ //place user if we haven't already 
        let face = geometry.faces[i].b;

        playerPlaced = true;
        controls.getObject().position.x = geometry.vertices[face].x;
        controls.getObject().position.z = geometry.vertices[face].z;
      } //end if
    }else{
      geometry.vertices[geometry.faces[i].b].y=50;
    } //end if
  } //end for
  mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);
  renderer.setClearColor(0xbfd1e5);
  renderer.setPixelRatio(window.devicePixelRatio);
  window.addEventListener('resize',onWindowResize,false);
  window.camera = camera;
  window.scene = scene;
  window.mesh = mesh;
  window.controls = controls;
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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);
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
            blocker.style.display = 'none';
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
