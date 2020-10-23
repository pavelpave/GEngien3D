import React from 'react'
import { Form } from 'react-bootstrap'
const FileField = (props) => {
  const {
    id,
    name,
    change,
    value
  } = props
  return (
    <Form>
        <Form.Group className={'dev-mode-fields'}>
          <div className={'dev-mode-fields-wrapper'}>
            <Form.Label htmlFor={id}>{name}</Form.Label>
            <Form.Control
              id={id}
              onChange={(e) => change(e)}
              className={'dev-mode-fields-file dev-mode-input'}
              />
          </div>
        </Form.Group>
      </Form>
  )
}
export default FileField