import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getMessagesList, deleteMessage } from '../actions/messageListAction';
import { withStyles } from '@material-ui/core/styles';
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
        paddingTop: 64,
        overflowX: 'hidden'
    },
    container: {
        margin: 8
    }
};

class MessageListContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.loadMoreMessages = this.loadMoreMessages.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    loadMoreMessages() {
        if (!this.props.loading) return this.props.getMessagesList(this.props.limit, this.props.pageToken);
    }

    deleteMessage(id) {
        return this.props.deleteMessage(id);
    }

    render() {
        const { classes, messages, hasMore } = this.props;

        const loaderContainer = (
            <div className={classes.loadingContainer}>
                <CircularProgress color="secondary" />
            </div>
        );

        return (
            <div className={classes.container}>
                <InfiniteScroll
                    className={classes.infiniteScroll}
                    loadMore={this.loadMoreMessages}
                    hasMore={hasMore}
                    loader={loaderContainer}
                >
                    {messages.map((message, index) => (
                        <MessageCard key={index} {...message} onDelete={this.deleteMessage} />
                    ))}
                </InfiniteScroll>
            </div>
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
    deleteMessage: id => dispatch(deleteMessage(id))
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
