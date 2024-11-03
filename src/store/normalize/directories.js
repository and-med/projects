import { normalize, schema } from 'normalizr';

const directory = new schema.Entity('directories');
const directoryListSchema = new schema.Array(directory);

export default (entities) => {
    const response = normalize(entities, directoryListSchema);

    const byIds = {
        allIds: response.result,
        byId: response.entities.directories || {},
    };
    return byIds;
};
