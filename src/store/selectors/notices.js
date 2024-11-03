import { createSelector } from 'reselect';
import { getSelectedDirId, getById as getDirectoryById, emptyDir } from './directories';

export const emptyNotice = { id: 0, title: '', description: '', tags: [], directoryId: 0, __isEmpty: true };
export const getById = state => state.notices.byId;
const getAllIds = state => state.notices.allIds;
const getSelectedNoteId = state => state.updateNotice.selectedNoteId;
export const getIsDeleting = state => state.noticeList.isDeleting;
const getDeletingNoticeId = state => state.noticeList.deletingNoticeId;

export const getNoticesByDirectory = createSelector(
    getById,
    getAllIds,
    getSelectedDirId,
    (byId, allIds, selectedDirId) => allIds.map(id => byId[id]).filter(notice => notice.directoryId === selectedDirId),
);

export const getEditingNotice = createSelector(
    getById,
    getSelectedNoteId,
    (byId, selectedNoteId) => selectedNoteId && byId[selectedNoteId]
        ? byId[selectedNoteId]
        : emptyNotice,
);

export const getEditingNoticeDir = createSelector(
    getDirectoryById,
    getEditingNotice,
    (directoryById, editingNotice) => editingNotice && directoryById[editingNotice.directoryId]
        ? directoryById[editingNotice.directoryId]
        : emptyDir,
);

export const getDeletingNotice = createSelector(
    getById,
    getDeletingNoticeId,
    (byId, deletingNoticeId) => deletingNoticeId && byId[deletingNoticeId] ? byId[deletingNoticeId] : emptyNotice,
);


export const getAllNotices = createSelector(
    getById,
    getAllIds,
    (byId, allIds) => allIds.map(id => byId[id]),
);
