import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Draggable from 'react-draggable';

const styles = theme => ({
    card: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8
    },
    avatar: {
        paddingBottom: 0
    }
});

const MessageCard = props => {
    const { author, content, updated, style, classes } = props;

    return (
        <Card className={classes.card} style={style}>
            <CardHeader
                className={classes.avatar}
                avatar={<Avatar aria-label={author.name} src={author.photoUrl} />}
                title={author.name}
                subheader={moment(updated).fromNow()}
            />
            <CardContent>
                <Typography variant="body2">{content}</Typography>
            </CardContent>
        </Card>
    );
};

MessageCard.propTypes = {
    style: PropTypes.object,
    author: PropTypes.shape({
        name: PropTypes.string,
        photoUrl: PropTypes.string
    }),
    updated: PropTypes.instanceOf(Date),
    content: PropTypes.string,
    onDelete: PropTypes.func
};

export default withStyles(styles)(MessageCard);
