import React from 'react';
import PropTypes from 'prop-types';

import classes from './FancyButton.module.css';

const FancyButton = props => {
    return (
        <button
            className={classes.FancyButton}
            onClick={props.clicked}
            type={props.type} >
            {props.children}
        </button>
    );
};

FancyButton.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string,
    clicked: PropTypes.func,
};

export default FancyButton;
