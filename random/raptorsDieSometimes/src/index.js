const M = Math;
let bgColor = 0;
let bgCD = 0;
let bgCW = 0;
let sunTimer = 0;
let moonTimer = 550;
let survived = 0;
let destroyed = 0;
const filmEngine = { cur: 0, dir: 1, color: '#f66' };
const cloud = [];
const snow = [];
let curAvg = 0;
const map = [];
const sunDiv = document.getElementById('sun');
const moonDiv = document.getElementById('moon');
const filmDiv = document.getElementById('film');
const canvas = document.getElementById('canvas');
const canvasbg = document.getElementById('canvasbg');
const moonbg1 = document.getElementById('moonbg1');
const moonbg2 = document.getElementById('moonbg2');
const moonbg3 = document.getElementById('moonbg3');
const scoreDestroyedDiv = document.getElementById('scoreDestroyed');
const scoreSurvivedDiv = document.getElementById('scoreSurvived');

// Random number generator, f is lowerbound, g is greater bound
// and e is whether it's an integer
function r (f, g, e, d) {
  f = !g ? 0 * (g = f) : f > g ? g + (d = f) - g : f;
  e = e || 0;
  g = M.random() * (g - f) + f;
  return e ? g | 0 : g;
} // end r()

function getColor (num) {
  let result = '#f80';

  if (num === 1) {
    result = '#cc0';
  } else if (num === 2) {
    result = '#f00';
  } // end if
  return result;
} // end getColor()

function getFireSize (num) {
  let result = 8;

  if (num <= 42) {
    result = 0;
  } else if (num <= 44) {
    result = 1;
  } else if (num <= 46) {
    result = 2;
  } else if (num <= 48) {
    result = 4;
  } else if (num <= 50) {
    result = 6;
  } // end if
  return result;
} // end getFireSize()

// determines how close to the core of earth it is, changing the inner color
function getColorPerc (num) {
  let result = 'ff3030';

  if (num >= 60) {
    result = '353535';
  } else if (num >= 58) {
    result = '343434';
  } else if (num >= 56) {
    result = '333333';
  } else if (num >= 54) {
    result = '323232';
  } else if (num >= 52) {
    result = '313131';
  } else if (num >= 50) {
    result = '303030';
  } else if (num >= 48) {
    result = '323030';
  } else if (num >= 46) {
    result = '343030';
  } else if (num >= 44) {
    result = '383030';
  } else if (num >= 42) {
    result = '403030';
  } else if (num >= 40) {
    result = '503030';
  } else if (num >= 38) {
    result = '603030';
  } else if (num >= 36) {
    result = '703030';
  } else if (num >= 34) {
    result = '833030';
  } else if (num >= 32) {
    result = '8F3030';
  } else if (num >= 30) {
    result = '983030';
  } else if (num >= 28) {
    result = '9F3030';
  } else if (num >= 26) {
    result = 'A83030';
  } else if (num >= 24) {
    result = 'AF3030';
  } else if (num >= 22) {
    result = 'B83030';
  } else if (num >= 20) {
    result = 'BF3030';
  } else if (num >= 18) {
    result = 'C83030';
  } else if (num >= 16) {
    result = 'CF3030';
  } else if (num >= 14) {
    result = 'D83030';
  } else if (num >= 12) {
    result = 'DF3030';
  } else if (num >= 10) {
    result = 'E83030';
  } else if (num >= 8) {
    result = 'EF3030';
  } else if (num >= 6) {
    result = 'F83030';
  } // end if
  return result;
} // end getColorPerc()

