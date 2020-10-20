import React from "react";

const CheckBox = (props) => {
  const {
    name,
    id,
    value,
    change,
  } = props
  return (
    <div className={'dev-mode-fields'}>
      <div className={'dev-mode-fields-wrapper'}>
        <label className={'form-label'} htmlFor={id}>{name}</label>
        <input
          className={'dev-mode-fields-checkbox'}
          id={id}
          checked={value}
          onChange={(e)=>change(e.target.checked, id)}
          type={'checkbox'} />
      </div>
    </div>
  )
}
export default CheckBox