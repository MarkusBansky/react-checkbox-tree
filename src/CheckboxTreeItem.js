import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { constructItemProperties } from './helperFunctions'

const style = (depth) => { return { marginLeft: `${(depth - 1) * 15}px` } }

export class CheckboxTreeItem extends React.Component {
  constructor (props) {
    // Call base constructor from React.Component
    super(props)

    // Populate the state of this item with these items
    // they can be variable and have shortcuts
    this.state = {
      checkedState: props.checked ? props.checked : 'unchecked',
      isExpanded: this.props.type === 'root'
    }

    // Set if this is a leaf
    this.isLeaf = !(this.props.children && this.props.children.length > 0)
    this.childCheckboxItems = []

    // Assign a local callback function binding i to current object
    this.onCheckToggle = this.onCheckToggle.bind(this)
    this.setCheckedState = this.setCheckedState.bind(this)
    this.getValues = this.getValues.bind(this)
    this.addChildRef = this.addChildRef.bind(this)
    this.afterCheckStateChanged = this.afterCheckStateChanged.bind(this)
    this.setChildCheckedState = this.setChildCheckedState.bind(this)
    this.setItemCheckedStateInParent = this.setItemCheckedStateInParent.bind(this)
  }

  getValues () {
    const { checkedState } = this.state
    const { accessors, type, value } = this.props

    let values = {}

    if (checkedState === 'checked' && type !== 'root') {
      values[type] = [value]
    } else {
      let childValues = _.map(this.childCheckboxItems.filter(c => c.checkedState !== 'unchecked'), c => c.getValues())

      _.map(childValues, c => _.map(accessors, a => {
        if (!values[a.type]) values[a.type] = []
        if (c[a.type]) values[a.type] = values[a.type].concat(c[a.type])
      }))
    }

    return values
  }

  setItemCheckedStateInParent (id, state, callback) {
    const { parent } = this.props
    if (parent && parent.setChildCheckedState) {
      parent.setChildCheckedState(id, state, callback)
    } else if (callback) callback()
  }

  setChildCheckedState (id, state, callback) {
    // This method runs from a child only
    // meaning that the current *this* instance is their parent
    // and the id is the number of the caller child in children of this
    this.props.children[id].checkedState = state

    // Get number of checked children
    let numberOfCheckedChildren = this.props.children.filter(c => c.checkedState === 'checked').length

    // Get number of children that are not unchecked
    let numberOfNotUncheckedChildren = this.props.children.filter(c => c.checkedState && c.checkedState !== 'unchecked').length

    // If checked children are all then set parent as checked an
    let newState = 'unchecked'
    if (numberOfCheckedChildren === this.props.children.length) {
      newState = 'checked'
    } else if (numberOfNotUncheckedChildren > 0) {
      newState = 'indeterminate'
    }

    // if (newState === 'unchecked' || newState !== this.state.checkedState) {
    this.setState(
      { ...this.state, checkedState: newState },
      // Go to parent and set parent child checked
      () => this.setItemCheckedStateInParent(
        this.props.id,
        newState,
        callback))
    // } else if (callback) {
    //   callback()
    // }
  }

  setCheckedState (state, callback) {
    const { isExpanded } = this.state
    const { children } = this.props

    // Change the state of checkedState input box for the item
    this.setState(
      { ...this.state, checkedState: state },
      () => callback ? callback(state) : '')

    // Set all child items checked
    if (children) {
      _.map(children, (c, id) => this.setChildCheckedState(id, state))
    }

    // If it is expanded then change the state of all children
    // And also set checkedState for every child
    // Object can only be in epanded state if it has children
    if (isExpanded && children && this.childCheckboxItems) { // isExpanded
      _.map(this.childCheckboxItems, c => c.setCheckedState(state))
    }
  }

  afterCheckStateChanged (state) {
    const { id } = this.props

    // Set this item as checked in the parent
    this.setItemCheckedStateInParent(
      id,
      state,
      // Trigger tree update event
      this.props.onUpdateTree)
  }

  onCheckToggle (e) {
    const newState = e && e.target.checked ? 'checked' : 'unchecked'

    // Set checked state for this element and all children
    this.setCheckedState(newState, this.afterCheckStateChanged)
  }

  renderExpandButton () {
    const { isExpanded } = this.state

    if (this.isLeaf) return ''

    let plus = this.props.checkboxPlusIcon ? this.props.checkboxPlusIcon : '+'
    let minus = this.props.checkboxMinusIcon ? this.props.checkboxMinusIcon : '-'

    return <span
      onClick={() => this.setState({ ...this.state, isExpanded: !isExpanded })}>
      {isExpanded ? minus : plus}
    </span>
  }

  addChildRef (ref) {
    this.childCheckboxItems.push(ref)
  }

  renderChildren () {
    const { checkedState, isExpanded } = this.state
    const { accessors, depth, onUpdateTree, children } = this.props

    if (!isExpanded) {
      this.childCheckboxItems = []
      return ''
    }

    // Render all the children
    return _.map(children, (d, key) => {
      let childState =
        checkedState === 'checked' || d.checkedState === 'checked' ? 'checked'
          : d.checkedState === 'indeterminate' ? 'indetermined' : 'unchecked'
      return <CheckboxTreeItem
        id={key}
        key={key}
        ref={this.addChildRef}
        parent={this}
        onUpdateTree={onUpdateTree}
        checkboxPlusIcon={this.props.checkboxPlusIcon}
        checkboxMinusIcon={this.props.checkboxMinusIcon}
        {...constructItemProperties(d, accessors, depth + 1, childState)}
      />
    })
  }

  render () {
    const { checkedState, isExpanded } = this.state
    const { depth, label, id } = this.props

    if (this.props.type === 'root') {
      return this.renderChildren()
    }

    // Render current item and all children
    return <div style={style(depth)} className='checkbox-item'>
      {this.renderExpandButton()}
      <div
        className='custom-control custom-checkbox'
        style={{ margin: '2px 6px', display: 'inline-block' }}>
        <input
          type='checkbox'
          id={`${label}-${id}`}
          onChange={this.onCheckToggle}
          checked={checkedState === 'checked'}
          className='custom-control-input'
          ref={el => el && (el.indeterminate = checkedState === 'indeterminate')} />
        <label className='custom-control-label' htmlFor={`${label}-${id}`}>
          {label}
        </label>
      </div>
      <br />
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
  checked: PropTypes.string,
  accessors: PropTypes.array,
  parent: PropTypes.object,
  onUpdateTree: PropTypes.func.isRequired,
  checkboxPlusIcon: PropTypes.object,
  checkboxMinusIcon: PropTypes.object
}
