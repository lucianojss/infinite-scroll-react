import React from 'react';
import { render } from 'react-dom';

import './index.css';
import App from './App';

const rootElement = document.getElementById('root');

render(<App />, rootElement);

if ('serviceWorker' in navigator) {
    // sw.js can literally be empty, but must exist
    navigator.serviceWorker.register('/serviceWorker.js');
}
