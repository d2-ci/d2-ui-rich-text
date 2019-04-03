'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = function (_Component) {
    (0, _inherits3.default)(Editor, _Component);

    function Editor(props) {
        (0, _classCallCheck3.default)(this, Editor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Editor.__proto__ || (0, _getPrototypeOf2.default)(Editor)).call(this, props));

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

            _this.setState((0, _defineProperty3.default)({}, prop, !_this.state[prop]));
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

        _this.state = (0, _extends3.default)({}, _this.defaultState, {
            element: null
        });
        return _this;
    }

    (0, _createClass3.default)(Editor, [{
        key: 'render',
        value: function render() {
            var children = this.props.children;


            return _react2.default.createElement(
                'div',
                { onKeyDown: this.onKeyDown },
                children
            );
        }
    }]);
    return Editor;
}(_react.Component);

Editor.defaultProps = {
    onEdit: null
};

Editor.propTypes = {
    onEdit: _propTypes2.default.func
};

exports.default = Editor;