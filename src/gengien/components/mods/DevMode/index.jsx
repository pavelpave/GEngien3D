import DevMode from './DevMode'
/**
 * 
 * - используется для сборки абстрактных свойств объектов получает доступ к абстрактным методам 
 * @example
 * class Camera extends AbstractObject {
 * render () {
 * <div className={"exemple_app-wraper"}>
        <Canvas
          getScene={!linkToSceneObject ? this.getLinkScene : null}
          enableShadows={true}
          enableVR={false}
          debug={false}
        >
          <Camera position={[0, 20, 0]}>
            <Raycaster />
            <OrbitControl />
            <Sky url={sky} />
            <DevMode />
          </Camera>
          <Line position={[15, 0, 0]} />
          <Box
            material={[
              new MeshBasicMaterial({
                color: "blue"
              }),
              new MeshBasicMaterial({
                color: "blue"
              }),
              new MeshBasicMaterial({
                color: "red"
              }),
              new MeshBasicMaterial({
                color: "blue"
              }),
              new MeshBasicMaterial({
                color: "red"
              }),
              new MeshBasicMaterial({
                color: "blue"
              }),
            ]}
            position={[5, 0, 0]}
          />
          <Cylinder radiusTop={1} radiusBottom={1} position={[10, 0, 10]} />
          <GenericComponentReactSruct />
          <DirectionalLight color={'#696969'} position={[1, 1, 1]} />
        </Canvas>
      </div>
    }
 * }
 * @param {nodes} [Camera] - папка камеры
 * @param {nodes} [Camera.name] - name
 * @param {nodes} [Camera.id] - id
 * @param {selectId} selectId - содержит id на выбранной папки(оъекта)
 * @param {idObjectScene} idObjectScene - содержит id на папку Объекты сцены(содержит объекты со сцены)
 * @param {idCamera} idCamera - содержит id на папку Камера(содержит поля для камеры)
 * @param {idGeometry} idGeometry - содержит id на папку Геометрия(содержит поля для геометрии выбранного Объекта)
 * @param {idObject} idObject - содержит id на папку Объекты (содержит информацию о выбранном Объекте)
 * @param {idMaterial} idMaterial - содержит id на папку Материалы (содержит поля для материалов выбранного Объекта)
 * @param {mouseDown} mouseDown - говорит о том зажата ли мышка над инпутом( true/false )
 * @param {idFolderForCamera} idPosition - содержит id на папку Позиция( содержит поля позиции камеры ) в папке Камера
 * @param {idFolderForCamera} idQuaternion - содержит id на папку Кватарнион( содержит поля кватарниона камеры ) в папке Камера
 * @param {idFolderForCamera} idRotation - содержит id на папку Поворот ( содержит поля поворота камеры ) в папке Камера
 * @param {idFolderForCamera} idScale - содержит id на папку Шкалы ( содержит поля шкалы камеры ) в папке Камера
 * @param {idFolderInfo} idPosition - содержит id на папку Позиция( содержит поля позиции камеры ) в папке Объект
 * @param {idFolderInfo} idQuaternion - содержит id на папку Кватарнион( содержит поля кватарниона камеры ) в папке Объект
 * @param {idFolderInfo} idRotation - содержит id на папку Поворот ( содержит поля поворота камеры ) в папке Объект
 * @param {idFolderInfo} idScale - содержит id на папку Шкалы ( содержит поля шкалы камеры ) в папке Объект
 * @param {deapthRecurse} deapthRecurse - глубина поиска элементов на сцене
 * @param {materials} materials - содержит материал выбранного объекта
 * @param {currentObject} currentObject - содержит ссылку на текущий выбранный объект
 * @param {cameraObj} cameraObj - содержит ссылку на камеру
 * @param {typeGeometry} typeGeometry - содержит тип геометрии выбранного объекта
 * @param {arrayMaterials} arrayMaterials - содержит массив материалов(если материал не один)
  */
export default DevMode