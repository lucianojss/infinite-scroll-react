import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopAppBar from './components/TopAppBar.js';
import MessageListContainer from './containers/MessageListContainer.js';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme/';

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={configureStore()}>
                    <div>
                        <TopAppBar />
                        <MessageListContainer />
                    </div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
