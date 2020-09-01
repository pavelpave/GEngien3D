import AbstractObject from "./AbstractObject";
/**
 * 
 * - используется для сборки абстрактных свойств объектов получает доступ к абстрактным методам 
 * @example
 * class Camera extends AbstractObject {
 *  ...
 * }
 * @class AbstractObject
 * @param {setTexture} setTexture - устанавливает текстуру на контекстный объект
 * @param {removeObject} removeObject - удалит контекстный объект со сцены
 * @param {getObject} getObject - получает текущий объект
 * @param {setColor} setColor - установит цвет на материалы контекстного объекта
 * @param {getPosition} getPosition - получает текущюю позицию объекта
 * @param {setRotation} setRotation - устанавливает {rotate} для объекта
 * @param {setPosition} setPosition - устанавливает {position} для объекта
 * @param {setScale} setScale - устанавливает {scale} для объекта
 * @param {setQuaternion} setQuaternion - устанавливает {quaternion} для объекта
 * @param {addToScene} addToScene - добавит контекстный объект на сцену
 * @param {initComponent} [options] - добавит контекстный объект в кол стек для дальнейшей работы с ним
 * @param {initComponent} [options.name = ""] - name
 * @param {initComponent} [options.uuid = ""] - uuid
 * @param {readyComponent} readyComponent - отправит в кол стек сообщение о том что контекстный элемент был добавлен на сцену
 * @param {readyComponent} readyComponent - отправит в кол стек сообщение о том что контекстный элемент был добавлен на сцену
 */
export default AbstractObject;
