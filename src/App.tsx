import React, { useState } from "react";
import { Canvas, Camera, OrbitControl, Box, Plane } from "./gengien";
import { urlTexture, urlTextureTwo } from "./test.js";
interface IState {
  color: string;
  texture: string;
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
      texture: urlTexture,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        texture: urlTextureTwo,
      });
    }, 5000);
  }

  render() {
    const { color, texture } = this.state;
    console.log(texture)
    return (
      <div className={"exemple_app-wraper"}>
        <Canvas enableVR={false} debug={false}>
          <Camera>
            <OrbitControl />
          </Camera>
          {/* Тут сомнительная текстурка слабонервным не смотеть)))) */}
          <Box color={color} texture={texture} />
          <Plane color={color} texture={texture}/>
        </Canvas>
      </div>
    );
  }
}

export default App;
