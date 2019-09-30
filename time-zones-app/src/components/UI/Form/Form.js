import React, { useState, useEffect } from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';
import { updateObject } from '../../../shared/utility';
import { checkValidity } from '../../../shared/validation';

const getFormIsValid = (formData) => {        
    let formIsValid = true;
    for (let inputIdentifier in formData) {
        formIsValid = formData[inputIdentifier].valid && formIsValid;
    }
    return formIsValid;
}

const Form = props => {
    const [formIsValid, setFormIsValid] = useState(getFormIsValid(props.formData));
    useEffect(() => {
        if (props.prepopulateObject) {
            const updatedForm = {};
            for (let identifier in props.formData) {
                updatedForm[identifier] = updateObject(props.formData[identifier], {
                    value: props.prepopulateObject[identifier],
                    valid: true,
                    touched: true
                });
            }
            props.setFormData(updatedForm);
            setFormIsValid(getFormIsValid(updatedForm));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.prepopulateObject])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(props.formData, {
            [controlName]: updateObject(props.formData[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, props.formData[controlName].validation),
                touched: true
            })
        });

        props.setFormData(updatedControls);
        setFormIsValid(getFormIsValid(updatedControls));
    }

    const formElements = [];

    for (let key in props.formData) {
        formElements.push({
            id: key,
            config: props.formData[key]
        });
    }

    let form = formElements.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            label={formElement.config.label}
            changed={(event) => inputChangedHandler(event, formElement.id)} />
    ));

    return (
        <form onSubmit={props.submitHandler}>
            {form}
            <Button disabled={!formIsValid} btnType="Success">{props.submitText}</Button>
        </form>        
    );
}

export default Form;