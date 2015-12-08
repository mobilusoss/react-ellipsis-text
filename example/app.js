'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import {Paper} from 'material-ui';
import EllipsisText  from '../src/components/EllipsisText';

//allow react dev tools work
window.React = React;

const styles = {
  title: {
    marginTop: '40px'
  },
  content: {
    padding: '10px'
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
        <Paper style={styles.content}>
          <EllipsisText text={'1234567890'} length={-1} />
          <EllipsisText text={'1234567890'} length={0} />
          <EllipsisText text={'1234567890'} length={1} />
          <EllipsisText text={'1234567890'} length={2} />
          <EllipsisText text={'1234567890'} length={3} />
          <EllipsisText text={'1234567890'} length={4} />
          <EllipsisText text={'1234567890'} length={5} />
          <EllipsisText text={'1234567890'} length={6} />
          <EllipsisText text={'1234567890'} length={7} />
          <EllipsisText text={'1234567890'} length={8} />
          <EllipsisText text={'1234567890'} length={9} />
          <EllipsisText text={'1234567890'} length={10} />
          <EllipsisText text={'1234567890'} length={11} />
        </Paper>
        <h2 style={styles.title}>Custom tail</h2>
        <Paper style={styles.content}>
          <EllipsisText text={'1234567890'} length={8} tailClassName={'myTail'}/>
          <EllipsisText text={'1234567890'} length={8} tail={'~~~'}/>
        </Paper>
        <h2 style={styles.title}>Tooltip</h2>
        <Paper style={styles.content}>
          <EllipsisText text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit,'} length={20} tooltip={true}/>
        </Paper>
        <h2 style={styles.title}>Tooltip with Clipboard copy</h2>
        <Paper style={styles.content}>
          <EllipsisText text={'Clipboard copy on click tool tip'} length={20} tooltip={true} copyOnClick={true}/>
        </Paper>

      </div>
    )
  }
};

ReactDom.render(<App/>, document.getElementById('out'));
