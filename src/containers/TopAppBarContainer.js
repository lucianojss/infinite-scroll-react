import React from 'react';
import { connect } from 'react-redux';
import TopAppBar from '../components/TopAppBar.js';

const TopAppBarContainer = props => {
    const { loading } = props;
    return <TopAppBar loading={loading} />;
};

const mapStateToProps = state => ({
    loading: state.messageList.loading
});

export default connect(mapStateToProps)(TopAppBarContainer);
