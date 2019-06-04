import _ from 'lodash'
import React, { Component } from 'react'
import update from 'react-addons-update'

var DEBUG = 1;

const style = (depth) => {
    return { marginLeft: `${depth*30}px` }
}

class CheckboxTreeItem extends Component {
    childCheckboxItems = []

    constructor(props) {
        // Call base constructor from React.Component
        super(props)

        // Populate the state of this item with these items
        // they can be variable and have shortcuts
        this.state = {
            label: props.item[props.accessors[props.depth].label],
            value: props.item[props.accessors[props.depth].value],
            children: props.item[props.accessors[props.depth].leaves],
            type: props.accessors[props.depth].type,
            isChecked: props.checked ? props.checked : false,
            isExpanded: false,
            isLeaf: props.accessors[props.depth].leaves == null
        }

        // Assign a local callback function binding i to current object
        this.onCheckToggle = this.onCheckToggle.bind(this)
        this.setCheckedState = this.setCheckedState.bind(this)
        this.getBranchValueFunction = this.getBranchValue.bind(this)
        this.afterCheckStateChanged = this.afterCheckStateChanged.bind(this)
    }

    getBranchValue() {
        const { children, type, isChecked, value } = this.state
        const { accessors, depth } = this.props

        if (!children || this.getCheckedChildren().length == children.length)
        {
            return {
                type: type,
                values: isChecked ? [value] : []
            }
        }
        return {
            type: accessors[depth + 1].type,
            values: [],
            children: this.childCheckboxItems ? this.childCheckboxItems.map(c => c.getBranchValueFunction()) : []
        }
    }

    getCheckedChildren() {
        return this.state.children ? this.state.children.filter(c => c.isChecked === true) : []
    }

    setChildCheckedState(id, state) {
        this.state.children[id].isChecked = state
    }

    setCheckedState(state, callback) {
        const { children } = this.state

        // Change the state of isChecked input box for the item
        this.setState({ ...this.state, isChecked: state }, () => callback ?callback(state) : '')
        
        // Set all child items checked
        if (children)
            children.map((c, id) => this.setChildCheckedState(id, state))

        // If it is expanded then change the state of all children
        // And also set isChecked for every child
        // Object can only be in epanded state if it has children
        if (children) { //isExpanded
            this.childCheckboxItems.map(c => c.setCheckedState(state))
        }
    }

    afterCheckStateChanged(state) {
        const { parent, id } = this.props

        // Set this item as checked in the parent
        if (parent && parent.setChildCheckedState)
            parent.setChildCheckedState(id, state)

        // Trigger tree update event
        this.props.treeUpdateTrigger()
    }

    onCheckToggle = (e) => {
        const { isChecked } = this.state
        const newState = e ? e.target.checked : !isChecked

        // Set checked state for this element and all children
        this.setCheckedState(newState, this.afterCheckStateChanged)
    }

    renderExpandButton() {
        const { isExpanded, isLeaf } = this.state

        if(isLeaf) return ''

        return <span onClick={() => this.setState({ ...this.state, isExpanded: !isExpanded })} className='arrow'>
            {isExpanded?'-':'+'}
        </span>
    }

    addChildRef = (ref) => {
        this.childCheckboxItems.push(ref)
    }

    renderChildren() {
        const { children, isChecked } = this.state
        const { accessors, depth, treeUpdateTrigger } = this.props
        
        if (!children) return ''
        // this.childCheckboxItems = []

        // Render all the children
        return children.map((d, key) => {
            return <CheckboxTreeItem key={key} id={key} ref={this.addChildRef} item={d} accessors={accessors} depth={depth + 1} parent={this} checked={isChecked || d.isChecked} treeUpdateTrigger={treeUpdateTrigger} />
        })
    }

    render() {
        const { label, isChecked, isExpanded } = this.state
        const { depth } = this.props

        // Render current item and all children
        return <div style={style(depth)} className='checkbox-item'>
            {this.renderExpandButton()}
            <input type='checkbox' onChange={this.onCheckToggle} checked={isChecked} />{label}<br />
            <div style={isExpanded ? {} : {display:'none'}}>
                {this.renderChildren()}
            </div>
        </div>
    }
}

export default CheckboxTreeItem
