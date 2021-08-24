const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

module.exports = {
    mode: IS_PRODUCTION ? 'production' : 'development',
    devtool: "source-map",

    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            'react': path.join(__dirname, 'node_modules', 'react', 'cjs',
                (IS_PRODUCTION ? 'react.production.min.js' : 'react.development.js')),
            'react-dom': path.join(__dirname, 'node_modules', 'react-dom', 'cjs',
                (IS_PRODUCTION ? 'react-dom.production.min.js' : 'react-dom.development.js')),
            '#': path.resolve(__dirname, 'src'),
        }
    },

    entry: './src/index.tsx',
    output: {
        chunkFilename: "[name].[contenthash].js",
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, 'public', 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'public/dist'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
        ]
    }
};