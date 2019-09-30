import React from 'react';

import classes from './ErrorBlock.module.css';

const ErrorBlock = props => {
    let errorDescription = null;
    let errorClasses = [classes.Errors];
    if (props.error && props.error.errors.length > 1) {
        errorDescription = (
            <p>Please fix following {props.error.errors.length} errors:</p>
        );;
        errorClasses.push(classes.ErrorsStyled);
    }
    let errorBlock = null;
    if (props.error) {
        errorBlock = (
            <div className={classes.ErrorWrapper}>
                {errorDescription}
                <ul className={errorClasses.join(' ')}>
                    {props.error.errors.map((error, i) => (
                        <li key={i}>
                            {error}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return errorBlock;
}

export default ErrorBlock;