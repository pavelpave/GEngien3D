import React from "react";
import {Sphere, GenericGroupObject, GLTF, Canvas} from "./gengien";
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
         <Sphere
           color={color}
           texture={texture}
           posirion={[20, 0, 20]}
         />
      </GenericGroupObject>
    );
  }
}

export default GenericComponentReactSruct;
