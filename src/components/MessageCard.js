import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = theme => ({
    card: {
        marginLeft: 8,
        marginRight: 8,
        marginBottom: 8
    },
    avatar: {
        paddingBottom: 0
    }
});

class MessageCard extends PureComponent {
    render() {
        const { author, content, updated, style, classes, id } = this.props;

        return (
            <Card className={classes.card} style={style}>
                <CardHeader
                    className={classes.avatar}
                    avatar={<Avatar aria-label={author.name} src={author.photoUrl} />}
                    title={author.name + ' - ' + id}
                    subheader={dayjs
                        .extend(relativeTime)(updated)
                        .fromNow()}
                />
                <CardContent>
                    <Typography variant="body2">{content}</Typography>
                </CardContent>
            </Card>
        );
    }
}

MessageCard.propTypes = {
    style: PropTypes.object,
    id: PropTypes.number.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string,
        photoUrl: PropTypes.string
    }),
    updated: PropTypes.instanceOf(Date),
    content: PropTypes.string
};

export default withStyles(styles)(MessageCard);
