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
    if (this.props.copyOnClick) {
      this.clipboard = new Clipboard('.EllipsisTextCopy');
    }
  }

  componentDidUpdate(){
    if (this.props.copyOnClick && this.clipboard) {
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

    if (text.length <= this.props.length || this.props.length < 0) {
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
                          <span>
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

      let displayText;
      if (length - tail.length <= 0){
        displayText = '';
      } else {
        displayText = text.slice(0, (length - tail.length))
      }

      return (
            <div style={styles.root} {...others}>
              <span>
                {displayText}
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
      this.setState({tooltipShown: false}, () => {
        if (this.props.tooltip && typeof this.props.tooltip.onDisapepear === 'function'){
          this.props.tooltip.onDisapepear();
        }
      });
    }, 1000);
  }

  _handleMouseEnter(e) {
    if (this.props.tooltip){
      e.preventDefault();
      this.setState({tooltipShown: true}, () => {
        if (this.hideTimer) {
          clearTimeout(this.hideTimer);
        }
        if (this.props.tooltip && typeof this.props.tooltip.onAppear === 'function'){
          this.props.tooltip.onAppear();
        }
      });
    }
  }
}

EllipsisText.propTypes = {
  text: React.PropTypes.string.isRequired,
  length: React.PropTypes.number.isRequired,
  tail: React.PropTypes.string,
  tailClassName: React.PropTypes.string,
  tooltip: React.PropTypes.shape({
    copyOnClick: React.PropTypes.bool,
    onAppear: React.PropTypes.func,
    onDisapepear: React.PropTypes.func
  })
};

EllipsisText.defaultProps = {
  tail: '...',
  tailClassName: 'more',
  tooltip: null
};

export default EllipsisText;
