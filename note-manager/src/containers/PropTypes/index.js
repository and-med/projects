import PropTypes from 'prop-types';

export const directoryShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
});

export const historyShape = PropTypes.shape({
    push: PropTypes.func.isRequired,
});

export const noticeShape = PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    directoryId: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const getMatchShape = (paramName) => PropTypes.shape({
    params: PropTypes.shape({
        [paramName]: PropTypes.string,
    }).isRequired,
});

export const option = PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
});

export const optionsArray = PropTypes.arrayOf(option);
