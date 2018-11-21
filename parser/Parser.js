import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MarkdownIt from 'markdown-it';

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
    var md = new MarkdownIt('zero', { linkify: true });

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
    _inherits(Parser, _Component);

    function Parser(props) {
        _classCallCheck(this, Parser);

        var _this = _possibleConstructorReturn(this, (Parser.__proto__ || _Object$getPrototypeOf(Parser)).call(this, props));

        _this.parser = initParser();
        return _this;
    }

    _createClass(Parser, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                children = _props.children,
                style = _props.style;


            return React.createElement('p', {
                style: style,
                dangerouslySetInnerHTML: {
                    __html: this.parser.renderInline(children)
                }
            });
        }
    }]);

    return Parser;
}(Component);

Parser.defaultProps = {
    style: null
};

Parser.propTypes = {
    style: PropTypes.object
};

export default Parser;