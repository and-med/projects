import React, { useState } from 'react';

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
                drawerToggleClicked={sideDrawerToggleHandler}/>
            <SideDrawer 
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Layout;