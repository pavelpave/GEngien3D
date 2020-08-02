import React, { createRef } from "react";
import { ICanvasProps } from "../Interfaces";
import * as type from "./Types";
import AbstractCanvas from "./AbstractCanvas";

interface IMyState {
  ready: boolean;
}

/**
 * Класс описывающий корневой компонент в котором
 * создается канвас и инициализируется three js
 * @class
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
  protected enableQuadCamera?: false | type.QuadCamera;
  /**
   * главный объект для отрисовки в WEBGL
   * @member { null | object }
   */
  protected renderer!: null | object;
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
   * инициализирует компоненты
   * @member { function }
   */
  protected onComponentInit: any;
  /**
   * Когда какой-то компонент загружен, то вызывается это событие
   * @member { function }
   */
  protected onComponentReady: any;
  /**
   * поиск по объекту components
   * todo:переписать на более быстрый метод
   * @member { function }
   */
  protected getComponentByName: any;
  /**
   * поиск по объекту components
   * todo:переписать на более быстрый метод
   * @member { function }
   */
  protected getComponentByUuid: any;
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

  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      ready: false,
    };
  }

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
    const canvas = new AbstractCanvas({
      fullscreen: fullscreen,
      canvasWidth: this.canvasWidth,
      canvasHeight: this.canvasHeight,
      canvasDomElement: this.canvasDomElement,
      enableVR,
      enableQuadCamera,
      quadData,
      enableShadows,
      gammaFactor,
    });
  }

  render() {
    console.log(this.props, "canvas");
    const { ready } = this.state;
    const propsCanvasChildren = {};
    if (ready) {
      const childrenWithProps = React.Children.map(
        this.props.children,
        (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
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
            });
          } else {
            return null;
          }
        }
      );

      return <canvas ref={this.refCanvas}>{childrenWithProps}</canvas>;
    } else {
      return null;
    }
  }
}
export default Canvas;
// scene: this.scene,
// enableVR: this.enableVR,
// enableQuadCamera: this.enableQuadCamera,
// renderer: this.renderer,
// effect: this.effect,
// canvasWidth: this.canvasWidth,
// canvasHeight: this.canvasHeight,
// addRenderCall: this.addRenderCall,
// canvasDomElement: this.canvasDomElement,
// onComponentInit: this.onComponentInit,
// onComponentReady: this.onComponentReady,
// getComponentByName: this.getComponentByName,
// getComponentByUuid: this.getComponentByUuid,
// enableShadows: this.enableShadows,
// debug: this.debug,
