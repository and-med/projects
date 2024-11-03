import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import classes from './NoticeCardContent.module.css';

const NoticeCardContent = props => {
    const [isEditing, setEditing] = useState(false);
    const [title, setTitle] = useState(props.title);

    const handleBlur = () => {
        if (title !== props.title) {
            props.updateNoticeTitle(props.id, title);
        }
        setEditing(false);
    };

    return (
        <Fragment>
            {isEditing ? (
                <input
                    autoFocus
                    onBlur={handleBlur}
                    className={classes.InlineInput}
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type="text"></input>
            ) : (
                <h3 className={classes.NoteTitle} onClick={() => setEditing(true)}>{props.title}</h3>
            )}
            <div className={classes.ButtonContainer}>
                <button onClick={() => props.updateNoticeRedirect(props.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => props.deleteNoticeConfirm(props.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </button>
            </div>
        </Fragment>
    );
};

NoticeCardContent.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    updateNoticeTitle: PropTypes.func.isRequired,
    updateNoticeRedirect: PropTypes.func.isRequired,
    deleteNoticeConfirm: PropTypes.func.isRequired,
};

export default NoticeCardContent;
