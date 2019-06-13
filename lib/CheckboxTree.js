'use strict';

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CheckboxTreeItem = require('./CheckboxTreeItem');

var _CheckboxTreeItem2 = _interopRequireDefault(_CheckboxTreeItem);

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

    _this.pushChildToRef = function (ref) {
      _this.childCheckboxItems.push(ref);
    };

    _this.isRoot = true;
    // Define the checked field holding all checked nodes data
    _this.checked = {};
    // Handle all the children nodes here
    _this.childCheckboxItems = [];

    _this.treeStateUpdated = _this.treeStateUpdated.bind(_this);
    _this.recurrentTreeAnalysis = _this.recurrentTreeAnalysis.bind(_this);
    return _this;
  }

  CheckboxTree.prototype.treeStateUpdated = function treeStateUpdated() {
    var _this2 = this;

    var onChange = this.props.onChange;
    // Create a fresh new checked object

    this.checked = {};
    // Recurrently check the values in every child
    _lodash2.default.map(this.childCheckboxItems, function (c) {
      return _this2.recurrentTreeAnalysis(c.getBranchValueFunction());
    });

    // If there is anything as a function for the change action
    // then run it with the data checked
    if (onChange) onChange(this.checked);
  };

  CheckboxTree.prototype.recurrentTreeAnalysis = function recurrentTreeAnalysis(branch) {
    var _this3 = this;

    if (branch.values.length > 0) {
      var _checked$branch$type;

      if (!this.checked[branch.type]) this.checked[branch.type] = [];
      (_checked$branch$type = this.checked[branch.type]).push.apply(_checked$branch$type, branch.values);
    }
    _lodash2.default.map(branch.children, function (c) {
      return _this3.recurrentTreeAnalysis(c);
    });
  };

  CheckboxTree.prototype.renderItems = function renderItems() {
    var _this4 = this;

    var _props = this.props,
        data = _props.data,
        accessors = _props.accessors;

    console.log('Creating a checkbox tree with data: ', data, ' and accessors: ', accessors);

    return _lodash2.default.map(data, function (d, key) {
      return _react2.default.createElement(_CheckboxTreeItem2.default, {
        item: d,
        depth: 0,
        key: key,
        accessors: accessors,
        ref: _this4.pushChildToRef,
        treeUpdateTrigger: _this4.treeStateUpdated });
    });
  };

  CheckboxTree.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'checkbox-tree' },
      this.renderItems()
    );
  };

  return CheckboxTree;
}(_react2.default.Component);

exports.default = CheckboxTree;
module.exports = exports['default'];