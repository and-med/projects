import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Dashboard</NavigationItem>
        <NavigationItem link="/time-zones">Time Zones</NavigationItem>
        <NavigationItem link='/sign-in'>Sign In</NavigationItem>
    </ul>
);

export default NavigationItems;