import './index.styl';
import { Map, Sector, maps } from '@ion-cloud/core';
import * as THREE from 'three/build/three';
import { Controls } from './Controls';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';

const mapSize = 50;
const sectorSize = 30;
const sectorHeight = 50;

// Start by generating the map itself
const map = new Map({ width: mapSize, height: mapSize });
const { generator } = maps.find(map => map.name === 'caldera');

map.reset();
generator({map});

let camera; let scene; let effect;
let controls = null;
let initialized = false;
const renderer = new THREE.WebGLRenderer({ antialias: true });

main();

function main () {
  if (!initialized) initialize();
  controls.processTick(map, sectorSize);
  effect.render(scene, camera);
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
  const geometryWall = new THREE.BoxGeometry(sectorSize, sectorHeight, sectorSize);
  const geometryFloor = new THREE.BoxGeometry(sectorSize, 2, sectorSize);

  let playerPlaced = false;

  map.sectors.getAll().forEach(sector => {
    const {x,y} = sector;
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
    } else if (sector.isWallSpecial()) {
      material.color = new THREE.Color(0x404050);
      entity = new THREE.Mesh(geometryWall, material);
    } else if (sector.isWall()) {
      material.color = new THREE.Color(0x303040);
      entity = new THREE.Mesh(geometryWall, material);
    } else if (sector.isWaterSpecial()) {
      material.color = new THREE.Color(0x303090);
      entity = new THREE.Mesh(geometryFloor, material);
    } else if (sector.isWater()) {
      material.color = new THREE.Color(0x3030b0);
      entity = new THREE.Mesh(geometryFloor, material);
    } else if (sector.isFloorSpecial()) {
      material.color = new THREE.Color(0x506030);
      entity = new THREE.Mesh(geometryFloor, material);
      if (!playerPlaced && x > mapSize / 3 && x < mapSize / 3 * 2 && y > mapSize / 3 && y < mapSize / 3 * 2) {
        controls.pointerLock.getObject().position.x = x * sectorSize;
        controls.pointerLock.getObject().position.z = y * sectorSize;
        playerPlaced = true;
        console.log('Player placed @', { x, y });
      } // end if
    } else if (sector.isFloor()) {
      material.color = new THREE.Color(0x307030);
      entity = new THREE.Mesh(geometryFloor, material);
      if (!playerPlaced && x > mapSize / 3 && x < mapSize / 3 * 2 && y > mapSize / 3 && y < mapSize / 3 * 2) {
        controls.pointerLock.getObject().position.x = x * sectorSize;
        controls.pointerLock.getObject().position.z = y * sectorSize;
        playerPlaced = true;
        console.log('Player placed @', { x, y });
      } // end if
    } else {
      material.color = new THREE.Color(0xf00000);
      entity = new THREE.Mesh(geometryFloor, material);
    } // end if
    entity.position.set(x * sectorSize, 0, y * sectorSize);
    scene.add(entity);
  });
  effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
  effect.setSize(window.innerWidth, window.innerHeight);
  effect.domElement.style.color = 'white';
  effect.domElement.style.backgroundColor = 'black';
  document.body.appendChild(effect.domElement);
  initialized = true;
} // end initialize()