function runBuild () {
  let contents = '';

  if (snow.length < 100) {
    snow.push({
      x: r(0, 100, true),
      y: 0,
      color: getColor(r(0, 4, true))
    });
  } // end if
  for (let i = 0; i < snow.length; i++) {
    snow[i].y++;
    if (i > 0) {
      if (map[i].value - map[i - 1].value > 3) {
        map[i].value--;
        map[i - 1].value++;
      } else if (map[i].value - map[i - 1].value > 6) {
        map[i].value -= 3;
        map[i - 1].value += 3;
      } // end if
    } // end if
    if (i < 99) {
      if (map[i].value - map[i + 1].value > 3) {
        map[i].value--;
        map[i + 1].value++;
      } else if (map[i].value - map[i + 1].value > 6) {
        map[i].value -= 3;
        map[i + 1].value += 3;
      } // end if
    } // end if
    if (map[snow[i].x].value - 100 + snow[i].y + 1 === 0 || snow[i].y === 98) {
      map[snow[i].x].value++;
      snow[i].y = r(0, 5, true);
      snow[i].x = r(0, 100, true);
    } // end if
    contents += `
      <div style='
        position:absolute;
        left:${snow[i].x}%;bottom:${snow[i].y}%;
        width:5px;height:5px;
        background:${snow[i].color};'>
      </div>`;
  } // end for
  for (let i = 0; i < 100; i++) {
    curAvg += map[i].value;
    if (map[i].value > 0) {
      if (map[i].killed === 0) {
        if (map[i].life < 5) {
          map[i].life++;
        } else {
          map[i].superlife++;
          if (map[i].superlife % 10 === 0) map[i].life++;
          if (map[i].superlife > 200) {
            map[i].color = '#0F0';
          } else if (map[i].superlife > 100) {
            map[i].color = '#090';
          } // end if
        } // end if
        contents += `
          <div style="
            position:absolute;
            left:${i}%;
            border-bottom:${map[i].value * 4}px solid #${getColorPerc(map[i].value)};
            border-top:${map[i].life}px solid ${map[i].color};
            bottom:0%;
            width:17px;
            height:${map[i].value / 2}%;
            background:#321;">` +
            (map[i].animal === true
              ? (map[i].value > 40
                  ? `<div style="
                 position:absolute;
                 left:0px;top:-16px;
                 width:16px;height:16px;">
                 <img src="/raptor${(i < 50 ? 'L' : 'R')}.png"/>
               </div></div></div>`
                  : `<div style="
                 position:absolute;
                 left:0px;top:-${(100 - map[i].value)}px;
                 width:16px;height:16px;">
                 <img src="/raptor${(i < 50 ? 'L' : 'R')}.png"/>
               </div></div></div>`)
              : '</div></div>');
      } else {
        if (map[i].animal === true && map[i].value >= 40)destroyed++;
        if (map[i].value >= 40) { map[i].animal = false; map[i].spawned = false; } // reset
        map[i].life = -100; map[i].superlife = 0; map[i].color = '#450';
        if (map[i].value > 2) { if (r(0, 100, true) < 14)map[i].value--; } else { map[i].killed = 0; }
        if (r(0, 100, true) < 25 && i > 0)map[i - 1].killed = 1;
        if (r(0, 100, true) < 25 && i < 99)map[i + 1].killed = 1;
        if (r(0, 100, true) < 25)map[i].killed = 0;
        contents += `
          <div style="
            position:absolute;
            left:${i}%;
            border-bottom:${map[i].value * 4}px solid #${getColorPerc(map[i].value)};
            border-top:${getFireSize(map[i].value)}px solid #F00;
            bottom:0%;
            width:17px;
            height:${map[i].value / 2}%;
            background-color:#321;">` +
           (map[i].animal === true
             ? (map[i].value > 40
                 ? `<div style="
                position:absolute;
                left:0px;top:-16px;
                width:16px;height:16px;">
                <img src="/raptor${(i < 50 ? 'L' : 'R')}.png"/></div></div></div>`
                 : `<div style="
                position:absolute;
                left:0px;top:-${(100 - map[i].value)}px;
                width:16px;height:16px;">
                <img src="/raptor${(i < 50 ? 'L' : 'R')}.png"/></div></div></div>`)
             : '</div></div>');
      } // end if
    } // end if
  } // end for
  curAvg = Math.floor(curAvg / 100);
  canvas.innerHTML = contents;
} // end runBuild()

function killSnow () {
  if (curAvg > 50) {
    let killed = r(0, 100, true);

    if (killed < 50) {
      killed = r(0, 100, true);
    } else if (killed < 75) {
      killed = r(0, 30, true);
    } else {
      killed = r(30, 100, true);
    } // end if
    map[killed].killed = 1;
  } // end if
} // end killSnow()

function moveClouds (prep) {
  let cloudsData = '';

  if (cloud.length < 20 && r(0, 100, true) < 20) {
    cloud.push({
      left: 100,
      top: r(0, 25, true),
      width: r(100, 400, true),
      height: r(30, 100, true)
    });
  } // end if
  for (let i = 0; i < cloud.length; i++) {
    cloud[i].left--;
    if (cloud[i].left <= -25) cloud.shift();
    if (!prep) {
      cloudsData += `
        <div style="
          position:absolute;
          left:${parseInt(cloud[i].left, 10)}%;
          top:${parseInt(cloud[i].top, 10)}%;">
          <div style="
            position:absolute;
            left:0px;top:0px;
            width:${parseInt(cloud[i].width + 20, 10)}px;
            height:${parseInt(cloud[i].height - 20, 10)}px;
            background:white;
            opacity:0.35;">
          </div>
          <div style="
            position:absolute;
            left:10px;top:-10px;
            width:${parseInt(cloud[i].width, 10)}px;
            height:${parseInt(cloud[i].height, 10)}px;
            background:white;
            opacity:0.35;">
          </div>
          <div style="
            position:absolute;
            left:40px;top:-20px;
            width:${parseInt(cloud[i].width - 60, 10)}px;
            height:${parseInt(cloud[i].height + 20, 10)}px;
            background:white;
            opacity:0.35;">
          </div>
        </div>`;
    } // end if
  } // end for
  if (!prep)document.getElementById('clouds').innerHTML = cloudsData;
} // end moveClouds()

