import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

const styles = theme => ({});

class MessageCard extends React.Component {
    state = { expanded: false };

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    render() {
        const { classes, author, content, updated } = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={<Avatar aria-label={author.name} src={author.photoUrl} />}
                    title={author.name}
                    subheader={updated.toString()}
                />
                <CardContent>
                    <Typography component="p">{content}</Typography>
                </CardContent>
            </Card>
        );
    }
}

MessageCard.propTypes = {
    classes: PropTypes.object.isRequired,
    author: PropTypes.shape({
        name: PropTypes.string,
        photoUrl: PropTypes.string
    }),
    updated: PropTypes.instanceOf(Date),
    content: PropTypes.string
};

export default withStyles(styles)(MessageCard);
