import _ from 'lodash'
import React, { Component } from 'react'
import CheckboxTreeItem from './CheckboxTreeItem';

class CheckboxTree extends Component {
    constructor(props) {
        super(props)

        // Set this node as a root for the tree
        this.isRoot = true;
        this.treeStateUpdated = this.treeStateUpdated.bind(this)

        this.state = {
            data: props.data,
            dataAccessors: props.accessors
        }
    }

    treeStateUpdated() {
        console.log('Triggering tree update event. This is the latest state:')
        this.childCheckboxItems.map(c => console.log('Branch: ', c.getBranchValue()))
    }

    addChildRef = (ref) => {
        this.childCheckboxItems.push(ref)
    }

    renderItems() {
        const { data, dataAccessors } = this.state
        this.childCheckboxItems = []

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
