import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Form from '../../../components/UI/Form/Form';
import BorderedBox from '../../../components/UI/BorderedBox/BorderedBox';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrorBlock from '../../../components/UI/ErrorBlock/ErrorBlock';
import * as actions from '../../../store/actions';

const UserCreate = props => {
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
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
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
            value: 'User',
            validation: {
                required: true
            },
            valid: true,
            touched: false
        }
    })

    const submitHandler = (event) => {
        event.preventDefault();
        const payload = {
            firstName: userForm.firstName.value,
            lastName: userForm.lastName.value,
            email: userForm.email.value,
            password: userForm.password.value,
            role: userForm.role.value
        };
        props.onUserEdit('create', payload);
    }

    let form = <Form 
        submitText={"CREATE"}
        setFormData={setUserForm}
        formData={userForm}
        submitHandler={submitHandler}/>

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
        actionFinished: state.users.actionFinished
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUserEdit: (mode, payload) => dispatch(actions.userEdit(null, mode, payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserCreate);