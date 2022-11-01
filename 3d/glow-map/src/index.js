import './index.styl';
import { Map, maps } from '@ion-cloud/core';
import * as THREE from 'three/build/three';
import { Controls } from './Controls';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';

const mapSize = 20;
const sectorSize = 30;
const sectorHeight = 50;

// Start by generating the map itself
const map = new Map({ width: mapSize, height: mapSize });
const { generator } = maps.find(map => map.name === 'caldera');

map.reset();
generator({ map });

let camera; let scene;
let renderPass; let outlinePass; let outputPass; let composer;
let controls = null;
let initialized = false;
const renderer = new THREE.WebGLRenderer({ antialias: true });

main();

function main () {
  if (!initialized) initialize();
  controls.processTick(map, sectorSize);
  composer.render();
  // renderer.render(scene,camera);
  requestAnimationFrame(main);
} // end main()

function initialize () {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  const light = new THREE.PointLight(0xFFFFFF, 2, 1300, 10);

  light.castShadow = true;
  camera.add(light);
  controls = new Controls(renderer, camera);
  scene.add(controls.pointerLock.getObject());
  const geometryWall = new THREE.BoxBufferGeometry(sectorSize, sectorHeight, sectorSize);
  const geometryFloor = new THREE.BoxBufferGeometry(sectorSize, 2, sectorSize);
  const outlinedObjects = [];

  let playerPlaced = false;

  console.log(geometryWall, geometryFloor);
  map.sectors.getAll().forEach(sector => {
    const { x, y } = sector;
    const material = new THREE.MeshPhysicalMaterial({ flatShading: true });

    let entity;

    if (sector.isEmpty()) {
      material.color = new THREE.Color(0x000000);
      entity = new THREE.Mesh(geometryFloor, material);
    } else if (sector.isRemoved()) {
      material.color = new THREE.Color(0x803030);
      entity = new THREE.Mesh(geometryFloor, material);
    } else if (sector.isDoor()) {
      material.color = new THREE.Color(0xb09040);
      entity = new THREE.Mesh(geometryWall, material);
      outlinedObjects.push(entity);
    } else if (sector.isWallSpecial()) {
      material.color = new THREE.Color(0x404050);
      entity = new THREE.Mesh(geometryWall, material);
      outlinedObjects.push(entity);
    } else if (sector.isWall()) {
      material.color = new THREE.Color(0x303040);
      entity = new THREE.Mesh(geometryWall, material);
      outlinedObjects.push(entity);
    } else if (sector.isWaterSpecial()) {
      material.color = new THREE.Color(0x303090);
      entity = new THREE.Mesh(geometryFloor, material);
    } else if (sector.isWater()) {
      material.color = new THREE.Color(0x3030b0);
      entity = new THREE.Mesh(geometryFloor, material);
    } else if (sector.isFloorSpecial()) {
      material.color = new THREE.Color(0x506030);
      entity = new THREE.Mesh(geometryFloor, material);
      if (!playerPlaced) {
        controls.pointerLock.getObject().position.x = x * sectorSize;
        controls.pointerLock.getObject().position.z = y * sectorSize;
        playerPlaced = true;
        console.log('Player placed @', { x, y });
      } // end if
    } else if (sector.isFloor()) {
      material.color = new THREE.Color(0x307030);
      entity = new THREE.Mesh(geometryFloor, material);
      if (!playerPlaced) {
        controls.pointerLock.getObject().position.x = x * sectorSize;
        controls.pointerLock.getObject().position.z = y * sectorSize;
        playerPlaced = true;
        console.log('Player placed @', { x, y });
      } // end if
    } else {
      material.color = new THREE.Color(0xf00000);
      entity = new THREE.Mesh(geometryFloor, material);
      outlinedObjects.push(entity);
    } // end if
    entity.position.set(x * sectorSize, 0, y * sectorSize);
    scene.add(entity);
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  document.body.appendChild(renderer.domElement);
  renderPass = new RenderPass(scene, camera);
  outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
  outlinePass.edgeStrength = 3.0;
  outlinePass.edgeGlow = 5.0;
  outlinePass.edgeThickness = 3.0;
  outlinePass.downSampleRatio = 5;
  outlinePass.visibleEdgeColor = new THREE.Color(0xFFFFFF);
  outlinePass.hiddenEdgeColor = new THREE.Color(0x000000);
  outlinePass.selectedObjects = outlinedObjects;
  outputPass = new ShaderPass(CopyShader);
  outputPass.renderToScreen = true;
  composer = new EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(outlinePass);
  composer.addPass(outputPass);
  initialized = true;
} // end initialize()
