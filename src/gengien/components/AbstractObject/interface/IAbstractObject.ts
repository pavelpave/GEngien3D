import {
    WebGLRenderer
} from 'three'
import * as type from '../../../Types'

export interface IPropsAbstractObject {
  requiredPropertys?: {
    addRenderCall: any;
    canvasDomElement: HTMLElement;
    canvasHeight: number | null;
    canvasWidth: number | null;
    debug: boolean | null;
    effect: null | any;
    enableQuadCamera: boolean | type.QuadCamera;
    enableShadows: boolean;
    enableVR: boolean;
    getComponentByName: object | any;
    getComponentByUuid: object | any;
    onComponentInit: void | any;
    onComponentReady: void | any;
    renderer: WebGLRenderer;
    scene: object | null | any;
  };
  name?: string | null;
}

export interface IStateAbstractObject {
  ready: boolean;
}
