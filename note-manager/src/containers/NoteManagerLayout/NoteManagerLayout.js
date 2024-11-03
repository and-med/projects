import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { faPlus, faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import ManagerActionButton from '../../components/ManagerActionButton/ManagerActionButton';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';
import DirectoriesManager from '../DirectoriesManager/DirectoriesManager';
import {
    createDirectoryPreview,
    editDirectoryPreview,
    deleteDirectoryConfirm,
    deleteDirectoryCancel,
    deleteDirectory,
} from '../../store/actions';
import { getIsEditAndDeleteEnabled, getIsDeleting, getSelectedDir } from '../../store/selectors/directories';
import { directoryShape } from '../PropTypes';
import classes from './NoteManagerLayout.module.css';

const NoteManager = props => {
    return (
        <div className={classes.NoteManager}>
            <div className={classes.SidePanel}>
                <ManagerActionButton clicked={props.createDirectoryPreview} icon={faPlus} text={'Add'} />
                <ManagerActionButton
                    clicked={props.editDirectoryPreview}
                    isDisabled={!props.isEditAndDeleteEnabled}
                    icon={faPencilAlt}
                    text={'Edit'} />
                <ManagerActionButton
                    clicked={props.deleteDirectoryConfirm}
                    isDisabled={!props.isEditAndDeleteEnabled}
                    icon={faTimes}
                    text={'Remove'} />
            </div>
            <div className={classes.DirectoriesList}>
                <DirectoriesManager />
            </div>
            <div className={classes.NoteManagerContent}>
                {props.children}
            </div>
            <DeleteConfirmModal
                show={props.isDeleting}
                headerText={`Delete Directory '${props.selectedDir.name}'`}
                entityText={'directory'}
                onCancelClick={props.deleteDirectoryCancel}
                onDeleteDirectory={() => props.deleteDirectory(props.selectedDir)} />
        </div>
    );
};

NoteManager.propTypes = {
    isEditAndDeleteEnabled: PropTypes.bool.isRequired,
    isDeleting: PropTypes.bool.isRequired,
    selectedDir: directoryShape.isRequired,
    children: PropTypes.node.isRequired,
    createDirectoryPreview: PropTypes.func.isRequired,
    editDirectoryPreview: PropTypes.func.isRequired,
    deleteDirectoryConfirm: PropTypes.func.isRequired,
    deleteDirectoryCancel: PropTypes.func.isRequired,
    deleteDirectory: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        isEditAndDeleteEnabled: getIsEditAndDeleteEnabled(state),
        isDeleting: getIsDeleting(state),
        selectedDir: getSelectedDir(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createDirectoryPreview: () => dispatch(createDirectoryPreview()),
        editDirectoryPreview: () => dispatch(editDirectoryPreview()),
        deleteDirectoryConfirm: () => dispatch(deleteDirectoryConfirm()),
        deleteDirectoryCancel: () => dispatch(deleteDirectoryCancel()),
        deleteDirectory: (directory) => dispatch(deleteDirectory(directory)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteManager);
