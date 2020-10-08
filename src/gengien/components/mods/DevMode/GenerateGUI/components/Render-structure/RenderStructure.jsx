import React from "react";
import {Button, CheckBox, ColorPicker, NumberField, TextField} from "../Components-fields";
import FoldersCreator from "../FoldersCreator";



class RenderStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    }
  }
  render() {
    const {
      display,
    } = this.state
    const {toggleDropDown, folders} = this.props
    return (
      <>
        <button
          onClick={() => this.setState({display: !display})}
          className={`display-dev-mode`}>
          {display ? 'Скрыть' : 'Показать'}
        </button>
        <div className={`dev_mode ${display ? 'show' : 'hid'}`}>
          <div className={'dev-mode'}>
            <div className={'dev-mode-content'}>
              <FoldersCreator
                propsFolders={folders}
                toggleDropDown={toggleDropDown}
              />
              <TextField name={'lrfsd'} id={2231321} helpText={'fdsfsdfds'} />
              <CheckBox name={'ddd'} id={423423} />
              <NumberField name={'ffddfsss'} id={56788} />
              <ColorPicker />
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default RenderStructure