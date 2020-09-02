import React, { useState } from "react";
import { Canvas, Camera, OrbitControl, Box } from "./gengien";

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

interface IState {
  color: string;
}
class App extends React.Component<any, IState, {}> {
  constructor(props: any) {
    super(props);
    this.state = {
      color: "red",
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        color: "blue",
      });
    }, 5000);
  }

  render() {
    const { color } = this.state;
    return (
      <div className={"exemple_app-wraper"}>
        <Canvas enableVR={false} debug={true}>
          <Camera>
            <OrbitControl />
          </Camera>
          <Box color={color} />
        </Canvas>
      </div>
    );
  }
}

export default App;
