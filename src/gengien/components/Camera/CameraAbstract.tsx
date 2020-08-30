import React from "react";
import {
  PlaneGeometry,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera as ThreePerspectiveCamera,
  OrthographicCamera,
} from "three";
import { IPropsCameraAbstract } from "../../Interfaces";
import { v4 } from "uuid";

interface IStateCameraAbstract {
  ready: boolean;
}

export default class CameraAbstract extends React.Component<
  IPropsCameraAbstract,
  IStateCameraAbstract,
  {}
> {
  /**
   *  - аспект для камеры
   *@member aspect
   */
  aspect: any;
  /**
   *  - радиус обзора для перспективной камеры
   * @member degreesToCameraPerspective
   */
  degreesToCameraPerspective: number;
  /**
   * - фар для камеры
   * @member far
   */
  far: number;
  /**
   * - неар для камеры
   * @member near
   */
  near: number;
  /**
   * - главный объект камеры
   * @member obj
   */
  obj: object | null | any;
  /**
   *  - вспомогательный меш для луча направления
   * @member rayMesh
   */
  rayMesh: any;
  /**
   *  - прицел
   * @member aimMesh
   */
  aimMesh: any;
  /**
   *  - для изменения разрешения
   * @member resize
   */
  resize: any;

  constructor(props: any) {
    super(props);
    const {
      scene,
      enableVR,
      enableQuadCamera,
      renderer,
      effect,
      canvasWidth,
      canvasHeight,
      addRenderCall,
      canvasDomElement,
      onComponentInit,
      onComponentReady,
      getComponentByName,
      getComponentByUuid,
      enableShadows,
      debug,
    } = props.requiredPropertys;
    this.state = { ready: false };
    this.aspect = enableVR ? canvasWidth / canvasHeight : 1;
    this.degreesToCameraPerspective = enableVR ? 60 : 100;
    if (props.degreesToCameraPerspective && !enableVR) {
      this.degreesToCameraPerspective = props.degreesToCameraPerspective;
    }
    if (props.aspect && !enableVR) {
      this.aspect = props.aspect;
    }
    this.far = props.far ? props.far : 1000;
    this.near = props.near ? props.near : 0.1;
    if (props.orthoganalEnable) {
      this.obj = new OrthographicCamera(
        canvasWidth / -2,
        canvasWidth / 2,
        canvasHeight / 2,
        canvasHeight / -2,
        0.1,
        500
      );
      if (props.zoomOrhoganal) {
        this.obj.zoom = props.zoomOrhoganal;
      }
    } else {
      this.obj = new ThreePerspectiveCamera(60, this.aspect, 0.1, 1000);
    }
    this.obj.position.set(...props.position);
    this.obj.lookAt(scene.position);
    if (enableVR) {
      this.rayMesh = this.createMeshToRay();
      this.rayMesh.position.set(0, 0, 5);
      this.aimMesh = this.createMeshToRay();
      this.aimMesh.position.set(0, 0, -5);
      this.obj.add(this.aimMesh);
      this.obj.add(this.rayMesh);
    }
    this.obj.name = props.name ? props.name : `No name ${v4()}`;
    this.obj.uuid = props.uuid ? props.uuid : v4();
    if (enableVR || enableQuadCamera) {
      addRenderCall(() => this.rendererEffect(effect, scene));
    }
    if (!enableVR && !enableQuadCamera) {
      addRenderCall(() => renderer.render(scene, this.obj));
    }

    window.addEventListener("resize", this.resize);
    onComponentReady({
      name: this.obj.name,
      uuid: this.obj.uuid,
    });
  }

  /**
   * режим отрисовки VR или QUAD_CAM_MOD
   * @param effect
   * @param scene
   */
  rendererEffect = (effect: any, scene: any) => {
    effect.render(scene, this.obj);
  };

  /**
   *  - прицел в режиме VR
   *   todo: сделать более красивую иконку и добавить анимаций
   *   !заглушка под прицел
   */
  createMeshToRay = () => {
    let geometry = new PlaneGeometry(0.1, 0.1);
    let material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide });
    return new Mesh(geometry, material);
  };
}
