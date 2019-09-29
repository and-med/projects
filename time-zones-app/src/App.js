import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';
import TimeZones from './containers/TimeZones/TimeZones';

const App = props => {
    let routes = (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/time-zones" component={TimeZones} />
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
