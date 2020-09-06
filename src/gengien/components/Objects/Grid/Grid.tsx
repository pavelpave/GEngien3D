import { GridHelper } from "three";
import AbstractObject from "../../AbstractObject";
import CONST from "../../../constants";
import { v4 } from "uuid";

class Grid extends AbstractObject {
  componentDidMount() {
    const {
      requiredPropertys,
      name = CONST.DATA_OBJECT_SCENE.GRID.name,
      uuid = v4(),
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      size = 100,
      divisions = 100,
      colorCenterLine = "#ffffff",
      color = "#ffffff",
    } = this.props;
    const { scene } = requiredPropertys;
    this.obj = new GridHelper(size, divisions, colorCenterLine, color);
    this.setPosition(position);
    this.setRotation(rotation);
    this.obj.name = name;
    this.uuid = uuid;
    this.addToScene(scene);
  }

  render() {
    return null;
  }
}

export default Grid;
