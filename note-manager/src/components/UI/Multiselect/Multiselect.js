import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const Multiselect = props => {
    return (
        <Select
            className={props.className}
            onChange={props.handleChange}
            value={props.values}
            options={props.options}
            placeholder={props.placeholder}
            isMulti />
    );
};

Multiselect.propTypes = {
    className: PropTypes.string,
    values: PropTypes.array,
    handleChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    placeholder: PropTypes.string,
};

export default Multiselect;
