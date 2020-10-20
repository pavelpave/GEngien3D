import React from "react";
import {
  Canvas,
  Camera,
  OrbitControl,
  Box,
  Plane,
  Cylinder,
  Line,
  Sphere,
  GLTF,
  Raycaster,
  OBJ,
  DragAndDropControl,
  Grid,
  GenericGroupObject,
  Sky,
  DirectionalLight,
  PointLight,
  SpotLight,
  DevMode
} from "./gengien";
import { urlTexture, urlTextureTwo } from "./testTexture.js";
import GenericComponentReactSruct from "./GenericComponentReactSruct";
import Bake from "./example/Bake";
import Mountain from "./example/Mountain";
import SchoolRom from "./example/SchoolRom";
import Book from "./example/Book";
import RenderStructure from "./gengien/components/mods/DevMode/GenerateGUI/components/Render-structure/RenderStructure";
// import DevMode from './gengien/components/mods'


interface IState {
  color: string;
  texture: string;
  sky: string;
  linkToSceneObject: any;
  material: any
}
/**
 *  * The interaction manager deals with mouse, touch and pointer events. Any DisplayObject can be interactive
 * if its interactive parameter is set to true
 * This manager also supports multitouch.
 * @template BASE
 * @example
 * function App() {
 *  return (
 *    <div className={"exemple_app-wraper"}>
 *      <Canvas enableVR={false} debug={true}>
 *        <Camera >
 *          <OrbitControl />
 *        </Camera>
 *      </Canvas>
 *    </div>
 *  );
 * }
 * @class App
 */
class App extends React.Component<any, IState, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
      color: "red",
      sky: "/assets/sky2.jpg",
      texture: urlTexture,
      linkToSceneObject: null,
      material: null
    };
  }

  getLinkScene = (scene: any) => {
    this.setState({
      linkToSceneObject: scene,
    });
  };

  componentDidMount() {
  }

  render() {
    const { material, color, texture, sky, linkToSceneObject } = this.state;
    // console.log(linkToSceneObject, "scene");d
    return (
      <div className={"exemple_app-wraper"}>
        <Canvas
          getScene={!linkToSceneObject ? this.getLinkScene : null}
          enableShadows={true}
          enableVR={false}
          debug={false}
        >
          <Camera position={[0, 20, 0]}>
            <Raycaster />
            <OrbitControl />
            <Sky url={sky} />
            <DevMode />
          </Camera>
          {/* <Line /> */}
          <Box />
          <Book />
          {/* <OBJ
            url={"/models/city/Center city Sci-Fi/Center City Sci-Fi.obj"}
            urlMLT={"/models/city/Center city Sci-Fi/Center_City_Sci-Fi.mtl"}
          /> */}
          {/* <Grid /> */}
          <Bake />
          {/*<Mountain />*/}
          {/*<GenericComponentReactSruct />*/}
          <DirectionalLight color={'#696969'} position={[1, 1, 1]} />
          {/*<SpotLight color={'#FF0000'} position={[1, 1, 1]} intensity={2} />*/}
        </Canvas>
      </div>
    )

  }
}

export default App;
