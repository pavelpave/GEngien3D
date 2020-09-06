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
} from "./gengien";
import { urlTexture, urlTextureTwo } from "./testTexture.js";
import GenericComponentReactSruct from "./GenericComponentReactSruct";

interface IState {
  color: string;
  texture: string;
  animation: object;
  sky: string;
  linkToSceneObject: any;
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
      animation: { clipName: "Take 001" },
      linkToSceneObject: null,
    };
  }

  getLinkScene = (scene: any) => {
    this.setState({
      linkToSceneObject: scene,
    });
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        texture: urlTextureTwo,
      });
    }, 5000);
  }

  render() {
    const { color, texture, sky, animation, linkToSceneObject } = this.state;
    console.log(linkToSceneObject, "scene");
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
          </Camera>
          {/* Тут сомнительная текстурка слабонервным не смотеть)))) */}
          {/* <Sphere color={color} texture={texture} /> */}
          {/* <Plane color={color} texture={texture}/>
          <Cylinder color={color} texture={texture} position={[10,10,10]}/> */}
          <GLTF
            callback={[
              {
                type: "click",
                event: (e: any) => {
                  console.log(e);
                },
              },
            ]}
            animation={animation}
            url={"/models/book/scene.gltf"}
          />
          {/* <OBJ
            url={"/models/city/Center city Sci-Fi/Center City Sci-Fi.obj"}
            urlMLT={"/models/city/Center city Sci-Fi/Center_City_Sci-Fi.mtl"}
          /> */}
          {/* <Grid /> */}
          <GenericComponentReactSruct />
          <DirectionalLight />
        </Canvas>
      </div>
    );
  }
}

export default App;
