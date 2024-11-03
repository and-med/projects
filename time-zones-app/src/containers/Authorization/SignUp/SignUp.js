import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import BorderedBox from '../../../components/UI/BorderedBox/BorderedBox';
import Form from '../../../components/UI/Form/Form';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrorBlock from '../../../components/UI/ErrorBlock/ErrorBlock';
import * as actions from '../../../store/actions';

const SignUp = props => {    
    const [signUpForm, setSignUpForm] = useState({
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
        firstName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'First name'
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
                placeholder: 'Last name'
            },
            value: '',
            validation: {
                required: true
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
        }
    });

    const submitHandler = (event) => {
        event.preventDefault();
        props.onSignUp(signUpForm.firstName.value,
            signUpForm.lastName.value,
            signUpForm.email.value,
            signUpForm.password.value);
    }

    let form = <Form 
        submitHandler={submitHandler}
        submitText={"SIGN UP"}
        setFormData={setSignUpForm}
        formData={signUpForm}/>;

    if (props.loading) {
        form = <Spinner />
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to="/" />
    }

    return (        
        <BorderedBox>
            {authRedirect}
            <ErrorBlock error={props.error}/>
            {form}
        </BorderedBox>
    );
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onSignUp: (firstName, lastName, email, password) => 
            dispatch(actions.registerUser(firstName, lastName, email, password))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);