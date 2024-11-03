import * as actionTypes from '../../actions/actionTypes';
import { createReducer } from '../../../utils/reducers';

const initialState = {
    searchValue: '',
    isAdvanced: false,
    titleSearch: '',
    contentSearch: '',
    tagsSearch: [],
    noticePreviewId: null,
};

const search = (state, { payload: { searchValue }}) => {
    return {
        ...state,
        searchValue: searchValue ? searchValue.toLowerCase() : '',
    };
};

const switchToAdvancedSearch = (state, action) => {
    return {
        ...state,
        isAdvanced: true,
    };
};

const switchToSimpleSearch = (state, action) => {
    return {
        ...state,
        isAdvanced: false,
    };
};

const advancedSearchTitle = (state, { payload: { title }}) => {
    return {
        ...state,
        titleSearch: title ? title.toLowerCase() : '',
    };
};

const advancedSearchContent = (state, { payload: { content }}) => {
    return {
        ...state,
        contentSearch: content ? content.toLowerCase() : '',
    };
};

const advancedSearchTags = (state, { payload: { tags }}) => {
    return {
        ...state,
        tagsSearch: tags || [],
    };
};

const noticePreviewInit = (state, { payload: { noticeId }}) => {
    const noticePreviewId = noticeId ? +noticeId : null;
    return {
        ...state,
        noticePreviewId: noticePreviewId,
    };
};

const reducer = createReducer(initialState, {
    [actionTypes.SEARCH]: search,
    [actionTypes.SWITCH_TO_ADVANCED_SEARCH]: switchToAdvancedSearch,
    [actionTypes.SWITCH_TO_SIMPLE_SEARCH]: switchToSimpleSearch,
    [actionTypes.ADVANCED_SEARCH_TITLE]: advancedSearchTitle,
    [actionTypes.ADVANCED_SEARCH_CONTENT]: advancedSearchContent,
    [actionTypes.ADVANCED_SEARCH_TAGS]: advancedSearchTags,
    [actionTypes.NOTICE_PREVIEW_INIT]: noticePreviewInit,
});

export default reducer;
