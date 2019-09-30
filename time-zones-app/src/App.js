import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import TimeZones from './containers/TimeZones/TimeZones';
import TimeZoneCreate from './containers/TimeZones/TimeZoneCreate/TimeZoneCreate';
import TimeZoneUpdate from './containers/TimeZones/TimeZoneUpdate/TimeZoneUpdate';
import Users from './containers/Users/Users';
import SignIn from './containers/Authorization/SignIn/SignIn';
import SignUp from './containers/Authorization/SignUp/SignUp';
import Logout from './containers/Authorization/Logout/Logout';
import * as actions from './store/actions';

const App = props => {
    useEffect(() => {
        props.onTryAutoSignup();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let routes = (
        <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/" exact component={Dashboard} />
        </Switch>
    );

    if (props.isAuthenticated) {
        routes = (
            <Switch>
                <Route path="/sign-in" component={SignIn} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/logout" component={Logout} />
                <Route path="/time-zones/create" component={TimeZoneCreate} />
                <Route path="/time-zones/update/:id(\d+)" component={TimeZoneUpdate} />
                <Route path="/time-zones" component={TimeZones} />
                {(props.role === 'Admin' || props.role === 'UserManager') 
                    ? <Route path="/users" component={Users} /> : null}
                <Route path="/" exact component={Dashboard} />      
            </Switch>
        )
    }

    return (
        <div>
            <Layout>
                {routes}
            </Layout>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
        role: state.auth.role
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authTryAutoSignup())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
