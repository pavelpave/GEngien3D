import Canvas from "./Canvas";
/**
 * - Класс описывающий корневой компонент в котором создается канвас и инициализируется three js
 * @example
 * import React from "react";
 * import { Canvas, Camera, OrbitControl } from "./gengien";
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
 * @class Canvas
 *
 * @param {fullscreen} [fullscreen = false] - устанавливает полноэкранный мод
 * @param {enableShadows} [enableShadows = false] - включает тени
 * @param {enableVR} [enableVR = false] - включит или выключит VR  мод
 * @param {enableQuadCamera} [enableQuadCamera = null] - включит или выключит 4-х камерный мод
 * @param {quadData} [quadData = null] - данные для 4-х камерного мода описывающие камеры
 * @param {quadData} [quadData.leftUpCamera = { position:[], rotation: []}] 
 * @param {quadData} [quadData.rightUpCamera = { position:[], rotation: []}] 
 * @param {quadData} [quadData.leftLowerCamera = { position:[], rotation: []}] 
 * @param {quadData} [quadData.rightLowerCamera = { position:[], rotation: []}] 
 * @param {debug} debug - для режима разработки позволяет управлять сценой и её объектами
 * @param {gammaFactor} gammaFactor - ваще хз =)
 */
export default Canvas;
