import * as THREE from 'three/build/three';

export class Controls{
  constructor(renderer,camera){
    this.renderer = renderer;
    this.camera = camera;
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeftward = false;
    this.moveRightward = false;
    this.velocity = new THREE.Vector3();
    this.timeStart = performance.now(); //used for velocity

    // establish pointer lock for FPS movement
    this.acquirePointerLock();
    this.pointerLock = new PointerLockControls(camera);

    // provide all input listeners
    this.registerEvents();
  }
  processTick(map,sectorSize){
    if(this.pointerLock.enabled){
      const controls = this.pointerLock.getObject().clone(),
            timeEnd = performance.now(),
            timeDelta = (timeEnd-this.timeStart)/1000,
            geoSize = map.sectors.length*10;

      this.velocity.x -= this.velocity.x * 10.0 * timeDelta;
      this.velocity.z -= this.velocity.z * 10.0 * timeDelta;
      this.velocity.y -= 9.8 * 100.0 * timeDelta; // 100.0 = mass
      if(this.moveLeftward) this.velocity.x -= 500.0 * timeDelta;
      if(this.moveForward) this.velocity.z -= 500.0 * timeDelta;
      if(this.moveBackward) this.velocity.z += 500.0 * timeDelta;
      if(this.moveRightward) this.velocity.x += 500.0 * timeDelta;
      controls.translateX(this.velocity.x*timeDelta);
      controls.translateZ(this.velocity.z*timeDelta);
      controls.translateY(this.velocity.y*timeDelta);
      if(
        map.isWalkable({
          x: Math.floor(controls.position.x/sectorSize+0.5),
          y: Math.floor(controls.position.z/sectorSize+0.5)
        })
      ){
        this.pointerLock.getObject().translateX(this.velocity.x*timeDelta);
        this.pointerLock.getObject().translateZ(this.velocity.z*timeDelta);
        this.pointerLock.getObject().translateY(this.velocity.y*timeDelta);
      } //end if
      if(this.pointerLock.getObject().position.y<10){
        this.velocity.y = 0;
        this.pointerLock.getObject().position.y = 10;
      } //end if
      this.timeStart = timeEnd;
    } //end if
  }
  acquirePointerLock(){
    const instructions = document.querySelector('#instructions');

    instructions.style.display = 'flex';
    const havePointerLock =
      'pointerLockElement' in document ||
      'mozPointerLockElement' in document ||
      'webkitPointerLockElement' in document;

    if(havePointerLock){
      const element = document.body,
            pointerlockchange = event=>{
              if(document.pointerLockElement === element ||
                 document.mozPointerLockElement === element ||
                 document.webkitPointerLockElement === element){
                this.pointerLock.enabled = true;
                instructions.style.display = 'none';
              } else {
                this.pointerLock.enabled = false;
                instructions.style.display = 'flex';
              } //end if
            },
            pointerlockerror = event=> instructions.style.display = '';

      // Hook pointer lock state change events
      document.addEventListener('pointerlockchange',pointerlockchange,false);
      document.addEventListener('mozpointerlockchange',pointerlockchange,false);
      document.addEventListener('webkitpointerlockchange',pointerlockchange,false);
      document.addEventListener('pointerlockerror',pointerlockerror,false);
      document.addEventListener('mozpointerlockerror',pointerlockerror,false);
      document.addEventListener('webkitpointerlockerror',pointerlockerror,false);

      instructions.addEventListener('click',event=>{
        instructions.style.display = 'none';

        // Ask the browser to lock the pointer
        element.requestPointerLock =
          element.requestPointerLock ||
          element.mozRequestPointerLock ||
          element.webkitRequestPointerLock;
        element.requestPointerLock();
      },false);
    }else{
      instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    } //end if
  }
  registerEvents(){
    document.addEventListener(
      'keydown',
      e=>{
        if(e.keyCode===38||e.keyCode===87){ //up / w
          this.moveForward = true;
        }else if(e.keyCode===37||e.keyCode===65){ //left / a
          this.moveLeftward = true;
        }else if(e.keyCode===40||e.keyCode===83){ //down  s
          this.moveBackward = true;
        }else if(e.keyCode===39||e.keyCode===68){ //right / d
          this.moveRightward = true;
        }else if(e.keyCode===32){ //space
        } //end if
      },
      false
    );
    document.addEventListener(
      'keyup',
      e=>{
        if(e.keyCode===38||e.keyCode===87){ //up / w
          this.moveForward = false;
        }else if(e.keyCode===37||e.keyCode===65){ //left / a
          this.moveLeftward = false;
        }else if(e.keyCode===40||e.keyCode===83){ //down  s
          this.moveBackward = false;
        }else if(e.keyCode===39||e.keyCode===68){ //right / d
          this.moveRightward = false;
        }else if(e.keyCode===32){ //space
        } //end if
      },
      false
    );
    window.addEventListener(
      'resize',
      ()=>{
        let w = window.innerWidth,
            h = window.innerHeight;

        this.renderer.setSize(w,h);
        this.camera.aspect = w/h;
        this.camera.updateProjectionMatrix();
      },
      true
    );
  }
}
export class PointerLockControls{
  constructor(camera){
    camera.rotation.set(0,0,0);

    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add(camera);
    this.yawObject = new THREE.Object3D();
    this.yawObject.position.y = 10;
    this.yawObject.add(this.pitchObject);
    this.enabled = false;
    document.addEventListener(
      'mousemove',
      event=>{
        if(!this.enabled) return;
        const movementX = event.movementX||event.mozMovementX||event.webkitMovementX||0,
              movementY = event.movementY||event.mozMovementY||event.webkitMovementY||0;

        this.yawObject.rotation.y -= movementX * 0.002;
        this.pitchObject.rotation.x -= movementY * 0.002;
        this.pitchObject.rotation.x = Math.max(
          -Math.PI/2,
          Math.min(Math.PI/2,this.pitchObject.rotation.x)
        );
      },
      false
    );
  }
  getObject(){
    return this.yawObject;
  }
  getDirection(){
    const direction = new THREE.Vector3(0,0,-1),
          rotation = new THREE.Euler(0,0,0,'XZY');

    return v=>{
      rotation.set(this.pitchObject.rotation.x,this.yawObject.rotation.y,0);
      v.copy(direction).applyEuler(rotation);
      return v;
    };
  }
}
