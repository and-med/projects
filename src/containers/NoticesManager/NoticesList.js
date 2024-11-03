import React from 'react';
import PropTypes from 'prop-types';

import { noticeShape } from '../PropTypes';
import classes from './NoticesList.module.css';

const NoticesList = props => {
    return props.notices.length > 0 ? (
        <div className={classes.NoticesList}>
            {props.notices.map(notice => {
                return props.children(notice);
            })}
        </div>
    ) : (
        <p className={classes.NoResults}>Nothing to show here...</p>
    );
};

NoticesList.propTypes = {
    notices: PropTypes.arrayOf(noticeShape).isRequired,
    children: PropTypes.func.isRequired,
};

export default NoticesList;
