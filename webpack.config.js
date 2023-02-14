const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const name = 'yopsilon-18n';

const PATHS = {
    entryPoint: path.resolve(__dirname, 'src/index.ts'),
    stylesEntryPoint: path.resolve(__dirname, 'src/styles.scss'),
    bundles: path.resolve(__dirname, 'dist/bundles'),
    dist: path.resolve(__dirname, 'dist')
};

module.exports = {
    devServer: {
        static: PATHS.dist,
        port: 9000
    },
    devtool: 'source-map',
    entry: {
        'yopsilon-i18n.umd': PATHS.entryPoint
    },
    output: {
        path: PATHS.bundles,
        filename: '[name].js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'yopsilon-i18n',
            template: path.resolve(__dirname, './src/index.html'),
            chunks: ['yopsilon-i18n.umd'],
            inject: 'head',
            filename: 'index.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader'
                }]
            }
        ]
    }
};