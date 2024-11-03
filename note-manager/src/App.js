import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import NoteManagerLayout from './containers/NoteManagerLayout/NoteManagerLayout';
import NoticesManager from './containers/NoticesManager/NoticesManager';
import UpdateNotice from './containers/UpdateNotice/UpdateNotice';
import Search from './containers/Search/Search';
import NoticePreview from './containers/Search/NoticePreview';
import { fetchDirectories, fetchNotices } from './store/actions';
import './App.css';

const App = props => {
    useEffect(() => {
        props.fetchDirectories();
    }, [props.fetchDirectories]);

    useEffect(() => {
        props.fetchNotices();
    }, [props.fetchNotices]);

    return (
        <Layout>
            <Switch>
                <Route path="/directories">
                    <NoteManagerLayout>
                        <Switch>
                            <Route
                                path="/directories/notices/edit/:noticeId"
                                render={props => <UpdateNotice {...props} isEdit={true} />}/>
                            <Route
                                path="/directories/notices/create"
                                render={props => <UpdateNotice {...props} isEdit={false} />}/>
                            <Route path="/directories/:dirId" component={NoticesManager} />
                            <Route path="/directories" component={NoticesManager} />
                        </Switch>
                    </NoteManagerLayout>
                </Route>
                <Route path="/search">
                    <Switch>
                        <Route path="/search/notice/:noticeId" component={NoticePreview} />
                        <Route path="/search" component={Search} />
                    </Switch>
                </Route>
                <Redirect to="/directories" />
            </Switch>
        </Layout>
    );
};


App.propTypes = {
    fetchDirectories: PropTypes.func.isRequired,
    fetchNotices: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDirectories: () => dispatch(fetchDirectories()),
        fetchNotices: () => dispatch(fetchNotices()),
    };
};

export default connect(null, mapDispatchToProps)(App);
