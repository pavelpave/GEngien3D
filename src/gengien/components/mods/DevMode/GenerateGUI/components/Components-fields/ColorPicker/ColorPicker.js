import React, { useState } from 'react'
import { ChromePicker } from 'react-color'

const ColorPicker = (props) => {
  const [open, setOpen] = useState(false)
  const {
    name,
    id,
    value,
    change
  } = props
  return (
    <div className={'dev-mode-fields-color'}>
      <p>{name}</p>
      <div
        className={` dev-mode-show-color ${open ? 'active' : 'not-active'}`}
        onMouseLeave={() => setOpen(false)}
        onMouseEnter={() => setOpen(true)}>
        <p>{value}</p>
        <ChromePicker
          id={id}
          className={`dev-mode-fields-color-picker ${open ? 'active' : 'not-active'}`}
          color={value}
          onChangeComplete={(color)=>change(color.hex, id)}
        />
      </div>

    </div>
  )
}
export default ColorPicker