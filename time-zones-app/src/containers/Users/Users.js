import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import classes from './Users.module.css';

import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';

const Users = props => {
    useEffect(() => {
        props.onUsersGet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (props.deleted) {
            props.onUsersGet();
            setDeleting(false);
            setToDelete({id: 0, name: ''});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.deleted])
    const [deleting, setDeleting] = useState(false);
    const [toDelete, setToDelete] = useState({ id: 0, name: '' });

    const deleteUserHandler = (id, name) => {
        console.log('Now deleting');
        setDeleting(true);
        setToDelete({id, name});
    }

    const cancelDeleteHandler = () => {
        setDeleting(false);
        setToDelete({id: 0, name: ''});
    }

    const confirmedDeleteUserHandler = () => {
        props.onDeleteUser(toDelete.id);
    }

    let users = null;
    if (props.loading) {
        users = <Spinner />
    }
    if (props.users) {
        users = props.users.map(user => {
            return (
                <div key={user.id} className={classes.User}>
                    <div>Full name: {user.firstName} {user.lastName}</div>
                    <div>Email: {user.email}</div>
                    <div>Role: {user.role}</div>
                    <div>
                        <NavLink to={'/users/update/' + user.id}>
                            <Button btnType="Success">Update</Button>
                        </NavLink>
                        <Button btnType="Danger" clicked={() => deleteUserHandler(user.id, user.firstName + ' ' + user.lastName)}>Delete</Button>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={classes.UsersWrapper}>
            <Modal show={deleting} modalClosed={cancelDeleteHandler}>
                {!props.deleting 
                    ? <p>Are you sure you want do delete user `{toDelete.name}`?</p>
                    : <Spinner />}
                <div>
                    <Button btnType="Danger" clicked={confirmedDeleteUserHandler}>Yes</Button>
                    <Button btnType="Success" clicked={cancelDeleteHandler}>No</Button>
                </div>
            </Modal>
            {users}
            <div className={classes.CreateNew}>
                <NavLink to="/users/create">
                    <Button btnType="Success">Create a new one</Button>
                </NavLink>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        users: state.users.users,
        error: state.users.error,
        loading: state.users.loading,
        deleting: state.users.deleting,
        deleted: state.users.deleted
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUsersGet: () => dispatch(actions.usersGet()),
        onDeleteUser: (id) => dispatch(actions.userDelete(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);