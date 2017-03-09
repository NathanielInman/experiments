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
import * as StackBlur from 'stackblur-canvas';
import * as THREE from 'three/build/three';
window.THREE = THREE;
import {loadPointerLockControls} from './PointerLockControls';

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
  let texture = new THREE.CanvasTexture(generateTexture(2048,2048)),
      material = new THREE.MeshLambertMaterial({
        color: '#009696',
        shading: THREE.FlatShading,
        fog: true,
        map: texture
      }),
      geometry = new THREE.PlaneGeometry(2000,2000,mapSize*2,mapSize*2),
      lantern = new THREE.PointLight(0xFFFFFF,2,800),
      floorShape = new THREE.Shape(),
      floorShapeWidth = geometry.parameters.width/2/mapSize,
      floorGeometry,
      floors = new THREE.Group();

  initialized = true;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
  camera.add(lantern);
  controls = new THREE.PointerLockControls(camera);
  scene.add(controls.getObject());
  geometry.rotateX(-Math.PI/2);
  raycaster = new THREE.Raycaster(new THREE.Vector3(),new THREE.Vector3(0,-1,0),0,10);
  floorShape.moveTo(0,0);
  floorShape.lineTo(0,floorShapeWidth);
  floorShape.lineTo(floorShapeWidth,floorShapeWidth);
  floorShape.lineTo(floorShapeWidth,0);
  floorShape.lineTo(0,0);
  floorGeometry = new THREE.ShapeBufferGeometry(floorShape);
  for(let i=0,x,y,mx,my,face,floor,mesh,gx,gz,gw;i<geometry.faces.length;i++){
    face = geometry.faces[i].b;
    gx = geometry.vertices[face].x;
    gz = geometry.vertices[face].z;
    gw = geometry.parameters.width/2;
    x = gx+gw;
    y = gz+gw;
    mx = Math.floor(x/20);
    my = Math.floor(y/20);
    if(map.getSector(mx,my).isFloor()){
      geometry.vertices[face].y=0;
      mesh = new THREE.Mesh(floorGeometry,new THREE.MeshBasicMaterial({color:0x005555,wireframe:true}));
      mesh.position.set(gx,1,gz);
      mesh.rotation.set(-Math.PI/2,0,0);
      mesh.scale.set(0.9,0.9,1);
      floors.add(mesh);

      // always update camera with latest floor so the last floor is the camera,
      // which will face the camera towards the scene as the center scene is origin
      controls.getObject().position.x = geometry.vertices[face].x;
      controls.getObject().position.z = geometry.vertices[face].z;
    }else if(map.getSector(Math.ceil(x/20),Math.ceil(y/20)).isFloor()){
      geometry.vertices[face].y=0;
      mesh = new THREE.Mesh(floorGeometry,new THREE.MeshBasicMaterial({color:0x005555,wireframe:true}));
      mesh.position.set(gx,1,gz);
      mesh.rotation.set(-Math.PI/2,0,0);
      mesh.scale.set(0.9,0.9,1);
      floors.add(mesh);
    }else{
      geometry.vertices[face].y=50;
    } //end if
  } //end for
  mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);
  scene.add(floors);
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
} //end initialize()

// TODO: Repurpose this function for creating a texture height map so that
// colors flow from dark at the top to light at the bottom where the user
// stands
function generateTexture(width,height){
  let canvas, ctx, nx, ny;

  canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,width,height);
  ctx.fillStyle = '#fff';
  for(let y=0;y<height;y++){
    for(let x=0;x<width;x++){
      nx = Math.floor(x/width*mapSize+0.5);
      ny = Math.floor(y/height*mapSize+0.5);
      if(map.getSector(nx,ny).isFloor()){
        ctx.fillRect(x,y,1,1);
      } //end if
    } //end for
  } //end for
  StackBlur.canvasRGB(canvas,1,1,width,height,15);
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
