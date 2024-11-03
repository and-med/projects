import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Dashboard</NavigationItem>
        { props.isAuthenticated && (props.role === 'Admin' || props.role === 'User') 
            ? <NavigationItem link="/time-zones">Time Zones</NavigationItem> : null}
        { props.isAuthenticated && (props.role === 'Admin' || props.role === 'UserManager') 
            ? <NavigationItem link="/users">Users</NavigationItem> : null}
        { props.isAuthenticated
            ? <NavigationItem link="/logout">Logout</NavigationItem>
            : <NavigationItem link='/sign-in'>Sign In</NavigationItem>}
    </ul>
);

export default NavigationItems;