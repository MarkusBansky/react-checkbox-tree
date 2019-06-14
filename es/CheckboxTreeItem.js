var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { constructItemProperties } from './helperFunctions';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

var style = function style(depth) {
  return { marginLeft: depth * 15 + 'px' };
};

export var CheckboxTreeItem = function (_React$Component) {
  _inherits(CheckboxTreeItem, _React$Component);

  function CheckboxTreeItem(props) {
    _classCallCheck(this, CheckboxTreeItem);

    // Populate the state of this item with these items
    // they can be variable and have shortcuts
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));
    // Call base constructor from React.Component


    _this.state = {
      checkedState: props.checked ? props.checked : 'unchecked',
      isExpanded: false

      // Set if this is a leaf
    };_this.isLeaf = !(_this.props.children && _this.props.children.length > 0);
    _this.childCheckboxItems = [];

    // Assign a local callback function binding i to current object
    _this.onCheckToggle = _this.onCheckToggle.bind(_this);
    _this.setCheckedState = _this.setCheckedState.bind(_this);
    _this.getValues = _this.getValues.bind(_this);
    _this.addChildRef = _this.addChildRef.bind(_this);
    _this.afterCheckStateChanged = _this.afterCheckStateChanged.bind(_this);
    _this.setChildCheckedState = _this.setChildCheckedState.bind(_this);
    _this.setItemCheckedStateInParent = _this.setItemCheckedStateInParent.bind(_this);
    return _this;
  }

  CheckboxTreeItem.prototype.getValues = function getValues() {
    var checkedState = this.state.checkedState;
    var _props = this.props,
        accessors = _props.accessors,
        type = _props.type,
        value = _props.value;


    var values = {};

    if (checkedState === 'checked') {
      values[type] = [value];
    } else {
      var childValues = _.map(this.childCheckboxItems.filter(function (c) {
        return c.checkedState !== 'unchecked';
      }), function (c) {
        return c.getValues();
      });

      _.map(childValues, function (c) {
        return _.map(accessors, function (a) {
          if (!values[a.type]) values[a.type] = [];
          if (c[a.type]) values[a.type] = values[a.type].concat(c[a.type]);
        });
      });
    }

    return values;
  };

  CheckboxTreeItem.prototype.setItemCheckedStateInParent = function setItemCheckedStateInParent(id, state, callback) {
    var parent = this.props.parent;

    if (parent && parent.setChildCheckedState) {
      parent.setChildCheckedState(id, state, callback);
    } else if (callback) callback();
  };

  CheckboxTreeItem.prototype.setChildCheckedState = function setChildCheckedState(id, state, callback) {
    var _this2 = this;

    // This method runs from a child only
    // meaning that the current *this* instance is their parent
    // and the id is the number of the caller child in children of this
    this.props.children[id].checkedState = state;

    // Get number of checked children
    var numberOfCheckedChildren = this.props.children.filter(function (c) {
      return c.checkedState === 'checked';
    }).length;

    // Get number of children that are not unchecked
    var numberOfNotUncheckedChildren = this.props.children.filter(function (c) {
      return c.checkedState && c.checkedState !== 'unchecked';
    }).length;

    // If checked children are all then set parent as checked an
    var newState = 'unchecked';
    if (numberOfCheckedChildren === this.props.children.length) {
      newState = 'checked';
    } else if (numberOfNotUncheckedChildren > 0) {
      newState = 'indeterminate';
    }

    // Change state in the parent only if current state is different than before
    if (newState !== this.state.checkedState) {
      this.setState(_extends({}, this.state, { checkedState: newState }),
      // Go to parent and set parent child checked
      function () {
        return _this2.setItemCheckedStateInParent(_this2.props.id, newState, callback);
      });
    } else if (callback) {
      callback();
    }
  };

  CheckboxTreeItem.prototype.setCheckedState = function setCheckedState(state, callback) {
    var _this3 = this;

    var children = this.props.children;

    // Change the state of checkedState input box for the item

    this.setState(_extends({}, this.state, { checkedState: state }), function () {
      return callback ? callback(state) : '';
    });

    // Set all child items checked
    if (children) {
      _.map(children, function (c, id) {
        return _this3.setChildCheckedState(id, state);
      });
    }

    // If it is expanded then change the state of all children
    // And also set checkedState for every child
    // Object can only be in epanded state if it has children
    if (children) {
      // isExpanded
      _.map(this.childCheckboxItems, function (c) {
        return c.setCheckedState(state);
      });
    }
  };

  CheckboxTreeItem.prototype.afterCheckStateChanged = function afterCheckStateChanged(state) {
    var id = this.props.id;

    // Set this item as checked in the parent

    this.setItemCheckedStateInParent(id, state,
    // Trigger tree update event
    this.props.onUpdateTree);
  };

  CheckboxTreeItem.prototype.onCheckToggle = function onCheckToggle(e) {
    var newState = e && e.target.checked ? 'checked' : 'unchecked';

    // Set checked state for this element and all children
    this.setCheckedState(newState, this.afterCheckStateChanged);
  };

  CheckboxTreeItem.prototype.renderExpandButton = function renderExpandButton() {
    var _this4 = this;

    var isExpanded = this.state.isExpanded;


    if (this.isLeaf) return '';

    var plus = this.props.checkboxPlusIcon ? this.props.checkboxPlusIcon : '+';
    var minus = this.props.checkboxMinusIcon ? this.props.checkboxMinusIcon : '-';

    return React.createElement(
      'span',
      {
        onClick: function onClick() {
          return _this4.setState(_extends({}, _this4.state, { isExpanded: !isExpanded }));
        },
        className: 'arrow' },
      isExpanded ? minus : plus
    );
  };

  CheckboxTreeItem.prototype.addChildRef = function addChildRef(ref) {
    this.childCheckboxItems.push(ref);
  };

  CheckboxTreeItem.prototype.renderChildren = function renderChildren() {
    var _this5 = this;

    var _state = this.state,
        checkedState = _state.checkedState,
        isExpanded = _state.isExpanded;
    var _props2 = this.props,
        accessors = _props2.accessors,
        depth = _props2.depth,
        onUpdateTree = _props2.onUpdateTree,
        children = _props2.children;


    if (!isExpanded) return '';

    // Render all the children
    return _.map(children, function (d, key) {
      var childState = checkedState === 'checked' || d.checkedState === 'checked' ? 'checked' : d.checkedState === 'indeterminate' ? 'indetermined' : 'unchecked';
      return React.createElement(CheckboxTreeItem, _extends({
        id: key,
        key: key,
        ref: _this5.addChildRef,
        parent: _this5,
        onUpdateTree: onUpdateTree,
        checkboxPlusIcon: _this5.props.checkboxPlusIcon,
        checkboxMinusIcon: _this5.props.checkboxMinusIcon
      }, constructItemProperties(d, accessors, depth + 1, childState)));
    });
  };

  CheckboxTreeItem.prototype.render = function render() {
    var _state2 = this.state,
        checkedState = _state2.checkedState,
        isExpanded = _state2.isExpanded;
    var _props3 = this.props,
        depth = _props3.depth,
        label = _props3.label,
        id = _props3.id;

    // Render current item and all children

    return React.createElement(
      'div',
      { style: style(depth), className: 'checkbox-item' },
      this.renderExpandButton(),
      React.createElement(
        'div',
        {
          className: 'custom-control custom-checkbox',
          style: { margin: '2px 6px', display: 'inline-block' } },
        React.createElement('input', {
          type: 'checkbox',
          id: label + '-' + id,
          onChange: this.onCheckToggle,
          checked: checkedState === 'checked',
          className: 'custom-control-input',
          ref: function ref(el) {
            return el && (el.indeterminate = checkedState === 'indeterminate');
          } }),
        React.createElement(
          'label',
          { className: 'custom-control-label', htmlFor: label + '-' + id },
          label
        )
      ),
      React.createElement('br', null),
      React.createElement(
        'div',
        { style: isExpanded ? {} : { display: 'none' } },
        this.renderChildren()
      )
    );
  };

  return CheckboxTreeItem;
}(React.Component);

CheckboxTreeItem.propTypes = process.env.NODE_ENV !== "production" ? {
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
} : {};