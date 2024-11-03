import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import classes from './Directory.module.css';

const Directory = props => {
    const margin = props.tab * 20;

    let classNames = [ classes.Directory ];
    if (props.isSelected) {
        classNames.push(classes.SelectedDirectory);
    }

    const icon = props.folded ? faFolder : faFolderOpen;

    return (
        <div
            className={classNames.join(' ')}
            style={{ marginLeft: `${margin}px`}}
            onClick={props.onClick}
            tabIndex={0}
            onFocus={e => e.stopPropagation()}>
            <FontAwesomeIcon icon={icon} className={classes.FolderIcon} size={'lg'} />
            {props.name}
        </div>
    );
};

Directory.propTypes = {
    name: PropTypes.string.isRequired,
    tab: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    folded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default Directory;
