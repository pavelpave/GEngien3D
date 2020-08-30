import { Clock, Scene, WebGLRenderer } from "three";
import StereoEffect from "./StereoEffect";
import { QuadViewPorts } from "./QuadViewPorts";
import CONST from "../../constants";
import { IAbstractCanvasProps, IAbstractCanvas } from "../../Interfaces";
import * as type from "../../Types";

/**
 *  - Абстрактный класс в кором создается внутрянка для сцены тут идет проверка будет ли это просто сцена или VR или QUAD_CAM_MOD
 * @class AbstractCanvas
 */
class AbstractCanvas implements IAbstractCanvas {
  requestId: null;
  renderCalls: any;
  clock: any;
  fullscreen: any;
  scene: any;
  enableVR?: boolean | undefined;
  enableQuadCamera?: boolean | type.QuadCamera | undefined;
  renderer: object | null | any;
  effect: any;
  canvasWidth: number | null;
  canvasHeight: number | null;
  canvasDomElement: any;
  onComponentInit: any;
  onComponentReady: any;
  getComponentByName: any;
  getComponentByUuid: any;
  enableShadows?: boolean | undefined;
  debug?: boolean | undefined;
  quadData!: type.QuadCamera;

  constructor(props: IAbstractCanvasProps) {
    this.requestId = null;
    this.enableVR = props.enableVR; //activate VR mode
    this.enableQuadCamera = props.enableQuadCamera;
    this.canvasWidth = props.canvasWidth;
    this.canvasHeight = props.canvasHeight;
    this.renderCalls = props.renderCalls;
    this.canvasDomElement = props.canvasDomElement;
    this.clock = props.clock;
    this.fullscreen = props.fullscreen;
    this.effect = null;
    this.scene = new Scene();
    this.scene.name = CONST.DATA_OBJECT_SCENE.GENGIEN_SCENE.name;
    this.renderer = new WebGLRenderer({
      canvas: this.canvasDomElement,
      powerPreference: "high-performance",
      antialias: true,
      alpha: true,
    });
    this.renderer.gammaOutput = true;
    this.renderer.gammaFactor = props.gammaFactor;
    this.renderer.autoClearColor = false;

    this.renderer.shadowMap.enabled = props.enableShadows;
    this.renderer.shadowCameraNear = 3;
    this.renderer.shadowCameraFar = 1000;
    this.renderer.shadowCameraFov = 50;

    if (this.enableVR) {
      this.effect = new StereoEffect(this.renderer);
    }
    if (this.enableQuadCamera) {
      this.effect = new QuadViewPorts(
        this.renderer,
        this.canvasDomElement,
        this.quadData
      );
    }

    this.resize();
    window.addEventListener("resize", this.resize);
    this.getVRDisplay((display: any) => {
      this.renderer.vr.setDevice(display);
    });

    this.clock = new Clock();
    this.animate();
  }

  addRenderCall = (renderCall: any) => {
    this.renderCalls.push(renderCall);
  };

  /**
   * - Основная функция отрисовки - берет все вызовы рендера в куче и рендерит их. работает только когда сцена готова
   */
  animate = () => {
    this.requestId = this.renderer.setAnimationLoop(this.animate);
    const deltaSeconds = this.clock.getDelta();
    this.renderCalls.forEach((callback: any) => {
      callback(deltaSeconds);
    });
  };

  getVRDisplay = (onDisplay: any) => {
    if ("getVRDisplays" in navigator) {
      navigator.getVRDisplays().then((displays) => {
        onDisplay(displays[0]);
      });
    }
  };

  resize = () => {
    const { fullscreen = false } = this;
    if (fullscreen) {
      this.canvasHeight = window.innerHeight;
      this.canvasWidth = window.innerWidth;
    } else {
      const parentElement = this.canvasDomElement.parentElement;
      if (parentElement) {
        this.canvasHeight = parentElement.clientHeight;
        this.canvasWidth = parentElement.clientWidth;
      }
    }
    if (this.enableVR) {
      this.effect.setSize(this.canvasWidth, this.canvasHeight);
    } else if (this.enableQuadCamera) {
      this.effect.setSize(this.canvasWidth, this.canvasHeight);
    } else {
      this.renderer.setSize(this.canvasWidth, this.canvasHeight);
    }
  };
}

export default AbstractCanvas;
