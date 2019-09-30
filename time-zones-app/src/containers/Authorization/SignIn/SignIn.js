import React, { useState, useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';
import classes from './SignIn.module.css';
import Form from '../../../components/UI/Form/Form';
import BorderedBox from '../../../components/UI/BorderedBox/BorderedBox';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrorBlock from '../../../components/UI/ErrorBlock/ErrorBlock';

const SignIn = props => {
    const [authForm, setAuthForm] = useState({
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
        }
    });
    useEffect(() => {
        props.onAuthReset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(authForm.email.value, authForm.password.value);
    }

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to="/" />;
    }

    let form = <Form 
        submitHandler={submitHandler}
        submitText={"SIGN IN"}
        setFormData={setAuthForm}
        formData={authForm}/>;

    if (props.loading) {
        form = <Spinner />;
    }

    return (
        <div className={classes.SignInWrapper}>
            {authRedirect}
            <BorderedBox>
                <ErrorBlock error={props.error}/>
                {form}
            </BorderedBox>
            <BorderedBox>
                <p>Don't have account yet? <NavLink className={classes.SignUp} to="/sign-up">Sign Up</NavLink></p>
            </BorderedBox>
        </div>
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
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onAuthReset: () => dispatch(actions.authReset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);