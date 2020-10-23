import { NotEqualStencilFunc } from "three";

export default {
  nodes: [],
  selectId: null,
  idObjectScene: null,
  idCamera: null,
  idGeometry: null,
  idObject: null,
  idMaterial: null,
  mouseDown: false,
  idFolderForCamera: {
    idPosition: null,
    idQuaternion: null,
    idRotation: null,
    idScale: null,
  },
  idFolderInfo: {
    idPosition: null,
    idQuaternion: null,
    idRotation: null,
    idScale: null,
  },
  deapthRecurse: 5,
  materials: null,
  currentObject: null,
  cameraObj: null,
  typeGeometry: null,
  arrayMaterials: null,
}