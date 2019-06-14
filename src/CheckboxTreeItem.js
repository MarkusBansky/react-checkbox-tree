import _ from 'lodash'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { constructItemProperties } from './helperFunctions'

const style = (depth) => {
  return {
    marginLeft: `${depth * 30}px`
  }
}

export class CheckboxTreeItem extends Component {
  childCheckboxItems = []

  constructor(props) {
    // Call base constructor from React.Component
    super(props)

    // Populate the state of this item with these items
    // they can be variable and have shortcuts
    this.state = {
      checkedState: props.checked ? props.checked : 'unchecked',
      isExpanded: false,
    }

    this.isLeaf = !(this.props.children && this.props.children.length > 0)

    // Assign a local callback function binding i to current object
    this.onCheckToggle = this.onCheckToggle.bind(this)
    this.setCheckedState = this.setCheckedState.bind(this)
    this.getBranchValueFunction = this.getBranchValue.bind(this)
    this.afterCheckStateChanged = this.afterCheckStateChanged.bind(this)
  }

  getValues() {
    const { isChecked } = this.state
    const { accessors, depth, children, type, value } = this.props

    let values = {}

    if (isChecked) {
      values[type] = [value]
    } else {
      let childValues = _.map(children.filter(c => c.checkedState !== 'unchecked'), c => c.getValues())
      _.map(accessors, a => {
        if (!values[a.type]) values[a.type] = []
        if (childValues[a.type]) values[a.type].push(childValues[a.type])
      })
    }

    console.log('Values of: ', value, ', are: ', values)
    return values
  }

  setChildCheckedState(id, state) {
    this.props.children[id].isChecked = state
  }

  setCheckedState(state, callback) {
    const { children } = this.props

    // Change the state of isChecked input box for the item
    this.setState({ ...this.state, isChecked: state }, () => callback ? callback(state) : '')

    // Set all child items checked
    if (children)
      _.map(children, (c, id) => this.setChildCheckedState(id, state))

    // If it is expanded then change the state of all children
    // And also set isChecked for every child
    // Object can only be in epanded state if it has children
    if (children) { //isExpanded
      _.map(this.childCheckboxItems, c => c.setCheckedState(state))
    }
  }

  afterCheckStateChanged(state) {
    const { parent, id, type, value } = this.props

    // Set this item as checked in the parent
    if (parent && parent.setChildCheckedState)
      parent.setChildCheckedState(id, state)

    // Trigger tree update event
    this.props.onUpdateTree(type, value, state)
  }

  onCheckToggle = (e) => {
    const { isChecked } = this.state
    const newState = e ? e.target.checked : !isChecked

    // Set checked state for this element and all children
    this.setCheckedState(newState, this.afterCheckStateChanged)
  }

  renderExpandButton() {
    const { isExpanded } = this.state

    if (this.isLeaf) return ''

    return <span onClick={() => this.setState({ ...this.state, isExpanded: !isExpanded })} className='arrow' > {isExpanded ? '-' : '+'} /></span>
  }

  addChildRef = (ref) => {
    this.childCheckboxItems.push(ref)
  }

  renderChildren() {
    const { isChecked, isExpanded } = this.state
    const { accessors, depth, onUpdateTree, children, label } = this.props

    console.log(`Rendering children for ${label}, depth: ${depth}, accessors: `, accessors, ', children: ', children)

    if (!isExpanded) return ''

    // Render all the children
    return _.map(children, (d, key) => {
      return <CheckboxTreeItem
        id={key}
        key={key}
        ref={this.addChildRef}
        onUpdateTree={onUpdateTree} {...constructItemProperties(d, accessors, depth + 1, isChecked)}
      />
    })
  }

  render() {
    const { isChecked, isExpanded } = this.state
    const { depth, label } = this.props

    // Render current item and all children
    return <div style={style(depth)} className='checkbox-item'>
      {this.renderExpandButton()}
      <input type='checkbox' onChange={this.onCheckToggle} checked={isChecked} />{label}<br />
      <div style={isExpanded ? {} : { display: 'none' }}>
        {this.renderChildren()}
      </div>
    </div>
  }
}

CheckboxTreeItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  children: PropTypes.array,
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  accessors: PropTypes.array,
  onUpdateTree: PropTypes.func.isRequired
}