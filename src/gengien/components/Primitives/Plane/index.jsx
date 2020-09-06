import Plane from "./Plane";
/**
 * - Примитив PLANE плоскость
 * @class Plane
 * @example
 * тут должен был быть jsx
 *
 * @param {width} width [width = 10] - задает высоту для плоскости
 * @param {height} height [height = 10] - задает ширину для плоскости
 * @param {segments} segments [segments = 10] - задает количество сегментов (полигонов) для плоскости 
 * @param {doubleSide} doubleSide [doubleSide = false] - включает или отключает двухсторонний режим
 * @param {pivot} pivot [pivot = false] - если не передан то по дефолту тут фолс если хотите задать пивот то задайте этому параметру масив координат
 * @param {visiblePivot} visiblePivot [visiblePivot = false] - включает или отключает отображение "гвоздика"
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
export default Plane;
