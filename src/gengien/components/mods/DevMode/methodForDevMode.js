import { v4 } from 'uuid'
/**
    * отменяет все выбранные элементы
    * @param state
    */
const allUnselected = (state) => {
  /**
   * рекурсивно проходит по стейту и ищет выбранный элемент отменяя его
   * @param node
   */
  let isFound = false;
  const searchIsSelected = (node) => {
    let cancel = node.map(el => {
      if (!isFound) {
        if (el.isSelect === true) {
          isFound = true;
          return (
            {
              ...el,
              isSelect: false
            }
          )
        } else {
          if (el.children && el.children.length) {
            let newItem = el
            let newChild = searchIsSelected(el.children)
            newItem.children = newChild
            return newItem
          }
          return el
        }
      }
      return el
    })
    return cancel
  }
  return searchIsSelected(state)
}

/**
  * Рекурсивно ищет элемент по id
  * @param id
  * @param changeProperty
  * @param state
  */
const searchElement = (id, changeProperty, state) => {
  let isFound = false
  const recurseChangeElementState = (node = []) => {
    let objState = node.map((item) => {
      if (!isFound) {
        if (item.id === id) {
          isFound = true;
          return {
            ...item,
            [changeProperty]: !item[changeProperty]
          }
        } else {
          let newItem
          if (item.children && item.children.length) {
            newItem = recurseChangeElementState(item.children)
          }
          if (newItem) {
            item.children = newItem
            return item
          }
          return item
        }
      } return item
    })
    return objState
  }
  let newState = recurseChangeElementState(state)
  return newState
}


/**
    * создание полей по типу поля
    * @param obj
    * @param property
    * @param idParent
    * @param type
    */

/**
* очищает материалы, геометрию и информацию об обьекте при изменении или отмены выбранного обьекта
* @param state
*/
const clearFolderWithField = (state) => {
  const { idObject, idMaterial, idGeometry, nodes } = state
  return nodes.map(item => {
    if (item.id === idObject || item.id === idMaterial || item.id === idGeometry) {
      return (
        {
          ...item,
          children: [],
        }
      )
    } else {
      return item
    }
  })
}
export {
  allUnselected,
  searchElement,
  clearFolderWithField
}