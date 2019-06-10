import _ from 'lodash'
import React, { Component } from 'react'
import CheckboxTreeItem from './CheckboxTreeItem';
import './style.css'

class CheckboxTree extends Component {
    constructor(props) {
        super(props)

        this.childCheckboxItems = []
        this.checked = {}

        // Set this node as a root for the tree
        this.isRoot = true;

        this.addChildRef = this.addChildRef.bind(this)
        this.treeStateUpdated = this.treeStateUpdated.bind(this)
        this.recurrentTreeAnalysis = this.recurrentTreeAnalysis.bind(this)

        this.state = {
            dataAccessors: props.accessors
        }
    }

    treeStateUpdated() {
        const { onChange } = this.props

        this.checked = {}
        this.childCheckboxItems.map(c => this.recurrentTreeAnalysis(c.getBranchValueFunction()))

        if (onChange) onChange(this.checked)

        // console.log(this.checked)
    }

    recurrentTreeAnalysis(branch) {
        if (branch.values.length > 0) {
            if (!this.checked[branch.type]) this.checked[branch.type] = []
            this.checked[branch.type].push(...branch.values)
        }
        if (branch.children) {
            branch.children.map(c => this.recurrentTreeAnalysis(c))
        }
    }

    addChildRef(ref) {
        this.childCheckboxItems.push(ref)
    }

    renderItems() {
        const { dataAccessors } = this.state
        const { data } = this.props

        return _.map(data, (d, key) => {
            return <CheckboxTreeItem key={key} ref={this.addChildRef} item={d} accessors={dataAccessors} depth={0} treeUpdateTrigger={this.treeStateUpdated} />
        })
    }

    render() {
        return <div className='checkbox-tree'>
            {this.renderItems()}
        </div>
    }
}

export default CheckboxTree
