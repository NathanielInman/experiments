import 'file-loader?name=[name].html!./index.jade';
import './app.styl';
import * as THREE from 'three/build/three';
window.THREE = THREE;
import {loadOrbitControls} from './OrbitControls';
import {Easel3d} from 'ion-cloud';
import {generateNoise} from './generateNoise';

let easel = new Easel3d(),
    camera,scene,mesh,controls,mouseX=0,mouseY=0,
    initialized = false,
    renderer = new THREE.WebGLRenderer({
      canvas: window.C
    });

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
  loadOrbitControls();
  main();
} //end if

function main(){
  if(!initialized) initialize();
  renderer.render(scene,camera);
  camera.lookAt(scene.position);
  requestAnimationFrame(main);
} //end main()

function initialize(){
  let data = generateHeight(2048,2048),
      texture = new THREE.CanvasTexture(generateTexture(data,2048,2048)),
      material = new THREE.MeshBasicMaterial({map: texture,overdraw: 0.5}),
      quality = 16,
      step = 1024 / quality,
      geometry = new THREE.PlaneGeometry(2000,2000,quality-1,quality-1);

  initialized = true;
  camera = new THREE.PerspectiveCamera(60,v.w/v.h,1,10000);
  camera.position.y = 1000;
  controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.enableZoom = false;
  scene = new THREE.Scene();
  geometry.rotateX(-Math.PI/2);
  data = generateHeight(1024,1024);
  for(let i=0,x,y;i<geometry.vertices.length;i++){
    x = i%quality;
    y = Math.floor(i/quality);
    geometry.vertices[i].y=data[(x*step)+(y*step)*1024]*2-128;
  } //end for
  mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);
  renderer.setClearColor(0xbfd1e5);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.addEventListener('mousemove',onDocumentMouseMove,false);
  window.addEventListener('resize',onWindowResize,false);
  window.camera = camera;
} //end initialize()

function generateHeight(width,height){
  let data = new Uint8Array(width*height),
      perlin = new generateNoise(),
      size = width*height,
      quality = 2,
      z=r(100);

  for(let j=0;j<4;j++){
    quality *= 4;
    for(let i=0,x,y;i<size;i++){
      x=i%width;
      y=Math.floor(i/width);
      data[i]+=Math.abs(perlin.noise(x/quality,y/quality,z)*0.5)*quality+10;
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

function onDocumentMouseMove(event){
  mouseX = event.clientX - window.innerWidth/2;
  mouseY = event.clientY - window.innerHeight/2;
} //end onDocumentMouseMove()
