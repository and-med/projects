import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

import classes from './DirectoryEdit.module.css';

const DirectoryEdit = props => {
    const [ name, setName ] = useState(props.name);

    const submitHandler = (e) => {
        e.preventDefault();
        props.onEditDirectory(name);
    };

    let classNames = [ classes.Directory ];
    if (props.isSelected) {
        classNames.push(classes.SelectedDirectory);
    }

    const icon = props.folded ? faFolder : faFolderOpen;

    const margin = props.tab * 20;

    return (
        <div
            className={classNames.join(' ')}
            style={{ marginLeft: `${margin}px`}}>
            <FontAwesomeIcon icon={icon} className={classes.FolderIcon} size={'lg'} />
            <form
                onSubmit={submitHandler}
                onFocus={e => e.stopPropagation()}>
                <input
                    className={classes.DirectoryNameInput}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus/>
                <button type="submit">Save</button>
                <button type="button" onClick={props.triggerPreviewOff}>Cancel</button>
            </form>
        </div>
    );
};

DirectoryEdit.propTypes = {
    tab: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    folded: PropTypes.bool.isRequired,
    onEditDirectory: PropTypes.func.isRequired,
    triggerPreviewOff: PropTypes.func.isRequired,
};

export default DirectoryEdit;
