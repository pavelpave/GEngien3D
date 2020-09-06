import Line from "./Line";
/**
 * - Примитив Line линия котороя строится исходя из заданных вершин
 * @class Line
 * @example
 * тут должен был быть jsx
 *
 * @param {numPoints} numPoints [numPoints = 1000] - количество поинтов на линии
 * @param {vertices} vertices [vertices = [vector]] - набор вершин по которым будет строится линия
 * @param {position} position [position = [ 0, 0, 0 ]] - отвечает за размер бокса принимает 3 числовых значения координаты (x,y,z)
 * @param {rotation} rotation [rotation = [ 0, 0, 0 ]] - отвечает за поворот бокса принимает 3 числовых значения под капотом будет использовать градусы (x,y,z)
 * @param {callbacks} callbacks [callbacks] - масив из события для данного объекта type: click, event: callback
 * @param {parent} parent [parent] - это объект который служит заменой сцене при инициализации этогшо объекта это будущий родитель этого объекта
 * @param {uuid} uuid [uuid] - Не рекомендуется к изменению
 * @param {customAttribute} customAttribute [customAttribute] - Создаст поле в объекте коробки в котором будут лежать пользовательские данные _customAttribute
 * @param {texture} texture [texture] - URL для текстуры ( под капотом будет использовать специальный текстур лоадер )
 * @param {name} name [name] - Не рекомендуется к изменению
 */
export default Line;
