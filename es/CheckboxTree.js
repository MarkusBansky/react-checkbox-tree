var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { CheckboxTreeItem } from './CheckboxTreeItem';
import { constructItemProperties } from './helperFunctions';

var CheckboxTree = function (_React$Component) {
  _inherits(CheckboxTree, _React$Component);

  function CheckboxTree(props) {
    _classCallCheck(this, CheckboxTree);

    // Set this node as a root for the tree
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.isRoot = true;
    // Define the checked field holding all checked nodes data
    _this.checked = {};

    // Bind methods
    _this.onUpdateTree = _this.onUpdateTree.bind(_this);
    return _this;
  }

  CheckboxTree.prototype.onUpdateTree = function onUpdateTree() {
    var _this2 = this;

    var _props = this.props,
        onChange = _props.onChange,
        accessors = _props.accessors;

    // Reset the checked state

    this.checked = {};
    _.each(accessors, function (a) {
      _this2.checked[a.type] = [];
    });

    // Get all data from child and insert into the checked status
    var values = this.refs.root.getValues();
    _.map(accessors, function (a) {
      if (values[a.type]) _this2.checked[a.type] = values[a.type];
    });

    // Debug all values selected in the tree
    console.log('Checked tree values: ' + JSON.stringify(this.checked));

    // If there is anything as a function for the change action
    // then run it with the data checked
    if (onChange) onChange(this.checked);
  };

  CheckboxTree.prototype.render = function render() {
    var _props2 = this.props,
        data = _props2.data,
        accessors = _props2.accessors;

    var foldedData = {
      label: 'root',
      value: 'root',
      children: data
    };
    var foldedAccessors = [{
      label: 'label',
      value: 'value',
      leaves: 'children',
      type: 'root'
    }].concat(accessors);
    var foldedParameters = constructItemProperties(foldedData, foldedAccessors, 0, 'unchecked');

    return React.createElement(
      'div',
      { className: 'checkbox-tree' },
      React.createElement(CheckboxTreeItem, _extends({
        id: 0,
        ref: 'root',
        onUpdateTree: this.onUpdateTree,
        checkboxPlusIcon: this.props.checkboxPlusIcon,
        checkboxMinusIcon: this.props.checkboxMinusIcon
      }, foldedParameters))
    );
  };

  return CheckboxTree;
}(React.Component);

CheckboxTree.propTypes = process.env.NODE_ENV !== "production" ? {
  data: PropTypes.array.isRequired,
  accessors: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  checkboxPlusIcon: PropTypes.object,
  checkboxMinusIcon: PropTypes.object
} : {};

export default CheckboxTree;