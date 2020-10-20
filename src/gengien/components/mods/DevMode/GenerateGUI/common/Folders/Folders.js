import React from "react";
import {Button} from "../../components/Components-fields";
import {Collapse} from "react-bootstrap";


const Folders = (props) => {
  const {
    name,
    id,
    select,
    toggleDropDown,
    selectObj,
    isOpen,
    children
  } = props
  return (
    <>
      <Button
        open={isOpen}
        toggleDropDown={toggleDropDown}
        selectObj={selectObj}
        id={id}
        select={select}
        name={name}/>
      <Collapse className={'dev-mode-folder-children'} in={isOpen}>
        <div id={id}>
          {children}
        </div>
      </Collapse>
    </>
  )
}
export default Folders