'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  allText: {
    MozUserSelect: 'text',
    WebkitUserSelect: 'text',
    msUserSelect: 'text',
    userSelect: 'text'
  }
};

var EllipsisText = function (_React$Component) {
  _inherits(EllipsisText, _React$Component);

  function EllipsisText(props) {
    _classCallCheck(this, EllipsisText);

    var _this = _possibleConstructorReturn(this, (EllipsisText.__proto__ || Object.getPrototypeOf(EllipsisText)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(EllipsisText, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          text = _props.text,
          length = _props.length,
          tail = _props.tail,
          tailClassName = _props.tailClassName,
          others = _objectWithoutProperties(_props, ['text', 'length', 'tail', 'tailClassName']);

      if (text.length <= this.props.length || this.props.length < 0) {
        return _react2.default.createElement(
          'span',
          others,
          this.props.text
        );
      } else {

        var tailStyle = {
          cursor: 'auto'
        };

        var displayText = void 0;
        if (length - tail.length <= 0) {
          displayText = '';
        } else {
          displayText = text.slice(0, length - tail.length);
        }

        return _react2.default.createElement(
          'span',
          _extends({ title: this.props.text }, others),
          displayText,
          _react2.default.createElement(
            'span',
            { style: tailStyle,
              className: tailClassName },
            tail
          )
        );
      }
    }
  }]);

  return EllipsisText;
}(_react2.default.Component);

EllipsisText.propTypes = {
  text: _react2.default.PropTypes.string.isRequired,
  length: _react2.default.PropTypes.number.isRequired,
  tail: _react2.default.PropTypes.string,
  tailClassName: _react2.default.PropTypes.string
};

EllipsisText.defaultProps = {
  tail: '...',
  tailClassName: 'more'
};

exports.default = EllipsisText;