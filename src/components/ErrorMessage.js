import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { HighlightOff } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    errorIcon: {
        margin: 10,
        fontSize: 60
    },
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const ErrorMessage = props => {
    const { text, classes } = props;

    return (
        <div className={classes.container}>
            <HighlightOff className={classes.errorIcon} />
            <Typography>{text}</Typography>
        </div>
    );
};

ErrorMessage.propTypes = {
    text: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ErrorMessage);
