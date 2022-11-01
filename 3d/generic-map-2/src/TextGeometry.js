import { ExtrudeGeometry } from 'three/build/three.module';

export class TextGeometry extends ExtrudeGeometry {
  constructor (text, parameters = {}) {
    const font = parameters.font;
    if (font === undefined) {
      super(); // generate default extrude geometry
    } else {
      const shapes = font.generateShapes(text, parameters.size);

      // translate parameters to ExtrudeGoemtry API
      parameters.depth = parameters.height !== undefined ? parameters.height : 50;

      // defaults
      if (parameters.bevelThickness === undefined) parameters.bevelThickness = 10;
      if (parameters.bevelSize === undefined) parameters.bevelSize = 8;
      if (parameters.bevelEnabled === undefined) parameters.bevelEnabled = false;
      super(shapes, parameters);
    }
    this.type = 'TextGeometry';
  }
}
