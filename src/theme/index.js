import { createMuiTheme } from '@material-ui/core/styles';
import { pink, deepPurple } from '@material-ui/core/colors';

export default createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: pink
    },
    typography: {
        useNextVariants: true
    }
});
