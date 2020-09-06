import AbstractObject from "../../AbstractObject";
import CONST from "../../../constants";
import { GLTFLoader } from "./GLTFLoader";
import {
  AnimationMixer,
  Vector3,
  BoxBufferGeometry,
  MeshLambertMaterial,
  Mesh,
} from "three";
import { addEventCustomListener } from "../../../utils";
import { v4 } from "uuid";

class GLTF extends AbstractObject {
  mixer: null | any;
  currentAnimation: null | any;
  clips: never[] | any[] | any;
  loader: any;
  constructor(props: any) {
    super(props);
    this.mixer = null;
    this.currentAnimation = null;
    this.clips = [];
  }

  createVisiblePivot = (pivot: Vector3) => {
    let geometry = new BoxBufferGeometry(1, 1, 1);
    let material = new MeshLambertMaterial({
      wireframe: true,
      color: "#eb4034",
    });
    let mesh = new Mesh(geometry, material);
    mesh.position.setX(pivot.x);
    mesh.position.setY(pivot.y);
    mesh.position.setZ(pivot.z);
    mesh.name = "pivot";
    mesh.scale.set(1, 1, 1);
    this.obj.add(mesh);
  };

  getClipByName = (clipName: string) => {
    return this.clips.filter((el: any) => {
      return el.name === clipName;
    })[0];
  };

  setAnimation = (animation: any) => {
    if (!animation) return;
    const { clipName } = animation;
    if (!clipName) return;
    const clip = this.getClipByName(clipName);
    if (clip) {
      this.mixer.stopAllAction();
      this.mixer.clipAction(clip).play();
    }
  };

  componentWillUnmount() {
    this.unmountObjectComponent();
  }

  componentDidMount() {
    const {
      requiredPropertys,
      url = null, // required!!!
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      quaternion = false,
      scale = [1, 1, 1],
      pivot = false,
      visiblePivot = false,
      onLoadComplete = null,
      animation = null,
      visible = true,
      name = CONST.DATA_OBJECT_SCENE.GLTF.name,
      uuid = v4(),
      customAttribute = {},
      callback = [],
      parent,
      startLoadGLTF = () =>
        console.log("Не передан обработчик старта загрузки!"),
      progressLoadGLTF = (e: any) =>
        console.log("Не передан обработчик прогресса загрузки!", e),
      errorLoadGLTF = (e: any) =>
        console.log("Не передан обработчик ошибки!", e),
    } = this.props;
    if (!url) return;
    let {
      scene,
      addRenderCall = () => {
        console.log("Не передан addRenderCall");
      },
      enableShadows,
    } = requiredPropertys;
    this.mixer = null;
    this.currentAnimation = null;
    this.clips = [];
    this.loader = new GLTFLoader();
    this.loader.crossOrigin = true;
    this.loader.manager.onLoad = () => {
      //   this.readyComponent();
      if (onLoadComplete) {
        onLoadComplete(this.obj);
        if (this.onPropsUpdate) this.onPropsUpdate({}, this.props);
      }
    };
    this.loader.manager.onError = errorLoadGLTF;
    this.loader.manager.onStart = () => {
      startLoadGLTF();
    };
    this.loader.load(
      url,
      (data: any) => {
        this.initComponent(name, uuid);
        this.obj = data.scene;
        this.obj.visible = visible;
        if (pivot) {
          let pivotGlobalPosition = new Vector3(pivot[0], pivot[1], pivot[2]);
          this.obj.pivot = pivotGlobalPosition;
          if (visiblePivot) {
            this.createVisiblePivot(this.obj.localToWorld(pivotGlobalPosition));
          }
        }
        this.setRotation(rotation);
        this.setQuaternion(quaternion);
        this.setPosition(position);
        this.setScale(scale);
        addEventCustomListener(this.obj, callback);
        this.obj.name = name;
        if (enableShadows) {
          this.obj.traverse(function (node: any) {
            if (node.isMesh || node.isLight) {
              node.castShadow = true;
              node.receiveShadow = true;
            }
          });
        }
        this.addToScene(parent ? parent : scene);
        this.uuid = uuid;
        this.obj._customAttribute = customAttribute;
        this.obj.castShadow = enableShadows;
        this.obj.receiveShadow = enableShadows;
        this.mixer = new AnimationMixer(this.obj);
        this.clips = data.animations;
        this.setAnimation(animation);
        addRenderCall((deltaSeconds: any) => {
          this.mixer.update(deltaSeconds);
        });
        this.readyComponent();
      },
      progressLoadGLTF
    );
  }

  shouldComponentUpdate(nextProps: any) {
    const { animation, selectedMaterial = null } = this.props;
    if (nextProps.animation && nextProps.animation.clipName) {
      if (!animation || animation.clipName !== nextProps.animation.clipName) {
        this.setAnimation({
          clipName: nextProps.animation.clipName,
        });
      }
    }
    this.onPropsUpdate(this.props, nextProps);
    return true;
  }

  render() {
    return null;
  }
}

export default GLTF;
