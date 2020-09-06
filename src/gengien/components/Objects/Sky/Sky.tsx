import AbstractObject from "../../AbstractObject";
import CONST from "../../../constants";
import { TextureLoader, WebGLCubeRenderTarget } from "three";
import { v4 } from "uuid";

class Sky extends AbstractObject {
  componentWillUnmount() {
    this.unmountObjectComponent();
  }
  componentDidMount() {
    const {
      requiredPropertys,
      camera,
      url = null,
      uuid = v4(),
      name = CONST.DATA_OBJECT_SCENE.SKY.name,
    } = this.props;
    const { scene, renderer } = requiredPropertys;
    if (!camera) {
      throw new Error("Вложите этот компонент в камеру!");
    }
    this.initComponent(name, uuid);
    const loader = new TextureLoader();
    const texture = loader.load(url, () => {
      const rt = new WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scene.background = rt;
    });
    this.readyComponent();
  }

  render() {
    return null;
  }
}

export default Sky;
