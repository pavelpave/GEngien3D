import React from "react";
import {GenericGroupObject, GLTF} from "../gengien";
import {urlTexture} from "../testTexture";

class Book extends React.Component{
  constructor(props: any) {
    super(props);
    this.state={
      animation: { clipName: "Take 001" },
    }
  }

  render(){
    const { animation }: any = this.state
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
          url={"/models/book/scene.gltf"}
          animation={animation}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
        />
      </GenericGroupObject>
    )
  }
}
export default Book