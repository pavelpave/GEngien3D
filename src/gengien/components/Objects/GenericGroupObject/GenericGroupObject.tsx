import React from "react";
import { BoxGeometry, DoubleSide, Mesh, MeshLambertMaterial } from "three";
import AbstractObject from "../../AbstractObject";
import { addEventCustomListener, checkRequiredProperty } from "../../../utils";
import CONST from "../../../constants";
import { v4 } from "uuid";

class GenericGroupObject extends AbstractObject {
  constructor(props: any) {
    super(props);
    this.state = {
      ready: false,
    };
  }

  componentWillUnmount() {
    this.unmountObjectComponent();
  }
  componentDidMount() {
    const {
      requiredPropertys,
      scale = [1, 1, 1, 1, 1, 1],
      color = "#000000",
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      callback = [],
      parent,
      visible = true,
      customAttribute = {},
      uuid = v4(),
      name = CONST.DATA_OBJECT_SCENE.GENERIC_GROUP.name,
    } = this.props;
    let basePropertys = null;
    basePropertys = checkRequiredProperty(requiredPropertys, this.props);
    const { scene, enableShadows } = basePropertys;
    this.initComponent(name, uuid);
    const geometry = new BoxGeometry(...scale);
    this.material = new MeshLambertMaterial({
      color: color,
      side: DoubleSide,
      visible: visible,
      transparent: true,
    });
    this.obj = new Mesh(geometry, this.material);
    addEventCustomListener(this.obj, callback);
    this.setPosition(position);
    this.setRotation(rotation);
    this.obj._customAttribute = customAttribute;
    this.obj.name = name;
    this.obj.castShadow = enableShadows;
    this.obj.receiveShadow = enableShadows;
    this.obj.uuid = uuid;
    if (parent) {
      parent.add(this.obj);
    } else {
      if (this.obj && scene) {
        this.addToScene(scene);
      } else {
        return false;
      }
    }
    this.setState({
      ready: true,
    });
    this.readyComponent();
  }

  render() {
    const { ready } = this.state;
    if (!ready) return null;
    if (this.obj.name === CONST.DATA_OBJECT_SCENE.GENERIC_GROUP.name) {
      const { requiredPropertys } = this.props;
      let basePropertys: any = null;
      basePropertys = checkRequiredProperty(requiredPropertys, this.props);
      if (basePropertys)
        if (React.Children) {
          const childrenWithProps = React.Children.map(
            this.props.children,
            (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, {
                  requiredPropertys: basePropertys,
                  parent: this.obj,
                });
              }
              return null;
            }
          );
          return <>{childrenWithProps}</>;
        }
    }
    return null;
  }
}

export default GenericGroupObject;
