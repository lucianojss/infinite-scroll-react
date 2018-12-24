import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getMessagesList, deleteMessage } from '../actions/messageListAction';
import { withStyles } from '@material-ui/core/styles';
import MessageList from '../components/MessageList';
import LinearProgress from '@material-ui/core/LinearProgress';

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
    container: {
        height: '100%'
    }
};

class MessageListContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            height: 0
        };

        this.loadMoreMessages = this.loadMoreMessages.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    componentDidMount() {
        this.loadMoreMessages({ startIndex: 0, stopIndex: 5 });
    }

    loadMoreMessages() {
        return this.props.getMessagesList(this.props.limit, this.props.pageToken);
    }

    deleteMessage(id) {
        return this.props.deleteMessage(id);
    }

    render() {
        const { classes, messages, hasMore, loading } = this.props;

        return (
            <div className={classes.container}>
                {loading && <LinearProgress color="secondary" />}
                <MessageList
                    messages={messages}
                    hasMore={hasMore}
                    loading={loading}
                    loadMoreMessages={this.loadMoreMessages}
                    onDeleteMessage={this.deleteMessage}
                />
            </div>
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

//TODO: PROPTYPES
export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MessageListContainer)
);
