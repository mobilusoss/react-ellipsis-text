import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const styles = {
    allText: {
        MozUserSelect: 'text',
        WebkitUserSelect: 'text',
        msUserSelect: 'text',
        userSelect: 'text'
    },
}

const EllipsisText = props => {

    let {
        text,
        length,
        tail,
        tailClassName,
        position,
        ...others
    } = props;

    const tailStyle = {
        cursor: 'auto'
    };

    const [mainText, setMainText] = useState(false)
    const [displayText, setDisplayText] = useState('')

    useEffect(() => {
        if (text.length <= length || length < 0) {
            setDisplayText(text);
            setMainText(true);
        } else {

            if (length - tail.length <= 0) {
                setDisplayText(text);
            } else {
                if (position === 'center') {
                    const leftText = text.substring(0, ((length / 2) - tail.length));
                    const rightText = text.substring(length / 2, ((length / 2) - tail.length));
                    setDisplayText(`${leftText}${tail}${rightText}`);
                }
                else
                    setDisplayText(text.slice(0, (length - tail.length)));
            }
        }
    }, []);

    return (
        <span title={text} {...others}>
            {mainText === true && displayText}
            {mainText === false && position === 'start' && (<span style={tailStyle}
                className={tailClassName}>
                {tail}
            </span>)}
            {mainText === false && displayText}
            {mainText === false && position === 'end' && (<span style={tailStyle}
                className={tailClassName}>
                {tail}
            </span>)}
        </span>
    )
}


EllipsisText.propTypes = {
    text: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    position: PropTypes.string.isRequired,
    tail: PropTypes.string,
    tailClassName: PropTypes.string,
};

EllipsisText.defaultProps = {
    tail: '...',
    tailClassName: 'more',
    position: 'end'
};

export default EllipsisText
