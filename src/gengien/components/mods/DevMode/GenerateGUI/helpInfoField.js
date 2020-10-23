
import React from 'react'
import {
  CheckBox,
  RangeField,
  NumberField,
  TextField,
  ColorPicker,
  FileField,
  SelectField,
} from './components/Components-fields'

const HELP_TYPE_RANGE = {
  aoMapIntensity: 'aoMapIntensity',
  blending: 'blending',
  combine: 'combine',
  lightMapIntensity: 'lightMapIntensity',
  opacity: 'opacity',
  reflectivity: 'reflectivity',
  refractionRatio: 'refractionRatio',
}

const HELP_INFO_FIELD_FOR_CAMERA = {
  name: "CAMERA",
  uuid: "c76618c4-7f8a-4494-9dfb-6c1c6205022c",
  position: {
    x: 'posX',
    y: 'posY',
    z: 'posZ'
  },
  quaternion: {
    _w: 'quatW',
    _x: 'quatX',
    _y: 'quatY',
    _z: 'quatZ',
  },
  rotation: {
    _x: 'rotX',
    _y: 'rotY',
    _z: 'rotZ',
  },
  scale: {
    x: 'sclX',
    y: 'sclY',
    z: 'sclZ',
  },
  type: "PerspectiveCamera",
}

const HELP_FUELDER_FOR_GEOMETRY = {
  RingBufferGeometry: {
    innerRadius: 5,
    outerRadius: 10,
    thetaSegments: 30,
    phiSegments: 1,
    thetaStart: 6,
    thetaLength: 6.3,
  },
  BoxGeometry: {
    width: 15,
    height: 15,
    depth: 15,
    widthSegments: 1,
    heightSegments: 1,
    depthSegments: 1,
  },
  CylinderBufferGeometry: {
    radiusTop: 5,
    radiusBottom: 5,
    height: 10,
    radialSegments: 8,
    heightSegments: 1,
    openEnded: false,
    thetaStart: 0,
    thetaLength: 6.3,
  },
  PlaneGeometry: {
    width: 10,
    height: 10,
    widthSegments: 1,
    heightSegments: 1,
  },
  SphereBufferGeometry: {
    radius: 15,
    widthSegments: 8,
    heightSegments: 6,
    phiStart: 0,
    phiLength: 6.3,
    thetaStart: 0,
    thetaLength: 3.1,
  },
}

const HELP_CHANGE_INFO_FIELD = {
  'posX': (currentObject, value) => currentObject.position.setX(value),
  'posY': (currentObject, value) => currentObject.position.setY(value),
  'posZ': (currentObject, value) => currentObject.position.setZ(value),
  'quatW': (currentObject, value) => currentObject.quaternion.set(currentObject.quaternion.x, currentObject.quaternion.y, currentObject.quaternion.z, value,),
  'quatX': (currentObject, value) => currentObject.quaternion.set(value, currentObject.quaternion.y, currentObject.quaternion.z, currentObject.quaternion.w,),
  'quatY': (currentObject, value) => currentObject.quaternion.set(currentObject.quaternion.z, value, currentObject.quaternion.z, currentObject.quaternion.w,),
  'quatZ': (currentObject, value) => currentObject.quaternion.set(currentObject.quaternion.x, currentObject.quaternion.y, value, currentObject.quaternion.w,),
  'rotX': (currentObject, value) => currentObject.rotation.set(value, currentObject.rotation.y, currentObject.rotation.z),
  'rotY': (currentObject, value) => currentObject.rotation.set(currentObject.rotation.x, value, currentObject.rotation.z),
  'rotZ': (currentObject, value) => currentObject.rotation.set(currentObject.rotation.x, currentObject.rotation.y, value),
  'sclX': (currentObject, value) => currentObject.scale.setX(value),
  'sclY': (currentObject, value) => currentObject.scale.setY(value),
  'sclZ': (currentObject, value) => currentObject.scale.setZ(value),
}

const HELP_CHANGE_CAMERA_FIELD = {
  'posX': (cameraObj, value) => cameraObj.position.setX(value),
  'posY': (cameraObj, value) => cameraObj.position.setY(value),
  'posZ': (cameraObj, value) => cameraObj.position.setZ(value),
  'quatW': (cameraObj, value) => cameraObj.quaternion.set(cameraObj.quaternion.x, cameraObj.quaternion.y, cameraObj.quaternion.z, value,),
  'quatX': (cameraObj, value) => cameraObj.quaternion.set(value, cameraObj.quaternion.y, cameraObj.quaternion.z, cameraObj.quaternion.w,),
  'quatY': (cameraObj, value) => cameraObj.quaternion.set(cameraObj.quaternion.z, value, cameraObj.quaternion.z, cameraObj.quaternion.w,),
  'quatZ': (cameraObj, value) => cameraObj.quaternion.set(cameraObj.quaternion.x, cameraObj.quaternion.y, value, cameraObj.quaternion.w,),
  'rotX': (cameraObj, value) => cameraObj.rotation.set(value, cameraObj.rotation.y, cameraObj.rotation.z),
  'rotY': (cameraObj, value) => cameraObj.rotation.set(cameraObj.rotation.x, value, cameraObj.rotation.z),
  'rotZ': (cameraObj, value) => cameraObj.rotation.set(cameraObj.rotation.x, cameraObj.rotation.y, value),
  'sclX': (cameraObj, value) => cameraObj.scale.setX(value),
  'sclY': (cameraObj, value) => cameraObj.scale.setY(value),
  'sclZ': (cameraObj, value) => cameraObj.scale.setZ(value),
}

const HELP_RENDER_FIELD = {
  'boolean': (props) => <CheckBox {...props} />,
  'file': (props) => <FileField {...props} />,
  'number': (props) => <NumberField {...props} />,
  'string': (props) => <TextField {...props} />,
  'button': (props) => <ColorPicker {...props} />,
  'range': (props) => <RangeField {...props} />,
  'select': (props) => <SelectField {...props} />
}


export {
  HELP_INFO_FIELD_FOR_CAMERA,
  HELP_TYPE_RANGE,
  HELP_FUELDER_FOR_GEOMETRY,
  HELP_CHANGE_INFO_FIELD,
  HELP_CHANGE_CAMERA_FIELD,
  HELP_RENDER_FIELD
}