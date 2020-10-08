import React from "react";
import arrowDropDown from '../../assets/sort-down_icon-icons.com_73402.png'

const Button = ({name, id, onClick=()=>{}, open}) =>{
  return (
    <div className={'dev-mode-folder'}>
      <button className={`dev-mode-folder-button ${open ? 'active' : 'not-active'}`}  id={id}>{name}</button>
      <img className={`dev-mode-folder-drop-image ${open ? 'active' : 'not-active'}`} aria-controls={id} id={id} aria-expanded={open} onClick={onClick} src={arrowDropDown}/>
    </div>
  )
}
export default Button