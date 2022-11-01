import './index.styl';
import { Map, Sector, maps } from '@ion-cloud/core';
import * as StackBlur from 'stackblur-canvas';
import * as THREE from 'three/build/three';
import { PointerLockControls } from './PointerLockControls';

const mapSize = 100;

// Start by generating the map itself
const map = new Map({ width: mapSize, height: mapSize });
const binarySpacePartitioning = maps.find(map => map.name === 'caldera');

for (let y = 0; y < map.height; y++) {
  map.sectors[y] = [];
  for (let x = 0; x < map.width; x++) {
    map.sectors[y][x] = new Sector({ x, y, map });
  } // end for
} // end for
binarySpacePartitioning.generator({ map });
let controlsEnabled = false; // Assume controls disabled until user allows
let camera; let scene; let mesh; let controls;
let initialized = false;
let moveForward = false;
let moveBackward = false;
let moveLeftward = false;
let moveRightward = false;
const renderer = new THREE.WebGLRenderer({ antialias: true });
const instructions = document.querySelector('#instructions');
let prevTime = performance.now(); // used to determine moving velocity
const velocity = new THREE.Vector3(); // helps with player movement
const onKeyDown = e => {
  if (e.keyCode === 38 || e.keyCode === 87) { // up / w
    moveForward = true;
  } else if (e.keyCode === 37 || e.keyCode === 65) { // left / a
    moveLeftward = true;
  } else if (e.keyCode === 40 || e.keyCode === 83) { // down  s
    moveBackward = true;
  } else if (e.keyCode === 39 || e.keyCode === 68) { // right / d
    moveRightward = true;
  } else if (e.keyCode === 32) { // space
  } // end if
};
const onKeyUp = e => {
  if (e.keyCode === 38 || e.keyCode === 87) { // up / w
    moveForward = false;
  } else if (e.keyCode === 37 || e.keyCode === 65) { // left / a
    moveLeftward = false;
  } else if (e.keyCode === 40 || e.keyCode === 83) { // down  s
    moveBackward = false;
  } else if (e.keyCode === 39 || e.keyCode === 68) { // right / d
    moveRightward = false;
  } else if (e.keyCode === 32) { // space
  } // end if
};

instructions.style.display = 'flex';
acquirePointerLock(); // ask the user to user pointer lock
document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('keyup', onKeyUp, false);
window.addEventListener('resize', onWindowResize, true);
main();

function main () {
  const time = performance.now();
  const timeDelta = (time - prevTime) / 1000;

  if (!initialized) initialize();
  if (controlsEnabled) {
    const geoSize = mesh.geometry.parameters.width;
    const controlClone = controls.getObject().clone();

    velocity.x -= velocity.x * 10.0 * timeDelta;
    velocity.z -= velocity.z * 10.0 * timeDelta;
    velocity.y -= 9.8 * 100.0 * timeDelta; // 100.0 = mass
    if (moveLeftward) velocity.x -= 500.0 * timeDelta;
    if (moveForward) velocity.z -= 500.0 * timeDelta;
    if (moveBackward) velocity.z += 500.0 * timeDelta;
    if (moveRightward) velocity.x += 500.0 * timeDelta;
    controlClone.translateX(velocity.x * timeDelta);
    controlClone.translateZ(velocity.z * timeDelta);
    controlClone.translateY(velocity.y * timeDelta);
    const position = controlClone.position;
    const px = Math.floor((position.x + geoSize / 2) / 20 + 0.5);
    const py = Math.floor((position.z + geoSize / 2) / 20 + 0.5);
    if (map.isWalkable({ x: px, y: py })) {
      controls.getObject().translateX(velocity.x * timeDelta);
      controls.getObject().translateZ(velocity.z * timeDelta);
      controls.getObject().translateY(velocity.y * timeDelta);
    } // end if
    if (controls.getObject().position.y < 10) {
      velocity.y = 0;
      controls.getObject().position.y = 10;
    } // end if
    prevTime = time;
  } // end if
  renderer.render(scene, camera);
  requestAnimationFrame(main);
} // end main()

