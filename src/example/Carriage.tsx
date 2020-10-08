import React from "react";
import {GenericGroupObject, GLTF} from "../gengien";

class Carriage extends React.Component{
  constructor(props: any) {
    super(props);
  }

  render(){
    return(
      <GenericGroupObject>
        <GLTF
          callback={[
            {
              type: "click",
              event: (e: any) => {
                console.log(e);
              },
            },
          ]}
          url={"/models/mountain/scene.gltf"}
          position={[0, 1, 0]}
          rotation={[0, 0, 0]}
        />
      </GenericGroupObject>
    )
  }
}
export default Carriage