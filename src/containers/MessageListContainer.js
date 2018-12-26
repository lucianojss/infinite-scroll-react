import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getMessagesList, deleteMessage } from '../actions/messageListAction';
import { withStyles } from '@material-ui/core/styles';
import MessageList from '../components/MessageList';
import ErrorMessage from '../components/ErrorMessage';

const styles = {
    container: {
        paddingTop: 80
    }
};

class MessageListContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.loadMoreMessages = this.loadMoreMessages.bind(this);
        this.deleteMessage = this.deleteMessage.bind(this);
    }

    componentDidMount() {
        this.loadMoreMessages({ startIndex: 0, stopIndex: 5 });
    }

    loadMoreMessages() {
        this.props.getMessagesList(this.props.limit, this.props.pageToken);
    }

    deleteMessage(id) {
        this.props.deleteMessage(id);
    }

    render() {
        const { classes, messages, hasMore, loading, error } = this.props;
        if (error && messages.length === 0) {
            return <ErrorMessage text="Something went wrong, try again later." />;
        }
        return (
            <div className={classes.container}>
                <MessageList
                    messages={messages}
                    hasMore={hasMore}
                    loading={loading}
                    loadMoreMessages={this.loadMoreMessages}
                    onDismiss={this.deleteMessage}
                    threshold={5}
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

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MessageListContainer)
);
