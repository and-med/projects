import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions';

const Logout = props => {
    useEffect(() => {
        props.onLogout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logoutStart())
    }
}

export default connect(null, mapDispatchToProps)(Logout);