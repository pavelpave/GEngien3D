import {v4} from "uuid";

export default  [
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