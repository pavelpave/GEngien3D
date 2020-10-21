import {BufferGeometry, WireframeGeometry, BoxGeometry} from 'three'


const updateGroupGeometry = ( mesh, geometry ) => {

  if ( geometry.isGeometry ) {

    geometry = new BufferGeometry().fromGeometry( geometry );

    // console.warn( 'THREE.GeometryBrowser: Converted Geometry to BufferGeometry.' );

  }

  mesh.geometry.dispose();
  mesh.geometry.dispose();

  mesh.geometry = new WireframeGeometry( geometry );
  mesh.geometry = geometry;

  // these do not update nicely together if shared

}


const checkChangeField = ( mesh, data, name, value) => {
  
  const arrValue = [];

  for (let key in data) {
    if (key === name) {
      arrValue.push(value)
    } else {
      arrValue.push(data[key]) 
    }
  }
  updateGroupGeometry(mesh,
    new BoxGeometry(
      ...arrValue
    )
  );
}


const changeValueGeometry = (obj, data, name, value) => {

  checkChangeField(obj, data, name, value)



}


export {
  changeValueGeometry
}