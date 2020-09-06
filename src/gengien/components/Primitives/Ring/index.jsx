import Ring from "./Ring";
/**
 * - Примитив Ring просто кубик)
 * @class Ring
 * @example
 * тут должен был быть jsx
 *
 * @param {innerRadius} innerRadius [innerRadius] - внутренний радиус
 * @param {outerRadius} outerRadius [outerRadius] - внешний радиус
 * @param {thetaSegments} thetaSegments [thetaSegments] - Количество сегментов. Более высокое число означает, что кольцо будет более круглым. Минимум 3. Значение по умолчанию - 8.
 * @param {phiSegments} phiSegments [phiSegments] - Минимум 1. По умолчанию - 1.
 * @param {thetaStart} thetaStart [thetaStart] - Начальный угол. По умолчанию 0.
 * @param {thetaLength} thetaLength [thetaLength] - Центральный угол. По умолчанию - Math.PI * 2.
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
export default Ring;
