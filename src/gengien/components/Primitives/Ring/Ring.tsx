import { RingBufferGeometry, Mesh, MeshLambertMaterial } from "three";
import { addEventCustomListener } from "../../../utils";
import AbstractCanvas from "../../AbstractObject";
import CONST from "../../../constants";
import { v4 } from "uuid";

class Ring extends AbstractCanvas {
  componentWillUnmount() {
    this.unmountObjectComponent();
  }

  componentDidMount() {
    const {
      requiredPropertys,
      innerRadius = 1,
      outerRadius = 5,
      thetaSegments = 30,
      phiSegments = 30,
      thetaStart = 6,
      thetaLength = 6.3,
      scale = [2, 2, 2],
      color = "red",
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      callbacks = [],
      parent = false,
      material = {},
      uuid = v4(),
      customAttribute = {},
      texture = null,
      name = CONST.DATA_OBJECT_SCENE.RING.name,
    } = this.props;
    const { scene, enableShadows } = requiredPropertys;
    this.initComponent(name, uuid);
    const geometry = new RingBufferGeometry(
      innerRadius,
      outerRadius,
      thetaSegments,
      phiSegments,
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
    this.setScale(scale);
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

export default Ring;
