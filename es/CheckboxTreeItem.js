var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React, { Component } from 'react';

var style = function style(depth) {
    return { marginLeft: depth * 30 + 'px' };
};

var CheckboxTreeItem = function (_Component) {
    _inherits(CheckboxTreeItem, _Component);

    function CheckboxTreeItem(props) {
        _classCallCheck(this, CheckboxTreeItem);

        // Populate the state of this item with these items
        // they can be variable and have shortcuts
        var _this = _possibleConstructorReturn(this, _Component.call(this, props));
        // Call base constructor from React.Component


        _this.childCheckboxItems = [];

        _this.onCheckToggle = function (e) {
            var isChecked = _this.state.isChecked;

            var newState = e ? e.target.checked : !isChecked;

            // Set checked state for this element and all children
            _this.setCheckedState(newState, _this.afterCheckStateChanged);
        };

        _this.addChildRef = function (ref) {
            _this.childCheckboxItems.push(ref);
        };

        _this.state = {
            label: props.item[props.accessors[props.depth].label],
            value: props.item[props.accessors[props.depth].value],
            children: props.item[props.accessors[props.depth].leaves],
            type: props.accessors[props.depth].type,
            isChecked: props.checked ? props.checked : false,
            isExpanded: false,
            isLeaf: props.accessors[props.depth].leaves == null

            // Assign a local callback function binding i to current object
        };_this.onCheckToggle = _this.onCheckToggle.bind(_this);
        _this.setCheckedState = _this.setCheckedState.bind(_this);
        _this.getBranchValueFunction = _this.getBranchValue.bind(_this);
        _this.afterCheckStateChanged = _this.afterCheckStateChanged.bind(_this);
        return _this;
    }

    CheckboxTreeItem.prototype.getBranchValue = function getBranchValue() {
        var _state = this.state,
            children = _state.children,
            type = _state.type,
            isChecked = _state.isChecked,
            value = _state.value;
        var _props = this.props,
            accessors = _props.accessors,
            depth = _props.depth;


        if (!children || this.getCheckedChildren().length == children.length) {
            return {
                type: type,
                values: isChecked ? [value] : []
            };
        }
        return {
            type: accessors[depth + 1].type,
            values: [],
            children: this.childCheckboxItems ? _.map(this.childCheckboxItems, function (c) {
                return c.getBranchValueFunction();
            }) : []
        };
    };

    CheckboxTreeItem.prototype.getCheckedChildren = function getCheckedChildren() {
        return this.state.children ? this.state.children.filter(function (c) {
            return c.isChecked === true;
        }) : [];
    };

    CheckboxTreeItem.prototype.setChildCheckedState = function setChildCheckedState(id, state) {
        this.state.children[id].isChecked = state;
    };

    CheckboxTreeItem.prototype.setCheckedState = function setCheckedState(state, callback) {
        var _this2 = this;

        var children = this.state.children;

        // Change the state of isChecked input box for the item

        this.setState(_extends({}, this.state, { isChecked: state }), function () {
            return callback ? callback(state) : '';
        });

        // Set all child items checked
        if (children) _.map(children, function (c, id) {
            return _this2.setChildCheckedState(id, state);
        });

        // If it is expanded then change the state of all children
        // And also set isChecked for every child
        // Object can only be in epanded state if it has children
        if (children) {
            //isExpanded
            _.map(this.childCheckboxItems, function (c) {
                return c.setCheckedState(state);
            });
        }
    };

    CheckboxTreeItem.prototype.afterCheckStateChanged = function afterCheckStateChanged(state) {
        var _props2 = this.props,
            parent = _props2.parent,
            id = _props2.id;

        // Set this item as checked in the parent

        if (parent && parent.setChildCheckedState) parent.setChildCheckedState(id, state);

        // Trigger tree update event
        this.props.treeUpdateTrigger();
    };

    CheckboxTreeItem.prototype.renderExpandButton = function renderExpandButton() {
        var _this3 = this;

        var _state2 = this.state,
            isExpanded = _state2.isExpanded,
            isLeaf = _state2.isLeaf;


        if (isLeaf) return '';

        return React.createElement(
            'span',
            { onClick: function onClick() {
                    return _this3.setState(_extends({}, _this3.state, { isExpanded: !isExpanded }));
                }, className: 'arrow' },
            isExpanded ? '-' : '+'
        );
    };

    CheckboxTreeItem.prototype.renderChildren = function renderChildren() {
        var _this4 = this;

        var _state3 = this.state,
            children = _state3.children,
            isChecked = _state3.isChecked;
        var _props3 = this.props,
            accessors = _props3.accessors,
            depth = _props3.depth,
            treeUpdateTrigger = _props3.treeUpdateTrigger;


        if (!children) return '';
        // this.childCheckboxItems = []

        // Render all the children
        return _.map(children, function (d, key) {
            return React.createElement(CheckboxTreeItem, { key: key, id: key, ref: _this4.addChildRef, item: d, accessors: accessors, depth: depth + 1, parent: _this4, checked: isChecked || d.isChecked, treeUpdateTrigger: treeUpdateTrigger });
        });
    };

    CheckboxTreeItem.prototype.render = function render() {
        var _state4 = this.state,
            label = _state4.label,
            isChecked = _state4.isChecked,
            isExpanded = _state4.isExpanded;
        var depth = this.props.depth;

        // Render current item and all children

        return React.createElement(
            'div',
            { style: style(depth), className: 'checkbox-item' },
            this.renderExpandButton(),
            React.createElement('input', { type: 'checkbox', onChange: this.onCheckToggle, checked: isChecked }),
            label,
            React.createElement('br', null),
            React.createElement(
                'div',
                { style: isExpanded ? {} : { display: 'none' } },
                this.renderChildren()
            )
        );
    };

    return CheckboxTreeItem;
}(Component);

export default CheckboxTreeItem;