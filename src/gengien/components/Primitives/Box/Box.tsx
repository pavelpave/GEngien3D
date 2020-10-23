import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";
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
      scale = [2, 2, 2],
      color = "red",
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      callbacks = [],
      parent = false,
      material = {},
      number = 1,
      uuid = v4(),
      customAttribute = {},
      texture = null,
      name = CONST.DATA_OBJECT_SCENE.BOX.name,
    } = this.props;
    const { scene, enableShadows } = requiredPropertys;
    this.initComponent(name, uuid);
    console.log(color);
    const geometry = new BoxGeometry(...scale);
    let objectMaterial = {
      color: color,
    };
    if (material) {
      this.material = material;
    } else {
      this.material = new MeshBasicMaterial(objectMaterial);
      this.setColor(color);
    }


    this.obj = new Mesh(geometry, this.material);
    addEventCustomListener(this.obj, callbacks);

    this.obj.name = name;
    this.obj.castShadow = enableShadows;
    this.obj.receiveShadow = enableShadows;
    this.obj.uuid = uuid;
    this.obj._customAttribute = customAttribute;
    this.setColor(color);
    this.setPosition(position);
    this.setRotation(rotation);
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

export default Box;
