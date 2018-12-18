import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMessagesList } from '../actions/messageListAction';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import ErrorOutlineTwoTone from '@material-ui/icons/ErrorOutlineTwoTone';
import Typography from '@material-ui/core/Typography';
import Error from '@material-ui/icons/Error';
import Grid from '@material-ui/core/Grid';
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
    },
    gridItem: {
        width: '100%'
    }
};

class MessageListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notFound: false
        };
    }

    componentDidMount() {
        this.props.getMessagesList(this.props.limit, this.props.pageToken);
    }

    render() {
        const { classes, loading, error, messages } = this.props;

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

        if (loading) {
            return <LinearProgress color="secondary" />;
        }

        // if (!weather && !forecast) {
        //     return (
        //         <div className={classes.errorContainer}>
        //             <ErrorOutlineTwoTone className={classes.errorIcon} />
        //             <Typography varint="caption" color="inherit">
        //                 Weather not found for the selected city.
        //             </Typography>
        //         </div>
        //     );
        // }

        return (
            <div className={classes.container}>
                {messages.map((message, index) => (
                    <MessageCard key={index} {...message} />
                ))}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    getMessagesList: (limit, pageToken) => dispatch(getMessagesList(limit, pageToken))
});

const mapStateToProps = state => ({
    loading: state.messageList.loading,
    error: state.messageList.error,
    messages: state.messageList.messages,
    limit: state.messageList.limit,
    pageToken: state.messageList.pageToken
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(MessageListContainer)
);
