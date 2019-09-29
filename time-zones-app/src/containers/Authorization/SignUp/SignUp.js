import React, { useState } from 'react';

import BorderedBox from '../../../components/UI/BorderedBox/BorderedBox';
import Form from '../../../components/UI/Form/Form';
import { updateObject } from '../../../shared/utility';
import { checkValidity } from '../../../shared/validation';

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
        const updatedControls = updateObject(signUpForm, {
            [controlName]: updateObject(signUpForm[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, signUpForm[controlName].validation),
                touched: true
            })
        });
        setSignUpForm(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
    }

    return (        
        <BorderedBox>
            <Form 
                submitHandler={submitHandler}
                submitText={"SIGN UP"}
                inputChangedHandler={inputChangedHandler}
                formData={signUpForm}/>
        </BorderedBox>
    );
}

export default SignUp;