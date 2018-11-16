import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  allText: {
    MozUserSelect: 'text',
    WebkitUserSelect: 'text',
    msUserSelect: 'text',
    userSelect: 'text'
  },
}

class EllipsisText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {
      text,
      length,
      tail,
      tailClassName,
      ...others
    } = this.props;

    if (text.length <= this.props.length || this.props.length < 0) {
      return (<span {...others}>{this.props.text}</span>);
    } else {

      const tailStyle = {
        cursor: 'auto'
      };

      let displayText;
      if (length - tail.length <= 0){
        displayText = '';
      } else {
        displayText = text.slice(0, (length - tail.length))
      }

      return (
        <span title={this.props.text} {...others}>
          {displayText}
          <span style={tailStyle}
                className={tailClassName}>
            {tail}
          </span>
        </span>);
    }
  }
}

EllipsisText.propTypes = {
  text: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  tail: PropTypes.string,
  tailClassName: PropTypes.string,
};

EllipsisText.defaultProps = {
  tail: '...',
  tailClassName: 'more',
};

export default EllipsisText;
