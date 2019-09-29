import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import TimeZones from './containers/TimeZones/TimeZones';
import SignIn from './containers/Authorization/SignIn/SignIn';
import SignUp from './containers/Authorization/SignUp/SignUp';

const App = props => {
    let routes = (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/time-zones" component={TimeZones} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
        </Switch>
    );

    return (
        <div>
            <Layout>
                {routes}
            </Layout>
        </div>
    );
}

export default App;
