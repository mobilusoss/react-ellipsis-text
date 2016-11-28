# react-ellipsis-text [![Build Status](https://travis-ci.org/georgeOsdDev/react-ellipsis-text.svg?branch=master)](https://travis-ci.org/georgeOsdDev/react-ellipsis-text) [![npm version](https://badge.fury.io/js/react-ellipsis-text.svg)](http://badge.fury.io/js/react-ellipsis-text)
[![NPM](https://nodei.co/npm/react-ellipsis-text.png)](https://nodei.co/npm/react-ellipsis-text/)
React text ellipsify component

## Demo

[View Demo](http://georgeosddev.github.io/react-ellipsis-text/example/)

## Installation

```bash
npm install --save react-ellipsis-text
```

## API

### `EllipsisText`

#### Props

```javascript
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
```

  * `text`: Text to display

  * `length`: Max length of text

  * `tail`: Trailing string (Default '...')

  * `tailClassName`: Trailing string element's class name

  * `tooltip`: Tooltip will be display when supplied

  * `tooltip.clipboard`: Original text will be copied into clipboard when tooltip is clicked.

  * `tooltip.onAppear`: Called when tooltip is shown.

  * `tooltip.onDisapepear`: Called when tooltip is hidden.


## Usage example

```javascript

'use strict';

import React from 'react';
import EllipsisText  from 'react-ellipsis-text';

//allow react dev tools work
window.React = React;

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <EllipsisText text={'1234567890'} length={'5'} />
      </div>
    )
  }
};

React.render(<App/>, document.getElementById('out'));

// It will be
// <div>
//   <span><span>12</sapn><span class='more'>...</span></span>
//  </div>
//

```


See  [example](https://github.com/georgeOsdDev/react-ellipsis-text/tree/develop/example)

```bash
npm install
npm run start:example
```

## Tests

```bash
npm run test:local
```