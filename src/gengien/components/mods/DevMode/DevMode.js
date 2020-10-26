import React from "react";
import { AbstractObject } from "../../../index";
import GUI from './GenerateGUI'
import CONST from '../../../constants'
import { v4 } from 'uuid'
import {
  HELP_FUELDER_FOR_GEOMETRY,
  HELP_INFO_FIELD_FOR_CAMERA,
  HELP_TYPE_RANGE,
  HELP_CHANGE_INFO_FIELD,
  HELP_CHANGE_CAMERA_FIELD,
} from './GenerateGUI/helpInfoField'
import { changeValueGeometry } from './changeMethodGeometry';
import { searchElement, allUnselected, clearFolderWithField } from './methodForDevMode'
import defaultState from './defaultState'
import { TextureLoader, RepeatWrapping, MeshBasicMaterial } from 'three'
import { timingSafeEqual } from "crypto";
import DragAndDropControl from "../../Controls/DragAndDropControl";

class DevMode extends AbstractObject {
  constructor(props) {
    super(props);
    this.state = {
      ...defaultState
    }
  }


  /**
     * получает геометрию и материалы
     * @param uuid
     */
  getMaterialAndGeometry = (uuid) => {
    const { requiredPropertys } = this.props
    let obj = requiredPropertys.scene.getObjectByProperty("uuid", uuid);
    if (obj.material && Array.isArray(obj.material)) {
      obj && obj.material && obj.geometry &&
        this.changeState({
          materials: null,
          arrayMaterials: obj.material,
          typeGeometry: obj.geometry.type
        })
      this.sceneObjectToDevPanel(this.state.selectId)
    } else {
      obj && obj.material && obj.geometry &&
        this.changeState({
          materials: obj.material,
          typeGeometry: obj.geometry.type,
          arrayMaterials: null
        })
      this.sceneObjectToDevPanel(this.state.selectId)
    }

  }

  /**
    *  изменение глубины поиска обьектов со сцены
    * @param value
    */
  changeRecurseDeapth = (value) => {
    this.changeState({
      deapthRecurse: value
    })
  }

