import _Object$getPrototypeOf from 'babel-runtime/core-js/object/get-prototype-of';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MdParserClass from './MdParser';

var Parser = function (_Component) {
    _inherits(Parser, _Component);

    function Parser(props) {
        _classCallCheck(this, Parser);

        var _this = _possibleConstructorReturn(this, (Parser.__proto__ || _Object$getPrototypeOf(Parser)).call(this, props));

        _this.MdParser = new MdParserClass();
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
                    __html: this.MdParser.render(children)
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
    style: PropTypes.object,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};

export default Parser;