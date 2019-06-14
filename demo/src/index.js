/* eslint-disable no-unused-vars */
import React from 'react'
import { render } from 'react-dom'
import CheckboxTree from '../../src/CheckboxTree'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons'

import 'bootstrap'

const data = [
  {
    'id': 2,
    'name': 'Greyhounds',
    'code': 'GHR',
    'competitionGroups': [
      {
        'id': 679,
        'name': 'US',
        'competitions': [
          { 'id': 2347, 'name': 'Daytona Beach' },
          { 'id': 2342, 'name': 'Palm Beach' }
        ]
      },
      {
        'id': 432,
        'name': 'UA',
        'competitions': [
          { 'id': 32, 'name': 'Kyiv Beach' },
          { 'id': 5678, 'name': 'Lviv' }
        ]
      }
    ]
  }
]

const accessors = [
  {
    label: 'name',
    value: 'id',
    leaves: 'competitionGroups',
    type: 'sport'
  },
  {
    label: 'name',
    value: 'id',
    leaves: 'competitions',
    type: 'group'
  },
  {
    label: 'name',
    value: 'id',
    type: 'competition'
  }
]

class Demo extends React.Component {
  render () {
    return <CheckboxTree
      data={data}
      accessors={accessors} c
      checkboxPlusIcon={<FontAwesomeIcon icon={faPlusSquare} />}
      checkboxMinusIcon={<FontAwesomeIcon icon={faMinusSquare} />}
    />
  }
}

render(<Demo/>, document.querySelector('#demo'))
