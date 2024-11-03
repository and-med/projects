import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Form from '../../../components/UI/Form/Form';
import BorderedBox from '../../../components/UI/BorderedBox/BorderedBox';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrorBlock from '../../../components/UI/ErrorBlock/ErrorBlock';
import * as actions from '../../../store/actions';

const TimeZoneCreate = props => {
    const [timeZoneForm, setTimeZoneForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        cityName: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'City Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        hoursDiffToGMT: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Hours Diff'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        minutesDiffToGMT: {
            elementType: 'input',
            elementConfig: {
                type: 'number',
                placeholder: 'Minutes Diff'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
    })

    const submitHandler = (event) => {
        event.preventDefault();
        const payload = {
            name: timeZoneForm.name.value,
            cityName: timeZoneForm.cityName.value,
            hoursDiffToGMT: +timeZoneForm.hoursDiffToGMT.value,
            minutesDiffToGMT: +timeZoneForm.minutesDiffToGMT.value
        };
        console.log(payload);
        props.onTimeZoneEdit('create', payload);
    }

    let form = <Form 
        submitText={"CREATE"}
        setFormData={setTimeZoneForm}
        formData={timeZoneForm}
        submitHandler={submitHandler}/>

    if (props.loading) {
        form = <Spinner />
    }

    let redirect = null;
    if (props.actionFinished) {
        redirect = <Redirect to="/time-zones" />
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
        loading: state.timeZones.loading,
        error: state.timeZones.error,
        actionFinished: state.timeZones.actionFinished
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTimeZoneEdit: (mode, payload) => dispatch(actions.timeZoneEdit(null, mode, payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeZoneCreate);