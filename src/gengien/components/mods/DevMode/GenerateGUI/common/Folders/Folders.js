import React from "react";
import {Button} from "../../components/Components-fields";
import {Collapse} from "react-bootstrap";


const Folders = (props) => {
  const {
    name,
    id,
    select,
    toggleDropDown,
    selectObject,
    isOpen,
    children
  } = props
  return (
    <>
      <Button
        open={isOpen}
        chooseButton={selectObject}
        toggle={toggleDropDown}
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