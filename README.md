# react-ellipsis-text [![Build Status](https://travis-ci.org/georgeOsdDev/react-ellipsis-text.svg?branch=master)](https://travis-ci.org/georgeOsdDev/react-ellipsis-text) [![npm version](https://badge.fury.io/js/react-ellipsis-text.svg)](http://badge.fury.io/js/react-ellipsis-text)

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
};
```

  * `text`: Text to display

  * `length`: Max length of text

  * `tail`: Trailing string (Default '...')

  * `tailClassName`: Trailing string element's class name


## Usage example

```javascript

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import EllipsisText  from 'react-ellipsis-text';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <EllipsisText text={'1234567890'} length={'5'} />
    )
  }
};

ReactDOM.render(<App/>, document.getElementById('out'));

// It will be
//   <span>12<span class='more'>...</span></span>
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