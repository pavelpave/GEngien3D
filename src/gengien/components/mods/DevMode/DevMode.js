import React from "react";
import { AbstractObject } from "../../../index";
import GUI from './GenerateGUI'
import CONST from '../../../constants'
import { v4 } from 'uuid'
import { HELP_INFO_FIELD_FOR_CAMERA, HELP_MATERIAL_FIELD_OF_TYPE, HELP_TYPE_RANGE, } from './GenerateGUI/helpInfoField'


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
      deapthRecurse: 5,
      materials: null,
      currentObject: null,
    }
  }


  changeRecurseDeapth = (value) => {
    this.setState({
      deapthRecurse: value
    })
  }

  addFolder = (params = {}, idParent = null, state) => {
    let newId = idParent ? idParent : v4()
    let newState = state
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

  addField = (params = {}, idParent = null, state) => {
    let newState = state
    const { name, ...props } = params
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

  createCameraFolder = () => {
    const { idFolderForCamera, idCamera } = this.state;
    const { requiredPropertys } = this.props;
    const obj = requiredPropertys.scene.getObjectByProperty("name", CONST.DATA_OBJECT_SCENE.MAIN_CAMERA.name);
    const fieldForCamera = (objCamera) => {
      for (let key in objCamera) {
        if (HELP_INFO_FIELD_FOR_CAMERA[key]) {
          if (typeof objCamera[key] === 'object') {
            switch (key) {
              case 'position':
                this.parseObjectForField(objCamera, key, idPosition)
                break;
              case 'quaternion':
                this.parseObjectForField(objCamera, key, idQuaternion)
                break
              case 'rotation':
                this.parseObjectForField(objCamera, key, idRotation)
                break
            }
          } else {
            this.addFieldBySwitchType(objCamera, key, idCamera, typeof HELP_INFO_FIELD_FOR_CAMERA[key])
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
      }
    }, () => {
      fieldForCamera(obj)
    })

  }

  changeMaterialContextObject = (name, value) => {
    const { currentObject } = this.state
    switch (name) {
      case 'color':
        currentObject.material[name].set(value)
        break;
      // case 'color':
      //   currentObject.material[name].set(value)
      //   break;
      default:
        currentObject.material[name] = value
        break;
    }
  }
  changeCamera = (name, value) => {
    const { currentObject } = this.state
    console.log(name)
    switch (name) {
      case 'x':
        currentObject.position.setX(value)
        break;
      case 'y':
        currentObject.position.setY(value)
        break;
      case 'z':
        currentObject.position.setZ(value)
        break;
    }
  }

  changeValueInputInState = (newValue, id) => {
    const { idGeometry, idMaterial, idCamera, idObject, nodes } = this.state
    let parent = null;
    let nameField = null;
    let valueField = newValue;
    let isChecked = false;
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
      console.log(parent)
      switch (parent.id) {
        case idObject:

          break;
        case idMaterial:
          this.changeMaterialContextObject(nameField, valueField)
          break

        case idGeometry:

          break

        case idCamera:
          this.changeCamera(nameField, valueField)
          break
      }

    })
  }

  changeValueInput = (e, id) => {
    e.persist()
    let valueInputTarget = e.currentTarget.value
    let positionElementTarget = e.currentTarget.getBoundingClientRect().top;
    const speedChangeValue = 0.1
    const cancelChangeValue = () => {
      this.setState({ mouseDown: false }, () => {
        window.removeEventListener("mousemove", (e) => changeValue(e, positionElementTarget, valueInputTarget))
        window.removeEventListener("mouseup", cancelChangeValue)

      })
    }
    const changeValue = (e, positionElement, value) => {
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

  createObjectSceneFolder = (scene) => {
    let counterDeapth = 0;
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

  allUnselected = () => {
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

  parseObjectForField = (obj, property, idParent) => {
    const { nodes } = this.state
    for (let key in obj[property]) {
      if (obj[property].hasOwnProperty(key)) {
        if (obj[key] === null) {
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

      case 'object':
        this.parseObjectForField(obj, property, idParent)
        break
    }
  }

  materialElement = (el) => {
    const { material } = el;
    const { idMaterial } = this.state;
    for (let key in material) {
      if (material.hasOwnProperty(key)) {
        if (this.state.materials) {
          if (key.toLowerCase() === 'color') {
            this.addFieldBySwitchType(material, key, idMaterial, 'button')
          }
          else if (HELP_TYPE_RANGE[key]) {
            this.addFieldBySwitchType(material, key, idMaterial, 'range')
          }
          else {
            this.addFieldBySwitchType(material, key, idMaterial, typeof this.state.materials[key])
          }
        }
      }
    }
  }

  infoElement = (el) => {
    const { idObject } = this.state
    for (let key in el) {
      if (el.hasOwnProperty(key)) {
        if (HELP_INFO_FIELD_FOR_CAMERA[key]) {
          this.addFieldBySwitchType(el, key, idObject, typeof HELP_INFO_FIELD_FOR_CAMERA[key])
        }
      }
    }
  }

  selectObject = (id) => {
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

  toggleDropDown = (id) => {
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

  getMaterials = (uuid) => {
    const { requiredPropertys } = this.props
    let obj = requiredPropertys.scene.getObjectByProperty("uuid", uuid);
    console.log(obj)
    obj &&
      this.setState({
        materials: obj.material
      })
    this.sceneObjectToDevPanel(this.state.selectId)
  }

  sceneObjectToDevPanel = (uuid) => {
    const { selectId } = this.state
    const { requiredPropertys } = this.props
    let obj = requiredPropertys.scene.getObjectByProperty("uuid", uuid);
    console.log(obj)
    if (selectId === null) {
      this.setState({
        nodes: this.clearFolderWithField(),
        currentObject: null
      })
    } else {
      this.setState({
        nodes: this.clearFolderWithField(),
        currentObject: obj,
      }, () => {
        this.infoElement(obj)
        this.materialElement(obj)
      })
    }
  }

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
      this.getMaterials(this.state.selectId)
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