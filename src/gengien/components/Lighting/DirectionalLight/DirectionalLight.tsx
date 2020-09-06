import AbstractObject from "../../AbstractObject";
import { DirectionalLight as ThreeDirectionalLight } from "three";
import CONST from "../../../constants";
import { v4 } from "uuid";

class DirectionalLight extends AbstractObject {
  componentWillUnmount() {
    this.unmountObjectComponent();
  }

  componentDidMount() {
    const {
      requiredPropertys,
      color = "#ffffff",
      intensity = 1,
      position = [1, 1, 1],
      customAttribute = {},
      uuid = v4(),
      name = CONST.DATA_OBJECT_SCENE.DIRECTIONAL_LIGHT.name,
    } = this.props;
    const { scene, enableShadows } = requiredPropertys;
    this.initComponent(name, uuid);
    this.obj = new ThreeDirectionalLight(color);
    this.obj.intensity = intensity;
    this.setPosition(position);
    this.obj.castShadow = enableShadows;
    this.obj.shadow.mapSize.width = 4096;
    this.obj.shadow.mapSize.height = 4096;
    this.obj.name = name;
    this.uuid = uuid;
    this.obj.castShadow = enableShadows;
    this.obj._customAttribute = customAttribute;
    this.setPosition(position);
    this.addToScene(scene);
    this.readyComponent();
  }
  render() {
    return null;
  }
}

export default DirectionalLight;
