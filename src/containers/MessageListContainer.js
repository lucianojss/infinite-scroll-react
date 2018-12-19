import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { getMessagesList, deleteMessage } from '../actions/messageListAction';
import { withStyles } from '@material-ui/core/styles';
import ErrorOutlineTwoTone from '@material-ui/icons/ErrorOutlineTwoTone';
import Typography from '@material-ui/core/Typography';
import Error from '@material-ui/icons/Error';
import MessageList from '../components/MessageList';
import MessageCard from '../components/MessageCard';

const styles = {
    container: {
        padding: 10,
        height: '100%'
    },
    errorContainer: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorIcon: {
        margin: 10,
        fontSize: 60
    }
};

class MessageListContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.loadMoreMessages = this.loadMoreMessages.bind(this);
    }

    componentDidMount() {
        // this.loadMoreMessages();
    }

    loadMoreMessages() {
        if (!this.props.loading) return this.props.getMessagesList(this.props.limit, this.props.pageToken);
    }

    render() {
        const { classes, loading, error, messages, hasMore } = this.props;

        if (error) {
            return (
                <div className={classes.errorContainer}>
                    <Error className={classes.errorIcon} />
                    <Typography varint="caption" color="inherit">
                        Something went wrong, try again later.
                    </Typography>
                </div>
            );
        }

        return (
            // <div className={classes.container}>
            //     {messages.map((message, index) => (
            //         <MessageCard style={{ marginBottom: 10 }} key={index} {...message} />
            //     ))}
            // </div>
            <div>
                <MessageList
                    hasNextPage={hasMore}
                    isNextPageLoading={loading}
                    items={messages}
                    loadNextPage={this.loadMoreMessages}
                />
            </div>
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
