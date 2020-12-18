/**
 * WEBPACK CONFIGURATION
 */
const path = require('path');

// include the js minification plugin
const uglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackBuildNotifierPlugin = require('webpack-build-notifier');

// include the css extraction and minification plugins
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const optimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// include webpack variables
const webpackVariables = require('./webpack.variables');

module.exports = {
    entry: webpackVariables.webpackParams['entryPath'],
    output: {
        filename: webpackVariables.webpackParams['jsOutputPath'],
        path: path.resolve(__dirname, './assets/dist')
    },
    module: {
        rules: [
            // perform js babelization on all .js files
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            },

            // inject CSS to page
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },

            // compile all .scss files to plain old css
            {
                test: /\.(sass|scss)$/,
                use: [
                    miniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },

                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            config: {
                                path: 'postcss.config.js'
                            }
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            // Define images url from plugin dir
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    publicPath: '../',
                    name: 'img/[name].[ext]',
                }
            },
        ]
    },
    plugins: [
        // notifier plugin
        new webpackBuildNotifierPlugin({
            title: "Webpack Base",
            suppressSuccess: true
        }),
    ],

    optimization: {
        minimizer: [
            // enable the js minification plugin
            new uglifyJSPlugin({
                cache: true,
                parallel: true
            }),
            // enable the css minification plugin
            new optimizeCSSAssetsPlugin({})
        ]
    }
};
