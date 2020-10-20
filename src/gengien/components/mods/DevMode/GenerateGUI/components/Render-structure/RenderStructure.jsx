import React from "react";
import { ColorPicker, NumberField } from "../Components-fields";
import FoldersCreator from "../FoldersCreator";
import { v4 } from 'uuid'
import { Spinner } from "react-bootstrap";
import RangeField from "../Components-fields/RangeField";


class RenderStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      loading: false,
    }
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevProps.folders.length, this.props.folders.length)
  //   if (prevProps.folders !== this.props.folders && this.props.folders.length) {
  //     this.setState({
  //       loading: false
  //     })
  //   }
  // }

  // componentDidMount() {
  //   console.log(this.props.folders)
  //   if(!this.props.folders || !this.props.folders.length){
  //     this.setState({
  //       loading: true
  //     })
  //   }
  // }

  render() {
    const {
      display,
      loading
    } = this.state
    const {
      toggleDropDown,
      folders,
      deapthRecurse,
      changeRecurseDeapth } = this.props
    return (
      <>
        <button
          onClick={() => this.setState({ display: !display })}
          className={`display-dev-mode`}>
          {display ? 'Скрыть' : 'Показать'}
        </button>
        <div className={`dev_mode ${display ? 'show' : 'hid'}`}>
          <div className={'dev-mode'}>
            <div className={'dev-mode-content'}>
              {/* {loading ? (
                <Spinner className={'dev-mode-loading'} animation="border" />
              ) : (
                  <> */}
                    <NumberField
                      name={'Глубина поиска объектов'}
                      value={deapthRecurse}
                      id={v4()}
                      change={changeRecurseDeapth}
                    />
                    <FoldersCreator
                      propsFolders={folders}
                      toggleDropDown={toggleDropDown}
                    />
                  {/* </>
                )
              } */}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default RenderStructure