import React from "react";
import {Form} from "react-bootstrap";

const TextField = (props) => {
  const {
    name,
    value,
    id,
    change,
    readOnly = false
  } = props
  return (
    <Form>
      <Form.Group className={'dev-mode-fields'} controlId={id}>
        <div className={'dev-mode-fields-wrapper'}>
          <Form.Label>{name}</Form.Label>
          <Form.Control 
          className={'dev-mode-fields-input dev-mode-input'} 
          type="text"
          onChange = {(e)=>change(e.target.value, id)}
          value={value}
          readOnly={readOnly}
          />
        </div>
      </Form.Group>
    </Form>
  )
}
export default TextField