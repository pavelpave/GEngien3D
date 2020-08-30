import React from "react";
import AbstractObject from "../../AbstractObject";
import ThreeOrbitControls from "./ThreeOrbitControls";
import CONST from "../../../constants";
import { v4 } from "uuid";

interface IPropsOrbitControl {}

/**
 * - отвечает за систему управления "орбитальную"
 * @class OrbitControl
 */
class OrbitControl extends AbstractObject {
  constructor(props: IPropsOrbitControl) {
    super(props);
  }

  componentDidMount() {
    const {
      requiredPropertys,
      minDistance = 3,
      maxDistance = 20,
      camera,
      name = CONST.DATA_OBJECT_SCENE.ORBIT_CONTROLS.name,
      uuid = v4(),
      type = "",
    } = this.props;
    const { canvasDomElement } = requiredPropertys;
    this.initComponent(name, uuid);
    this.obj = new ThreeOrbitControls(camera, canvasDomElement, type);

    this.obj.rotateSpeed = 0.3;
    this.obj.zoomSpeed = 0.9;

    this.obj.minDistance = minDistance;
    this.obj.maxDistance = maxDistance;
    this.name = name;
    this.uuid = uuid;
    this.readyComponent();
  }

  resize = () => {
    const { fullscreen = true } = this.props;
    if (fullscreen) {
      this.obj.aspect = window.innerWidth / window.innerHeight;
      this.obj.updateProjectionMatrix();
    }
  };
  render() {
    return null;
  }
}

export default OrbitControl;
