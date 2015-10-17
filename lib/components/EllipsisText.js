'use strict';

import React from 'react';
import {Tooltip} from 'material-ui';
import Clipboard from 'clipboard';

const styles = {
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
}

class EllipsisText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tooltipShown: false
    };
    this.hideTimer = null;
    this.clipboard = null;
  }

  componentDidMount(){
    if (this.props.clipboard) {
      this.clipboard = new Clipboard('.EllipsisTextCopy');
    }
  }

  componentDidUpdate(){
    if (this.props.clipboard && this.clipboard) {
      this.clipboard.destroy();
      this.clipboard = new Clipboard('.EllipsisTextCopy');
    }
  }

  render() {
    let {
      text,
      length,
      tail,
      tailClassName,
      tooltip,
      ...others
    } = this.props;

    if (text.length <= this.props.length || this.props.length <= 0) {
      return (<div {...others}><span>{this.props.text}</span></div>);
    } else {

      let tooltipElement;
      let tailStyle = {
        cursor: 'auto'
      };
      if (tooltip) {
        tailStyle.cursor = 'pointer';
        tooltipElement = (<Tooltip
                        ref="tooltip"
                        label={
                          <span className='EllipsisTextTooltip'>
                            <span style={styles.allText} className='EllipsisTextCopy' data-clipboard-text={text}>
                              {text}
                            </span>
                          </span>
                        }
                        show={tooltip && this.state.tooltipShown}
                        touch={true}
                        style={styles.tooltip}
                        onMouseLeave={this._handleMouseLeave.bind(this)}
                        onMouseEnter={this._handleMouseEnter.bind(this)}
                        verticalPosition='top'
                        horizontalPosition='right'/>)
      }


      let sliceEnd = length - tail.length;
      if (sliceEnd < 0) sliceEnd = 0;
      return (
            <div style={styles.root} {...others}>
              <span>
                <span>
                  {text.slice(0, sliceEnd)}
                </span>
                <span style={tailStyle}
                      className={tailClassName}
                      onMouseLeave={this._handleMouseLeave.bind(this)}
                      onMouseEnter={this._handleMouseEnter.bind(this)}>
                  {tail}
                </span>
              </span>
              {tooltipElement}
            </div>);
    }
  }
  _handleMouseLeave(e) {
    this.hideTimer = setTimeout(() => {
      this.setState({tooltipShown: false});
    }, 1000);
  }

  _handleMouseEnter(e) {
    e.preventDefault();
    this.setState({tooltipShown: true}, () => {
      if (this.hideTimer) clearTimeout(this.hideTimer);
    });
  }
}

EllipsisText.propTypes = {
  text: React.PropTypes.string.isRequired,
  length: React.PropTypes.number.isRequired,
  tail: React.PropTypes.string,
  tailClassName: React.PropTypes.string,
  tooltip: React.PropTypes.bool,
  clipboard: React.PropTypes.bool
};

EllipsisText.defaultProps = {
  tail: '...',
  tailClassName: 'more',
  tooltip: false,
  clipboard: false
};

export default EllipsisText;
