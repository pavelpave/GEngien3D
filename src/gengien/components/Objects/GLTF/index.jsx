import GLTF from "./GLTF";
/**
 * - Примитив GLTF просто цилиндр
 * @class GLTF
 * @example
 * тут должен был быть jsx
 *
 * @param {url} url - обязательный параметр это ссылка на модельку "model.gltf"
 * @param {animation} animation - объект описывающий анимацию
 * @param {animation} [animation.clipName = ""] - название анимации (можно узнать его с помощью плагина для vscode "GLTF") ссылка в конце
 * @param {visible} visible - отображение модельки
 * @param {pivot} pivot - гвоздик для управления перемещением или вращением
 * @param {visiblePivot} visiblePivot  - включит отображение точки
 * @param {scale} scale  - отвечает за размер бокса принимает до 6 параметров числовых первые 3 параметра это высота ширина и глубина остальные отвечают за вершины
 * @param {position} position  - отвечает за размер бокса принимает 3 числовых значения координаты (x,y,z)
 * @param {rotation} rotation  - отвечает за поворот бокса принимает 3 числовых значения под капотом будет использовать градусы (x,y,z)
 * @param {callbacks} callbacks  - масив из события для данного объекта type: click, event: callback
 * @param {parent} parent  - это объект который служит заменой сцене при инициализации этогшо объекта это будущий родитель этого объекта
 * @param {material} material  - объект с материлами (с авто обновлением)
 * @param {uuid} uuid  - Не рекомендуется к изменению
 * @param {customAttribute} customAttribute  - Создаст поле в объекте коробки в котором будут лежать пользовательские данные _customAttribute
 * @param {name} name  - Не рекомендуется к изменению
 *
 * @see https://github.com/AnalyticalGraphicsInc/gltf-vscode
 */
export default GLTF;
