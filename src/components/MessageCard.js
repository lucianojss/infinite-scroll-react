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

const styles = theme => {
    // console.log(theme);
    return {
        // card: {
        //     marginBottom: 10
        // }
    };
};

const MessageCard = props => {
    const { author, content, updated, style } = props;

    return (
        <Draggable axis="x" defaultPosition={{ x: 0, y: 0 }}>
            <Card style={style}>
                <CardHeader
                    avatar={<Avatar aria-label={author.name} src={author.photoUrl} />}
                    title={author.name}
                    subheader={moment(updated).fromNow()}
                />
                <CardContent>
                    <Typography component="p">{content}</Typography>
                </CardContent>
            </Card>
        </Draggable>
    );
};

MessageCard.propTypes = {
    style: PropTypes.object,
    author: PropTypes.shape({
        name: PropTypes.string,
        photoUrl: PropTypes.string
    }),
    updated: PropTypes.instanceOf(Date),
    content: PropTypes.string
};

export default MessageCard;
