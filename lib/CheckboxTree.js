'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CheckboxTreeItem = require('./CheckboxTreeItem');

var _helperFunctions = require('./helperFunctions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    _lodash2.default.each(accessors, function (a) {
      _this2.checked[a.type] = [];
    });

    // Get all data from child and insert into the checked status
    var values = _lodash2.default.map(this.childCheckboxItems, function (c) {
      return c.getValues();
    });
    _lodash2.default.map(values, function (v) {
      return _lodash2.default.map(accessors, function (a) {
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

    return _lodash2.default.map(data, function (d, key) {
      return _react2.default.createElement(_CheckboxTreeItem.CheckboxTreeItem, _extends({
        key: key,
        ref: _this3.pushChildToRef,
        onUpdateTree: _this3.onUpdateTree,
        checkboxPlusIcon: _this3.props.checkboxPlusIcon,
        checkboxMinusIcon: _this3.props.checkboxMinusIcon
      }, (0, _helperFunctions.constructItemProperties)(d, accessors, 0, 'unchecked')));
    });
  };

  CheckboxTree.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'checkbox-tree' },
      ' ',
      this.renderItems(),
      ' '
    );
  };

  return CheckboxTree;
}(_react2.default.Component);

CheckboxTree.propTypes = process.env.NODE_ENV !== "production" ? {
  data: _propTypes2.default.array.isRequired,
  accessors: _propTypes2.default.array.isRequired,
  onChange: _propTypes2.default.func,
  checkboxPlusIcon: _propTypes2.default.object,
  checkboxMinusIcon: _propTypes2.default.object
} : {};

exports.default = CheckboxTree;
module.exports = exports['default'];