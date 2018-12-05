import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import convertCtrlKey from './convertCtrlKey';

var Editor = function (_Component) {
    _inherits(Editor, _Component);

    function Editor() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Editor);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Editor.__proto__ || _Object$getPrototypeOf(Editor)).call.apply(_ref, [this].concat(args))), _this), _this.onKeyDown = function (event) {
            convertCtrlKey(event, _this.props.onEdit);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Editor, [{
        key: 'render',
        value: function render() {
            var children = this.props.children;


            return React.createElement(
                'div',
                { onKeyDown: this.onKeyDown },
                children
            );
        }
    }]);

    return Editor;
}(Component);

Editor.defaultProps = {
    onEdit: null
};

Editor.propTypes = {
    onEdit: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default Editor;