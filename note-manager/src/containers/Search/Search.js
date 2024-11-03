import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
    search,
    switchToAdvancedSearch,
    switchToSimpleSearch,
    advancedSearchTitle,
    advancedSearchContent,
    advancedSearchTags,
    noticePreviewRedirect,
} from '../../store/actions';
import {
    getNoticeTitleOptions,
    getSearchedNotices,
    getCurrentSearchOption,
    getIsAdvanced,
    getCurrentTitleSearchOption,
    getCurrentContentSearchOption,
    getCurrentTagsSearchOptions,
} from '../../store/selectors/search';
import { getAvailableTagOptions } from '../../store/selectors/tags';
import { noticeShape, optionsArray, option, historyShape } from '../PropTypes';
import NoticeCard from '../../components/NoticeCard/NoticeCard';
import Autocomplete from '../../components/UI/Autocomplete/Autocomplete';
import Multiselect from '../../components/UI/Multiselect/Multiselect';
import NoticesList from '../NoticesManager/NoticesList';
import classes from './Search.module.css';
import FancyButton from '../../components/UI/FancyButton/FancyButton';

const Search = props => {
    const redirect = (routeName) => props.history.push(routeName);

    return (
        <Fragment>
            {!props.isAdvanced ? (
                <div className={classes.SearchContainer}>
                    <Autocomplete
                        className={classes.Autocomplete}
                        placeholder={'Type to search'}
                        options={props.noticeTitleOptions}
                        value={props.currentSearch}
                        handleChange={(option) => props.search(option ? option.value : '')} />
                    <div className={classes.ButtonContainer}>
                        <FancyButton clicked={props.switchToAdvancedSearch}>Switch To Advanced</FancyButton>
                    </div>
                </div>
            ) : (
                <div className={[ classes.SearchContainer, classes.AdvancedSearchContainer ].join(' ')}>
                    <Autocomplete
                        className={classes.Autocomplete}
                        placeholder={'Search title'}
                        options={props.noticeTitleOptions}
                        value={props.currentTitleSearchOption}
                        handleChange={(option) => props.advancedSearchTitle(option ? option.value : '')} />
                    <Autocomplete
                        className={classes.Autocomplete}
                        placeholder={'Search content'}
                        value={props.currentContentSearchOption}
                        handleChange={(option) => props.advancedSearchContent(option ? option.value : '')} />
                    <Multiselect
                        className={classes.Autocomplete}
                        placeholder={'Search tags'}
                        options={props.availableTags}
                        values={props.currentTagsSearchOptions}
                        handleChange={(options) =>
                            props.advancedSearchTags(options ? options.map(option => option.value) : null)} />
                    <div className={classes.ButtonContainer}>
                        <FancyButton clicked={props.switchToSimpleSearch}>Switch To Simple</FancyButton>
                    </div>
                </div>
            )}
            <NoticesList notices={props.notices}>
                {(notice) => (
                    <NoticeCard key={notice.id}>
                        <h3
                            className={classes.NoticeTitle}
                            onClick={() => props.noticePreviewRedirect(notice.id, redirect)}>{notice.title}</h3>
                    </NoticeCard>
                )}
            </NoticesList>
        </Fragment>
    );
};

Search.propTypes = {
    notices: PropTypes.arrayOf(noticeShape).isRequired,
    availableTags: optionsArray.isRequired,
    noticeTitleOptions: optionsArray.isRequired,
    currentSearch: option,
    isAdvanced: PropTypes.bool.isRequired,
    currentTitleSearchOption: option,
    currentContentSearchOption: option,
    currentTagsSearchOptions: optionsArray,
    history: historyShape.isRequired,
    search: PropTypes.func.isRequired,
    switchToAdvancedSearch: PropTypes.func.isRequired,
    switchToSimpleSearch: PropTypes.func.isRequired,
    advancedSearchTitle: PropTypes.func.isRequired,
    advancedSearchContent: PropTypes.func.isRequired,
    advancedSearchTags: PropTypes.func.isRequired,
    noticePreviewRedirect: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        notices: getSearchedNotices(state),
        availableTags: getAvailableTagOptions(state),
        noticeTitleOptions: getNoticeTitleOptions(state),
        currentSearch: getCurrentSearchOption(state),
        isAdvanced: getIsAdvanced(state),
        currentTitleSearchOption: getCurrentTitleSearchOption(state),
        currentContentSearchOption: getCurrentContentSearchOption(state),
        currentTagsSearchOptions: getCurrentTagsSearchOptions(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        search: (searchValue) => dispatch(search({ searchValue })),
        switchToAdvancedSearch: () => dispatch(switchToAdvancedSearch()),
        switchToSimpleSearch: () => dispatch(switchToSimpleSearch()),
        advancedSearchTitle: (title) => dispatch(advancedSearchTitle({ title })),
        advancedSearchContent: (content) => dispatch(advancedSearchContent({ content })),
        advancedSearchTags: (tags) => dispatch(advancedSearchTags({ tags })),
        noticePreviewRedirect: (noticeId, redirect) => dispatch(noticePreviewRedirect({ noticeId, redirect })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
