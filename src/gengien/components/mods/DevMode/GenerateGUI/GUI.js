import React from 'react';
import ReactDOM from 'react-dom';
import RenderStructure from "./components/Render-structure";
import {v4} from 'uuid'


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
          children: [
            {
              name: 'name',
              id: v4(),
              isOpen: false,
              isSelect: false,
              children: [],
              type: 'folder',
            },
            {
              name: 'name',
              id: v4(),
              isOpen: false,
              isSelect: false,
              type: 'folder',
              children: [
                {
                  name: 'name',
                  id: v4(),
                  isOpen: false,
                  isSelect: false,
                  children: [],
                  type: 'folder',
                }
              ],
            },
          ],
          isSelect: false
        },
        {name: 'Геометрия', id: v4(), isOpen: false, children: [], isSelect: false, type: 'folder',},
        {
          name: 'Камера',
          id: v4(),
          isOpen: false,
          isSelect: false,
          type: 'folder',
          children: [
            {
              name: 'child',
              id: v4(),
              isOpen: false,
              isSelect: false,
              type: 'folder',
              children: [
                {
                  name: 'child1',
                  id: v4(),
                  isOpen: false,
                  isSelect: false,
                  type: 'folder',
                  children: [
                    {
                      name: 'child ifdf',
                      id: v4(),
                      isOpen: false,
                      isSelect: false,
                      type: 'folder',
                      children: []
                    },
                  ]
                },
                {
                  name: 'child2',
                  id: v4(),
                  isOpen: false,
                  isSelect: false,
                  type: 'folder',
                  children: []
                },
              ]
            },
            {
              name: 'child3',
              id: v4(),
              isOpen: false,
              isSelect: false,
              type: 'folder',
              children: [],
            }
          ]
        },
        {name: 'Материалы', id: v4(), isOpen: false, children: [], isSelect: false, type: 'folder',},
        {
          name: 'Объект',
          id: v4(),
          isOpen: false,
          isSelect: false,
          type: 'folder',
          children: [
            {
              name: 'Children',
              id: v4(),
              isOpen: false,
              isSelect: false,
              type: 'folder',
              children: [
                {
                  name: 'Children1',
                  id: v4(),
                  isOpen: false,
                  isSelect: false,
                  type: 'folder',
                  children: [
                    {
                      name: 'Children12',
                      id: v4(),
                      isOpen: false,
                      isSelect: false,
                      type: 'field',
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        },
      ],
      id: null,
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
          if (el.children && el.children.length) {
            let newItem = el
            let newChild = searchIsSelected(el.children)
            newItem.children = newChild
            return newItem
          }
          return el
        }
      })
      return cancel
    }
    return searchIsSelected(this.state.nodes)
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
    const checkSelect = (id !== this.state.id)
      ?
      this.setState({
        nodes: getSelected(this.allUnselected(id)),
        id: id
      })
      :
      this.setState({
        nodes: getSelected(this.state.nodes),
        id: null
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

  initialState = () => {
    const {nodes} = this.props.scene
    this.setState({
      nodes: nodes
    })
  }

  componentDidMount() {
    this.initialState()
  }

  render() {
    return ReactDOM.createPortal(
      <RenderStructure selectObject={this.selectObject} toggleDropDown={this.toggleDropDown}
                       folders={this.state.nodes}/>,
      document.querySelector('body')
    )
  }
}

export default GUI