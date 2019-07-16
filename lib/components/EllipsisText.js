"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var styles = {
  allText: {
    MozUserSelect: 'text',
    WebkitUserSelect: 'text',
    msUserSelect: 'text',
    userSelect: 'text'
  }
};

var EllipsisText =
/*#__PURE__*/
function (_React$Component) {
  _inherits(EllipsisText, _React$Component);

  function EllipsisText(props) {
    var _this;

    _classCallCheck(this, EllipsisText);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EllipsisText).call(this, props));
    _this.state = {};
    return _this;
  }

  _createClass(EllipsisText, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          text = _this$props.text,
          length = _this$props.length,
          tail = _this$props.tail,
          tailClassName = _this$props.tailClassName,
          others = _objectWithoutProperties(_this$props, ["text", "length", "tail", "tailClassName"]);

      if (text.length <= this.props.length || this.props.length < 0) {
        return _react["default"].createElement("span", others, this.props.text);
      } else {
        var tailStyle = {
          cursor: 'auto'
        };
        var displayText;

        if (length - tail.length <= 0) {
          displayText = '';
        } else {
          displayText = text.slice(0, length - tail.length);
        }

        return _react["default"].createElement("span", _extends({
          title: this.props.text
        }, others), displayText, _react["default"].createElement("span", {
          style: tailStyle,
          className: tailClassName
        }, tail));
      }
    }
  }]);

  return EllipsisText;
}(_react["default"].Component);

EllipsisText.propTypes = {
  text: _propTypes["default"].string.isRequired,
  length: _propTypes["default"].number.isRequired,
  tail: _propTypes["default"].string,
  tailClassName: _propTypes["default"].string
};
EllipsisText.defaultProps = {
  tail: '...',
  tailClassName: 'more'
};
var _default = EllipsisText;
exports["default"] = _default;