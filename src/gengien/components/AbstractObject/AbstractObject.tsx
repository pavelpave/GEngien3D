import React from "react";
import { WebGLRenderer } from "three";
import { v4 } from "uuid";
import { isEqual } from "lodash";
import * as type from "../../Types";

interface IPropsAbstractObject {
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

interface IStateAbstractObject {}

export default abstract class AbstractObject extends React.Component<
  any,
  IStateAbstractObject,
  {}
> {
  /**
   * - главный изменяемый объект (контекстный объект)
   * @member obj
   */
  obj: object | null | any;
  /**
   * - назначеное имя для объекта
   * @member name
   */
  name: string | null;
  /**
   * todo : допиши описание поля
   * @member хз что тут)
   */
  hovered: any;
  /**
   *  - объект описывающий материалы наложиные на obj
   * @member material
   */
  material: object | null | any;
  /**
   *  - поле задающее собственный идентификатор для объекта
   * @member uuid
   */
  uuid: string | null;
  /**
   *  - поле отвечающее за отображение на сцене объекта
   * @member visible
   */
  visible: boolean | null;

  constructor(props: any) {
    super(props);
    this.obj = null;
    this.name = null;
    this.hovered = false;
    this.material = null;
    this.uuid = null;
    this.visible = true;
  }

  /**
   * - устанавливает цвет для @member obj
   * @param cssColor
   */
  setColor = (cssColor = "#ffffff") => {
    if (!this.material) return;
    this.material.color.set(cssColor);
  };
  /**
   * - получает текущюю позицию (локальную) довольно таки дорогой метод
   * todo : переписать на более универсальный
   */
  getPosition = () => {
    if (!this.obj) return null;
    return [this.obj.position.x, this.obj.position.y, this.obj.position.z];
  };
  /**
   * - устанавливает позицию для @member obj
   * @param position
   */
  setPosition = (position: type.Position) => {
    if (!this.obj || !this.obj.position || !position) return;
    this.obj.position.set(...position);
  };
  /**
   * - устанавливает поворот для @member obj
   * @param rotation
   */
  setRotation = (rotation: type.Rotation) => {
    if (!this.obj || !this.obj.rotation || !rotation) return;
    this.obj.rotation.set(...rotation);
  };
  /**
   * - устанавливает размер для @member obj
   * @param scale
   */
  setScale = (scale: type.Scale) => {
    if (!this.obj || !this.obj.scale || !scale) return;
    this.obj.scale.set(...scale);
  };
  /**
   * - инициализирует @member obj
   */
  initComponent = () => {
    const { requiredPropertys , name = null } = this.props;
    if (name) {
      this.name = name;
    } else {
      this.name = `No name ${v4()}`;
    }
    requiredPropertys!.onComponentInit({
      name: this.name,
      obj: null,
      uuid: null,
      instance: this,
    });
    return this.name;
  };
  /**
   * - стработает когда @member obj будет загружен
   */
  readyComponent = () => {
    const { requiredPropertys } = this.props;
    requiredPropertys!.onComponentReady({
      name: this.name,
      obj: this.obj,
      uuid: this.uuid,
      instance: this,
    });
  };
  /**
   * - отвечает за обновление @member obj
   * @param prevProps
   * @param nextProps
   */
  onPropsUpdate = (prevProps: any, nextProps: any) => {
    const {
      rotation,
      position,
      scale,
      visible,
      intensity,
      selectedMaterial = null,
    } = prevProps;

    if (nextProps.materials && this.obj !== null) {
      this.obj = this.obj.obj ? this.obj.obj : this.obj;
      if (this.obj !== undefined) {
        if (nextProps.selectedMaterial !== selectedMaterial) {
          const newMaterials = nextProps.materials[nextProps.selectedMaterial];
          let found = false;
          this.obj.traverse((node: any) => {
            if (node.isMesh) {
              if (
                node.material &&
                Object.keys(newMaterials).includes(node.material.name)
              ) {
                node.material = newMaterials[node.material.name];
                node.material.needsUpdate = true;
                found = true;
              }
            }
          });
          if (!found) {
            this.obj.traverse((node: any) => {
              if (node.isMesh) {
                if (node.material) {
                  node.material = newMaterials[Object.keys(newMaterials)[0]];
                  node.material.needsUpdate = true;
                }
              }
            });
          }
        }
      }
    }
    if (nextProps.position) {
      if (!position || !isEqual(position, nextProps.position)) {
        this.setPosition(nextProps.position);
      }
    }
    if (nextProps.rotation) {
      if (!rotation || !isEqual(rotation, nextProps.rotation)) {
        this.setRotation(nextProps.rotation);
      }
    }
    if (nextProps.scale) {
      if (!scale || !isEqual(scale, nextProps.scale)) {
        this.setScale(nextProps.scale);
      }
    }
    if (this.obj) {
      if (visible !== nextProps.visible) {
        this.obj.visible = nextProps.visible;
        return true;
      }
    }
    if (this.obj) {
      if (intensity !== nextProps.intensity) {
        this.obj.intensity = nextProps.intensity;
        return true;
      }
    }
    // this.onPropsOverride(prevProps, nextProps)
    return true;
  };
  /**
   * - если рект компонент будет размонтирован то @member obj удалится со сцены
   */
  componentWillUnmount() {
    const { requiredPropertys } = this.props;
    if (this.obj) {
      requiredPropertys!.scene.remove(this.obj);
    }
  }

  componentDidUpdate(prevProps: any) {
    this.onPropsUpdate(prevProps, this.props);
  }

  render() {
    return null;
  }
}
