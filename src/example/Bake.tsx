import React from "react";
import {GenericGroupObject, GLTF} from "../gengien";


class Bake extends React.Component<any, any>{
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
          url={"/models/bake/scene.gltf"}
          position={[0, 1, 0]}
        />
      </GenericGroupObject>
    )
  }
}
export default Bake