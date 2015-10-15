# react-ellipsis-text [![Build Status](https://travis-ci.org/georgeOsdDev/react-ellipsis-text.svg?branch=develop)](https://travis-ci.org/georgeOsdDev/react-ellipsis-text) [![npm version](https://badge.fury.io/js/[PUT PACKAGE NAE HERE].svg)](http://badge.fury.io/js/[PUT PACKAGE NAE HERE])

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
  tooltip: React.PropTypes.bool,
  copyOnClick: React.PropTypes.bool
};
```

  * `text`: Text to display

  * `length`: Max length of text

  * `tail`: Trailing string (Default '...')

  * `tailClassName`: Trailing string element's class name

  * `tooltip`: Tooltip will be display when `true`

  * `copyOnClick`: Original text will be copied into clipboard when tooltip is clicked.


## Usage example

```javascript

'use strict';

import React from 'react/addons';
import EllipsisText  from '../lib/components/EllipsisText';

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

```

See  [example](https://github.com/georgeOsdDev/react-ellipsis-text/tree/develop/example)

```bash
npm install
npm run start:example
```

## Tests

```bash
npm test
```