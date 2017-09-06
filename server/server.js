import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../client/webpack.config';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { Provider } from 'react-redux';
import store from '../shared/src/reducers/store';

import { StaticRouter } from 'react-router';

import App from '../shared/src/components/app';

const app = express();

app.set('view engine', 'ejs');
app.use( express.static('server/public') );

if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(webpackConfig);

    app.use( webpackDevMiddleware(compiler, {
        publicPath: '/',
        filename: 'bundle.js',
        hot: true,
        stats: {
            colors: true
        },
        historyApiFallback: true
    }) );

    app.use( webpackHotMiddleware(compiler, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 2 * 1000,
    }) );
}



app.get('*', (req, res) => {
    const context = {};
    const html = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    res.render('index', { html });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server listening on port ' + PORT));
