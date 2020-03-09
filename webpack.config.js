const path          = require('path');
const webpack       = require('webpack');
const TerserPlugin  = require('terser-webpack-plugin');

module.exports = function(env) {
    const mode              = env.NODE_ENV || 'development';
    const showMaps          = mode === 'development';

    // Paths
    let outPath;
    const distPath  = path.resolve(__dirname, 'dist/');
    const srcPath   = path.resolve(__dirname, 'src/');

    // Optimizations
    let opti;

    if(mode === 'production') {
        opti = {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: showMaps,
                    terserOptions: {}
                })
            ]
        }
        outPath = distPath;
    } else {
        opti = {
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: showMaps,
                    terserOptions: {}
                })
            ]
        }
        outPath = srcPath;
    }

    const entry = {
        viewer: './src/main.js',
    };

    return {
        mode,
        entry,
        output: {
            path: outPath,
            filename: `react-3d-viewer.js`,
        },
        plugins: [
            new webpack.BannerPlugin(" react-3d-viewer v" + require('./package.json').version + "\r\n By https://github.com/juliantroeps/ \r\n Github: https://github.com/juliantroeps/react-3d-viewer\r\n MIT Licensed."),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: ['babel-preset-env']
                        }
                    }
                },
                {
                    test: /\.(md|obj|mtl)$/,
                    loader: 'raw-loader'
                }
            ]
        },
        optimization: opti
    };
};
