import Sphere from "./Sphere";
/**
 * - Примитив сфера
 * @class Sphere
 * @example
 * тут должен был быть jsx
 *
 * @param {radius} radius [radius = 10] - радиус сферы
 * @param {widthSegments} widthSegments [widthSegments = 10] - количество сегментов в ширь
 * @param {heightSegments} heightSegments [heightSegments = 10] - количество сегментов в высоту
 * @param {phiStart} phiStart [phiStart] - определеят начальную позицию в сфере укажите начальный горизонтальный угол
 * @param {phiLength} phiLength [phiLength = 6.3] - укажите размер угла развертки по горизонтали
 * @param {thetaStart} thetaStart [thetaStart] - укажите начальный вертикальный угол. По умолчанию 0.
 * @param {thetaLength} thetaLength [thetaLength] - укажите размер угла развертки по вертикали. По умолчанию - Math.PI.
 * @param {scale} scale [scale = [ 2, 2, 2 ]] - отвечает за размер бокса принимает до 6 параметров числовых первые 3 параметра это высота ширина и глубина остальные отвечают за вершины
 * @param {position} position [position = [ 0, 0, 0 ]] - отвечает за размер бокса принимает 3 числовых значения координаты (x,y,z)
 * @param {rotation} rotation [rotation = [ 0, 0, 0 ]] - отвечает за поворот бокса принимает 3 числовых значения под капотом будет использовать градусы (x,y,z)
 * @param {callbacks} callbacks [callbacks] - масив из события для данного объекта type: click, event: callback
 * @param {parent} parent [parent] - это объект который служит заменой сцене при инициализации этогшо объекта это будущий родитель этого объекта
 * @param {material} material [material] - объект с материлами (с авто обновлением)
 * @param {uuid} uuid [uuid] - Не рекомендуется к изменению
 * @param {customAttribute} customAttribute [customAttribute] - Создаст поле в объекте коробки в котором будут лежать пользовательские данные _customAttribute
 * @param {texture} texture [texture] - URL для текстуры ( под капотом будет использовать специальный текстур лоадер )
 * @param {name} name [name] - Не рекомендуется к изменению
 */
export default Sphere;
