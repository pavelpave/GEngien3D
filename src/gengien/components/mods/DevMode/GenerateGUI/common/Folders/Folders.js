import React from "react";
import {Button} from "../../components/Components-fields";
import {Collapse} from "react-bootstrap";


const Folders = (props) => {
  const {
    name,
    id,
    toggleDropDown,
    isOpen,
    children
  } = props
  return (
    <>
      <Button
        open={isOpen}
        onClick={() => toggleDropDown(id)}
        id={id}
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