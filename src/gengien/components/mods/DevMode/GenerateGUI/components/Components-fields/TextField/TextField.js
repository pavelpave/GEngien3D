import React from "react";
import {Form} from "react-bootstrap";

const TextField = (props) => {
  const {
    name,
    id,
    helpText
  } = props
  return (
    <Form>
      <Form.Group className={'dev-mode-fields'} controlId={id}>
        <div className={'dev-mode-fields-wrapper'}>
          <Form.Label>{name}</Form.Label>
          <Form.Control className={'dev-mode-fields-input'} type="text"/>
        </div>
        <Form.Text className="text-primary">
          {helpText}
        </Form.Text>
      </Form.Group>
    </Form>
  )
}
export default TextField