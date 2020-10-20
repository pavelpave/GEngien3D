import React from "react";
import Folders from "../../common/Folders";
import Field from "../../common/Field";
import { NumberField, TextField, CheckBox, ColorPicker } from "../Components-fields";
import RangeField from "../Components-fields/RangeField";

const FoldersCreator = ({ propsFolders = [], toggleDropDown }) => {
  const checkTypeFielder = (el) => {
    switch (el.typeField) {
      case 'boolean': return (
        <CheckBox
          name={el.name}
          value={el.value}
          change={el.change}
          id={el.id}
          readOnly={el.readOnly}
        />
      )

      case 'number': return (
        <NumberField
          name={el.name}
          change={el.change}
          down={el.down}
          value={el.value}
          id={el.id}
          readOnly={el.readOnly}
        />
      )

      case 'string': return (
        <TextField
          name={el.name}
          change={el.change}
          value={el.value}
          id={el.id}
          readOnly={el.readOnly}
        />
      )
      case 'button': return (
        <ColorPicker
          name={el.name}
          value={el.value}
          change={el.change}
          id={el.id}
          readOnly={el.readOnly}
        />
      )
      case 'range': return (
        <RangeField
          name={el.name}
          value={el.value}
          change={el.change}
          id={el.id}
          readOnly={el.readOnly}
        />
      )
    }
  }
  return propsFolders.map((el, i) => {
    if (el.type === 'folder') {
      return (
        <Folders
          toggleDropDown={toggleDropDown}
          selectObj={el.selectObj}
          key={i}
          id={el.id}
          select={el.isSelect}
          name={el.name}
          isOpen={el.isOpen}>
          {
            el.type === 'folder' ? (
              <FoldersCreator
                key={i}
                toggleDropDown={toggleDropDown}
                propsFolders={el.children} />
            ) : (
                <div>
                  {el.name}
                </div>
              )
          }
        </Folders>
      )
    } else if (el.type === 'field') return (
      <Field key={i}>
        {checkTypeFielder(el)}
      </Field>
    )
  })
}
export default FoldersCreator
