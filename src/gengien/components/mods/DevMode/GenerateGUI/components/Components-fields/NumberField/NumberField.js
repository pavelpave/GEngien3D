import React, { useState } from "react";
import { Form } from "react-bootstrap";

class NumberField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      mouseDown: false,
    }
  }

  render() {
    const {
      name,
      change = () => { },
      down = () => { },
      id,
      value,
      className='',
      ...props
    } = this.props
    return (
      <Form>
        <Form.Group className={'dev-mode-fields'}>
          <div className={`dev-mode-fields-wrapper ${className}`}>
            <Form.Label htmlFor={id}>{name}</Form.Label>
            <Form.Control
              {...props}
              value={value}
              id={id}
              onChange={(e) => change(e.currentTarget.value, id)}
              onMouseDown={(e) => down(e, id)}
              className={'dev-mode-fields-number dev-mode-input'}
              type="number" />
          </div>
        </Form.Group>
      </Form>
    )
  }
}
export default NumberField