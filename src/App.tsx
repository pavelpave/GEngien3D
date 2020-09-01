import React from "react";
import { Canvas, Camera, OrbitControl } from "./gengien";

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
function App() {
  return (
    <div className={"exemple_app-wraper"}>
      <Canvas enableVR={false} debug={true}>
        <Camera>
          <OrbitControl />
        </Camera>
      </Canvas>
    </div>
  );
}

export default App;
