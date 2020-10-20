import { CheckBox, NumberField, TextField, RangeFeild } from "./GenerateGUI/components/Components-fields";
import React from "react";

const helpRenderFiled = {
  x: (props) => <NumberField {...props} />,
  y: (props) => <NumberField {...props} />,
  z: (props) => <NumberField {...props} />,
  w: (props) => <NumberField {...props} />,
  zoom: (props) => <NumberField {...props} />,
  isvector3: (props) => <CheckBox {...props} />,
  name: (props) => <TextField {...props} />,
  uuid: (props) => <TextField {...props} />,
  id: (props) => <TextField {...props} />,
  type: (props) => <TextField {...props} />,
  lightMapIntensity: (props)=> <RangeFeild {...props}/>,
  opacity: (props) => <RangeFeild {...props}/>,
  type: (props) => <TextField {...props} />,
}
export {
  helpRenderFiled
}