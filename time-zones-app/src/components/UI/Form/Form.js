import React from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';

const Form = props => {
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
            changed={(event) => props.inputChangedHandler(event, formElement.id)} />
    ));

    return (
        <form onSubmit={props.submitHandler}>
            {form}
            <Button btnType="Success">{props.submitText}</Button>
        </form>        
    );
}

export default Form;