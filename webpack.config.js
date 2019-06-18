const path = require('path');
module.exports = {
    entry: {
        app: './src/App.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'library',
        libraryTarget: 'umd',
        globalObject: 'typeof self !== \'undefined\' ? self : this',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                        options: {
                            minimize: false,
                        },
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        publicPath: '/assets/node_modules/draftkings-web-pool/',
                    },
                },
                ],
            },
            {
                test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: ['@svgr/webpack', 'file-loader'],
            },
            {
                test: /\.(gif|png|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/assets/node_modules/draftkings-web-pool/',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                    },
                ],
            },
        ],
    },
};
