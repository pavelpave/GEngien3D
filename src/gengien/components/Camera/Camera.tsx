import React from "react";
import AbstractObject from "../AbstractObject";
import CameraAbstract from "./CameraAbstract";
import { IPropsForCamera } from "../../Interfaces";

interface IStateForCamera {}
// <IPropsForCamera, IStateForCamera, {}>
class Camera extends AbstractObject {
  constructor(props: IPropsForCamera) {
    super(props);
    this.state = {
      ready: false,
    };
    this.obj = null;
  }

  componentDidMount() {
    const {
      requiredPropertys,
      zoomOrhoganal = null,
      zoomPerspective = null,
      position = [0, 0, 0],
      degreesToCameraPerspective,
      aspect,
      far,
      near,
      orthoganalEnable,
    } = this.props;
    const Camera = new CameraAbstract({
      requiredPropertys,
      zoomOrhoganal,
      zoomPerspective,
      position,
      degreesToCameraPerspective,
      aspect,
      far,
      near,
      orthoganalEnable,
    });
    this.obj = Camera;
    // debugger
  }

  render() {
    return null;
  }
}

export default Camera;
