import { createSelector } from 'reselect';

export const emptyDir = { id: 0, name: '', __isEmpty: true };
export const getById = state => state.directories.byId;
const getAllIds = state => state.directories.allIds;
const getDirectoriesByParent = state => state.directoriesManager.directoriesByParent;
export const getRootDirId = state => state.directoriesManager.rootDirId;
const getRootDirIsCreatingSubfolder = state => state.directoriesManager.rootDirIsCreatingSubfolder;
export const getIsDeleting = state => state.directoriesManager.isDeleting;
export const getSelectedDirId = state => state.directoriesManager.selectedDirectoryId;

export const getIsEditAndDeleteEnabled = createSelector(
    getSelectedDirId,
    getRootDirId,
    (selectedDirId, rootDirId) => selectedDirId !== rootDirId,
);

export const getSelectedDir = createSelector(
    getById,
    getSelectedDirId,
    (byId, selectedDirId) => {
        return byId[selectedDirId]
            ? { ...byId[selectedDirId] }
            : emptyDir;
    },
);

export const getDirectoryIdsAffectedByDelete = createSelector(
    getById,
    getAllIds,
    getSelectedDirId,
    (byId, allIds, selectedDirId) => {
        const getDirectoriesToDelete = (directories, parentId) => {
            let toDelete = [ parentId ];
            for (const dir of directories) {
                if (dir.parentId === parentId) {
                    toDelete = toDelete.concat(getDirectoriesToDelete(directories, dir.id));
                }
            }
            return toDelete;
        };

        return getDirectoriesToDelete(allIds.map(dirId => byId[dirId]), selectedDirId);
    },
);

export const getChildrenByParentSelector = createSelector(
    getDirectoriesByParent,
    getById,
    (directoriesByParent, byId) => (dirId) =>
        directoriesByParent[dirId]
            ? directoriesByParent[dirId].map(dir => ({ ...byId[dir.id], ...dir }))
            : null,
);

export const getRootDir = createSelector(
    getById,
    getRootDirId,
    getRootDirIsCreatingSubfolder,
    (byId, rootDirId, rootDirIsCreatingSubfolder) => {
        const rootDir = byId[rootDirId] ? byId[rootDirId] : emptyDir;
        return { ...rootDir, isCreatingSubfolder: rootDirIsCreatingSubfolder };
    },
);
