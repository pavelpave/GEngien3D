import React from "react";
import { Canvas, Camera } from "./gengien";
function App() {
  return (
    <div className={"exemple_app-wraper"}>
      <Canvas enableVR={false} debug={true}>
        <Camera>
          
        </Camera>
      </Canvas>
    </div>
  );
}

export default App;
