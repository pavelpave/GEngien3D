import React, { createRef } from "react";
import { ICanvasProps } from "../../Interfaces";
import * as type from "../../Types";
import AbstractCanvas from "./AbstractCanvas";

interface IMyState {
  ready: boolean;
}

/**
 * -Класс описывающий корневой компонент в котором создается канвас и инициализируется three js
 * @example
 * import React from "react";
 * import { Canvas, Camera, OrbitControl } from "./gengien";
 * function App() {
 *   return (
 *     <div className={"exemple_app-wraper"}>
 *       <Canvas enableVR={false} debug={true}>
 *         <Camera>
 *           <OrbitControl />
 *         </Camera>
 *       </Canvas>
 *     </div>
 *   );
 * }
 *
 * export default App;
 * @class Canvas
 */
class Canvas extends React.Component<ICanvasProps, IMyState> {
  /**
   * ссылка на канвас для последущего добавления HUD элементов
   * @member { type.TextboxProps }
   */
  protected refCanvas = createRef<type.TextboxProps>();
  /**
   * объект сцены коневая нода в сцене
   * @member { ICanvas.scene }
   */
  protected scene: any;
  /**
   * параметр для включения или выключения режима VR
   * @member { boolean }
   */
  protected enableVR?: boolean;
  /**
   * параметр отвечающий за включение 4 камерного мода
   * (перспективные камеры)
   * @member { boolean | type.QuadCamera }
   */
  protected enableQuadCamera?: boolean | type.QuadCamera;
  /**
   * главный объект для отрисовки в WEBGL
   * @member { null | object }
   */
  protected renderer!: null | object | any;
  /**
   * это внутреняя переменная отвечающяя за эфекты для камеры (VR,Quad)
   * @member { null | object | any }
   */
  protected effect!: null | object | any;
  /**
   * Паоаметр оперделяющий ширину канваса
   * @member { null | number }
   */
  protected canvasWidth!: null | number;
  /**
   * Паоаметр оперделяющий высоту канваса
   * @member { null | number }
   */
  protected canvasHeight!: null | number;
  /**
   * функция ответсвенная за отрисовку добавляется в
   * стек отрисовки
   * @member { {} | any }
   */
  protected addRenderCall: {} | any;
  /**
   * ссылка на дом элемент для рендерер
   * @member { any | HTMLElement }
   */
  protected canvasDomElement: any | HTMLElement;
  /**
   * включение или выключение теней
   * @member { boolean }
   */
  protected enableShadows?: boolean;
  /**
   * включает дебаг режим (отображает камеру и помогает дебаг моду)
   *  @member { boolean }
   */
  protected debug?: boolean;

  public components: [] | any;

  fullscreen: any;
  quadData: any;
  gammaFactor: any;
  state: { ready: boolean };
  props: any;

  constructor(props: ICanvasProps) {
    super(props);
    this.components = [];
    this.enableShadows = false;
    this.state = {
      ready: false,
    };
  }
  /**
   * поиск по объекту components
   * todo:переписать на более быстрый метод
   * @member { function }
   */
  getComponentByName = (data: any): any => {
    let result = null;
    this.components.forEach((component: any) => {
      if (component.uuid === data.uuid) result = component;
    });
    return result;
  };
  /**
   * поиск по объекту components
   * todo:переписать на более быстрый метод
   * @member { function }
   */
  getComponentByUuid = (uuid: string) => {
    // return this.components.find((component, index) => {
    //   return component.uuid === uuid;
    // });
  };

  onLoadingProgress = () => {
    const { onLoadingProgress } = this.props;
    const componentsCount = this.components.length;
    const readyComponentsCount = this.components.filter((component: any) => {
      return component.ready;
    }).length;
    const progress = Math.round((readyComponentsCount * 100) / componentsCount);
    if (onLoadingProgress) {
      onLoadingProgress(progress);
    }
  };
  /**
   * инициализирует компоненты
   * @member { function }
   */
  onComponentInit = (data: any) => {
    // console.log('onComponentInit', name);
    const { name, uuid } = data;
    this.components.push({
      name,
      uuid,
      ready: false,
    });
    this.onLoadingProgress();
  };
  /**
   * Когда какой-то компонент загружен, то вызывается это событие
   * @member { function }
   */
  onComponentReady = (data: any) => {
    const { name, uuid } = data;
    console.log("onComponentReady", this.components);
    const component = this.getComponentByName(data);
    if (component) {
      component.ready = true;
      component.uuid = uuid;
      this.onLoadingProgress();
    }
  };

  componentDidMount() {
    const {
      fullscreen = false,
      enableShadows = false,
      enableVR = false,
      enableQuadCamera = false,
      quadData = null,
      debug = false,
      gammaFactor = 1,
    } = this.props;
    this.debug = debug;
    this.canvasDomElement = this.refCanvas.current;
    this.canvasHeight = this.canvasDomElement.parentElement.clientHeight;
    this.canvasWidth = this.canvasDomElement.parentElement.clientWidth;
    let params = {
      fullscreen: fullscreen,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      canvasDomElement: this.canvasDomElement,
      enableVR,
      enableQuadCamera,
      quadData,
      enableShadows,
      gammaFactor,
      renderCalls: [],
      renderer: this.renderer,
    };
    const canvas = new AbstractCanvas(params);
    this.scene = canvas.scene;
    this.renderer = canvas.renderer;
    this.enableVR = canvas.enableVR;
    this.enableQuadCamera = canvas.enableQuadCamera;
    this.effect = canvas.effect;
    this.addRenderCall = canvas.addRenderCall;
    this.setState({
      ready: true,
    });
  }

  render() {
    const { ready } = this.state;
    let requiredPropertys = {
      scene: this.scene,
      enableVR: this.enableVR,
      enableQuadCamera: this.enableQuadCamera,
      renderer: this.renderer,
      effect: this.effect,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      addRenderCall: this.addRenderCall,
      canvasDomElement: this.canvasDomElement,
      onComponentInit: this.onComponentInit,
      onComponentReady: this.onComponentReady,
      getComponentByName: this.getComponentByName,
      getComponentByUuid: this.getComponentByUuid,
      enableShadows: this.enableShadows,
      debug: this.debug,
    };
    let props = {
      requiredPropertys: requiredPropertys
    }
    if (ready) {
      const childrenWithProps = React.Children.map(
        this.props.children,
        (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, props);
          } else {
            return null;
          }
        }
      );

      return <canvas ref={this.refCanvas}>{childrenWithProps}</canvas>;
    } else {
      return <canvas ref={this.refCanvas}></canvas>;
    }
  }
}
export default Canvas;
