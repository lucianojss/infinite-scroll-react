import { createMuiTheme } from '@material-ui/core/styles';
import { pink, deepPurple, grey } from '@material-ui/core/colors';
import WebFont from 'webfontloader';

WebFont.load({
    google: {
        families: ['Roboto:300,400,500']
    }
});

export default createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: pink,
        background: {
            default: grey[200]
        }
    },
    typography: {
        useNextVariants: true
    }
});
