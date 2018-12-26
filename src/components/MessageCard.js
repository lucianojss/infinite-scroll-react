import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = () => ({
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
                title={<Typography variant="subtitle2">{author.name}</Typography>}
                subheader={
                    <Typography variant="caption">
                        {dayjs
                            .extend(relativeTime)(updated)
                            .fromNow()}
                    </Typography>
                }
            />
            <CardContent>
                <Typography variant="body2">{content}</Typography>
            </CardContent>
        </Card>
    );
};

MessageCard.propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    id: PropTypes.number.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        photoUrl: PropTypes.string.isRequired
    }),
    updated: PropTypes.instanceOf(Date).isRequired,
    content: PropTypes.string.isRequired
};

export default withStyles(styles)(MessageCard);
