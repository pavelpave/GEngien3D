import AbstractObject from "../../AbstractObject";
import { AmbientLight as ThreeAmbientLight } from "three";
import CONST from "../../../constants";
import { v4 } from "uuid";

class AmbientLight extends AbstractObject {
  constructor(props: any) {
    super(props);
  }
  componentWillUnmount() {
    this.unmountObjectComponent();
  }

  componentDidMount() {
    const {
      requiredPropertys,
      color = 0xffffff,
      intensity = 1,
      customAttribute = {},
      uuid = v4(),
      name = CONST.DATA_OBJECT_SCENE.AMBIENT_LIGHT.name,
    } = this.props;
    const { scene, enableShadows } = requiredPropertys;
    this.initComponent(name, uuid);
    this.obj = new ThreeAmbientLight(color, intensity);
    this.obj.name = name;
    this.uuid = uuid;
    this.obj.castShadow = enableShadows;
    this.obj._customAttribute = customAttribute;
    this.addToScene(scene);
    this.readyComponent();
  }
  render() {
    return null;
  }
}

export default AmbientLight;
