'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _MdParser = require('./MdParser');

var _MdParser2 = _interopRequireDefault(_MdParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parser = function (_Component) {
    (0, _inherits3.default)(Parser, _Component);

    function Parser(props) {
        (0, _classCallCheck3.default)(this, Parser);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Parser.__proto__ || (0, _getPrototypeOf2.default)(Parser)).call(this, props));

        _this.MdParser = new _MdParser2.default();
        return _this;
    }

    (0, _createClass3.default)(Parser, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                style = _props.style;


            return children ? _react2.default.createElement('p', {
                style: style,
                dangerouslySetInnerHTML: {
                    __html: this.MdParser.render(children)
                }
            }) : null;
        }
    }]);
    return Parser;
}(_react.Component);

Parser.defaultProps = {
    style: null
};

Parser.propTypes = {
    style: _propTypes2.default.object,
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node])
};

exports.default = Parser;