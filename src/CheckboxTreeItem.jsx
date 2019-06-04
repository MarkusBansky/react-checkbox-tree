import _ from 'lodash'
import React, { Component } from 'react'
import update from 'react-addons-update'

var DEBUG = 1;

const style = (depth) => {
    return { marginLeft: `${depth*30}px` }
}

class CheckboxTreeItem extends Component {
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
    }

    getBranchValue() {
        if (!this.state.children) return {}

        if (this.getCheckedChildren().length == this.state.children.length)
        {
            return {
                type: this.state.type,
                values: [this.state.value]
            }
        }
        return {
            type: this.props.accessors[this.props.depth + 1].type,
            values: this.getCheckedChildren().map(c => c[this.props.accessors[this.props.depth + 1].value]),
            children: this.state.childCheckboxItems ? this.state.childCheckboxItems.map(c => c.getBranchValue()) : ['none']
        }
    }

    getCheckedChildren() {
        return this.state.children ? this.state.children.filter(c => c.isChecked) : []
    }

    setChildCheckedState(id, state) {
        this.state.children[id].isChecked = state
    }

    onCheckToggle = (e) => {
        const { isChecked, isExpanded, children } = this.state
        const { parent, id } = this.props
        const newState = e ? e.target.checked : !isChecked

        // Change the state of isChecked input box for the item
        this.setState({ ...this.state, isChecked: newState })

        // Set this item as checked in the parent
        if (parent && parent.setChildCheckedState)
            parent.setChildCheckedState(id, newState)
        
        // Set all child items checked
        if (children)
            children.map((c, id) => this.setChildCheckedState(id, newState))
        
        // If it is expanded then change the state of all children
        // And also set isChecked for every child
        // Object can only be in epanded state if it has children
        if (isExpanded) {
            this.childCheckboxItems.map(c => c.onCheckToggle({ target: { checked: newState}}))
        }

        // Trigger tree update event
        this.props.treeUpdateTrigger()
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
        const { children, isChecked, isExpanded } = this.state
        const { accessors, depth, treeUpdateTrigger } = this.props

        if (!isExpanded) return ''
        this.childCheckboxItems = []

        // Render all the children
        return children.map((d, key) => {
            return <CheckboxTreeItem key={key} id={key} ref={this.addChildRef} item={d} accessors={accessors} depth={depth + 1} parent={this} checked={isChecked || d.isChecked} treeUpdateTrigger={treeUpdateTrigger} />
        })
    }

    render() {
        const { label, isChecked } = this.state
        const { depth } = this.props

        // Render current item and all children
        return <div style={style(depth)} className='checkbox-item'>
            {this.renderExpandButton()}
            <input type='checkbox' onChange={this.onCheckToggle} checked={isChecked} />{label}<br />
            {this.renderChildren()}
        </div>
    }
}

export default CheckboxTreeItem
