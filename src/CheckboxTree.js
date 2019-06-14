import _ from 'lodash'
import React from 'react'
import {
  CheckboxTreeItem
} from './CheckboxTreeItem'
import {
  constructItemProperties
} from './helperFunctions'

class CheckboxTree extends React.Component {
  constructor(props) {
    super(props)

    // Set this node as a root for the tree
    this.isRoot = true
    // Define the checked field holding all checked nodes data
    this.checked = {}
    // Handle all the children nodes here
    this.childCheckboxItems = []

    this.updateCheckedValue = this.updateCheckedValue.bind(this)
  }

  pushChildToRef = (ref) => {
    this.childCheckboxItems.push(ref)
  }

  updateCheckedValue(type, value, isAdding) {
    const {
      onChange
    } = this.props

    // Fisrt create an array object for this type
    // if it does not exist already
    if (!this.checked[type]) this.checked[type] = []

    // Remove or add this value into the tree
    if (isAdding) {
      this.checked[type].push(value)
    } else {
      // Remove any value that equals
      for (var i = this.checked[type].length - 1; i >= 0; i--) {
        if (this.checked[type][i] === value) {
          this.checked[type].splice(i, 1);
        }
      }
    }

    // Debug all values selected in the tree
    console.log(JSON.stringify(this.checked))

    // If there is anything as a function for the change action
    // then run it with the data checked
    if (onChange) onChange(this.checked)
  }

  renderItems() {
    const {
      data,
      accessors
    } = this.props
    console.log('Creating a checkbox tree with data: ', data, ' and accessors: ', accessors)

    return _.map(data, (d, key) => {
      return <CheckboxTreeItem
      key = {
        key
      }
      ref = {
        this.pushChildToRef
      }
      onUpdateTree = {
        this.updateCheckedValue
      } {
        ...constructItemProperties(d, accessors, 0, false)
      }
      />
    })
  }

  render() {
    return <div className = 'checkbox-tree' > {
        this.renderItems()
      } </div>
  }
}

export default CheckboxTree