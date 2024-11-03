import React from 'react';

import clockLogo from '../../assets/images/clock_logo.png';
import classes from './Logo.module.css';

const Logo = props => (
    <div className={classes.Logo}>
        <img src={clockLogo} alt="Time Zones App" />
    </div>
);

export default Logo;