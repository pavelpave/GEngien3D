import {
  BufferGeometry,
  WireframeGeometry,
  BoxGeometry,
  RingBufferGeometry,
  CylinderBufferGeometry,
  PlaneGeometry,
  SphereBufferGeometry
} from 'three'


const updateGroupGeometry = (mesh, geometry) => {
  let type = mesh.geometry.type
    switch (type) {
      case "BoxGeometry":
        geometry = new BoxGeometry(...geometry);
        break;
      case "RingBufferGeometry":
        geometry = new RingBufferGeometry(...geometry);
        break;
      case "CylinderBufferGeometry":
        geometry = new CylinderBufferGeometry(...geometry);
        break;
      case "PlaneGeometry":
        geometry = new PlaneGeometry(...geometry);
        break;
      case "SphereBufferGeometry":
        geometry = new SphereBufferGeometry(...geometry);
        break;
      default:
        console.log('f')
        break
    }
    // console.warn( 'THREE.GeometryBrowser: Converted Geometry to BufferGeometry.' );
    mesh.geometry = geometry;



  // mesh.geometry = new WireframeGeometry(geometry);


  // these do not update nicely together if shared

}


const checkChangeField = (mesh, data, name, value) => {

  const arrValue = [];

  for (let key in data) {
    if (key === name) {
      arrValue.push(value)
    } else {
      arrValue.push(data[key])
    }
  }
  updateGroupGeometry(mesh, arrValue);
}


const changeValueGeometry = (obj, data, name, value) => {

  checkChangeField(obj, data, name, value)



}


export {
  changeValueGeometry
}