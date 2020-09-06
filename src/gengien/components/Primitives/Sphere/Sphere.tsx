import { Mesh, MeshLambertMaterial, SphereBufferGeometry } from "three";
import { addEventCustomListener } from "../../../utils";
import AbstractCanvas from "../../AbstractObject";
import CONST from "../../../constants";
import { v4 } from "uuid";

class Sphere extends AbstractCanvas {
  componentWillUnmount() {
    this.unmountObjectComponent();
  }

  componentDidMount() {
    const {
      requiredPropertys,
      radius = 10,
      widthSegments = 30,
      heightSegments = 30,
      phiStart = 6,
      phiLength = 6.3,
      thetaStart = 6,
      thetaLength = 6.3,
      color = "red",
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      callbacks = [],
      parent = false,
      material = {},
      uuid = v4(),
      customAttribute = {},
      texture = null,
      name = CONST.DATA_OBJECT_SCENE.SPHERE.name,
    } = this.props;
    const { scene, enableShadows } = requiredPropertys;
    this.initComponent(name, uuid);
    const geometry = new SphereBufferGeometry(
      radius,
      widthSegments,
      heightSegments,
      phiStart,
      phiLength,
      thetaStart,
      thetaLength
    );
    let objectMaterial = {
      color: color,
    };
    if (material) {
      objectMaterial = material;
    } else {
      this.setColor(color);
    }
    this.material = new MeshLambertMaterial(objectMaterial);
    this.obj = new Mesh(geometry, this.material);
    addEventCustomListener(this.obj, callbacks);
    this.setPosition(position);
    this.setRotation(rotation);
    this.obj.name = name;
    this.obj.castShadow = enableShadows;
    this.obj.receiveShadow = enableShadows;
    this.obj.uuid = uuid;
    this.obj._customAttribute = customAttribute;
    this.setColor(color);
    this.setTexture(texture);

    if (parent) {
      this.addToScene(parent);
    } else {
      this.addToScene(scene);
    }
    this.readyComponent();
  }

  render() {
    return null;
  }
}

export default Sphere;
