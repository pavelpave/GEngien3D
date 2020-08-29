import * as type from "../Types";

export interface ICanvasProps {
  fullscreen?: boolean;
  enableShadows?: boolean;
  enableVR: boolean;
  enableQuadCamera?: boolean;
  quadData?: {} | null;
  debug?: boolean;
  gammaFactor?: number;
  clock?: any;
}
export interface IAbstractCanvasProps extends ICanvasProps {
  canvasDomElement: HTMLElement
  canvasHeight: number | any
  canvasWidth: number | any
  enableQuadCamera: boolean
  enableShadows: boolean
  enableVR: boolean
  fullscreen: boolean
  gammaFactor: number | any
  quadData: null | boolean | type.QuadCamera | {} ;
  renderCalls: any
  renderer: any
  // canvasDomElement: HTMLElement;
  // canvasHeight: number;
  // canvasWidth: number;
  // enableQuadCamera: boolean;
  // enableShadows: boolean;
  // enableVR: boolean;
  // fullscreen: boolean;
  // gammaFactor: number;
  // quadData: null | boolean | type.QuadCamera;
  // renderCalls: any;
  // renderer: any;
  // clock?: any;
}

export interface IAbstractCanvas {
  scene: any;
  enableVR?: boolean;
  enableQuadCamera?: boolean | type.QuadCamera;
  renderer: any;
  effect: null | object | any;
  canvasWidth: null | number;
  canvasHeight: null | number;
  addRenderCall: {} | any;
  canvasDomElement: any | HTMLElement;
  onComponentInit: any;
  onComponentReady: any;
  getComponentByName: any;
  getComponentByUuid: any;
  enableShadows?: boolean;
  debug?: boolean;
}
