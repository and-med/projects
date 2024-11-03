import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
    return (
        <Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                }}>
                {props.children}
            </div>
        </Fragment>
    );
};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    modalClosed: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
};

export default React.memo(
    Modal,
    (prevProps, nextProps) =>
        nextProps.show === prevProps.show &&
        nextProps.children === prevProps.children
);
