import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

import classes from './TimeZones.module.css';

import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import Input from '../../components/UI/Input/Input';

const TimeZones = props => {
    const [deleting, setDeleting] = useState(false);
    const [toDelete, setToDelete] = useState({ id: 0, name: '' });
    const [search, setSearch] = useState('');
    useEffect(() => {
        const diff = new Date().getTimezoneOffset();
        props.onTimeZonesGet(diff, search);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (props.deleted) {
            const diff = new Date().getTimezoneOffset();
            props.onTimeZonesGet(diff, search);
            setDeleting(false);
            setToDelete({id: 0, name: ''});
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.deleted])

    const deleteTimeZoneHandler = (id, name) => {
        console.log('Now deleting');
        setDeleting(true);
        setToDelete({id, name});
    }

    const cancelDeleteHandler = () => {
        setDeleting(false);
        setToDelete({id: 0, name: ''});
    }

    const confirmedDeleteTimeZoneHandler = () => {
        props.onDeleteTimeZone(toDelete.id);
    }

    const searchChanged = (event) => {
        setSearch(event.target.value);
        const diff = new Date().getTimezoneOffset();
        props.onTimeZonesGet(diff, event.target.value);
    }

    let timeZones = null;
    if (props.loading) {
        timeZones = <Spinner />
    }
    else if (props.timeZones) {
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
                        <Button btnType="Danger" clicked={() => deleteTimeZoneHandler(timeZone.id, timeZone.name)}>Delete</Button>
                    </div>
                </div>
            );
        });
    }

    return (
        <div className={classes.TimeZonesWrapper}>
            <div className={classes.SearchWrapper}>
                <div>Search:</div>
                <div><Input elementType={'input'} value={search} changed={searchChanged} /></div>                
            </div>            
            <Modal show={deleting} modalClosed={cancelDeleteHandler}>
                {!props.deleting 
                    ? <p>Are you sure you want do delete time zone `{toDelete.name}`?</p>
                    : <Spinner />}
                <div>
                    <Button btnType="Danger" clicked={confirmedDeleteTimeZoneHandler}>Yes</Button>
                    <Button btnType="Success" clicked={cancelDeleteHandler}>No</Button>
                </div>
            </Modal>
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
        loading: state.timeZones.loading,
        deleting: state.timeZones.deleting,
        deleted: state.timeZones.deleted
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onTimeZonesGet: (diff, search) => dispatch(actions.timeZonesGet(diff, search)),
        onDeleteTimeZone: (id) => dispatch(actions.timeZoneDelete(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeZones);