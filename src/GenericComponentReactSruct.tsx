import React from "react";
import { Sphere, GenericGroupObject } from "./gengien";
import { urlTexture } from "./testTexture.js";

class GenericComponentReactSruct extends React.Component {
  constructor(props: any) {
    super(props);
  }
  render() {
    const texture = urlTexture;
    const color = "red";
    return (
      <GenericGroupObject>
        {/* <Sphere color={color} texture={texture} /> */}
      </GenericGroupObject>
    );
  }
}

export default GenericComponentReactSruct;
