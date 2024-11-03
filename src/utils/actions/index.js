export const createPayloadActionCreator = (type) => {
    return (payload) => ({
        type: type,
        payload: payload,
    });
};

export const createErrorActionCreator = (type) => {
    return (error) => ({
        type: type,
        error: error,
    });
};
