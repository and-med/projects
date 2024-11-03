import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../UI/Modal/Modal';

const DirectoryDeleteConfirmModal = props => {
    const submitHandler = (e) => {
        e.preventDefault();
        props.onDeleteDirectory();
    };

    return (
        <Modal
            show={props.show}
            modalClosed={props.onCancelClick}>
            <h2>{props.headerText}</h2>
            <p>Are you sure you want to delete this {props.entityText}?</p>
            <form onSubmit={submitHandler}>
                <button type="submit">Delete</button>
                <button type="button" onClick={props.onCancelClick}>Cancel</button>
            </form>
        </Modal>
    );
};

DirectoryDeleteConfirmModal.propTypes = {
    show: PropTypes.bool.isRequired,
    headerText: PropTypes.string.isRequired,
    entityText: PropTypes.string.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    onDeleteDirectory: PropTypes.func.isRequired,
};

export default DirectoryDeleteConfirmModal;
