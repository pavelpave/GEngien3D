import React from 'react';
import ReactDOM from 'react-dom';
import RenderStructure from "./components/Render-structure";
import { v4 } from 'uuid'


class GUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [
        {
          name: 'Обьекты сцены',
          id: v4(),
          isOpen: false,
          type: 'folder',
          childrens: [
            {
              name: 'name',
              id: v4(),
              isOpen: false,
              isSelect: false,
              childrens: [],
              type: 'folder',
            },
            {
              name: 'name',
              id: v4(),
              isOpen: false,
              isSelect: false,
              type: 'folder',
              childrens: [
                {
                  name: 'name',
                  id: v4(),
                  isOpen: false,
                  isSelect: false,
                  childrens: [],
                  type: 'folder',
                }
              ],
            },
          ],
          isSelect: false},
        {name: 'Геометрия', id: v4(), isOpen: false, childrens: [], isSelect: false, type: 'folder',},
        {
          name: 'Камера',
          id: v4(),
          isOpen: false,
          isSelect: false,
          type: 'folder',
          childrens: [
            {
              name: 'child',
              id: v4(),
              isOpen: false,
              isSelect: false,
              type: 'folder',
              childrens: [
                {
                  name: 'child1',
                  id: v4(),
                  isOpen: false,
                  isSelect: false,
                  type: 'folder',
                  childrens: [
                    {
                      name: 'child ifdf',
                      id: v4(),
                      isOpen: false,
                      isSelect: false,
                      type: 'folder',
                      childrens: []
                    },
                  ]
                },
                {
                  name: 'child2',
                  id: v4(),
                  isOpen: false,
                  isSelect: false,
                  type: 'folder',
                  childrens: []
                },
              ]
            },
            {
              name: 'child3',
              id: v4(),
              isOpen: false,
              isSelect: false,
              type: 'folder',
              childrens: [],
            }
          ]
        },
        {name: 'Материалы', id: v4(), isOpen: false, childrens: [], isSelect: false,type: 'folder',},
        {
          name: 'Объект',
          id: v4(),
          isOpen: false,
          isSelect: false,
          type: 'folder',
          childrens: [
            {
              name: 'Children',
              id: v4(),
              isOpen: false,
              isSelect: false,
              type: 'folder',
              childrens: [
                {
                  name: 'Children1',
                  id: v4(),
                  isOpen: false,
                  isSelect: false,
                  type: 'folder',
                  childrens: [
                    {
                      name: 'Children12',
                      id: v4(),
                      isOpen: false,
                      isSelect: false,
                      type: 'field',
                      childrens: []
                    }
                  ]
                }
              ]
            }
          ]
        },
      ],
    }
  }

  allUnselected = () => {
    const searchIsSelected = (node) => {
      let cancel = node.map(el => {
        if (el.isSelect === true) {
          return (
            {
              ...el,
              isSelect: false
            }
          )
        } else {
          if (el.childrens && el.childrens.length) {
            let newItem = el
            let newChild = searchIsSelected(el.childrens)
            newItem.childrens = newChild
            return newItem
          }
          return el
        }
      })
      return cancel
    }
    return searchIsSelected(this.state.nodes)
  }
  selectObject = (id) =>{
    const getSelected = (node) =>{
      console.log(node)
      let newSelected = node.map(el =>{
        if(el.id === id){
          return (
            {
              ...el,
              isSelect: !el.isSelect
            }
          )
        }else{
          if(el.childrens && el.childrens.length){
            let newItem = el
            let newChild = getSelected(el.childrens)
            newItem.childrens = newChild
            return newItem
          }
          return el
        }
      })
      return newSelected
    }
    let newSelected = getSelected(this.allUnselected())
    this.setState({
      nodes: newSelected
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
          if (item.childrens && item.childrens.length) {
            newItem = recurseSearchIsOpen(item.childrens)
          }
          if(newItem) {
            item.childrens = newItem
            return  item
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

  render() {
    return ReactDOM.createPortal(
      <RenderStructure selectObject={this.selectObject} toggleDropDown={this.toggleDropDown} folders={this.state.nodes}/>,
      document.querySelector('body')
    )
  }
}

export default GUI