import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classes from './DirectoriesManager.module.css';
import { getChildrenByParentSelector, getSelectedDirId, getRootDir } from '../../store/selectors/directories';
import {
    triggerDirectoryFold,
    createDirectory,
    triggerCreatePreviewOff,
    editDirectory,
    triggerEditPreviewOff,
    directoryClick } from '../../store/actions';
import { directoryShape, historyShape } from '../PropTypes';
import DirectoriesList from '../../components/DirectoriesList/DirectoriesList';

const DirectoriesManager = props => {
    let classNames = [classes.DirectoriesManager];
    if (props.selectedDirId === props.rootDir.id) {
        classNames.push(classes.DirectoriesListActive);
    }

    const directoryClickHandler = directory => {
        props.directoryClick(directory.id, directory.parentId, (routeName) => {
            props.history.push(routeName);
        });
    };

    return (
        <div className={classNames.join(' ')} tabIndex={0} onFocus={() => directoryClickHandler(props.rootDir)}>
            <DirectoriesList
                directory={props.rootDir}
                selectedDirId={props.selectedDirId}
                childrenByParentSelector={props.childrenByParentSelector}
                onCreateDirectory={props.onCreateDirectory}
                triggerCreatePreviewOff={props.triggerCreatePreviewOff}
                onEditDirectory={props.onEditDirectory}
                triggerEditPreviewOff={props.triggerEditPreviewOff}
                directoryClickHandler={directoryClickHandler} />
        </div>
    );
};

DirectoriesManager.propTypes = {
    rootDir: directoryShape.isRequired,
    selectedDirId: PropTypes.number,
    history: historyShape,
    childrenByParentSelector: PropTypes.func.isRequired,
    onCreateDirectory: PropTypes.func.isRequired,
    triggerCreatePreviewOff: PropTypes.func.isRequired,
    onEditDirectory: PropTypes.func.isRequired,
    triggerEditPreviewOff: PropTypes.func.isRequired,
    directoryClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        childrenByParentSelector: getChildrenByParentSelector(state),
        selectedDirId: getSelectedDirId(state),
        rootDir: getRootDir(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        triggerDirectoryFold: (directory) => dispatch(triggerDirectoryFold(directory)),
        onCreateDirectory: (directory) => dispatch(createDirectory(directory)),
        triggerCreatePreviewOff: (directory) => dispatch(triggerCreatePreviewOff(directory)),
        onEditDirectory: (directory) => dispatch(editDirectory(directory)),
        triggerEditPreviewOff: (directory) => dispatch(triggerEditPreviewOff(directory)),
        directoryClick: (id, parentId, redirect) => dispatch(directoryClick({ id, parentId, redirect })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DirectoriesManager));
