import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Form from '../../../components/UI/Form/Form';
import BorderedBox from '../../../components/UI/BorderedBox/BorderedBox';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrorBlock from '../../../components/UI/ErrorBlock/ErrorBlock';
import * as actions from '../../../store/actions';

const UserUpdate = props => {
    useEffect(() => {
        props.onUserLoadEdit(props.match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const [userForm, setUserForm] = useState({
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        lastName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Last Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'E-mail address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        role: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'User', displayValue: 'User' },
                    { value: 'UserManager', displayValue: 'UserManager' },
                    { value: 'Admin', displayValue: 'Admin' }
                ]
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        }
    })

    const submitHandler = (event) => {
        event.preventDefault();
        const payload = {
            firstName: userForm.firstName.value,
            lastName: userForm.lastName.value,
            email: userForm.email.value,
            role: userForm.role.value
        };
        console.log(payload);
        props.onUserEdit(props.match.params.id, 'update', payload);
    }

    let form = <Form 
        submitText={"UPDATE"}
        setFormData={setUserForm}
        formData={userForm}
        submitHandler={submitHandler}
        prepopulateObject={props.selectedEntity}/>

    if (props.loading) {
        form = <Spinner />
    }

    let redirect = null;
    if (props.actionFinished) {
        redirect = <Redirect to="/users" />
    }
    
    return (
        <BorderedBox>
            {redirect}
            <ErrorBlock error={props.error} />
            {form}
        </BorderedBox>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.users.loading,
        error: state.users.error,
        actionFinished: state.users.actionFinished,
        selectedEntity: state.users.selectedEntity
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLoadEdit: (id) => dispatch(actions.userLoadEdit(id)),
        onUserEdit: (id, mode, payload) => dispatch(actions.userEdit(id, mode, payload)),
        onUserLoadEditReset: () => dispatch(actions.userLoadEditReset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate);