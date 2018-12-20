import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getMessagesList, deleteMessage } from '../actions/messageListAction';
import { withStyles } from '@material-ui/core/styles';
import ErrorOutlineTwoTone from '@material-ui/icons/ErrorOutlineTwoTone';
import Typography from '@material-ui/core/Typography';
import Error from '@material-ui/icons/Error';
import MessageList from '../components/MessageList';
import MessageCard from '../components/MessageCard';
import InfiniteScroll from 'react-infinite-scroller';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
    errorContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorIcon: {
        margin: 10,
        fontSize: 60
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: 10
    },
    infiniteScroll: {
        paddingTop: 72
    }
};

class MessageListContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.loadMoreMessages = this.loadMoreMessages.bind(this);
    }
    componentDidMount() {
        this.props.getMessagesList(this.props.limit, this.props.pageToken);
    }
    loadMoreMessages() {
        if (!this.props.loading) return this.props.getMessagesList(this.props.limit, this.props.pageToken);
    }

    render() {
        const { classes, loading, error, messages, hasMore } = this.props;

        const loaderContainer = (
            <div className={classes.loadingContainer}>
                <CircularProgress color="secondary" />
            </div>
        );

        return (
            <InfiniteScroll
                className={classes.infiniteScroll}
                pageStart={0}
                loadMore={this.loadMoreMessages}
                hasMore={hasMore}
                loader={loaderContainer}
            >
                {messages.map((message, index) => (
                    <MessageCard key={index} {...message} />
                ))}
            </InfiniteScroll>

            // <div>
            //     {messages.map((message, index) => (
            //         <MessageCard key={index} {...message} />
            //     ))}
            // </div>
            // <MessageList
            //     hasNextPage={hasMore}
            //     isNextPageLoading={loading}
            //     items={messages}
            //     loadNextPage={this.loadMoreMessages}
            // />
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getMessagesList: (limit, pageToken) => dispatch(getMessagesList(limit, pageToken)),
    deleteMessage: index => dispatch(deleteMessage(index))
});

const mapStateToProps = state => ({
    loading: state.messageList.loading,
    error: state.messageList.error,
    messages: state.messageList.messages,
    limit: state.messageList.limit,
    pageToken: state.messageList.pageToken,
    hasMore: state.messageList.hasMore
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MessageListContainer)
);
