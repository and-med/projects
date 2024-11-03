import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { noticeShape, getMatchShape } from '../PropTypes';
import { noticePreviewInit } from '../../store/actions';
import { getPreviewedNoticed } from '../../store/selectors/search';

import classes from './NoticePreview.module.css';

const NoticePreview = props => {
    useEffect(() => {
        const noticeId = props.match.params.noticeId;
        props.noticePreviewInit(noticeId);
    }, [props.noticePreviewInit]);

    return (
        <Fragment>
            <h2 className={classes.PageTitle}>
                <Link to={'/search'}>Search</Link> / &apos;{props.notice.title}&apos; Preview
            </h2>
            <div className={classes.NoticePreview}>
                <div className={classes.Row}>
                    <h3>Title</h3>
                    <div className={classes.Content}>
                        {props.notice.title}
                    </div>
                </div>
                <div className={classes.Row}>
                    <h3>Description</h3>
                    <div className={classes.Content}>
                        {props.notice.description.split(/\n/).map((line, i) => (<p key={i}>{line}<br /></p>))}
                    </div>
                </div>
                <div className={classes.Row}>
                    <h3>Tags</h3>
                    <div className={classes.TagContent}>
                        {props.notice.tags.map((tag, i) => (
                            <div key={i} className={classes.Tag}><span>{tag}</span></div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

NoticePreview.propTypes = {
    match: getMatchShape('noticeId').isRequired,
    noticePreviewInit: PropTypes.func.isRequired,
    notice: noticeShape.isRequired,
};

const mapStateToProps = state => {
    return {
        notice: getPreviewedNoticed(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        noticePreviewInit: (noticeId) => dispatch(noticePreviewInit({ noticeId })),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticePreview);
