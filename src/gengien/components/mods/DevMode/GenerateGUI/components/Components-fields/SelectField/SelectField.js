import React from 'react'
import { Form } from 'react-bootstrap'
import { isTypeNode } from 'typescript'

const SelectField = (props) => {
  const {
    name,
    id,
    change,
    value,
  } = props
  return (
    <Form>
      <Form.Group className={'dev-mode-fields'}>
        <div className={'dev-mode-fields-wrapper'}>
          <Form.Label htmlFor={id}>{name}</Form.Label>
          <Form.Control
            as={'select'}
            id={id}
            onChange={(e) => change(e)}
            className={'dev-mode-fields-select dev-mode-input'}
          >
            <option value="" selected disabled hidden>Выберите материал</option>
            {value.map((item, index) => {
              return (
                <option key={index} id={item.id} value={item.name}>{item.name}</option>
              )
            })}
          </Form.Control>
        </div>
      </Form.Group>
    </Form>
  )
}
export default SelectField