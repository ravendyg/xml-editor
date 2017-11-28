const
    webpack = require('webpack'),
    path = require('path'),
    old = process.argv.find(el => el === '--env.old') ? '-old' : '',
    targets = {
    targets: old ?
        {
            ie: '9'
        } :
        {
            chrome: 62,
            firefox: 56,
            edge: 16,
            safari: 11,
            opera: 48,
        }
    },
    include = [
        path.resolve(__dirname, 'client')
    ],
    babelLoader = {
    loader: 'babel-loader',
    options: {
        presets: [
            ['env', targets]
        ]
    },
    }
    ;

    module.exports = {
        entry: {
            app: path.resolve(__dirname, 'client', 'app.tsx'),
        },

        output: {
            path: path.resolve(__dirname, 'public'),
            filename: `app.js`,
        },

        module: {
        rules: [
            {
                test: /\.js$/,
                include,
                use: [babelLoader]
            },
            {
                test: /\.tsx?$/,
                include,
                    use: [
                        babelLoader,
                        {
                            loader: 'ts-loader'
                        }
                    ]
            },
            {
                test: /\.png/,
                use: [
                    { loader: 'url-loader' },
                    { loader: 'img-loader' },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader'}
                ]
            }
        ]
        },

        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname, 'client')
            ],

            extensions: ['.js', '.jsx', '.ts', '.tsx', '.css'],
        },

        performance: {
            hints: 'warning',
            maxAssetSize: 200000,
            maxEntrypointSize: 400000,
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
            }
        },

        devtool: false,

        context: __dirname,

        target: 'web',

        externals: [],

        stats: {
            colors: true,
            hash: true,
            version: true,
            timings: true,
            assets: true,
            chunks: true,
            modules: false,
            reasons: false,
            children: false,
            source: true,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: true
        },

        plugins: [],

        externals: { },

    }
