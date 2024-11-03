import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

import classes from './DirectoryPreview.module.css';

const DirectoryPreview = props => {
    const [ name, setName ] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        props.onCreateDirectory(name);
    };

    const margin = props.tab * 20;

    return (
        <div
            className={classes.Directory}
            style={{ marginLeft: `${margin}px`}}>
            <FontAwesomeIcon icon={faFolder} className={classes.FolderIcon} size={'lg'} />
            <form
                onSubmit={submitHandler}
                onFocus={e => e.stopPropagation()}>
                <input
                    className={classes.DirectoryNameInput}
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}/>
                <button type="submit">Create</button>
                <button type="button" onClick={props.triggerPreviewOff}>Cancel</button>
            </form>
        </div>
    );
};

DirectoryPreview.propTypes = {
    tab: PropTypes.number.isRequired,
    onCreateDirectory: PropTypes.func.isRequired,
    triggerPreviewOff: PropTypes.func.isRequired,
};

export default DirectoryPreview;
