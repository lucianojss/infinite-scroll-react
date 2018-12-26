import React, { PureComponent } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MessageListContainer from './containers/MessageListContainer.js';
import TopAppBarContainer from './containers/TopAppBarContainer';

import { Provider } from 'react-redux';
import configureStore from './store/store';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme/';

class App extends PureComponent {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={configureStore()}>
                    <TopAppBarContainer />
                    <MessageListContainer />
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
