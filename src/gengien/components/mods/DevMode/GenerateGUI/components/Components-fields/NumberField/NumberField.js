import React from "react";
import {Form} from "react-bootstrap";

const NumberField = (props) => {
  const {
    name,
    id,
    helpText,
  } = props
  return (
    <Form>
      <Form.Group className={'dev-mode-fields'} controlId={id}>
        <div className={'dev-mode-fields-wrapper'}>
          <Form.Label>{name}</Form.Label>
          <Form.Control className={'dev-mode-fields-number'} type="number"/>
        </div>
        <Form.Text className="text-muted">
          {helpText}
        </Form.Text>
      </Form.Group>
    </Form>
  )
}
export default NumberField