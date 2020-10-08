import React from 'react';
import ReactDOM from 'react-dom';
import RenderStructure from "./components/Render-structure";
import {v4} from 'uuid'


class GUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      folder: [
        {name: 'Обьекты сцены', id: v4(), isOpen: false, folders: []},
        {name: 'Геометрия', id: v4(), isOpen: false, folders: []},
        {
          name: 'Камера',
          id: v4(),
          isOpen: false,
          folders: [
            {
              name: 'child',
              id: v4(),
              isOpen: false,
              fields: [
                {
                  name: 'ffff',
                  type: 'inp'
                }
              ],
              folders: [
                {
                  name: 'child1',
                  id: v4(),
                  isOpen: false,
                  fields: [
                    {
                      name: 'gfsgdf',
                      type: 'inp'
                    }
                  ],
                  folders: [
                    {
                      name: 'child ifdf',
                      id: v4(),
                      isOpen: false,
                      fields: [ 
                        {
                        name: 'gsg',
                        type: 'inp'
                      }
                      ],
                      folders: []
                    },
                  ]
                },
                {
                  name: 'child2',
                  id: v4(),
                  isOpen: false,
                  fields: [],
                  folders: []
                },
              ]
            },
            {
              name: 'child3',
              id: v4(),
              isOpen: false,
              fields: [],
              folders: [],
            }
          ]
        },
        {name: 'Материалы', id: v4(), isOpen: false, folders: []},
        {
          name: 'Объект',
          id: v4(),
          isOpen: false,
          fields: [
            {
              name: 'aasd',
              type: 'asdas',
              id: v4()
            }
          ],
          folders: [
            {
              name: 'Children',
              id: v4(),
              isOpen: false,
              fields: [],
              folders: [
                {
                  name: 'Children1',
                  id: v4(),
                  isOpen: false,
                  fields: [],
                  folders: []
                }
              ]
            }
          ]
        },
      ],
    }
  }

  toggleDropDown = (id) => {
    const recurseSearchIsOpen = (node, parent = false) => {
      let newFolder = node.map((item) => {
        if (item.id === id) {
         let newitem = {
            ...item,
            isOpen: !item.isOpen,
          }
          return item = newitem
        } else {
          let newItem = false
          if (item.folders && item.folders.length) {
            newItem = recurseSearchIsOpen(item.folders)
          }
          if(newItem) {
            item.folders = newItem
            return  item
          }
          return item
        }
      })
      return newFolder
    }
    let newFolder = recurseSearchIsOpen(this.state.folder)
    this.setState({
      folder: newFolder
    })
  }

  render() {
    return ReactDOM.createPortal(
      <RenderStructure toggleDropDown={this.toggleDropDown} folders={this.state.folder}/>,
      document.querySelector('body')
    )
  }
}

export default GUI