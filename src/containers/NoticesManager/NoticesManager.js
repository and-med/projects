import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNoticesByDirectory, getIsDeleting, getDeletingNotice } from '../../store/selectors/notices';
import { getSelectedDir } from '../../store/selectors/directories';
import FancyButton from '../../components/UI/FancyButton/FancyButton';
import DeleteConfirmModal from '../../components/DeleteConfirmModal/DeleteConfirmModal';
import NoticeCard from '../../components/NoticeCard/NoticeCard';
import NoticeCardContent from '../../components/NoticeCard/NoticeCardContent';
import NoticesList from './NoticesList';
import { directoryShape, historyShape, noticeShape } from '../PropTypes';
import {
    createNoticeRedirect,
    updateNoticeTitle,
    updateNoticeRedirect,
    deleteNotice,
    deleteNoticeConfirm,
    deleteNoticeCancel,
} from '../../store/actions';
import classes from './NoticesManager.module.css';

const NoticesManager = props => {
    const redirect = (routeName) => props.history.push(routeName);

    return (
        <Fragment>
            <div className={classes.NoticesListHeader}>
                <h2>Contents of &apos;{props.selectedDir.name}&apos;</h2>
            </div>
            <NoticesList notices={props.notices}>
                {(notice) => (
                    <NoticeCard key={notice.id}>
                        <NoticeCardContent
                            id={notice.id}
                            title={notice.title}
                            updateNoticeTitle={props.updateNoticeTitle}
                            updateNoticeRedirect={(id) => props.updateNoticeRedirect(id, redirect)}
                            deleteNoticeConfirm={props.deleteNoticeConfirm} />
                    </NoticeCard>
                )}
            </NoticesList>
            <div className={classes.NoticesListFooter}>
                <FancyButton clicked={() => props.createNoticeRedirect(redirect)}>Create a new Note</FancyButton>
            </div>
            <DeleteConfirmModal
                show={props.isDeleting}
                headerText={`Delete Notice '${props.deletingNotice.title}'`}
                entityText={'notice'}
                onCancelClick={props.deleteNoticeCancel}
                onDeleteDirectory={() => props.deleteNotice(props.deletingNotice)} />
        </Fragment>
    );
};

NoticesManager.propTypes = {
    notices: PropTypes.arrayOf(noticeShape).isRequired,
    isDeleting: PropTypes.bool.isRequired,
    deletingNotice: noticeShape,
    selectedDir: directoryShape,
    history: historyShape.isRequired,
    createNoticeRedirect: PropTypes.func.isRequired,
    updateNoticeTitle: PropTypes.func.isRequired,
    updateNoticeRedirect: PropTypes.func.isRequired,
    deleteNoticeCancel: PropTypes.func.isRequired,
    deleteNoticeConfirm: PropTypes.func.isRequired,
    deleteNotice: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        notices: getNoticesByDirectory(state),
        selectedDir: getSelectedDir(state),
        isDeleting: getIsDeleting(state),
        deletingNotice: getDeletingNotice(state),
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNoticeRedirect: (redirect) => dispatch(createNoticeRedirect({ redirect })),
        updateNoticeTitle: (id, title) => dispatch(updateNoticeTitle({ id, title })),
        updateNoticeRedirect: (id, redirect) => dispatch(updateNoticeRedirect({ id, redirect })),
        deleteNoticeCancel: () => dispatch(deleteNoticeCancel()),
        deleteNoticeConfirm: (id) => dispatch(deleteNoticeConfirm({ id })),
        deleteNotice: (notice) => dispatch(deleteNotice(notice)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticesManager);
