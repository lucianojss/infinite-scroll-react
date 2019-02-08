import React from 'react';
import { connect } from 'react-redux';
import TopAppBar from '../components/TopAppBar.js';

const TopAppBarContainer = props => {
    return <TopAppBar />;
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(TopAppBarContainer);
