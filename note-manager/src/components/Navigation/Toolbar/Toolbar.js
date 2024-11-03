import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Toolbar.module.css';

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <nav>
                <ul className={classes.NavigationItems}>
                    <li className={classes.NavigationItem}>
                        <NavLink to="/directories" activeClassName={classes.active}>Note Manager</NavLink>
                    </li>
                    <li className={classes.NavigationItem}>
                        <NavLink to="/search" activeClassName={classes.active}>Search Notes</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Toolbar;
