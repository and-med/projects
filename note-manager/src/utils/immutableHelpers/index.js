export const updateObject = (obj, props) => {
    return {
        ...obj,
        ...props,
    };
};

export const updateArray = (array, selector, newPropsProvider) => {
    const index = array.findIndex(selector);
    return [
        ...array.slice(0, index),
        { ...array[index], ...newPropsProvider(array[index]) },
        ...array.slice(index + 1),
    ];
};

export const deleteItemsFromArray = (array, selector) => {
    return array.filter(item => !selector(item));
};

export const addItemToArray = (array, newItem) => {
    if (array && array.length >= 0) {
        return [ ...array, newItem ];
    }
    return [ newItem ];
};

export const toLookup = (array, keySelector, valueSelector) => {
    return array.reduce((prevValue, currValue) => {
        const newValue = valueSelector(currValue);
        const key = keySelector(currValue);

        if (prevValue[key]) {
            prevValue[key].push(newValue);
        } else {
            prevValue[key] = [ newValue ];
        }
        return prevValue;
    }, {});
};

export const toCountDictionary = (keys, initialValue = {}) => {
    return keys.reduce((dict, key) => {
        if (dict[key]) {
            dict[key]++;
        } else {
            dict[key] = 1;
        }
        return dict;
    }, initialValue);
};

export const decreaseCountDictionary = (dict, keys) => {
    const toDelete = {};
    const newDict = keys.reduce((currDict, key) => {
        if (currDict[key] > 1) {
            currDict[key]--;
        } else {
            toDelete[key] = true;
        }
        return currDict;
    }, { ...dict });
    const toDeleteKeys = Object.keys(toDelete);

    if (keys.length > 0) {
        return removeStringKeysFromObject(newDict, toDeleteKeys);
    }
    return newDict;
};

export const firstOrDefault = (array, filter, selector = x => x) => {
    var filteredValues = array.filter(filter);
    return filteredValues.length > 0
        ? selector(filteredValues[0])
        : null;
};

export const removeKeysFromObject = (obj, keys) => {
    return Object.keys(obj).reduce((result, currValue) => {
        if (!keys.includes(+currValue)) {
            result[currValue] = obj[currValue];
        }
        return result;
    }, {});
};

export const removeStringKeysFromObject = (obj, keys) => {
    return Object.keys(obj).reduce((result, currValue) => {
        if (!keys.includes(currValue)) {
            result[currValue] = obj[currValue];
        }
        return result;
    }, {});
};
