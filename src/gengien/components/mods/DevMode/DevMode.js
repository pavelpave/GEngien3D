import React from "react";
import { AbstractObject } from "../../../index";
import GUI from './GenerateGUI'
import CONST from '../../../constants'
import { v4 } from 'uuid'
import {
  HELP_FUELDER_FOR_GEOMETRY,
  HELP_INFO_FIELD_FOR_CAMERA,
  HELP_MATERIAL_FIELD_OF_TYPE,
  HELP_TYPE_RANGE,
} from './GenerateGUI/helpInfoField'
import { changeValueGeometry } from './changeMethodGeometry';

class DevMode extends AbstractObject {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
      selectId: null,
      idObjectScene: null,
      idCamera: null,
      idGeometry: null,
      idObject: null,
      idMaterial: null,
      mouseDown: false,
      idFolderForCamera: {
        idPosition: null,
        idQuaternion: null,
        idRotation: null,
      },
      idFolderInfo: {
        idPosition: null,
        idQuaternion: null,
        idRotation: null,
      },
      deapthRecurse: 5,
      materials: null,
      currentObject: null,
      cameraObj: null,
      typeGeometry: null,
    }
  }

  /**
     * вытаскивает поля из обьекта
     * @param obj
     * @param property
     * @param idParent
     */
  parseObjectForField = (obj, property, idParent) => {
    const { nodes } = this.state
    for (let key in obj[property]) {
      if (obj[property].hasOwnProperty(key)) {
        if (property === null) {
          this.addField({
            name: key,
            value: 'null',
            readOnly: true,
            id: v4(),
            typeField: 'string',
            type: 'field',
          }, idParent, nodes)
        } else {
          this.addFieldBySwitchType(obj[property], key, idParent, typeof obj[property][key])
        }
      }
    }
  }

  /**
     * получает геометрию и материалы
     * @param uuid
     */
  getMaterialAndGeometry = (uuid) =>{
    const { requiredPropertys } = this.props
    let obj = requiredPropertys.scene.getObjectByProperty("uuid", uuid);
    obj && obj.material && obj.geometry &&
      this.setState({
        materials: obj.material,
        typeGeometry:  obj.geometry.type
      })
    this.sceneObjectToDevPanel(this.state.selectId)
  }

  /**
    *  изменение глубины поиска обьектов со сцены
    * @param value
    */
  changeRecurseDeapth = (value) => {
    this.setState({
      deapthRecurse: value
    })
  }

  //! добавление/создание папок и полей

  /**
    * добавляет папку в стейт к выбранному родителю
    * @param params
    * @param idParent
    * @param state
    */
  addFolder = (params = {}, idParent = null, state) => {
    let newId = idParent ? idParent : v4()
    let newState = state
    /**
   * рекурсивный поиск родителя по стейту
   * @param node
   */
    const recurseCheckParent = (node) => {
      if (node && node.length && idParent) {
        let newFolder = node.map((item) => {
          if (item.id === idParent) {
            if ((!params.name && !params.name.length) || (!item.name && !item.name.length)) {
              item.name = 'no name'
            }
            item.children.push({
              ...params
            })
            return newId = params.id
          } else {
            if (item.children && item.children.length) {
              recurseCheckParent(item.children)
            }
            return item
          }
        })
        return newFolder
      } else {
        node.push({
          name: params.name,
          id: newId,
          isOpen: params.isOpen,
          isSelect: params.isSelect,
          children: params.children,
          type: 'folder'
        })
      }
    }
    recurseCheckParent(newState)
    this.setState({
      nodes: newState,
    })
    return newId
  }

  /**
    * добавляет поле в стейт к выбранному родителю
    * @param params
    * @param idParent
    * @param state
    */
  addField = (params = {}, idParent = null, state) => {
    let newState = state
    const { name, ...props } = params
    /**
   * рекурсивный поиск родителя по стейту 
   * @param node
   */
    const recurseCheckParent = (node) => {
      node.map((item) => {
        if (item.id === idParent) {
          item.children.push({
            name: name,
            ...props
          })
        } else {
          if (item.children && item.children.length) {
            recurseCheckParent(item.children)
          }
          return item
        }
      })
    }
    recurseCheckParent(newState)
    this.setState({
      nodes: newState,
    })
  }

  /**
    * создание полей по типу поля
    * @param obj
    * @param property
    * @param idParent
    * @param type
    */
  addFieldBySwitchType = (obj, property, idParent, type) => {
    const { nodes } = this.state
    switch (type) {
      case 'boolean': this.addField({
        name: property,
        id: v4(),
        readOnly: false,
        type: 'field',
        change: this.changeValueInputInState,
        typeField: 'boolean',
        value: obj[property],
      }, idParent, nodes)
        break;
      case 'range': this.addField({
        name: property,
        id: v4(),
        readOnly: false,
        type: 'field',
        change: this.changeValueInputInState,
        typeField: 'range',
        value: obj[property],
      }, idParent, nodes)
        break;
      case 'number': this.addField({
        name: property,
        id: v4(),
        readOnly: false,
        type: 'field',
        down: this.changeValueInput,
        change: this.changeValueInputInState,
        typeField: 'number',
        value: obj[property],
      }, idParent, nodes)
        break;

      case 'string': this.addField({
        name: property,
        id: v4(),
        readOnly: false,
        type: 'field',
        change: this.changeValueInputInState,
        typeField: 'string',
        value: obj[property],
      }, idParent, nodes)
        break

      case 'button': this.addField({
        name: property,
        value: '#fff',
        readOnly: false,
        id: v4(),
        change: this.changeValueInputInState,
        typeField: 'button',
        type: 'field',
      }, idParent, nodes)
        break;
      case 'object':
        this.parseObjectForField(obj, property, idParent)
        break
      default:
        return
    }
  }

  /**
       * создает папки объектов со сцены
       * @param scene
       */
  createObjectSceneFolder = (scene) => {
    let counterDeapth = 0;
    /**
     * рекурсивно проходит по сцене до указанной глубины
     * @param scene
     * @param parentId
     */
    const recurseCheckScene = (scene, parentId) => {
      if (!Array.isArray(scene)) {
        this.addFolder({
          name: scene.name,
          id: scene.uuid,
          isOpen: false,
          isSelect: false,
          type: 'folder',
          selectObj: () => this.selectObject(scene.uuid),
          children: [],
        }, parentId, this.state.nodes)
        if (scene.children && scene.children.length) {
          recurseCheckScene(scene.children, scene.uuid)
        }
      } else {
        if (counterDeapth < this.state.deapthRecurse) {
          scene.forEach(item => {
            this.addFolder({
              name: item.name,
              id: item.uuid,
              isOpen: false,
              isSelect: false,
              type: 'folder',
              selectObj: () => this.selectObject(item.uuid),
              children: [],
            }, parentId, this.state.nodes)
            if (item.children && item.children.length) {
              counterDeapth = counterDeapth + 1;
              recurseCheckScene(item.children, item.uuid)
            }
          })
        } else {
          counterDeapth = 0;
          return false
        }
      }
    }
    recurseCheckScene(scene, this.state.idObjectScene)
  }

  //! Камера

  /**
    * создание папок и полей камеры
    * 
    */
  createCameraFolder = () => {
    const { idCamera, nodes } = this.state;
    const { requiredPropertys } = this.props;
    const obj = requiredPropertys.scene.getObjectByProperty("name", CONST.DATA_OBJECT_SCENE.MAIN_CAMERA.name);
    const createFieldForCamera = (obj, property, idParent) => {
      for (let key in obj) {
        if (HELP_INFO_FIELD_FOR_CAMERA[property][key]) {
          this.addField({
            name: HELP_INFO_FIELD_FOR_CAMERA[property][key],
            value: obj[key],
            readOnly: false,
            id: v4(),
            change: this.changeValueInputInState,
            down: this.changeValueInput,
            typeField: typeof obj[key],
            type: 'field',
          }, idParent, nodes)
        }
      }
    }
    const fieldForCamera = (objCamera) => {
      for (let key in objCamera) {
        if (HELP_INFO_FIELD_FOR_CAMERA[key]) {
          if (typeof objCamera[key] === 'object') {
            switch (key) {
              case 'position':
                createFieldForCamera(objCamera[key], key, idPosition)
                break;
              case 'quaternion':
                createFieldForCamera(objCamera[key], key, idQuaternion)
                break
              case 'rotation':
                createFieldForCamera(objCamera[key], key, idRotation)
                break
            }
          } else {
            this.addFieldBySwitchType(objCamera, key, idCamera, typeof objCamera[key])
          }
        }
      }
    }

    const idPosition = this.addFolder(
      {
        name: 'Позиция',
        id: v4(),
        type: 'folder',
        isOpen: false,
        selectObj: () => { },
        isSelect: false,
        children: [],
      },
      this.state.idCamera,
      this.state.nodes)
    const idQuaternion = this.addFolder(
      {
        name: 'Кватернион',
        id: v4(),
        type: 'folder',
        isOpen: false,
        isSelect: false,
        selectObj: () => { },
        children: []
      },
      this.state.idCamera,
      this.state.nodes)
    const idRotation = this.addFolder(
      {
        name: 'Вращение',
        id: v4(),
        type: 'folder',
        isOpen: false,
        isSelect: false,
        selectObj: () => { },
        children: []
      },
      this.state.idCamera,
      this.state.nodes)

    this.setState({
      idFolderForCamera: {
        idPosition: idPosition,
        idQuaternion: idQuaternion,
        idRotation: idRotation,
      },
      cameraObj: obj
    }, () => {
      fieldForCamera(obj)
    })

  }

  /**
    * изменение полей камеры
    * @param name
    * @param value
    */
  changeCamera = (name, value) => {
    let { cameraObj } = this.state
    switch (name) {
      case 'posX':
        cameraObj.position.setX(value)
        break;
      case 'posY':
        cameraObj.position.setY(value)
        break;
      case 'posZ':
        cameraObj.position.setZ(value)
        break;
      case 'quatW':
        cameraObj.quaternion.set(cameraObj.quaternion.x, cameraObj.quaternion.y, cameraObj.quaternion.z, value,)
        break;
      case 'quatX':
        cameraObj.quaternion.set(value, cameraObj.quaternion.y, cameraObj.quaternion.z, cameraObj.quaternion.w,)
        break;
      case 'quatY':
        cameraObj.quaternion.set(cameraObj.quaternion.z, value, cameraObj.quaternion.z, cameraObj.quaternion.w,)
        break;
      case 'quatZ':
        cameraObj.quaternion.set(cameraObj.quaternion.x, cameraObj.quaternion.y, value, cameraObj.quaternion.w,)
        break;
      case 'rotX':
        cameraObj.rotation.set([value, cameraObj.rotation.y, cameraObj.rotation.z])
        break;
      case 'rotY':
        cameraObj.rotation.set([cameraObj.rotation.x, value, cameraObj.rotation.z])
        break;
      case 'rotZ':
        cameraObj.rotation.set([cameraObj.rotation.x, cameraObj.rotation.y, value])
        break;
    }
  }

  //! информация о выбранном обьекте
  /**
     * изменение полей информации об объекте
     * @param name
     * @param value
     */
  changeInfoObject = (name, value) => {
    let { currentObject } = this.state
    switch (name) {
      case 'posX':
        currentObject.position.setX(value)
        break;
      case 'posY':
        currentObject.position.setY(value)
        break;
      case 'posZ':
        currentObject.position.setZ(value)
        break;
      case 'quatW':
        currentObject.quaternion.set(currentObject.quaternion.x, currentObject.quaternion.y, currentObject.quaternion.z, value,)
        break;
      case 'quatX':
        currentObject.quaternion.set(value, currentObject.quaternion.y, currentObject.quaternion.z, currentObject.quaternion.w,)
        break;
      case 'quatY':
        currentObject.quaternion.set(currentObject.quaternion.z, value, currentObject.quaternion.z, currentObject.quaternion.w,)
        break;
      case 'quatZ':
        currentObject.quaternion.set(currentObject.quaternion.x, currentObject.quaternion.y, value, currentObject.quaternion.w,)
        break;
      case 'rotX':
        currentObject.rotation.set(value, currentObject.rotation.y, currentObject.rotation.z)
        break;
      case 'rotY':
        currentObject.rotation.set(currentObject.rotation.x, value, currentObject.rotation.z)
        break;
      case 'rotZ':
        currentObject.rotation.set(currentObject.rotation.x, currentObject.rotation.y, value)
        break;
    }
  }

  /**
       * создает поля и папки информации выбранного обьекта
       * @param selectObj
       */
  infoElement = (selectObj) => {
    const { idObject, nodes } = this.state
    /**
     * создание полей для папок в информации об объекте
     * @param obj
     * @param property
     * @param idParent
     */
    const createFieldForInfo = (obj, property, idParent) => {
      for (let key in obj) {
        if (HELP_INFO_FIELD_FOR_CAMERA[property][key]) {
          this.addField({
            name: HELP_INFO_FIELD_FOR_CAMERA[property][key],
            value: obj[key],
            readOnly: false,
            id: v4(),
            change: this.changeValueInputInState,
            down: this.changeValueInput,
            typeField: typeof obj[key],
            type: 'field',
          }, idParent, nodes)
        }
      }
    }
    /**
     * проверяет на наличие обьектов
     *
     */
    const checkObject = () => {
      for (let key in selectObj) {
        if (selectObj.hasOwnProperty(key)) {
          if (HELP_INFO_FIELD_FOR_CAMERA[key]) {
            if (typeof selectObj[key] === 'object') {
              switch (key) {
                case 'position':
                  createFieldForInfo(selectObj[key], key, idPosition)
                  break;
                case 'quaternion':
                  createFieldForInfo(selectObj[key], key, idQuaternion)
                  break
                case 'rotation':
                  createFieldForInfo(selectObj[key], key, idRotation)
                  break
              }
            } else {
              this.addFieldBySwitchType(selectObj, key, idObject, typeof selectObj[key])
            }
          }
        }
      }
    }
    const idPosition = this.addFolder({
      name: 'Позиция',
      id: v4(),
      type: 'folder',
      isOpen: false,
      selectObj: () => { },
      isSelect: false,
      children: [],
    },
      idObject,
      nodes)
    const idQuaternion = this.addFolder({
      name: 'Кватернион',
      id: v4(),
      type: 'folder',
      isOpen: false,
      selectObj: () => { },
      isSelect: false,
      children: [],
    },
      idObject,
      nodes)
    const idRotation = this.addFolder({
      name: 'Вращение',
      id: v4(),
      type: 'folder',
      isOpen: false,
      selectObj: () => { },
      isSelect: false,
      children: [],
    },
      idObject,
      nodes)

    this.setState({
      idFolderInfo: {
        idPosition: idPosition,
        idQuaternion: idQuaternion,
        idRotation: idRotation,
      }
    }, () => checkObject())
  }

  /**
    * очищает материалы, геометрию и информацию об обьекте при изменении или отмены выбранного обьекта
    * 
    */
  clearFolderWithField = () => {
    const { idObject, idMaterial, idGeometry, nodes } = this.state
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

  /**
    *  Получает и отменяет выбранный обьект
    * @param uuid
    */
  sceneObjectToDevPanel = (uuid) => {
    const { selectId } = this.state
    const { requiredPropertys } = this.props
    let obj = requiredPropertys.scene.getObjectByProperty("uuid", uuid);
    if (selectId === null) {
      this.setState({
        nodes: this.clearFolderWithField(),
        currentObject: null,
      })
    } else {
      this.setState({
        nodes: this.clearFolderWithField(),
        currentObject: obj,
      }, () => {
        this.infoElement(obj)
        this.materialElement(obj)
        this.geometryElement(obj)
      })
    }
  }

  //! изменение занчений полей
  /**
     * изменение полей
     * @param newValue
     * @param id
     */
  changeValueInputInState = (newValue, id) => {
    const { idGeometry, idMaterial, idCamera, idObject, nodes } = this.state
    let parent = null;
    let nameField = null;
    let valueField = newValue;
    let isChecked = false;
    /**
    * Определение родителя верхнего уровня выбранного обьекта
    * @param el
    */
    const setParent = (el) => {
      const { idMaterial, idCamera, idGeometry, idObject } = this.state
      switch (el.id) {
        case idMaterial:
          parent = el
          break;
        case idCamera:
          parent = el
          break
        case idGeometry:
          parent = el
          break
        case idObject:
          parent = el
          break
      }
    }
    /**
    * ищем поле у когорого нужно поменять значение
    * @param node
    */
    const searchIdField = (node) => {
      let newSelected = node.map(el => {
        if (el.id === id) {
          isChecked = true
          nameField = el.name
          return (
            {
              ...el,
              value: newValue
            }
          )
        } else {
          if (el.children && el.children.length) {
            if (!isChecked) {
              setParent(el)
            }
            let newItem = el
            let newChild = searchIdField(el.children)
            newItem.children = newChild
            return newItem
          }
          return el
        }
      })
      return newSelected
    }
    const newValueInput = searchIdField(nodes)
    this.setState({
      nodes: newValueInput
    }, () => {
      switch (parent.id) {
        case idObject:
          this.changeInfoObject(nameField, valueField)
          break;

        case idMaterial:
          this.changeMaterialContextObject(nameField, valueField)
          break

        case idGeometry:
          this.changeGeometryContextObject(nameField, valueField)
          break

        case idCamera:
          this.changeCamera(nameField, valueField)
          break
      }

    })
  }

  /**
     * изменение значения поля тип number зажатием ПКМ и перемещением мышки
     * @param e
     * @param id
     */
  changeValueInput = (e, id) => {
    e.persist()
    let valueInputTarget = e.currentTarget.value
    let positionElementTarget = e.currentTarget.getBoundingClientRect().top;
    const speedChangeValue = 0.1
    /**
    * очищает слушатели
    * 
    */
    const cancelChangeValue = () => {
      this.setState({ mouseDown: false }, () => {
        window.removeEventListener("mousemove", (e) => changeValue(e, positionElementTarget, valueInputTarget))
        window.removeEventListener("mouseup", cancelChangeValue)

      })
    }
    /**
    * Проверяет и увеличивает/уменьшает значение
    * @param e
    * @param positionElement
    */
    const changeValue = (e, positionElement) => {
      if (this.state.mouseDown && positionElement > e.clientY && document.activeElement.id === id) {
        valueInputTarget = +valueInputTarget + speedChangeValue
        positionElementTarget = e.clientY
        this.changeValueInputInState(valueInputTarget, id)
      } else if (this.state.mouseDown && positionElement < e.clientY && document.activeElement.id === id) {
        valueInputTarget = +valueInputTarget - speedChangeValue
        positionElementTarget = e.clientY
        this.changeValueInputInState(valueInputTarget, id)
      }
    }
    this.setState({ mouseDown: true })
    window.addEventListener('mouseup', cancelChangeValue)
    window.addEventListener('mousemove', (e) => changeValue(e, positionElementTarget, valueInputTarget))
  }

  //! выбор, открытие, закрытие папок 

  /**
     * отменяет все выбранные элементы
     *
     */
  allUnselected = () => {
    /**
     * рекурсивно проходит по стейту и ищет выбранный элемент отменяя его
     * @param node
     */
    const searchIsSelected = (node) => {
      let cancel = node.map(el => {
        if (el.type === 'folder') {
          if (el.isSelect === true) {
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
        } else return el
      })
      return cancel
    }
    return searchIsSelected(this.state.nodes)
  }

  /**
       * открывает папки
       * @param id
       */
  toggleDropDown = (id) => {
    /**
     * рекурсивно ищет папку которую нужно открыть
     * @param node
     */
    const recurseSearchIsOpen = (node = []) => {
      let newFolder = node.map((item) => {
        if (item.id === id) {
          let newitem = {
            ...item,
            isOpen: !item.isOpen,
          }
          return item = newitem
        } else {
          let newItem
          if (item.children && item.children.length) {
            newItem = recurseSearchIsOpen(item.children)
          }
          if (newItem) {
            item.children = newItem
            return item
          }
          return item
        }
      })
      return newFolder
    }
    let newFolder = recurseSearchIsOpen(this.state.nodes)
    this.setState({
      nodes: newFolder
    })
  }

  /**
     * выделяет обьект
     * @param id
     */
  selectObject = (id) => {
    /**
     * рекурсивно ищет объект который нужно выделить
     * @param node
     */
    const getSelected = (node) => {
      let newSelected = node.map(el => {
        if (el.id === id) {
          return (
            {
              ...el,
              isSelect: !el.isSelect
            }
          )
        } else {
          if (el.children && el.children.length) {
            let newItem = el
            let newChild = getSelected(el.children)
            newItem.children = newChild
            return newItem
          }
          return el
        }
      })
      return newSelected
    }
    let result = getSelected(this.allUnselected(id))
    id !== this.state.selectId
      ?
      this.setState({
        nodes: result,
        selectId: id
      })
      :
      this.setState({
        nodes: getSelected(this.state.nodes),
        selectId: null
      })
  }


  //!Материалы

  /**
    * получает материалы выбранного обьекты
    * @param uuid
    */
  getMaterials = (uuid) => {
    const { requiredPropertys } = this.props
    let obj = requiredPropertys.scene.getObjectByProperty("uuid", uuid);
    obj &&
      this.setState({
        materials: obj.material
      })
    this.sceneObjectToDevPanel(this.state.selectId)
  }

  /**
     * проверка полей по объекту материалов
     * @param selectObj
     */
  materialElement = (selectObj) => {
    const { material } = selectObj;
    const { idMaterial, nodes } = this.state;
    for (let key in material) {
      if (material.hasOwnProperty(key)) {
        if (this.state.materials) {
          if (key === 'color') {
            this.addField({
              name: key,
              value: '#fff',
              id: v4(),
              change: this.changeValueInputInState,
              typeField: 'button',
              type: 'field',
            }, idMaterial, nodes)
          }
          else if (HELP_TYPE_RANGE[key]) {
            this.addFieldBySwitchType(material, key, idMaterial, 'range');
          }
          else {
            this.addFieldBySwitchType(material, key, idMaterial, typeof this.state.materials[key])
          }
        }
        // if (HELP_TYPE_RANGE[key]) {
        //   this.addFieldBySwitchType(material, key, idMaterial, 'range')
        // }
        // else {
        //   this.addFieldBySwitchType(material, key, idMaterial, typeof this.state.materials[key])
        // }
      }
    }
  }

  /**
 * изменение материалов объекта
 * @param name
 * @param value
 */
  changeMaterialContextObject = (name, value) => {
    const { currentObject } = this.state
    switch (name) {
      case 'color':
        currentObject.material[name].set(value)
        break;
      default:
        currentObject.material[name] = value
        break;
    }
  }

  //! геометрия

  /**
  * определяет поля для геометрии
  * @param uuid
  */
  geometryElement = () => {
    const { typeGeometry, idGeometry } = this.state;
    for (let key in HELP_FUELDER_FOR_GEOMETRY[typeGeometry]) {
      this.addFieldBySwitchType(
        HELP_FUELDER_FOR_GEOMETRY[typeGeometry],
        key,
        idGeometry,
        typeof HELP_FUELDER_FOR_GEOMETRY[typeGeometry][key]
      )
    }
  }

  /**
  * изменяет геометрию обьекта
  * @param name
  * @param value
  */
  changeGeometryContextObject = (name, value) => {
    const { typeGeometry, currentObject } = this.state
    switch (typeGeometry) {
      case 'BoxGeometry':
        for (let key in HELP_FUELDER_FOR_GEOMETRY[typeGeometry]) {
          if (name === key) {
            changeValueGeometry(
              currentObject,
              HELP_FUELDER_FOR_GEOMETRY[typeGeometry],
              name,
              value
            )
          }
        }
        break;

      default:
        break;

    }
  }

  /**
     * Инициализирует начальную структуру
     * @param state
     * @param reRender
     */
  initStructure = (state, reRender = false) => {
    if (reRender) {
      state = []
    }
    const idObjectScene = this.addFolder(
      {
        name: 'Объекты сцены',
        id: v4(),
        isOpen: false,
        isSelect: false,
        type: 'folder',
        selectObj: () => { },
        children: [],
      }, null, state
    )
    const idGeometry = this.addFolder(
      {
        name: 'Геометрия',
        id: v4(),
        isOpen: false,
        isSelect: false,
        type: 'folder',
        selectObj: () => { },
        children: [],
      }, null, state
    )
    const idMaterial = this.addFolder(
      {
        name: 'Материалы',
        id: v4(),
        isOpen: false,
        isSelect: false,
        type: 'folder',
        selectObj: () => { },
        children: [],
      }, null, state
    )
    const idCamera = this.addFolder(
      {
        name: 'Камера',
        id: v4(),
        isOpen: false,
        isSelect: false,
        type: 'folder',
        children: [],
        selectObj: () => { },
      }, null, state
    )
    const idObject = this.addFolder(
      {
        name: 'Объект',
        id: v4(),
        isOpen: false,
        isSelect: false,
        children: [],
        type: 'folder',
        selectObj: () => { },
      }, null, state
    )

    this.setState({
      idObjectScene: idObjectScene,
      idGeometry: idGeometry,
      idMaterial: idMaterial,
      idCamera: idCamera,
      idObject: idObject,
    }, () => {
      this.createObjectSceneFolder(this.props.requiredPropertys.scene)
      this.createCameraFolder(this.props.requiredPropertys.scene)
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { nodes } = this.state
    if (prevProps !== this.props) {
      this.initStructure(nodes, true)
    }
    if (prevState.selectId !== this.state.selectId) {
      this.getMaterialAndGeometry(this.state.selectId)
    }
    if (prevState.deapthRecurse !== this.state.deapthRecurse) {
      this.initStructure(nodes, true)
    }
  }

  componentDidMount() {
    const { nodes } = this.state
    this.initStructure(nodes)
  }

  render() {
    return (
      <>
        <GUI
          scene={this.state}
          toggleDropDown={this.toggleDropDown}
          changeRecurseDeapth={this.changeRecurseDeapth}
        />
      </>
    )
  }
}

export default DevMode