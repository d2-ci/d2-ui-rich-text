import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var Editor = function (_Component) {
    _inherits(Editor, _Component);

    function Editor(props) {
        _classCallCheck(this, Editor);

        var _this = _possibleConstructorReturn(this, (Editor.__proto__ || _Object$getPrototypeOf(Editor)).call(this, props));

        _this.onKeyDown = function (event) {
            var key = event.key,
                ctrlKey = event.ctrlKey,
                metaKey = event.metaKey;

            var element = event.target;

            _this.setState({ element: element });

            // bold
            if (key === 'b' && (ctrlKey || metaKey)) {
                _this.insertMarkers('bold');
                // italic
            } else if (key === 'i' && (ctrlKey || metaKey)) {
                _this.insertMarkers('italic');
            }
        };

        _this.toggleMode = function (mode) {
            var prop = mode + 'Mode';

            _this.setState(_defineProperty({}, prop, !_this.state[prop]));
        };

        _this.insertMarkers = function (mode) {
            var element = _this.state.element;
            var selectionStart = element.selectionStart,
                selectionEnd = element.selectionEnd,
                value = element.value;


            _this.toggleMode(mode);

            var marker = void 0;

            switch (mode) {
                case 'italic':
                    marker = '_';
                    break;
                case 'bold':
                    marker = '*';
                    break;
                default:
                    return;
            }

            var newValue = void 0;

            if (selectionStart >= 0 && selectionStart === selectionEnd) {
                newValue = '' + value + marker;
            } else if (selectionStart >= 0) {
                newValue = [value.slice(0, selectionStart), value.slice(selectionStart, selectionEnd), value.slice(selectionEnd)].join(marker);

                _this.toggleMode(mode);
            }

            if (_this.props.onEdit) {
                _this.props.onEdit(newValue);
            }
        };

        _this.defaultState = {
            boldMode: false,
            italicMode: false
        };

        _this.state = _extends({}, _this.defaultState, {
            element: null
        });
        return _this;
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
    onEdit: PropTypes.func
};

export default Editor;