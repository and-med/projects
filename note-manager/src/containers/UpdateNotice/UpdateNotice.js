import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

import { createNotice, directoriesRedirect, updateNoticeInit, updateNotice } from '../../store/actions';
import { getSelectedDir } from '../../store/selectors/directories';
import { getEditingNotice, getEditingNoticeDir } from '../../store/selectors/notices';
import { getAvailableTagOptions } from '../../store/selectors/tags';
import { directoryShape, historyShape, getMatchShape, noticeShape, optionsArray } from '../PropTypes';
import ManagerActionButton from '../../components/ManagerActionButton/ManagerActionButton';
import EditNoticeForm from './EditNoticeForm/EditNoticeForm';
import classes from './UpdateNotice.module.css';

const CreateNotice = props => {
    useEffect(() => {
        const noticeId = props.match.params.noticeId;
        props.updateNoticeInit(noticeId, props.isEdit);
    }, [props.updateNoticeInit]);

    const redirect = (routeName) => props.history.push(routeName);

    const backToListHandler = () => {
        props.directoriesRedirect(redirect);
    };

    const handleSubmit = (title, description, tags) => {
        if (props.isEdit) {
            props.updateNotice(props.editingNotice.id, title, description, tags, redirect);
        } else {
            const data = {
                title,
                description,
                tags,
                directoryId: props.createNoticeDir.id,
                redirect,
            };
            props.createNotice(data);
        }
    };

    return (
        <div className={classes.UpdateNotice}>
            <h2>
                {props.isEdit
                    ? `Update a notice '${props.editingNotice.title}' in directory '${props.editingNoticeDir.name}'`
                    : `Create a notice in directory '${props.createNoticeDir.name}'`}
            </h2>
            {props.isEdit ? (
                <EditNoticeForm
                    handleSubmit={handleSubmit}
                    title={props.editingNotice.title}
                    tags={props.editingNotice.tags.map(tag => ({ label: tag, value: tag}))}
                    description={props.editingNotice.description}
                    actionText={'Save'}
                    tagOptions={props.tagOptions} />
            ) : (
                <EditNoticeForm handleSubmit={handleSubmit} actionText={'Create'} tagOptions={props.tagOptions} />
            )}
            <div>
                <ManagerActionButton
                    icon={faArrowCircleLeft}
                    text={'Back to list'}
                    clicked={backToListHandler}/>
            </div>
        </div>
    );
};

CreateNotice.propTypes = {
    createNoticeDir: directoryShape.isRequired,
    editingNoticeDir: directoryShape.isRequired,
    editingNotice: noticeShape,
    history: historyShape.isRequired,
    isEdit: PropTypes.bool.isRequired,
    match: getMatchShape('noticeId').isRequired,
    tagOptions: optionsArray.isRequired,
    createNotice: PropTypes.func.isRequired,
    directoriesRedirect: PropTypes.func.isRequired,
    updateNoticeInit: PropTypes.func.isRequired,
    updateNotice: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        createNoticeDir: getSelectedDir(state),
        editingNotice: getEditingNotice(state),
        editingNoticeDir: getEditingNoticeDir(state),
        tagOptions: getAvailableTagOptions(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNotice: (notice) => dispatch(createNotice(notice)),
        directoriesRedirect: (redirect) => dispatch(directoriesRedirect({ redirect })),
        updateNoticeInit: (selectedNoteId, isEdit) => dispatch(updateNoticeInit({ selectedNoteId, isEdit })),
        updateNotice: (id, title, description, tags, redirect) =>
            dispatch(updateNotice({ id, title, description, tags, redirect })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNotice);
