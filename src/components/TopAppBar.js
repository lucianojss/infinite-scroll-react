import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    }
};

const TopAppBar = props => {
    const { classes, loading } = props;
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Messages
                    </Typography>
                </Toolbar>
                {loading && <LinearProgress color="secondary" />}
            </AppBar>
        </div>
    );
};

TopAppBar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TopAppBar);
