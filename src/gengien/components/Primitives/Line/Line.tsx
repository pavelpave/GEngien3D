import {
  CatmullRomCurve3,
  Geometry,
  Line as ThreeLine,
  LineBasicMaterial,
  Vector3,
} from "three";
import { addEventCustomListener } from "../../../utils";
import AbstractCanvas from "../../AbstractObject";
import CONST from "../../../constants";
import { v4 } from "uuid";

class Line extends AbstractCanvas {
  
  spline: CatmullRomCurve3;
  geometry: Geometry;
  splinePoints: any;

  constructor(props: any) {
    super(props);
    this.spline = new CatmullRomCurve3();
    this.geometry = new Geometry();
  }
  componentWillUnmount() {
    this.unmountObjectComponent();
  }

  componentDidMount() {
    const {
      requiredPropertys,
      numPoints = 1000,
      color = "red",
      position = [0, 0, 0],
      rotation = [0, 0, 0],
      vertices = [new Vector3(-1, 1, -1), new Vector3(10, 1, 10)],
      callbacks = [],
      parent = false,
      uuid = v4(),
      customAttribute = {},
      texture = null,
      name = CONST.DATA_OBJECT_SCENE.LINE.name,
    } = this.props;
    const { scene, enableShadows } = requiredPropertys;
    this.initComponent(name, uuid);
    this.spline = new CatmullRomCurve3(vertices);
    this.splinePoints = this.spline.getPoints(numPoints);
    this.geometry.lineDistancesNeedUpdate = true;
    for (let i = 0; i < this.splinePoints.length; i++) {
      this.geometry.vertices.push(this.splinePoints[i]);
    }
    this.obj = new ThreeLine(this.geometry, new LineBasicMaterial());
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

export default Line;
