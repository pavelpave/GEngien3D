import React from "react";
import { Canvas, Camera, OrbitControl } from "./gengien";
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
