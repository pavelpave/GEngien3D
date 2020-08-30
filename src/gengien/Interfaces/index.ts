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
  canvasDomElement: HTMLElement;
  canvasHeight: number | any;
  canvasWidth: number | any;
  enableQuadCamera: boolean;
  enableShadows: boolean;
  enableVR: boolean;
  fullscreen: boolean;
  gammaFactor: number | any;
  quadData: null | boolean | type.QuadCamera | {};
  renderCalls: any;
  renderer: any;
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

export interface IRequiredPropertyForChildrens {
  scene?: any;
  enableVR?: any;
  enableQuadCamera?: any;
  renderer?: any;
  effect?: any;
  canvasWidth?: any;
  canvasHeight?: any;
  addRenderCall?: any;
  canvasDomElement?: any;
  onComponentInit?: any;
  onComponentReady?: any;
  getComponentByName?: any;
  getComponentByUuid?: any;
  enableShadows?: any;
  debug?: any;
}

export interface IPropsForCamera extends IRequiredPropertyForChildrens {
  requiredPropertys?: any;
  zoomOrhoganal?: number | null;
  zoomPerspective?: number | null;
  position?: type.Position;
  degreesToCameraPerspective?: number | null;
  aspect?: number | null;
  far?: number | null;
  near?: number | null;
  orthoganalEnable?: number | null;
}
