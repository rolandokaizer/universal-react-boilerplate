const path = require('path');
const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        bundle: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './client/index.js'],
        vendor: ['react', 'react-redux', 'react-dom', 'react-router', 'react-router-dom']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: production ? '[name].[hash].js' : '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}

if (production) {
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    config.plugins.push(new HtmlWebpackPlugin({
        template: '!!raw-loader!'+path.resolve(__dirname, './index.html'),
        filename: path.resolve(__dirname, '../views', 'index.ejs')
    }));
}

module.exports = config;
