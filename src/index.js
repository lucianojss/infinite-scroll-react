import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './i18n';
import * as serviceWorker from './serviceWorker';
import './index.css';

const rootElement = document.getElementById('root');

render(<App />, rootElement);

serviceWorker.register();
