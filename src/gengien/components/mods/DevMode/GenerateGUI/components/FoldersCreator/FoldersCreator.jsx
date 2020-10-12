import React from "react";
import Folders from "../../common/Folders";

const FoldersCreator = ({propsFolders = [], toggleDropDown, selectObject}) => {
  return propsFolders.map((el, i) => {
    return (
      <Folders
        selectObject={selectObject}
        toggleDropDown={toggleDropDown}
        key={i}
        id={el.id}
        select={el.isSelect}
        name={el.name}
        isOpen={el.isOpen}>
        {
          el.type !== 'field' ?
            (
              <FoldersCreator key={i} selectObject={selectObject} toggleDropDown={toggleDropDown} propsFolders={el.children}/>
            ) : (
              <div>
                {el.name}
              </div>
            )
        }
      </Folders>
    )
  })
}
export default FoldersCreator
