'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import EllipsisText  from '../lib/components/EllipsisText';

//allow react dev tools work
window.React = React;

const styles = {
  title: {
    marginTop: '40px'
  },
  content: {
    padding: '10px'
  },
  removed:{
    marginTop: '40px',
    textDecoration: 'line-through'
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2 style={styles.title}>Simple ellipsify</h2>
        <p>text='1234567890'</p>
        <p>length= -1 ~ 11</p>
        <div style={styles.content}>
          <EllipsisText text={'1234567890'} length={-1} /> <br/>
          <EllipsisText text={'1234567890'} length={0} /> <br/>
          <EllipsisText text={'1234567890'} length={1} /> <br/>
          <EllipsisText text={'1234567890'} length={2} /> <br/>
          <EllipsisText text={'1234567890'} length={3} /> <br/>
          <EllipsisText text={'1234567890'} length={4} /> <br/>
          <EllipsisText text={'1234567890'} length={5} /> <br/>
          <EllipsisText text={'1234567890'} length={6} /> <br/>
          <EllipsisText text={'1234567890'} length={7} /> <br/>
          <EllipsisText text={'1234567890'} length={8} /> <br/>
          <EllipsisText text={'1234567890'} length={9} /> <br/>
          <EllipsisText text={'1234567890'} length={10} /> <br/>
          <EllipsisText text={'1234567890'} length={11} /> <br/>
        </div>
        <h2 style={styles.title}>Custom tail</h2>
        <div style={styles.content}>
          <EllipsisText text={'1234567890'} length={8} tailClassName={'myTail'}/> <br/>
          <EllipsisText text={'1234567890'} length={8} tail={'~~~'}/> <br/>
        </div>
        <h2 style={styles.removed}>Tooltip</h2>
        <div style={styles.content}>
          Tooltip feature is removed from V1.0. You should implement it by your self with <code>onMouseEnter</code> and <code>onMouseLeave</code>
        </div>
        <h2 style={styles.removed}>Tooltip with Clipboard copy</h2>
        <div style={styles.content}>
          Clipboard feature is removed from V1.0. You should implement it by your self with <code>onClick</code>
        </div>

      </div>
    )
  }
};

ReactDom.render(<App/>, document.getElementById('out'));
