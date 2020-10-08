import React from "react";
import Folders from "../../common/Folders";

const FoldersCreator = ({propsFolders = [], toggleDropDown}) => {
  return propsFolders.map((el, i) => {
    return (
      <Folders
        toggleDropDown={toggleDropDown}
        key={i}
        id={el.id}
        name={el.name}
        isOpen={el.isOpen}>
        { el.folders &&<FoldersCreator key={i} toggleDropDown={toggleDropDown} propsFolders={el.folders}/>}
        {el.fields &&
        el.fields.map(item=>{
          return(
            <div>
              {item.name}
            </div>
          )
        })
        }
      </Folders>
    )
  })
}
export default FoldersCreator
