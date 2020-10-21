
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




export {
  HELP_INFO_FIELD_FOR_CAMERA,
  HELP_TYPE_RANGE,
  HELP_FUELDER_FOR_GEOMETRY,
}