'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUi = require('material-ui');

var _clipboard = require('clipboard');

var _clipboard2 = _interopRequireDefault(_clipboard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
  root: {
    position: 'relative',
    boxSizing: 'border-box'
  },
  allText: {
    MozUserSelect: 'text',
    WebkitUserSelect: 'text',
    msUserSelect: 'text',
    userSelect: 'text'
  },
  tooltip: {
    boxSizing: 'border-box'
  }
};

var EllipsisText = (function (_React$Component) {
  _inherits(EllipsisText, _React$Component);

  function EllipsisText(props) {
    _classCallCheck(this, EllipsisText);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(EllipsisText).call(this, props));

    _this.state = {
      tooltipShown: false
    };
    _this.hideTimer = null;
    _this.clipboard = null;
    return _this;
  }

  _createClass(EllipsisText, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.copyOnClick) {
        this.clipboard = new _clipboard2.default('.EllipsisTextCopy');
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.props.copyOnClick && this.clipboard) {
        this.clipboard.destroy();
        this.clipboard = new _clipboard2.default('.EllipsisTextCopy');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var text = _props.text;
      var length = _props.length;
      var tail = _props.tail;
      var tailClassName = _props.tailClassName;
      var tooltip = _props.tooltip;

      var others = _objectWithoutProperties(_props, ['text', 'length', 'tail', 'tailClassName', 'tooltip']);

      if (text.length <= this.props.length) {
        return _react2.default.createElement(
          'div',
          others,
          _react2.default.createElement(
            'span',
            null,
            this.props.text
          )
        );
      } else {

        var tooltipElement = undefined;
        var tailStyle = {
          cursor: 'auto'
        };
        if (tooltip) {
          tailStyle.cursor = 'pointer';
          tooltipElement = _react2.default.createElement(_materialUi.Tooltip, {
            ref: 'tooltip',
            label: _react2.default.createElement(
              'span',
              null,
              _react2.default.createElement(
                'span',
                { style: styles.allText, className: 'EllipsisTextCopy', 'data-clipboard-text': text },
                text
              )
            ),
            show: tooltip && this.state.tooltipShown,
            touch: true,
            style: styles.tooltip,
            onMouseLeave: this._handleMouseLeave.bind(this),
            onMouseEnter: this._handleMouseEnter.bind(this),
            verticalPosition: 'top',
            horizontalPosition: 'right' });
        }

        return _react2.default.createElement(
          'div',
          _extends({ style: styles.root }, others),
          _react2.default.createElement(
            'span',
            null,
            text.slice(0, length - tail.length),
            _react2.default.createElement(
              'span',
              { style: tailStyle,
                className: tailClassName,
                onMouseLeave: this._handleMouseLeave.bind(this),
                onMouseEnter: this._handleMouseEnter.bind(this) },
              tail
            )
          ),
          tooltipElement
        );
      }
    }
  }, {
    key: '_handleMouseLeave',
    value: function _handleMouseLeave(e) {
      var _this2 = this;

      this.hideTimer = setTimeout(function () {
        _this2.setState({ tooltipShown: false });
      }, 1000);
    }
  }, {
    key: '_handleMouseEnter',
    value: function _handleMouseEnter(e) {
      var _this3 = this;

      e.preventDefault();
      this.setState({ tooltipShown: true }, function () {
        if (_this3.hideTimer) clearTimeout(_this3.hideTimer);
      });
    }
  }]);

  return EllipsisText;
})(_react2.default.Component);

EllipsisText.propTypes = {
  text: _react2.default.PropTypes.string.isRequired,
  length: _react2.default.PropTypes.number.isRequired,
  tail: _react2.default.PropTypes.string,
  tailClassName: _react2.default.PropTypes.string,
  tooltip: _react2.default.PropTypes.bool,
  copyOnClick: _react2.default.PropTypes.bool
};

EllipsisText.defaultProps = {
  tail: '...',
  tailClassName: 'more',
  tooltip: false,
  copyOnClick: false
};

exports.default = EllipsisText;