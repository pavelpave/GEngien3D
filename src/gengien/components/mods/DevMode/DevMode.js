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
          children: [],
        },
        {
          name: 'Геометрия',
          id: v4(),
          type: 'geometry',
          isOpen: false,
          children: [],
        },
        {
          name: 'Камера',
          id: v4(),
          type: 'camera',
          isOpen: false,
          children: [],
        },
        {
          name: 'Материалы',
          id: v4(),
          type: 'material',
          isOpen: false,
          children: [],
        },
        {
          name: 'Объект',
          id: v4(),
          type: 'object',
          isOpen: false,
          children: [],
        }
      ]
    }
  }
  addFolder = (name, idParent ) =>{
    let newFolder = this.state.nodes
    let isParent = false
   const recurseCheckParent = (node) =>{

    }

    if(!isParent){

    }
  }
  addFielder = () =>{

  }

  // addNodesFolder = (node, item) => {
  //   const recurseAddFolder = (node) => {
  //     const structureObjectScene = node.map(el => {
  //       if (el.children && el.children.length) {
  //         item.node = [{
  //           name: el.name,
  //           isOpen: false,
  //           isSelect: false,
  //           id: el.id,
  //           type: 'folder',
  //           children: []
  //         }]
  //         recurseAddFolder(el.children)
  //         return item
  //       } else {
  //         return (
  //           {
  //             ...item.node,
  //             name: el.name,
  //             isOpen: false,
  //             isSelect: false,
  //             id: el.id,
  //             type: 'folder',
  //             children: []
  //           })
  //       }
  //     })
  //     return structureObjectScene
  //   }
  //   let newRecurseAddFolder = recurseAddFolder(node)
  //   return newRecurseAddFolder
  // }
  // createObjects = (scene) => {
  //   const addFolder = this.state.nodes.map(item => {
  //     if (item.type === 'objectScene') {
  //       item.children = this.addNodesFolder(scene, item)
  //       return item
  //     } else return item
  //   })
  //   this.setState({
  //     nodes: addFolder
  //   })
  // }
  //
  // addNodesCamera = (node, item) =>{
  //   node.map()
  // }
  //
  // createFieldForCamera = (scene) => {
  //   scene.map(item => {
  //     if (item.type === 'PerspectiveCamera') {
  //       item.children = this.addNodesCamera(scene, item)
  //     }
  //   })
  // }

  componentDidMount() {
    // this.createObjects(this.props.requiredPropertys.scene.children)
  }

  render() {
    console.log(this.props.requiredPropertys.scene)
    console.log(this.state.nodes)
    return (
      <>
        <GUI scene={this.state}/>
      </>
    )
  }
}

export default DevMode