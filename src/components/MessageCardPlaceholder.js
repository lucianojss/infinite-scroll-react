import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Grey from '@material-ui/core/colors/grey';

const styles = () => ({
    card: {
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 8
    },
    CardHeader: {
        paddingBottom: 0
    },
    avatar: {
        background: `linear-gradient(89deg, ${Grey[100]}, ${Grey[300]})`,
        animation: 'placeholder-moving 1s ease infinite',
        backgroundSize: '600% 600%'
    },
    textPlaceHolder: {
        height: 16,
        margin: 5,
        width: '100%',
        background: `linear-gradient(89deg, ${Grey[100]}, ${Grey[300]})`,
        animation: 'placeholder-moving 1s ease infinite',
        backgroundSize: '600% 600%'
    },
    '@keyframes placeholder-moving': {
        '0%': {
            backgroundPosition: '0% 50%'
        },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' }
    }
});

const MessageCardPlaceHolder = props => {
    const { classes } = props;

    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.CardHeader}
                avatar={<Avatar className={classes.avatar} />}
                title={<div className={classes.textPlaceHolder} />}
            />
            <CardContent>
                <div className={classes.textPlaceHolder} />
                <div className={classes.textPlaceHolder} />
                <div className={classes.textPlaceHolder} />
                <div className={classes.textPlaceHolder} />
                <div className={classes.textPlaceHolder} />
            </CardContent>
        </Card>
    );
};

MessageCardPlaceHolder.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageCardPlaceHolder);
