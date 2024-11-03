import React from 'react';
import PropTypes from 'prop-types';
import Creatable from 'react-select/creatable';

const CreatableMultiselect = props => {
    const newOptionDataHandler = (value, label) => {
        return {
            label: label,
            value: String.prototype.toLocaleLowerCase.call(value),
            isNew: true,
        };
    };

    return (
        <Creatable
            className={props.className}
            onChange={props.handleChange}
            value={props.values}
            getNewOptionData={newOptionDataHandler}
            options={props.options}
            placeholder={props.placeholder}
            formatCreateLabel={value => `Create tag '${value}'`}
            isMulti />
    );
};

CreatableMultiselect.propTypes = {
    className: PropTypes.string,
    values: PropTypes.array,
    handleChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
    })).isRequired,
    placeholder: PropTypes.string,
};

export default CreatableMultiselect;
