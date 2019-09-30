import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import classes from './Dashboard.module.css';
import color_overlay from '../../assets/images/color-overlay-crushed.png';

const Dashboard = props => {
    const backgroundStyle = {
        backgroundImage: 'url(' + color_overlay + ')',
        backgroundSize: '100% 100%',
        backgroundColor: '#00AB78'
    }
    return (
        <div className={classes.Dashboard} style={backgroundStyle}>
            <h1>Welcome</h1>
            {props.isAuthenticated 
                ? <p>Please start off with creating a new <NavLink to="/time-zones/create">Time Zone</NavLink></p>
                : <p>Please start off with <NavLink to="/sign-in">Sign In</NavLink></p>}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Dashboard);