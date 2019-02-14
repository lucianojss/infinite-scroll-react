import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useTranslation } from 'react-i18next';

const TopAppBar = () => {
    const { t } = useTranslation();

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit">
                    {t('topBar.title')}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopAppBar;
