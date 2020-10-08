import React from "react";

const CheckBox = (props) => {
  const {
    name,
    id,
  } = props
  return (
    <div className={'dev-mode-fields'}>
      <label htmlFor={id}>{name}</label>
      <input className={'dev-mode-fields-checkbox'} id={id} type={'checkbox'}/>
    </div>
  )
}
export default CheckBox