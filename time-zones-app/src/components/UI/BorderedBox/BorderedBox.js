import React from 'react';

import classes from './BorderedBox.module.css';

const BorderedBox = props => (
    <div className={classes.BorderedBox}>
        {props.children}
    </div>
);

export default BorderedBox;