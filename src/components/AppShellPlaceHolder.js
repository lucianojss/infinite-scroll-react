import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const styles = () => ({});

const AppShellPlaceHolder = props => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

AppShellPlaceHolder.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppShellPlaceHolder);
