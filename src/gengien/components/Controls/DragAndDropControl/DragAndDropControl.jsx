import { DragControls } from "./DragControls";
import { TransformControls } from "./TransformControls";
import AbstractObject from "../../AbstractObject";
import { addEventCustomListener, clearMemory } from "../../../utils";
import CONST from "../../../constants";
import { v4 } from "uuid";

class DragAndDropControl extends AbstractObject{
  // hiding: null | number | undefined;
  // contextElement: null;
  // transformControl: any;
  // dragcontrols: DragControls | undefined;
  // hideTransform!: () => void;
  // cancelHideTransform!: () => void;

  constructor(props) {
    super(props);
    this.state = {
      contextElement: null,
    }
  }
 
  // componentDidMount() {
  //   const {
  //     requiredPropertys,
  //     hideDelay,
  //     objects,
  //     isShowAxis,
  //     callbackDrag,
  //     callbackDragChange,
  //   } = this.props;

  //   const { scene, camera, renderer } = requiredPropertys;
  //   this.hiding = null;
  //   this.contextElement = null;
  //   /*
  //    Этот класс можно использовать для преобразования объектов в трехмерном
  //    пространстве путем адаптации аналогичной модели взаимодействия инструментов DCC,
  //    таких как Blender. В отличие от других элементов управления, он не предназначен
  //    для преобразования камеры сцены.
  //  */
  //   this.transformControl = new TransformControls(camera, renderer.domElement);
  //   this.transformControl.name =
  //     CONST.DATA_OBJECT_SCENE.TRANSFORM_CONTROLLER.name;
  //   // Настраиваю отображение осей
  //   this.transformControl.showY = isShowAxis.y;
  //   this.transformControl.showZ = isShowAxis.z;
  //   this.transformControl.showX = isShowAxis.x;
  //   this.transformControl.size = 1;
  //   this.transformControl.spase = "local";
  //   //собития тут как с обычным дом элементов можно отловить как клики так и мувы и т.д
  //   this.transformControl.addEventListener("mouseUp", (event: any) => {
  //     let basePositions = event.target.children[1].position;
  //     let newPositions = false;
  //     callbackDrag({
  //       onCollisions: newPositions ? true : newPositions,
  //       newPosition: basePositions,
  //       objectDrag: this.contextElement,
  //     });
  //     this.transformControl.removeEventListener("mouseUp");
  //   });
  //   scene.add(this.transformControl);

  //   /*
  //   Этот класс может использоваться для обеспечения взаимодействия drag'n'drop.
  //  */
  //   if (!objects.parent) {
  //     return console.log(
  //       "Компонент не может бюыть добавлен к объекту не состоящему в графе сцены"
  //     );
  //   }
  //   this.dragcontrols = new DragControls(objects, camera, renderer.domElement);
  //   this.dragcontrols.enabled = false;
  //   // this.dragcontrols.name = CONST.DATA_OBJECT_SCENE.DRAG_CONTROL.name;
  //   /*
  //     По наведению на элемент будет высвечиватся контролер его разположения по осям
  //  */
  //   // this.dragcontrols.addEventListener("hoveron", (event) => {
  //   //   this.contextElement = event.object;
  //   //   this.transformControl.attach(event.object, event);
  //   // });
  //   // this.dragcontrols.addEventListener("hoveroff", (event) => {
  //   //   this.delayHideTransform();
  //   // });
  //   // /*
  //   //   тут мы создаем тайм аут который вызовет метод который скроет стрелки направления осей
  //   //  */
  //   // this.hideTransform = () => {
  //   //   this.hiding = setTimeout(() => {
  //   //     if (this.transformControl) this.transformControl.detach();
  //   //     clearMemory(scene, this.dragcontrols, this.transformControl);
  //   //   }, hideDelay);
  //   // };
  //   /*
  //     тут мы очищяем тайм аут вызваный ранее
  //   */
  //   this.cancelHideTransform = () => {
  //     if (this.hiding) clearTimeout(this.hiding);
  //   };
  //   this.delayHideTransform = () => {
  //     this.cancelHideTransform();
  //     this.hideTransform();
  //   };
  // }
  // delayHideTransform() {
  //   throw new Error("Method not implemented.");
  // }
  render(){
    console.log('props', this.props)
    return(
      null
    )
  }
}

export default DragAndDropControl;
