import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = props => {
    return (
        <Fragment>
            <Toolbar />
            <main>{props.children}</main>
        </Fragment>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
