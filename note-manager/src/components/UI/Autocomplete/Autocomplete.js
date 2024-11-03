import React from 'react';
import PropTypes from 'prop-types';
import Creatable from 'react-select/creatable';

const Autocomplete = props => {
    return (
        <Creatable
            className={props.className}
            onChange={props.handleChange}
            value={props.value}
            options={props.options || undefined}
            placeholder={props.placeholder}
            createOptionPosition={'first'}
            isClearable={true}
            formatCreateLabel={value => (<div><strong>Search</strong> &apos;{value}&apos;</div>)} />
    );
};

Autocomplete.propTypes = {
    className: PropTypes.string,
    value: PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    }),
    placeholder: PropTypes.string,
    handleChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })),
};

export default Autocomplete;
