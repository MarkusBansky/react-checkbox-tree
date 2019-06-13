import React from 'react'
// eslint-disable-next-line no-unused-vars
import CheckboxTree from 'src/CheckboxTree'

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

export default class App extends React.Component {
  render () {
    return <CheckboxTree data={data} accessors={accessors} />
  }
}
