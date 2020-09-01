import OrbitControl from "./OrbitControl";
/**
 * @extends AbstractObject
 * - отвечает за систему управления "орбитальную"
 * @example
 * function App() {
 *   return (
 *     <div className={"exemple_app-wraper"}>
 *       <Canvas enableVR={false} debug={true}>
 *         <Camera>
 *           <OrbitControl />
 *         </Camera>
 *       </Canvas>
 *     </div>
 *   );
 * }
 * 
 * export default App;
 * @example
 * class OrbitControl extends AbstractObject {
 *   constructor(props: IPropsOrbitControl) {
 *     super(props);
 *   }
 *
 *   componentDidMount() {
 *     const {
 *       requiredPropertys,
 *       minDistance = 3,
 *       maxDistance = 20,
 *       camera,
 *       name = CONST.DATA_OBJECT_SCENE.ORBIT_CONTROLS.name,
 *       uuid = v4(),
 *       type = "",
 *     } = this.props;
 *     const { canvasDomElement } = requiredPropertys;
 *     this.initComponent(name, uuid);
 *     this.obj = new ThreeOrbitControls(camera, canvasDomElement, type);
 *
 *     this.obj.rotateSpeed = 0.3;
 *     this.obj.zoomSpeed = 0.9;
 *
 *     this.obj.minDistance = minDistance;
 *     this.obj.maxDistance = maxDistance;
 *     this.name = name;
 *     this.uuid = uuid;
 *     this.readyComponent();
 *   }
 *
 *   resize = () => {
 *     const { fullscreen = true } = this.props;
 *     if (fullscreen) {
 *       this.obj.aspect = window.innerWidth / window.innerHeight;
 *       this.obj.updateProjectionMatrix();
 *     }
 *   };
 *   render() {
 *     return null;
 *   }
 * }
 *
 * export default OrbitControl;
 * @class OrbitControl
 * @param {minDistance} [minDistance = 3] - минимальная дистанция для отрисовки
 * @param {maxDistance} [maxDistance = 20] - максимальная дистанция для отрисовки
 * @param {name} name - не рекомендуется к изменению
 * @param {uuid} uuid - не рекомендуется к изменению
 */
export default OrbitControl;
