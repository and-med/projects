import { normalize, schema } from 'normalizr';

const notice = new schema.Entity('notices');
const noticeListSchema = new schema.Array(notice);

export default (entities) => {
    const response = normalize(entities, noticeListSchema);

    const byIds = {
        allIds: response.result,
        byId: response.entities.notices || {},
    };
    return byIds;
};