  //! добавление/создание папок и полей

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
    this.changeState({
      nodes: newState,
    })
  }

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
    this.changeState({
      nodes: newState,
    })
    return newId
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
      case 'boolean':
        this.addField({
          name: property,
          id: v4(),
          readOnly: false,
          type: 'field',
          change: this.changeValueInputInState,
          typeField: 'boolean',
          value: obj[property],
        }, idParent, nodes)
        break;

      case 'file':
        this.addField({
          name: property,
          id: v4(),
          readOnly: false,
          type: 'field',
          change: this.changeInputMapForMaterial,
          typeField: 'file',
          value: obj[property],
        }, idParent, nodes)
        break;

      case 'range':
        this.addField({
          name: property,
          id: v4(),
          readOnly: false,
          type: 'field',
          change: this.changeValueInputInState,
          typeField: 'range',
          value: obj[property],
        }, idParent, nodes)
        break;

      case 'number':
        this.addField({
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

      case 'string':
        this.addField({
          name: property,
          id: v4(),
          readOnly: false,
          type: 'field',
          change: this.changeValueInputInState,
          typeField: 'string',
          value: obj[property],
        }, idParent, nodes)
        break;

      case 'button':
        this.addField({
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
        return
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
              case 'scale':
                createFieldForCamera(objCamera[key], key, idScale)
                break;
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
    const idScale = this.addFolder(
      {
        name: 'Шкала',
        id: v4(),
        type: 'folder',
        isOpen: false,
        isSelect: false,
        selectObj: () => { },
        children: []
      },
      this.state.idCamera,
      this.state.nodes)

    this.changeState({
      idFolderForCamera: {
        idPosition: idPosition,
        idQuaternion: idQuaternion,
        idRotation: idRotation,
        idScale: idScale
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
    HELP_CHANGE_CAMERA_FIELD[name](cameraObj, value)
  }

  //! информация о выбранном обьекте
  /**
     * изменение полей информации об объекте
     * @param name
     * @param value
     */
  changeInfoObject = (name, value) => {
    let { currentObject } = this.state
    HELP_CHANGE_INFO_FIELD[name](currentObject, value)
  }

  /**
       * создает поля и папки информации выбранного обьекта
       * @param selectObj
       * TODO: изменить метод создания полей
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
                case 'scale':
                  createFieldForInfo(selectObj[key], key, idScale)
                  break;
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
    const idScale = this.addFolder({
      name: 'Шкала',
      id: v4(),
      type: 'folder',
      isOpen: false,
      selectObj: () => { },
      isSelect: false,
      children: [],
    },
      idObject,
      nodes)


    this.changeState({
      idFolderInfo: {
        idPosition: idPosition,
        idQuaternion: idQuaternion,
        idRotation: idRotation,
        idScale: idScale,
      }
    }, () => {
      checkObject()
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
      this.changeState({
        nodes: clearFolderWithField(this.state),
        currentObject: null,
        arrayMaterials: null,
      })
    } else {
      this.changeState({
        nodes: clearFolderWithField(this.state),
        currentObject: obj,
      }, () => {
        this.infoElement(obj)
        this.materialElement(obj)
        this.geometryElement(obj)
      })
    }
  }

  //! изменение занчений полей

  changeInputMapForMaterial = (e) => {
    const { currentObject, materials, arrayMaterials } = this.state
    let map = new TextureLoader().load(e.target.value);
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.repeat.set(1, 1);
    let material = new MeshBasicMaterial({
      map: map,
    });
    material.needsUpdate = true;
    if (arrayMaterials) {
      const newMaterial = currentObject.material.map(item => {
        if (item.uuid === materials.uuid) {
          return item = material;
        } else {
          return item
        }
      })
      currentObject.material = newMaterial
    } else {
      currentObject.material = material;
    }
  }

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
    const speedChangeValue = 1
    /**
    * очищает слушатели
    * 
    */
    const cancelChangeValue = () => {
      this.changeState({ mouseDown: false }, () => {
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
    this.changeState({ mouseDown: true })
    window.addEventListener('mouseup', cancelChangeValue)
    window.addEventListener('mousemove', (e) => changeValue(e, positionElementTarget, valueInputTarget))
  }

  //! выбор, открытие, закрытие папок 

  /**
       * открывает папки
       * @param id
       */
  toggleDropDown = (id) => {
    const { nodes } = this.state
    const newState = searchElement(id, 'isOpen', nodes)
    this.changeState({
      nodes: newState
    })
  }

  /**
     * выделяет обьект
     * @param id
     */
  selectObject = (id) => {
    const { nodes, selectId } = this.state
    const closePrevFolder = allUnselected
    id !== selectId
      ?
      this.changeState({
        nodes: searchElement(
          id,
          'isSelect',
          closePrevFolder(nodes),
        ),
        selectId: id
      })
      :
      this.changeState({
        nodes: searchElement(
          id,
          'isSelect',
          nodes,
        ),
        selectId: null
      })
  }

  //!Материалы
  /**
     * Очищает папку материалы при выборе другого материала
     * @param nodes
     * @param idMaterial
     */
  clearMaterialFolder = (nodes, idMaterial) => {
    return nodes.map(item => {
      if (item.id === idMaterial) {
        return {
          ...item,
          children: [item.children[0]]
        }
      }
      return item
    })
  }

  /**
     * Получение выбранного материала из массива
     * @param e
     */
  chooseMaterialFromList = (e) => {
    const { arrayMaterials, idMaterial, nodes } = this.state
    const indexOption = e.target.selectedIndex;
    const getElementOptionId = e.target.childNodes[indexOption].id;
    let chooseMaterial = arrayMaterials.filter(item => item.uuid === getElementOptionId)
    let newMaterial = this.clearMaterialFolder(nodes, idMaterial)
    this.changeState({
      nodes: newMaterial,
      materials: chooseMaterial[0],
    }, () => {
      this.parseFieldForMaterial(chooseMaterial[0], idMaterial, nodes)
    })
  }

  /**
     * cоздает поля для материалов и камеры
     * @param parseObj
     * @param idParent
     * @param state
     */
  parseFieldForMaterial = (parseObj, idParent, node) => {
    for (let key in parseObj) {
      if (parseObj.hasOwnProperty(key)) {
        switch (key) {
          case 'color':
            this.addFieldBySwitchType(parseObj, key, idParent, 'button')
            break;
          case 'map':
            this.addFieldBySwitchType(parseObj, key, idParent, 'file')
            break;
          default:
            this.addFieldBySwitchType(parseObj, key, idParent, typeof parseObj[key])
            break;
        }
      }
    }
  }

  /**
     * cоздает папку для выбора материала
     * @param idParent
     * @param state
     * @param listTypeMaterial
     */
  fieldChooseMaterial = (idParent, state, listTypeMaterial) => {
    this.addField({
      name: 'Выберите материал',
      id: v4(),
      value: listTypeMaterial,
      type: 'field',
      typeField: 'select',
      readOnly: false,
      change: this.chooseMaterialFromList
    }, idParent, state)
  }

  /**
     * проверка полей по объекту материалов
     * @param selectObj
     */
  materialElement = (selectObj) => {
    const { idMaterial, nodes, materials, arrayMaterials } = this.state;
    if (arrayMaterials) {
      let typeMaterialArr = arrayMaterials.map(item => {
        return {
          name: item.type,
          id: item.uuid
        }
      })
      this.fieldChooseMaterial(idMaterial, nodes, typeMaterialArr)
    }
    else {
      this.parseFieldForMaterial(materials, idMaterial, nodes)
    }

  }

  /**
 * изменение материалов объекта
 * @param name
 * @param value
 */
  changeMaterialContextObject = (name, value) => {
    const { currentObject, materials, arrayMaterials } = this.state
    if (arrayMaterials) {
      currentObject.material.filter(item => {
        if (item.uuid === materials.uuid) {
          console.log(item)
          switch (name) {
            case 'color':
              item[name].set(value)
              break;
            default:
              item[name] = +value
              break;
          }
        }
      })
    } else {
      switch (name) {
        case 'color':
          currentObject.material[name].set(value)
          break;
        default:
          currentObject.material[name] = +value
          break;
      }
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

    this.changeState({
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

  /**
     * Изменяет стейт 
     * @param params
     */
  changeState = (params = {}, callback = () => { }) => {
    this.setState({
      ...params
    }, callback)
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