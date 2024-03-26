const path = require('path')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')

module.exports = merge(base, {
    mode: 'development',
    cache: {
        type: 'filesystem'
    },
    devtool: 'source-map',
    devServer: {
        compress: true,
        port: 8088,
        hot: true,
        open: true,
        historyApiFallback: true,
        // https: true
        proxy: {
            //'http://106.53.151.120:8888/user-info/
            '/api' : {
                //目标请求地址
                target: 'http://192.168.8.154:9002',
                //是否在请求头中加入host首部
                changeOrigin: false,
                //检测是否是http是否是s
                // secure:false,
                //正则匹配路径
                // pathRewrite: { '^/unicom/api': '/api' }
            }
        }
    }
})