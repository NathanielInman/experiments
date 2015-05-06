import { Voronoi } from 'engine/object-model/Voronoi';
import { Point   } from 'engine/object-model/Point';

var map = new Voronoi();
    map.points = [];

for(let i=0;i<100;i++) map.points.push(new Point(r(v.w),r(v.h)));

export { map };
