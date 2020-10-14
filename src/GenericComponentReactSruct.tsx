import React from "react";
import { Box, GenericGroupObject } from "./gengien";
import { urlTexture } from "./testTexture.js";

class GenericComponentReactSruct extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const texture = urlTexture;
    const color = "red";
    return (
      <GenericGroupObject
        callbacks={[
          {
            type: "click",
            event: (e: any) => {
              console.log("e", e);
            }
          }
        ]}
        position={[0, 0, 0]}
        scale={[10, 10, 10]}
      >
        <Box
          callbacks={[
            {
              type: "click",
              event: (e: any) => {
                console.log("e", e);
              }
            }
          ]}
          scale={[2, 2, 15]}
          color={"red"}
        />
      </GenericGroupObject>
    );
  }
}

export default GenericComponentReactSruct;
