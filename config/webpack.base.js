'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash].js',
        // assetModuleFilename: 'images/[name][ext]'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions: ['.js', '.json', 'jsx', '.ts', '.cjs', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.(t|j)s$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: { //指定特定的ts编译配置，为了区分脚本的ts配置
                        configFile: path.resolve(__dirname, '../tsconfig.json'), //对应文件添加.ts或者.tsx后缀
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true  //关闭类型检查，即只进行转译
                    }
                }]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader']
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        // options: {
                        //     importLoaders: 2,
                        //     modules: true
                        // }
                    },
                    'sass-loader',
                    // 'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: './static/images/[name].[hash:6][ext]'
                }
                // use: {
                //     loader: 'url-loader',
                //     options: {
                //         name: '[name]_[hash:6].[ext]',
                //         outputPath: '/static/img',
                //         limit: 6400
                //     }
                // }
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'static/font/[name].[hash:6][ext]'
                }
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            symbolId: 'icon-[name]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html'
        }),
        new VueLoaderPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css'
        })
    ]
}
