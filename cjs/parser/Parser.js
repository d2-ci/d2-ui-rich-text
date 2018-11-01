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

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emojiDb = {
    ':-)': '\uD83D\uDE42',
    ':)': '\uD83D\uDE42',
    ':-(': '\uD83D\uDE41',
    ':(': '\uD83D\uDE41',
    ':+1': '\uD83D\uDC4D',
    ':-1': '\uD83D\uDC4E'
};

var codes = {
    bold: {
        name: 'bold',
        char: '*',
        domEl: 'strong',
        encodedChar: 0x2a,
        regexString: '^\\*((?!\\s)[^*]+(?:[^\\s]))\\*',
        contentFn: function contentFn(val) {
            return val;
        }
    },
    italic: {
        name: 'italic',
        char: '_',
        domEl: 'em',
        encodedChar: 0x5f,
        regexString: '^_((?!\\s)[^_]+(?:[^\\s]))_',
        contentFn: function contentFn(val) {
            return val;
        }
    },
    emoji: {
        name: 'emoji',
        char: ':',
        domEl: 'span',
        encodedChar: 0x3a,
        regexString: '^(:-\\)|:\\)|:\\(|:-\\(|:\\+1|:-1)',
        contentFn: function contentFn(val) {
            return emojiDb[val];
        }
    }
};

var parse = function parse(code) {
    return function (state, silent) {
        if (silent) return false;

        var start = state.pos;
        var marker = state.src.charCodeAt(start);

        // marker character: "_", "*", ":"
        if (marker !== codes[code].encodedChar) {
            return false;
        }

        var MARKER_REGEX = new RegExp(codes[code].regexString);
        var token = state.src.slice(start);

        if (MARKER_REGEX.test(token)) {
            var markerMatch = token.match(MARKER_REGEX);
            var text = markerMatch[1];

            state.push(codes[code].domEl + '_open', codes[code].domEl, 1);

            var t = state.push('text', '', 0);
            t.content = codes[code].contentFn(text);

            state.push(codes.bold.domEl + '_close', codes[code].domEl, -1);
            state.pos += markerMatch[0].length;

            return true;
        }

        return false;
    };
};

var initParser = function initParser() {
    // disable all rules, enable autolink for URLs and email addresses
    var md = new _markdownIt2.default('zero', { linkify: true });

    // *bold* -> <strong>bold</strong>
    md.inline.ruler.push('strong', parse(codes.bold.name));

    // _italic_ -> <em>italic</em>
    md.inline.ruler.push('italic', parse(codes.italic.name));

    // :-) :) :-( :( :+1 :-1 -> <span>[unicode]</span>
    md.inline.ruler.push('emoji', parse(codes.emoji.name));

    md.enable(['linkify', 'strong', 'italic', 'emoji']);

    return md;
};

var Parser = function (_Component) {
    (0, _inherits3.default)(Parser, _Component);

    function Parser(props) {
        (0, _classCallCheck3.default)(this, Parser);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Parser.__proto__ || (0, _getPrototypeOf2.default)(Parser)).call(this, props));

        _this.parser = initParser();
        return _this;
    }

    (0, _createClass3.default)(Parser, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                style = _props.style;


            return _react2.default.createElement('p', {
                style: style,
                dangerouslySetInnerHTML: {
                    __html: this.parser.renderInline(children)
                }
            });
        }
    }]);
    return Parser;
}(_react.Component);

Parser.defaultProps = {
    style: null
};

Parser.propTypes = {
    style: _propTypes2.default.object
};

exports.default = Parser;