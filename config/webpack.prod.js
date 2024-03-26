const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const Webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(base, {
    mode: 'production',
    output: {
        path: process.env.OUTPUT_DIR || path.join(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash].js',
        // assetModuleFilename: 'images/[name][ext]'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false
            })
        ]
    },
    plugins: [
        new Webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
        new CleanWebpackPlugin()
    ]
})