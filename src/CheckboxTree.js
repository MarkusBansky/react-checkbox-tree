import _ from 'lodash'
import React from 'react'
import CheckboxTreeItem from './CheckboxTreeItem'

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

  pushChildToRef = (ref) => {
    this.childCheckboxItems.push(ref)
  }

  treeStateUpdated () {
    const { onChange } = this.props
    // Create a fresh new checked object
    this.checked = {}
    // Recurrently check the values in every child
    _.map(this.childCheckboxItems, c => this.recurrentTreeAnalysis(c.getBranchValueFunction()))

    // If there is anything as a function for the change action
    // then run it with the data checked
    if (onChange) onChange(this.checked)
  }

  recurrentTreeAnalysis (branch) {
    if (branch.values.length > 0) {
      if (!this.checked[branch.type]) this.checked[branch.type] = []
      this.checked[branch.type].push(...branch.values)
    }
    _.map(branch.children, c => this.recurrentTreeAnalysis(c))
  }

  renderItems () {
    const { data, accessors } = this.props
    console.log('Creating a checkbox tree with data: ', data, ' and accessors: ', accessors)

    return _.map(data, (d, key) => {
      return <CheckboxTreeItem
        item={d}
        depth={0}
        key={key}
        accessors={accessors}
        ref={this.pushChildToRef}
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