function changeTOD () {
  if (bgCD === 0 && bgCW === 0) {
    bgColor++;
  } else if (bgCW === 0) {
    bgColor--;
  } else {
    bgCW--;
    if (bgCW === 0 && bgColor === 1) {
      sunTimer = 0;
      changeFilm(true);
    } // end if
  } // end if
  sunTimer++; moonTimer++;
  if (moonTimer % 9 === 0) changeFilm();
  sunDiv.style.left = Math.floor(100 / 500 * sunTimer) - 10 + '%';
  sunDiv.style.top = 50 - Math.floor(75 / 500 * bgColor) - Math.floor(7 / 150 * (bgCW > 75 ? 150 - bgCW : bgCW)) + '%';
  moonDiv.style.left = Math.floor(100 / 500 * moonTimer) - 10 + '%';
  moonDiv.style.top = 10 + Math.floor(75 / 500 * bgColor) - Math.floor(7 / 150 * (bgCW > 75 ? 150 - bgCW : bgCW)) + '%';
  if (bgColor === 255) {
    bgColor = 254;
    bgCD = 1;
    bgCW = 150;
    moonTimer = -150;
  } // end if
  if (bgColor === 0) {
    bgColor = 1;
    bgCD = 0;
    bgCW = 150;
  } // end if
  const BGC = `rgb(${Math.floor(bgColor * 0.6)},${Math.floor(bgColor * 0.8)},${bgColor})`;

  canvasbg.style.backgroundColor = BGC;
  moonbg1.style.backgroundColor = BGC;
  moonbg2.style.backgroundColor = BGC;
  moonbg3.style.backgroundColor = BGC;
} // end changeTOD()

function changeFilm (reset) {
  if (reset) {
    filmEngine.dir = 1;
    filmEngine.cur = 1;
    filmEngine.color = '#F66';
    filmDiv.style.backgroundColor = filmEngine.color;
  } // end if
  if (filmEngine.dir === 0 && filmEngine.cur > 0) {
    filmEngine.cur--;
  } else if (filmEngine.dir === 1 && filmEngine.cur < (filmEngine.color === '#00F' ? 10 : 30)) {
    filmEngine.cur++;
  } else if (filmEngine.dir === 0 && filmEngine.cur === 0) {
    filmEngine.dir = 1;
    if (filmEngine.color === '#F66') {
      filmEngine.color = '#00F';
    } else {
      filmEngine.color = '#F66';
    } // end if
    filmDiv.style.backgroundColor = filmEngine.color;
  } else if (filmEngine.dir === 1 && filmEngine.cur === (filmEngine.color === '#00F' ? 10 : 30)) {
    filmEngine.dir = 0;
  } // end if
  filmDiv.style.opacity = filmEngine.cur / 100;
} // end changeFilm()

function processAnimal () {
  for (let i = 0; i < 50; i++) {
    if (map[i].superlife >= 15 &&
       map[i].value >= 40 &&
       map[i].animal === false &&
       map[i].spawned === false &&
       r(0, 100, true) < 20) { // spawn velociraptor
      map[i].animal = true;
      map[i].spawned = true;
    } // end if
    if (map[i].animal === true) {
      if (i > 0) {
        if (map[i - 1].animal === false) {
          map[i - 1].animal = true;
          map[i].animal = false;
        } // end if
      } else {
        map[i].animal = false; // animal fled
        survived++;
      } // end if
    } // end if
  } // end for
  for (let i = 99; i >= 50; i--) {
    if (map[i].superlife >= 15 &&
       map[i].value >= 40 &&
       map[i].animal === false &&
       map[i].spawned === false &&
       r(0, 100, true) < 20) { // spawn velociraptor
      map[i].animal = true;
      map[i].spawned = true;
    } // end if
    if (map[i].animal === true) {
      if (i < 99) {
        if (map[i + 1].animal === false) {
          map[i + 1].animal = true;
          map[i].animal = false;
        } // end if
      } else {
        map[i].animal = false; // animal fled
        survived++;
      } // end if
    } // end if
  } // end for
} // end processAnimal()

function adjustScore () {
  scoreDestroyedDiv.innerHTML = `[DESTROYED] ${destroyed}`;
  scoreSurvivedDiv.innerHTML = `${survived} [SURVIVED]`;
} // end adjustScore()

// initialize map
for (let i = 0; i < 102; i++) {
  map[i] = {
    value: 50,
    killed: 0,
    life: 0,
    superlife: 0,
    color: '#070',
    animal: false,
    spawned: false
  };
} // end for

let frame = 0;
(function mainLoop () {
  frame++;
  if (frame > 500) frame = 0;
  if (frame % 10 === 0) {
    runBuild();
    changeTOD();
  }
  if (frame % 100 === 0) {
    killSnow();
    processAnimal();
  }
  if (frame % 500 === 0) {
    moveClouds();
    adjustScore();
  }
  setTimeout(mainLoop, 10);
})();
