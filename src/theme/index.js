import { createMuiTheme } from '@material-ui/core/styles';
import { pink, deepPurple, grey } from '@material-ui/core/colors';

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
