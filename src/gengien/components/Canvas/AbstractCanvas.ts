import * as type from "./Types";

interface IACanvas {
  fullscreen: boolean;
  canvasWidth: number;
  canvasHeight: number;
  canvasDomElement: HTMLElement;
  enableVR: boolean;
  enableQuadCamera: boolean;
  quadData: false | type.QuadCamera;
  enableShadows: boolean;
  gammaFactor: number;
}


class AbstractCanvas<IACanvas> {
    constructor(props:IACanvas ){
    }
}

export default AbstractCanvas;
