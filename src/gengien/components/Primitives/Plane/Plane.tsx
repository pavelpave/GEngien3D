import {
  PlaneGeometry,
  DoubleSide,
  Mesh,
  MeshLambertMaterial,
  MeshBasicMaterial,
  Vector3,
  BoxBufferGeometry,
} from "three";
import { addEventCustomListener } from "../../../utils";
import AbstractCanvas from "../../AbstractObject";
import CONST from "../../../constants";
import { v4 } from "uuid";

class Box extends AbstractCanvas {
  componentWillUnmount() {
    this.unmountObjectComponent();
  }

  componentDidMount() {
    const {
      requiredPropertys,
      width = "10",
      height = "10",
      segments = "10",
      color = "#ff001a",
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      scale = [1, 1, 1],
      pivot = false,
      visiblePivot = false,
      doubleSide = false,
      callbacks = [],
      parent = false,
      texture = null,
      material = {},
      uuid = v4(),
      customAttribute = {},
      name = CONST.DATA_OBJECT_SCENE.PLANE.name,
    } = this.props;
    const { scene, enableShadows } = requiredPropertys;
    this.initComponent(name, uuid);
    const geometry = new PlaneGeometry(width, height, segments);
    let objectMaterial = {
      color: color,
    };
    if (material) {
      objectMaterial = material;
    } else {
      this.setColor(color);
    }
    this.material = new MeshBasicMaterial({
      ...objectMaterial,
      side: doubleSide ? DoubleSide : undefined,
    });
    this.obj = new Mesh(geometry, this.material);
    if (pivot) {
      let pivotGlobalPosition = new Vector3(pivot[0], pivot[1], pivot[2]);
      this.obj.pivot = pivotGlobalPosition;
      if (visiblePivot)
        this.createVisiblePivot(this.obj.localToWorld(pivotGlobalPosition));
    }
    addEventCustomListener(this.obj, callbacks);
    this.setPosition(position);
    this.setRotation(rotation);
    this.obj.name = name;
    this.obj.castShadow = enableShadows;
    this.obj.receiveShadow = enableShadows;
    this.obj.uuid = uuid;
    this.obj._customAttribute = customAttribute;
    this.setColor(color);
    this.setScale(scale);
    this.setTexture(texture);
    if (parent) {
      this.addToScene(parent);
    } else {
      this.addToScene(scene);
    }
    this.readyComponent();
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
    mesh.scale.set(0.2, 0.17, 0.84);
    this.obj.add(mesh);
  };

  render() {
    return null;
  }
}

export default Box;
