import _ from 'lodash'
import React from 'react'
// eslint-disable-next-line no-unused-vars
import CheckboxTreeItem from './CheckboxTreeItem'
import './style.css'

class CheckboxTree extends React.Component {
  constructor (props) {
    super(props)

    // Set this node as a root for the tree
    this.isRoot = true
    // Define the checked field holding all checked nodes data
    this.checked = {}
    // Handle all the children nodes here
    this.childCheckboxItems = []

    this.treeStateUpdated = this.treeStateUpdated.bind(this)
    this.recurrentTreeAnalysis = this.recurrentTreeAnalysis.bind(this)
  }

  treeStateUpdated () {
    const { onChange } = this.props
    // Create a fresh new checked object
    this.checked = {}
    // Recurrently check the values in every child
    this.childCheckboxItems.map(c => this.recurrentTreeAnalysis(c.getBranchValueFunction()))

    // If there is anything as a function for the change action
    // then run it with the data checked
    if (onChange) onChange(this.checked)
  }

  recurrentTreeAnalysis (branch) {
    if (branch.values.length > 0) {
      if (!this.checked[branch.type]) this.checked[branch.type] = []
      this.checked[branch.type].push(...branch.values)
    }
    if (branch.children) {
      branch.children.map(c => this.recurrentTreeAnalysis(c))
    }
  }

  renderItems () {
    const { data, accessors } = this.props

    return _.map(data, (d, key) => {
      return <CheckboxTreeItem
        item={d}
        depth={0}
        key={key}
        accessors={accessors}
        ref={this.childCheckboxItems.push}
        treeUpdateTrigger={this.treeStateUpdated} />
    })
  }

  render () {
    return <div className='checkbox-tree'>
      {this.renderItems()}
    </div>
  }
}

export default CheckboxTree
