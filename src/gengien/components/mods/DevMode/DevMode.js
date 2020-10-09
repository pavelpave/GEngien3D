import React from "react";
import {AbstractObject} from "../../../index";
import RenderStructure from "./GenerateGUI/components/Render-structure/RenderStructure";
import GUI from './GenerateGUI'
import {DEFAULT_MATERIAL} from '../../../constants'
import {v4} from 'uuid'

// requiredPropertys

class DevMode extends AbstractObject {
  constructor(props) {
    super(props);
    this.childsFolder = null;
    this.geometryFolder = null;
    this.cameraFolder = null;
    this.materialFolder = null;
    this.mesh = null;
    this.scaleFolderMesh = null;
    this.positionFolderMesh = null;
    this.positionFolderCamera = null;
    this.rotationFolderMesh = null;
    this.dataMesh = {
      xPos: 0,
      yPos: 0,
      zPos: 0,
      xRotate: 0,
      yRotate: 0,
      zRotate: 0,
      xScale: 0,
      yScale: 0,
      zScale: 0,
      name: "",
      type: "",
    };
    this.datamaterial = DEFAULT_MATERIAL;
    this.dataCameraPosition = {
      x: props.camera.position.x,
      y: props.camera.position.y,
      z: props.camera.position.z,
    };
    this.state = {
      nodes: [
        {
          name: 'Объекты сцены',
          id: v4(),
          type: 'objectScene',
          isOpen: false,
        },
        {
          name: 'Геометрия',
          id: v4(),
          type: 'geometry',
          isOpen: false,
        },
        {
          name: 'Камера',
          id: v4(),
          type: 'camera',
          isOpen: false,
        },
        {
          name: 'Материалы',
          id: v4(),
          type: 'material',
          isOpen: false,
        },
        {
          name: 'Объект',
          id: v4(),
          type: 'object',
          isOpen: false,
        }
      ],
    };
  }

  // createFieldsForChilds = () => {
  //   let {scene} = this.props.props.requiredPropertys;
  //   /**
  //    * принимает контейнер для полей и папок и создаст поле
  //    * @param {*} nodeForFolder
  //    * @param {*} param1
  //    */
  //   const addFieldForFolder = (nodeForFolder, {name, id, uuid}) => {
  //     name = name ? `${name}---${uuid}` : `name Not found ${uuid.v4()}`;
  //     let propertyForThisNode = {
  //       [name]: false,
  //     };
  //     nodeForFolder.add(propertyForThisNode, name).onChange((e) => {
  //       if (e) {
  //         let object = scene.getObjectByProperty("uuid", uuid);
  //         console.log(object);
  //         if (name !== "CameraHelper") {
  //           this.updateGUI(object)
  //         }
  //       }
  //     });
  //   };
  //   /**
  //    * принимает контeйнер для папки и создает её
  //    * @param {*} nodeForFolder
  //    * @param {*} param1
  //    */
  //   const addFolderForParentNode = (nodeForFolder, {name, id, uuid}) => {
  //     let newFolder = nodeForFolder.addFolder(`${name}--${uuid}`);
  //     return newFolder;
  //   };
  //   /**
  //    * рекурсивный метод который пробегается по детям сцены и создает для каждой ноды у которой есть дети папку с детьми
  //    * @param {*} node
  //    * @param {*} containerFolder
  //    */
  //   const checkChilden = (node, containerFolder) => {
  //     // дефолтный фолдер
  //     let folderContainer = this.childsFolder;
  //     if (node.name === "transformControler") {
  //       return false;
  //     }
  //     // проверка естьли дети у сцены
  //     if (node.children.length) {
  //       // проверка на обновление фолдра обновление происходит из-за рекурсии и в нем может изменится контейнер для полей
  //       if (containerFolder) {
  //         folderContainer = containerFolder;
  //       }
  //       // создаст папку и вернет её для дальнейшей передачи её детям
  //       let newFolder = addFolderForParentNode(folderContainer, {
  //         name: node.name ? node.name : node.type,
  //         id: node.id,
  //         uuid: node.uuid,
  //       });
  //       // создает поля
  //       addFieldForFolder(folderContainer, {
  //         name: node.name ? node.name : node.type,
  //         id: node.id,
  //         uuid: node.uuid,
  //       });
  //       // сама рекурсия , проходится по детям и получает новую папку для следущей итерации
  //       return node.children.map((el) => checkChilden(el, newFolder));
  //     } else {
  //       // тут все по аналогии только + выход
  //       if (containerFolder) {
  //         folderContainer = containerFolder;
  //       }
  //       addFieldForFolder(folderContainer, {
  //         name: node.name ? node.name : node.type,
  //         id: node.id,
  //         uuid: node.uuid,
  //       });
  //       return false;
  //     }
  //   };
  //   checkChilden(scene);
  // };



  // addObjectScene = (arr) =>{
  //
  //   this.setState({object: newState})
  // }


  createObjects = (scene) => {
    const folder = []
    const checkChildren = (node) => {
      node.map(item => {
        if (item.children && item.length) {
          folder.push({
            name: item.name,
            id: item.uuid,
            isOpen: false,
            isSelect: false,
            type: 'folder',
          })
          checkChildren(item.children)
        } else {
          folder.push({
            name: item.name,
            id: item.uuid,
            isOpen: false,
            isSelect: false,
            type: item.type,
          })
          return item
        }
      })
      // this.addObjectScene(folder)
    }
    let newState = checkChildren(scene)
    this.setState({
      nodes: newState
    })
  }

  componentDidMount() {
    this.createObjects(this.props.requiredPropertys.scene.children)
  }

  render() {
    console.log(this.state.object)
    console.log(this.props.requiredPropertys.scene)
    return (
      <>
        <GUI scene={this.props.requiredPropertys.scene}/>
      </>
    )
  }
}

export default DevMode