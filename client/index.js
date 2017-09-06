import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from '../shared/src/reducers/store';

import App from '../shared/src/components/app';

render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

if (module.hot) {
    module.hot.accept();
}

// if (module.hot) {
// 	module.hot.accept();
// 	console.log("index.js HMR");
// 	const NewApp = require('../shared/src/components/app').default;
// 	render(<BrowserRouter><NewApp /></BrowserRouter>, document.getElementById('root'));
//
// }
