import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './SignIn.module.css';
import { updateObject } from '../../../shared/utility';
import { checkValidity } from '../../../shared/validation';
import Form from '../../../components/UI/Form/Form';
import BorderedBox from '../../../components/UI/BorderedBox/BorderedBox';

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

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            })
        });
        setAuthForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    return (
        <div className={classes.SignInWrapper}>
            <BorderedBox>
                <Form 
                    submitHandler={submitHandler}
                    submitText={"SIGN IN"}
                    inputChangedHandler={inputChangedHandler}
                    formData={authForm}/>
            </BorderedBox>
            <BorderedBox>
                <p>Don't have account yet? <NavLink className={classes.SignUp} to="/sign-up">Sign Up</NavLink></p>
            </BorderedBox>
        </div>
    );
}

export default SignIn;