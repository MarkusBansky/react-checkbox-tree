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
    // Handle all the children nodes here
    _this.childCheckboxItems = [];

    // Bind methods
    _this.onUpdateTree = _this.onUpdateTree.bind(_this);
    _this.pushChildToRef = _this.pushChildToRef.bind(_this);
    return _this;
  }

  CheckboxTree.prototype.pushChildToRef = function pushChildToRef(ref) {
    this.childCheckboxItems.push(ref);
  };

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
    var values = _.map(this.childCheckboxItems, function (c) {
      return c.getValues();
    });
    _.map(values, function (v) {
      return _.map(accessors, function (a) {
        if (v[a.type]) _this2.checked[a.type] = v[a.type];
      });
    });

    // Debug all values selected in the tree
    console.log('Checked tree values: ' + JSON.stringify(this.checked));

    // If there is anything as a function for the change action
    // then run it with the data checked
    if (onChange) onChange(this.checked);
  };

  CheckboxTree.prototype.renderItems = function renderItems() {
    var _this3 = this;

    var _props2 = this.props,
        data = _props2.data,
        accessors = _props2.accessors;

    console.log('Creating a checkbox tree with data: ', data, ' and accessors: ', accessors);

    return _.map(data, function (d, key) {
      return React.createElement(CheckboxTreeItem, _extends({
        key: key,
        ref: _this3.pushChildToRef,
        onUpdateTree: _this3.onUpdateTree,
        checkboxPlusIcon: _this3.props.checkboxPlusIcon,
        checkboxMinusIcon: _this3.props.checkboxMinusIcon
      }, constructItemProperties(d, accessors, 0, 'unchecked')));
    });
  };

  CheckboxTree.prototype.render = function render() {
    return React.createElement(
      'div',
      { className: 'checkbox-tree' },
      ' ',
      this.renderItems(),
      ' '
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