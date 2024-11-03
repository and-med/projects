import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

import classes from './NoticeCard.module.css';

const NoticeCard = props => {
    return (
        <div className={classes.NoticeCard}>
            <FontAwesomeIcon icon={faFileAlt} size="4x" />
            {props.children}
        </div>
    );
};

NoticeCard.propTypes = {
    children: PropTypes.node.isRequired,
};

export default NoticeCard;
