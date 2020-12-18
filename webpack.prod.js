/**
 * WEBPACK PRODUCTION CONFIGURATION
 */

const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.config.js');

// include webpack variables
const webpackVariables = require('./webpack.variables');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
    output: {
        filename: webpackVariables.webpackParams['jsOutputPath'],
        path: path.resolve(__dirname, './assets/dist')
    },
    mode: 'production',
    devtool: 'source-map',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        // CSS
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        })
    ]
});