function initialize () {
  const texture = new THREE.CanvasTexture(generateTexture(2048, 2048));
  const material = new THREE.MeshLambertMaterial({
    color: '#009696',
    flatShading: true,
    fog: true,
    map: texture
  });
  const geometry = new THREE.PlaneGeometry(2000, 2000, mapSize * 2, mapSize * 2);
  const lantern = new THREE.PointLight(0xFFFFFF, 2, 800);
  const floorShape = new THREE.Shape();
  const floorShapeWidth = geometry.parameters.width / 2 / mapSize;
  let floorGeometry;
  const floors = new THREE.Group();

  initialized = true;
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.add(lantern);
  controls = new PointerLockControls(camera);
  scene.add(controls.getObject());
  geometry.rotateX(-Math.PI / 2);
  floorShape.moveTo(0, 0);
  floorShape.lineTo(0, floorShapeWidth);
  floorShape.lineTo(floorShapeWidth, floorShapeWidth);
  floorShape.lineTo(floorShapeWidth, 0);
  floorShape.lineTo(0, 0);
  for (let i = 0, x, y, mx, my, face, mesh, gx, gz, gw; i < geometry.attributes.position.array.length; i+=9) {
    // non-indexed is points * 3 = vertices * 3 = face
    // points = x1,y1,z1,x2,y2,z2,x3,y2,z3
    // vertices = [x1,y1,z1],[x2,y2,z2],[x3,y2,z3]
    // faces = [[x1,y1,z1],[x2,y2,z2],[x3,y3,z3]]
    const x1 = i;
    const y1 = i+1;
    const z1 = i+2;
    const x2 = i+3;
    const y2 = i+4;
    const z2 = i+5;
    const x3 = i+6;
    const y3 = i+7;
    const z3 = i+8;
    const setPoint = (location, value) => geometry.attributes.position.array[location] = value;
    const getPoint = (location) => geometry.attributes.position.array[location];

    gx = getPoint(x1)
    gz = getPoint(z1)
    gw = geometry.parameters.width / 2;
    x = gx + gw;
    y = gz + gw;
    mx = Math.floor(x / 20);
    my = Math.floor(y / 20);

    // make sure the value is in-bound of the map itself or ignore it
    if (mx >= mapSize || my >= mapSize || Math.ceil(x / 20) >= mapSize || Math.ceil(y / 20) >= mapSize) continue;
    if (map.isWalkable({ x: mx, y: my })) {
      setPoint(y1, 0);setPoint(y2, 0);setPoint(y3, 0)
      mesh = new THREE.Mesh(floorGeometry, new THREE.MeshStandardMaterial({ color: 0xff5555, wireframe: true }));
      mesh.position.set(gx, 1, gz);
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      mesh.scale.set(0.9, 0.9, 1);
      floors.add(mesh);

      // always update camera with latest floor so the last floor is the camera,
      // which will face the camera towards the scene as the center scene is origin
      controls.getObject().position.x = getPoint(x1);
      controls.getObject().position.z = getPoint(z1);
    } else if (map.isWalkable({ x: Math.ceil(x / 20), y: Math.ceil(y / 20) })) {
      setPoint(y1, 0);setPoint(y2,0);setPoint(y3,0);
      mesh = new THREE.Mesh(floorGeometry, new THREE.MeshStandardMaterial({ color: 0xff5555, wireframe: true }));
      mesh.position.set(gx, 1, gz);
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      mesh.scale.set(0.9, 0.9, 1);
      floors.add(mesh);
    } else {
      setPoint(y1, 20);setPoint(y2,20);setPoint(y3,20);
    } // end if
    geometry.attributes.position.needsUpdate = true;
  } // end for
  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  scene.add(floors);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
} // end initialize()

// TODO: Repurpose this function for creating a texture height map so that
// colors flow from dark at the top to light at the bottom where the user
// stands
function generateTexture (width, height) {
  let nx, ny;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = '#fff';
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      nx = Math.floor(x / width * mapSize + 0.5);
      ny = Math.floor(y / height * mapSize + 0.5);
      if (nx >= mapSize || ny >= mapSize) continue;
      if (map.isWalkable({ x: nx, y: ny })) {
        ctx.fillRect(x, y, 1, 1);
      } // end if
    } // end for
  } // end for
  StackBlur.canvasRGB(canvas, 1, 1, width, height, 15);
  return canvas;
} // end generateTexture()

function onWindowResize () {
  const w = window.innerWidth;
  const h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
} // end onWindowResize()

function acquirePointerLock () {
  const havePointerLock = 'pointerLockElement' in document ||
                        'mozPointerLockElement' in document ||
                        'webkitPointerLockElement' in document;

  if (havePointerLock) {
    const element = document.body;
    const pointerlockchange = (event) => {
      if (document.pointerLockElement === element ||
             document.mozPointerLockElement === element ||
             document.webkitPointerLockElement === element) {
        controlsEnabled = true;
        controls.enabled = true;
        instructions.style.display = 'none';
      } else {
        controls.enabled = false;
        instructions.style.display = 'flex';
      } // end if
    };

    // eslint-disable-next-line no-return-assign
    const pointerlockerror = (event) => instructions.style.display = '';

    // Hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('mozpointerlockchange', pointerlockchange, false);
    document.addEventListener('webkitpointerlockchange', pointerlockchange, false);
    document.addEventListener('pointerlockerror', pointerlockerror, false);
    document.addEventListener('mozpointerlockerror', pointerlockerror, false);
    document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

    instructions.addEventListener('click', function (event) {
      instructions.style.display = 'none';

      // Ask the browser to lock the pointer
      element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
      element.requestPointerLock();
    }, false);
  } else {
    instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
  } // end if
}
