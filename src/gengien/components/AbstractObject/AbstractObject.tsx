import React from "react";
import {
  TextureLoader,
  RepeatWrapping,
  MeshBasicMaterial,
  Vector3,
} from "three";
import { v4 } from "uuid";
import { isEqual } from "lodash";
import * as type from "../../Types";
import { checkRequiredProperty } from "../../utils";
import { IStateAbstractObject } from "./interface/IAbstractObject";

/**
 * - используется для сборки абстрактных свойств объектов
 * @class
 * @protected
 */
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

  state: { ready: boolean };

  // props: { requiredPropertys: any; } | undefined;

  constructor(props: any) {
    super(props);
    this.obj = null;
    this.name = null;
    this.hovered = false;
    this.material = null;
    this.uuid = null;
    this.visible = true;
    this.state = {
      ready: false,
    };
  }

  unmountObjectComponent = () => {
    if (this.obj)
      if (this.obj.parent) {
        let parent = this.obj.parent;
        if (parent) this.removeObject(parent);
      }
  };
  /**
   * - устанавливает текстуру на объект
   * @param texture
   */
  setTexture = (texture: string = "") => {
    let map = new TextureLoader().load(texture);
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.repeat.set(1, 1);
    var material = new MeshBasicMaterial({
      map: map,
      transparent: true,
    });
    material.needsUpdate = true;
    this.obj.material = material;
  };
  /**
   * - удалаяет объект @member obj
   * todo: add removed object in stack
   * @param parent
   */
  removeObject = (parent: any) => {
    if (this.obj) {
      let { material, geometry } = this.obj;
      if (material && geometry) {
        material.dispose();
        geometry.dispose();
      }
      if (parent) {
        parent.remove(this.obj);
      } else {
        if (this.obj.parent) this.obj.parent.remove(this.obj);
      }
    }
  };
  /**
   * - получить текущий объект @member obj
   */
  getObject = () => {
    if (!this.obj) return false;
    return this.obj;
  };
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
   *  - устанавливает кватернион для @member obj
   * @param quaternion
   */
  setQuaternion = (quaternion: type.Quaternion) => {
    if (!this.obj || !this.obj.quaternion || !quaternion) return;
    this.obj.children[0].quaternion.setFromAxisAngle(
      new Vector3(quaternion[0], quaternion[1], quaternion[2]).normalize(),
      quaternion[3]
    );
  };
  /**
   * добавляет объект к сцене
   * @param scene
   */
  addToScene = (scene: any) => {
    scene.add(this.obj);
  };
  /**
   * - инициализирует @member obj
   */
  initComponent = (name: string, uuid: string) => {
    const { requiredPropertys } = this.props;
    if (name) {
      this.name = name;
    }
    this.uuid = uuid ? uuid : v4();
    let propretys = checkRequiredProperty(requiredPropertys, this.props);
    if (!propretys) return;
    propretys!.onComponentInit({
      name: name,
      uuid: uuid,
    });
    return this.name;
  };
  /**
   * - стработает когда @member obj будет загружен
   */
  readyComponent = () => {
    const { requiredPropertys } = this.props;
    let propretys = checkRequiredProperty(requiredPropertys, this.props);
    if (!propretys) return;
    propretys!.onComponentReady({
      name: this.name,
      uuid: this.uuid,
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
      color,
      texture,
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
    if (nextProps.color) {
      if (!color || !isEqual(color, nextProps.color)) {
        this.setColor(nextProps.color);
      }
    }
    if (!isEqual(nextProps.texture, texture)) {
      this.setTexture(nextProps.texture);
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
}
