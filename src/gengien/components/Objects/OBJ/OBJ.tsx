import { OBJLoader2 } from "three/examples/jsm/loaders/OBJLoader2";
import { MtlObjBridge } from "three/examples/jsm/loaders/obj2/bridge/MtlObjBridge.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

import AbstractObject from "../../AbstractObject";
import { addEventCustomListener, checkRequiredProperty } from "../../../utils";
import CONST from "../../../constants";
import { v4 } from "uuid";

class OBJ extends AbstractObject {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const {
      requiredPropertys,
      url = null,
      urlMLT = null,
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      quaternion = false,
      scale = [1, 1, 1],
      pivot = false,
      onLoadComplete = null,
      animation = null,
      visible = true,
      name = CONST.DATA_OBJECT_SCENE.OBJ.name,
      callback,
      parent,
      startLoadGLTF,
      progressLoadGLTF,
      errorLoadGLTF,
    } = this.props;
    const { scene } = requiredPropertys;
    let objLoader2 = new OBJLoader2().setModelName(name).setUseIndices(true);
    const callbackOnLoad = (object3d: any) => {
      scene.add(object3d);
    };
    const callbackProggress = (event: any) => {
      console.log(event);
    };

    function onLoadMtl(mtlParseResult: MTLLoader.MaterialCreator) {
      objLoader2.addMaterials(
        MtlObjBridge.addMaterialsFromMtlLoader(mtlParseResult),
        true
      );
      objLoader2.load(
        url,
        callbackOnLoad,
        callbackProggress,
        undefined,
        undefined
      );
    }

    let mtlLoader = new MTLLoader();
    mtlLoader.load(urlMLT, onLoadMtl);
  }

  render() {
    return null;
  }
}

export default OBJ;
