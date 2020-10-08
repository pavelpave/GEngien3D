import React from "react";
import {GenericGroupObject, GLTF} from "../gengien";

class SchoolRom extends React.Component{
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
          url={"/models/schoolRom/scene.gltf"}
          position={[100, -10, 100]}
          rotation={[90, 180, 90]}
        />
      </GenericGroupObject>
    )
  }
}
export default SchoolRom