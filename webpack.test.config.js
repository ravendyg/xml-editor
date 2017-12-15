const
    webpack = require('webpack'),
    path = require('path'),
    targets = {
        targets: {
            // phantom is old ((
            ie: '11'
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
console.log(JSON.stringify(babelLoader, null, 2));
    module.exports = {
        entry: {
            app: path.resolve(__dirname, 'tests', 'index.ts'),
        },

        output: {
            path: path.resolve(__dirname, 'build-test'),
            filename: `test.bundle.js`,
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
                        { loader: 'sass-loader' }
                    ]
                }
            ]
        },

        resolve: {
            modules: [
                'node_modules',
                path.resolve(__dirname),
            ],
            alias: {},

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
            publicPath: true,
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'BROWSER': true,
                },
            }),
        ],

        externals: {},

    };
