import React, {useState} from 'react'
import {ChromePicker} from 'react-color'

const ColorPicker = () => {
  const [color, setColor] = useState('#fff')
  const changeColor = (color) => {
    setColor(color.hex)
  }
  return (
    <ChromePicker
      color={color}
      onChange={changeColor}
    />
  )
}
export default ColorPicker