const helpers = require('./helpers');

module.exports = {

    devtool: 'inline-source-map',
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [helpers.root('src'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{ loader: 'ts-loader' }],
                exclude: []
            },
            {
                test: /\.ts$/,
                exclude: /(node_modules|\.spec\.ts$)/,
                loader: 'coverage-istanbul-loader',
                options: { esModules: true },
                enforce: 'post'
            }
        ],
    },

    plugins: [],
    stats: {
        errorDetails: true
    }

};
