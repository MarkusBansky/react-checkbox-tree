import _ from 'lodash'
import React from 'react'
import { CheckboxTreeItem } from './CheckboxTreeItem'
import { constructItemProperties } from './helperFunctions'

class CheckboxTree extends React.Component {
  constructor (props) {
    super(props)

    // Set this node as a root for the tree
    this.isRoot = true
    // Define the checked field holding all checked nodes data
    this.checked = {}
    // Handle all the children nodes here
    this.childCheckboxItems = []

    // Bind methods
    this.onUpdateTree = this.onUpdateTree.bind(this)
    this.pushChildToRef = this.pushChildToRef.bind(this)
  }

  pushChildToRef (ref) {
    this.childCheckboxItems.push(ref)
  }

  onUpdateTree () {
    const { onChange, accessors } = this.props

    _.map(accessors, a => {
      if (!this.checked[a.type]) this.checked[a.type] = []
    })

    // Get all data from child and insert into the checked status
    let values = _.map(this.childCheckboxItems, c => c.getValues())
    _.map(values, v => _.map(accessors, a => {
      if (v[a.type]) this.checked[a.type] = v[a.type]
    }))

    // Debug all values selected in the tree
    console.log('Checked tree values: ' + JSON.stringify(this.checked))

    // If there is anything as a function for the change action
    // then run it with the data checked
    if (onChange) onChange(this.checked)
  }

  renderItems () {
    const { data, accessors } = this.props
    console.log('Creating a checkbox tree with data: ', data, ' and accessors: ', accessors)

    return _.map(data, (d, key) => {
      return <CheckboxTreeItem
        key={key}
        ref={this.pushChildToRef}
        onUpdateTree={this.onUpdateTree}
        {...constructItemProperties(d, accessors, 0, 'unchecked')}
      />
    })
  }

  render () {
    return <div className='checkbox-tree' > {this.renderItems()} </div>
  }
}

export default CheckboxTree
