import { createSelector } from 'reselect';
import { getAllNotices, getById, emptyNotice } from './notices';

const getSearchValue = state => state.search.searchValue;
export const getIsAdvanced = state => state.search.isAdvanced;
const getTitleSearch = state => state.search.titleSearch;
const getContentSearch = state => state.search.contentSearch;
const getTagsSearch = state => state.search.tagsSearch;
const getNoticePreviewId = state => state.search.noticePreviewId;
const optionSelector = value => value ? ({ label: value, value: value }) : null;

export const getNoticeTitleOptions = createSelector(
    getAllNotices,
    (notices) => [ ...new Set(notices.map(notice => notice.title)) ].map(optionSelector),
);

export const getSearchedNotices = createSelector(
    getAllNotices,
    getIsAdvanced,
    getSearchValue,
    getTitleSearch,
    getContentSearch,
    getTagsSearch,
    (notices, isAdvanced, searchValue, titleSearch, contentSearch, tagsSearch) => {
        if (isAdvanced) {
            if (titleSearch) {
                notices = notices.filter(notice => notice.title.toLowerCase().includes(titleSearch));
            }
            if (contentSearch) {
                notices = notices.filter(notice => notice.description.toLowerCase().includes(contentSearch));
            }
            if (tagsSearch.length > 0) {
                notices = notices.filter(notice => !tagsSearch.some(tag => !notice.tags.includes(tag)));
            }
        } else if (searchValue) {
            notices = notices.filter(notice => notice.title.toLowerCase().includes(searchValue));
        }
        return notices;
    },
);

export const getCurrentSearchOption = createSelector(getSearchValue, optionSelector);

export const getCurrentTitleSearchOption = createSelector(getTitleSearch, optionSelector);

export const getCurrentContentSearchOption = createSelector(getContentSearch, optionSelector);

export const getCurrentTagsSearchOptions = createSelector(
    getTagsSearch,
    (tagsSearch) => tagsSearch.length > 0 ? tagsSearch.map(optionSelector) : null,
);

export const getPreviewedNoticed = createSelector(
    getById,
    getNoticePreviewId,
    (byId, noticePreviewId) => noticePreviewId && byId[noticePreviewId] ? byId[noticePreviewId] : emptyNotice,
);
