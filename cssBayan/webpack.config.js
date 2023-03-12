const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',
    entry: {
        filename: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        assetModuleFilename: 'assets/[name][ext]',
        clean: false,
    },
    performance: {
        hints: false,
        maxAssetSize: 512000,
        maxEntrypointSize: 512000,
    },
    devServer: {
        port: 3000,
        compress: true,
        hot: true,
        static: {
            directory: path.join(__dirname, 'dist')
        },
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {minimize: false},
                    }
                ]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
              },
            {
                test: /\.(png||svg||jpg||jpeg||gif)$/i,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html'),
    }),
        new MiniCssExtractPlugin({
            filename: 'index.css',
        })
    ],
}