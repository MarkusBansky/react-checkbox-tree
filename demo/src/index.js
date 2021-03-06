/* eslint-disable no-unused-vars */
import 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { render } from 'react-dom'
import CheckboxTree from '../../src/CheckboxTree'

const data = [
  {
    'id': 1,
    'name': 'Europe',
    'code': 'EU',
    'countries': [
      {
        'id': 679,
        'name': 'France',
        'cities': [
          { 'id': 2347, 'name': 'Paris' },
          { 'id': 2342, 'name': 'Menton' }
        ]
      },
      {
        'id': 432,
        'name': 'Ukraine',
        'cities': [
          { 'id': 32, 'name': 'Kyiv' },
          { 'id': 5678, 'name': 'Lviv' }
        ]
      }
    ]
  },
  {
    'id': 2,
    'name': 'North America',
    'code': 'US',
    'countries': [
      {
        'id': 67,
        'name': 'United States',
        'cities': [
          { 'id': 98, 'name': 'Chicago' },
          { 'id': 765, 'name': 'New York' },
          { 'id': 634, 'name': 'Los Angeles' }
        ]
      }
    ]
  }
]

const accessors = [
  {
    label: 'name',
    value: 'id',
    leaves: 'countries',
    type: 'continent'
  },
  {
    label: 'name',
    value: 'id',
    leaves: 'cities',
    type: 'country'
  },
  {
    label: 'name',
    value: 'id',
    type: 'city'
  }
]

class Demo extends React.Component {
  constructor (params) {
    super(params)

    this.action = this.action.bind(this)
  }

  action (s) {
    console.log(this.refs.tree.getValues())
  }

  render () {
    return <div style={{ margin: '150px' }}>
      <CheckboxTree
        ref='tree'
        data={data}
        accessors={accessors}
        onChange={this.action}
      />
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
