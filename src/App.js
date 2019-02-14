import React, { PureComponent, Suspense } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MessageListContainer from './containers/MessageListContainer.js';
import TopAppBar from './components/TopAppBar';
import AppShellPlaceHolder from './components/AppShellPlaceHolder';

import { Provider } from 'react-redux';
import configureStore from './store/store';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './theme/';

class App extends PureComponent {
    componentDidMount() {
        const ele = document.getElementById('progress-indicator');

        if (ele) ele.outerHTML = '';
    }
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Provider store={configureStore()}>
                    <Suspense fallback={<AppShellPlaceHolder />}>
                        <TopAppBar />
                    </Suspense>
                    <MessageListContainer />
                </Provider>
            </MuiThemeProvider>
        );
    }
}

export default App;
