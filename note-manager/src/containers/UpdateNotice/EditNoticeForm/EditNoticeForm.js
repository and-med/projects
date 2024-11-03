import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import CreatableMultiselect from '../../../components/UI/CreatableMultiselect/CreatableMultiselect';
import FancyButton from '../../../components/UI/FancyButton/FancyButton';
import { optionsArray } from '../../PropTypes';
import classes from './EditNoticeForm.module.css';

const useValueFromProps = (defaultValue, propsValue) => {
    const [value, setValue] = useState(defaultValue);
    useEffect(() => {
        setValue(propsValue || defaultValue);
    }, [propsValue]);
    return [value, setValue];
};

const EditNoticeForm = props => {
    const [title, setTitle] = useValueFromProps('', props.title);
    const [description, setDescription] = useValueFromProps('', props.description);
    const [tags, setTags] = useValueFromProps([], props.tags);

    const handleSubmit = (ev) => {
        ev.preventDefault();
        props.handleSubmit(title, description, tags.map(tag => tag.value));
    };

    return (
        <form onSubmit={handleSubmit}>
            <ul className={classes.Form}>
                <li>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Enter Title here"
                        autoFocus
                        required />
                </li>
                <li>
                    <label htmlFor="description">Description</label>
                    <textarea
                        rows="6"
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Enter some description here"
                        required />
                </li>
                <li>
                    <label htmlFor="tags">Tags</label>
                    <CreatableMultiselect
                        className={classes.Multiselect}
                        values={tags}
                        handleChange={e => setTags(e || [])}
                        options={props.tagOptions}/>
                </li>
            </ul>
            <div className={classes.SubmitContainer}>
                <FancyButton type="submit">{props.actionText}</FancyButton>
            </div>
        </form>
    );
};

EditNoticeForm.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    tags: optionsArray,
    tagOptions: optionsArray.isRequired,
    actionText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

export default EditNoticeForm;
