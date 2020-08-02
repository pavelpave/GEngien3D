import React from "react";
import { Canvas } from "./gengien";
function App() {
  return (
    <div className={"exemple_app-wraper"}>
      <Canvas enableVR={false} debug={true}>
        
      </Canvas>
    </div>
  );
}

export default App;
