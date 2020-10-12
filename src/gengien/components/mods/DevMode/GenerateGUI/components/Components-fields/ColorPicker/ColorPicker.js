import React, {useState} from 'react'
import {ChromePicker} from 'react-color'

const ColorPicker = () => {
  const [color, setColor] = useState('#fff')
  const [open, setOpen] = useState(false)

  const changeColor = (color) => {
    setColor(color.hex)
  }

  return (
    <div className={'dev-mode-fields-color'}>
    <button className={'dev-mode-button'} onClick={()=>setOpen(!open)}>Изменить цвет</button>
      {open ? (
        <ChromePicker
          className={'dev-mode-fields-color-picker'}
          color={color}
          onChange={changeColor}
        />
      ): null
      }

    </div>
  )
}
export default ColorPicker