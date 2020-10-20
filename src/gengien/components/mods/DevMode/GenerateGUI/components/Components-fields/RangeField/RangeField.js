import React from 'react'
import { Form } from 'react-bootstrap'


const RangeField = (props) => {
  const {
    name,
    value,
    id,
    change
  } = props
  return (
    <Form>
      <Form.Group className={'dev-mode-fields'} controlId={id}>
        <div className={'dev-mode-fields-wrapper'}>
          <Form.Label>{name}</Form.Label>
          <Form.Control
            value={value}
            min={0}
            max={1}
            step="0.1"
            type="range"
            className={'dev-mode-fields-range dev-mode-input'}
            onChange={(e)=>change(e.target.value, id)}
          />
        </div>
      </Form.Group>
    </Form>
  )
}
export default RangeField