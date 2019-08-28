import React from 'react';
import PropTypes from 'prop-types';

const EllipsisText = ({
    text,
    length,
    tail,
    tailClassName,
    ...others
}) => {
  const lengthOfVisibleText = length - tail.length; 
  return (
    <span title={text} {...others}>
      {(text.length <= length || length < 0) ? text : (
        <>
          {lengthOfVisibleText > 0 && text.slice(0, lengthOfVisibleText)}
          <span
              className={tailClassName}
              style={{ cursor: 'auto'}}>
            {tail}
          </span>
        </>
      )}
    </span>
  );
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
