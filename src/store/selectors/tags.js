import { createSelector } from 'reselect';

const getTags = state => state.tags;

export const getAvailableTagOptions = createSelector(
    getTags,
    (tagDict) =>
        Object.keys(tagDict)
            .sort((tag1, tag2) => tagDict[tag2] - tagDict[tag1])
            .map(tag => ({
                label: tag,
                value: tag,
            })),
);
