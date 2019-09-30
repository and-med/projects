import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import classes from './TimeZones.module.css';

import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';

const TimeZones = props => {
    useEffect(() => {
        const diff = new Date().getTimezoneOffset();
        props.onTimeZonesGet(diff);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let timeZones = null;
    if (props.loading) {
        timeZones = <Spinner />
    }
    if (props.timeZones) {
        timeZones = props.timeZones.map(timeZone => {
            let time = moment.utc(timeZone.timeZoneDateTime).format('l LT');
            return (
                <div key={timeZone.id} className={classes.TimeZone}>
                    <div className={classes.Name}>Name: {timeZone.name}</div>
                    <div className={classes.CityName}>City name: {timeZone.cityName}</div>
                    <div className={classes.GMT}>GMT: {timeZone.hoursDiffToGMT}h {timeZone.minutesDiffToGMT}m</div>
                    <div className={classes.Time}>Current time: {time}</div>
                    <div className={classes.Diff}>Difference to your time: {timeZone.diffToClient.hours}h {timeZone.diffToClient.minutes}m</div> 
                    <div>
                        <NavLink to={'/time-zones/update/' + timeZone.id}>
                            <Button btnType="Success">Update</Button>
                        </NavLink>
                        <Button btnType="Danger">Delete</Button>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={classes.TimeZonesWrapper}>
            {timeZones}
            <div className={classes.CreateNew}>
                <NavLink to="/time-zones/create">
                    <Button btnType="Success">Create a new one</Button>
                </NavLink>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        timeZones: state.timeZones.timeZones,
        error: state.timeZones.error,
        loading: state.timeZones.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTimeZonesGet: (diff) => dispatch(actions.timeZonesGet(diff))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeZones);