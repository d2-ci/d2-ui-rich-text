"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _markdownIt = require("markdown-it");

var _markdownIt2 = _interopRequireDefault(_markdownIt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emojiDb = {
    ":-)": "\uD83D\uDE42",
    ":)": "\uD83D\uDE42",
    ":-(": "\uD83D\uDE41",
    ":(": "\uD83D\uDE41",
    ":+1": "\uD83D\uDC4D",
    ":-1": "\uD83D\uDC4E"
};

var codes = {
    bold: {
        name: "bold",
        char: "*",
        domEl: "strong",
        encodedChar: 0x2a,
        // see https://regex101.com/r/evswdV/6 for explanation of regexp
        regexString: "\\B\\*((?!\\s)[^*]+)\\b\\*\\B",
        contentFn: function contentFn(val) {
            return val;
        }
    },
    italic: {
        name: "italic",
        char: "_",
        domEl: "em",
        encodedChar: 0x5f,
        // see https://regex101.com/r/p6LpjK/6 for explanation of regexp
        regexString: "\\b_((?!\\s)[^_]+(\\B|[^_\\s]))_\\b",
        contentFn: function contentFn(val) {
            return val;
        }
    },
    emoji: {
        name: "emoji",
        char: ":",
        domEl: "span",
        encodedChar: 0x3a,
        regexString: "^(:-\\)|:\\)|:\\(|:-\\(|:\\+1|:-1)",
        contentFn: function contentFn(val) {
            return emojiDb[val];
        }
    }
};

var md = void 0;
var linksInText = void 0;

var markerIsInLinkText = function markerIsInLinkText(pos) {
    return linksInText.some(function (link) {
        return pos >= link.index && pos <= link.lastIndex;
    });
};

var parse = function parse(code) {
    return function (state, silent) {
        if (silent) return false;

        var start = state.pos;

        // skip parsing emphasis if marker is within a link
        if (markerIsInLinkText(start)) {
            return false;
        }

        var marker = state.src.charCodeAt(start);

        // marker character: "_", "*", ":"
        if (marker !== codes[code].encodedChar) {
            return false;
        }

        var MARKER_REGEX = new RegExp(codes[code].regexString);
        var token = state.src.slice(start);

        if (MARKER_REGEX.test(token)) {
            var markerMatch = token.match(MARKER_REGEX);

            // skip parsing sections where the marker is not at the start of the token
            if (markerMatch.index !== 0) {
                return false;
            }

            var text = markerMatch[1];

            state.push(codes[code].domEl + "_open", codes[code].domEl, 1);

            var t = state.push("text", "", 0);
            t.content = codes[code].contentFn(text);

            state.push(codes.bold.domEl + "_close", codes[code].domEl, -1);
            state.pos += markerMatch[0].length;

            return true;
        }

        return false;
    };
};

var MdParser = function () {
    function MdParser() {
        (0, _classCallCheck3.default)(this, MdParser);

        // disable all rules, enable autolink for URLs and email addresses
        md = new _markdownIt2.default("zero", { linkify: true });

        // *bold* -> <strong>bold</strong>
        md.inline.ruler.push("strong", parse(codes.bold.name));

        // _italic_ -> <em>italic</em>
        md.inline.ruler.push("italic", parse(codes.italic.name));

        // :-) :) :-( :( :+1 :-1 -> <span>[unicode]</span>
        md.inline.ruler.push("emoji", parse(codes.emoji.name));

        md.enable(["linkify", "strong", "italic", "emoji"]);

        return this;
    }

    (0, _createClass3.default)(MdParser, [{
        key: "render",
        value: function render(text) {
            linksInText = md.linkify.match(text) || [];

            return md.renderInline(text);
        }
    }]);
    return MdParser;
}();

exports.default = MdParser;