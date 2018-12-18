import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopAppBar from './components/TopAppBar.js';
import MessageListContainer from './containers/MessageListContainer.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <CssBaseline />
                <TopAppBar />
                <MessageListContainer />
            </div>
        );
    }
}

export default App;
