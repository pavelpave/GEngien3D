import React from "react";
import AbstractObject from "../AbstractObject";
import CameraAbstract from "./CameraAbstract";
import { IPropsForCamera } from "../../Interfaces";
import CONST from "../../constants";
import { v4 } from "uuid";

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
      name = CONST.DATA_OBJECT_SCENE.MAIN_CAMERA.name,
      uuid = v4(),
    } = this.props;
    this.initComponent(name, uuid);
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
    this.obj = Camera.obj;
    this.addToScene(requiredPropertys.scene);
    this.resize();
    window.addEventListener("resize", this.resize);
    this.readyComponent();
    this.setState({
      ready: true,
    });
    // Camera.render = function () {
    //   const { ready } = this.state;
    //   if (!ready) return null;
    //   const childrenWithProps = React.Children.map(
    //     this.props.children,
    //     (child) => {
    //       if (React.isValidElement(child)) {
    //         return React.cloneElement(child, {
    //           ...this.props,
    //           camera: this.obj,
    //         });
    //       }
    //     }
    //   );

    //   return <>{childrenWithProps}</>;
    // };
  }

  setZoom = (zoom: number | null) => {
    if (!zoom) return;
    this.obj.zoom = zoom;
    this.obj.updateProjectionMatrix();
  };

  resize = () => {
    const { fullscreen = true } = this.props;
    if (fullscreen) {
      this.obj.aspect = window.innerWidth / window.innerHeight;
      this.obj.updateProjectionMatrix();
    }
  };

  shouldComponentUpdate(nextProps: any) {
    const { zoom } = this.props;
    if (nextProps.zoom) {
      if (zoom !== nextProps.zoom) {
        this.setZoom(nextProps.zoom);
      }
    }
    this.onPropsUpdate(this.props, nextProps);
    return true;
  }

  render() {
    const { ready } = this.state;
    if (!ready) return null;
    const childrenWithProps = React.Children.map(
      this.props.children,
      (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ...this.props,
            camera: this.obj,
          });
        }
      }
    );

    return <>{childrenWithProps}</>;
  }
}

export default Camera;
