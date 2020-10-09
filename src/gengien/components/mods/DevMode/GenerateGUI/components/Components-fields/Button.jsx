import React from "react";
import arrowDropDown from '../../assets/sort-down_icon-icons.com_73402.png'

const Button = ({name, id, toggle=()=>{}, chooseButton=()=>{}, open, select}) =>{
  return (
    <div className={`dev-mode-folder ${select ? 'active' : 'hid'}`}>
      <button className={`dev-mode-folder-button ${open ? 'active' : 'not-active'}`} onClick={()=>chooseButton(id)}  id={id}>{name}</button>
      <img className={`dev-mode-folder-drop-image ${open ? 'active' : 'not-active'}`} aria-controls={id} id={id} aria-expanded={open} onClick={()=>toggle(id)} src={arrowDropDown}/>
    </div>
  )
}
export default Button