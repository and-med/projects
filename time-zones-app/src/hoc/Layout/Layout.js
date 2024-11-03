import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    let sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(prevState => !prevState);
    }

    let sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    }

    return (
        <React.Fragment>
            <Toolbar 
                isAuthenticated={props.isAuthenticated}
                role={props.role}
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer 
                isAuthenticated={props.isAuthenticated}
                role={props.role}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        role: state.auth.role
    };
}

export default connect(mapStateToProps)(Layout);