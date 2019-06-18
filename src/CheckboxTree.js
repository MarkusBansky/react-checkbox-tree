import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { CheckboxTreeItem } from './CheckboxTreeItem'
import { constructItemProperties } from './helperFunctions'

class CheckboxTree extends React.Component {
  constructor (props) {
    super(props)

    // Set this node as a root for the tree
    this.isRoot = true
    // Define the checked field holding all checked nodes data
    this.checked = {}

    // Bind methods
    this.onUpdateTree = this.onUpdateTree.bind(this)
  }

  getValues () {
    // Get the values from root component
    let values = this.refs.root.getValues()

    // Delete the root values data
    delete values.root

    return values
  }

  onUpdateTree () {
    const { onChange } = this.props

    // Reset the checked state
    this.checked = this.getValues()

    // Debug all values selected in the tree
    console.log('Checked tree values: ' + JSON.stringify(this.checked))

    // If there is anything as a function for the change action
    // then run it with the data checked
    if (onChange) onChange(this.checked)
  }

  render () {
    const { data, accessors } = this.props
    const foldedData = {
      label: 'root',
      value: 'root',
      children: data
    }
    const foldedAccessors = [
      {
        label: 'label',
        value: 'value',
        leaves: 'children',
        type: 'root'
      },
      ...accessors
    ]
    const foldedParameters = constructItemProperties(foldedData, foldedAccessors, 0, 'unchecked')

    return <div className='checkbox-tree' >
      <CheckboxTreeItem
        id={0}
        ref='root'
        onUpdateTree={this.onUpdateTree}
        checkboxPlusIcon={this.props.checkboxPlusIcon}
        checkboxMinusIcon={this.props.checkboxMinusIcon}
        {...foldedParameters}
      />
    </div>
  }
}

CheckboxTree.propTypes = {
  data: PropTypes.array.isRequired,
  accessors: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  checkboxPlusIcon: PropTypes.object,
  checkboxMinusIcon: PropTypes.object
}

export default CheckboxTree
