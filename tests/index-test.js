import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import CheckboxTree from 'src/'

const data = [{'id': 2, 'name': 'Greyhounds', 'code': 'GHR', 'competitionGroups': [{'id': 679, 'name': 'US', 'competitions': [{ 'id': 2347, 'name': 'Daytona Beach' }, { 'id': 2342, 'name': 'Palm Beach' }]}]}]
const accessors = [{label: 'name', value: 'id', leaves: 'competitionGroups', type: 'sport'}, {label: 'name', value: 'id', leaves: 'competitions', type: 'group'}, { label: 'name', value: 'id', type: 'competition'}]

describe('CheckboxTree', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('displays a welcome message', () => {
    render(<CheckboxTree data={data} accessors={accessors} />, node, () => {
      expect(node.innerHTML).toContain('Greyhounds')
    })
  })
})
