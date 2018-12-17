import React, { Component } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopAppBar from './components/TopAppBar.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopAppBar />
                <CssBaseline />
                Hello World
            </div>
        );
    }
}

export default App;
