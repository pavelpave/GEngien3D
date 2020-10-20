import React from 'react';
import ReactDOM from 'react-dom';
import RenderStructure from "./components/Render-structure";


class GUI extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {nodes, deapthRecurse} = this.props.scene
    const {toggleDropDown, changeRecurseDeapth} = this.props
    return ReactDOM.createPortal(
      <RenderStructure
        toggleDropDown={toggleDropDown}
        folders={nodes}
        deapthRecurse={deapthRecurse}
        changeRecurseDeapth={changeRecurseDeapth}
        />,
      document.querySelector('body')
    )
  }
}

export default GUI