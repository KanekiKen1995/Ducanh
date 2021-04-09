const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { config } = require('webpack');

const configs = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, '../../public/dist'),
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }],
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
              },
        ]
    }
}

const mode = process.env.NODE_ENV
if(mode == 'development' || mode == 'network'){
    configs.output = {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    configs.mode = 'development'
    configs.plugins.push(new HtmlWebpackPlugin({
        template: 'src/index.html',
        publicPath: '/'
    }))
    configs.devServer = {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        compress: true,
        historyApiFallback: true,
        https: false,
        inline: false,
        open: true,
        hot: true,
        proxy: {
            '/api/admin': 'http://localhost:3333'
        }
    }
    if(mode == 'network'){
        configs.devServer = {
            ...configs.devServer,
            host: '192.168.1.32',
            disableHostCheck: true
        }
    }
}

module.exports = configs;