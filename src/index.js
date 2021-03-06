import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/global.less';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Router from './router';
import { HashRouter, Route } from 'react-router-dom';

import './mock/index';
// require ('./iconfont/iconfont');


ReactDOM.render(
    <HashRouter>
        <Router/>
    </HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
