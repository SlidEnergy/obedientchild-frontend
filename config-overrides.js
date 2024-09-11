const { override, addBabelPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
    addBabelPlugin([
        'styled-jsx/babel',
        {
            optimizeForSpeed: true,
            vendorPrefixes: true,
        },
    ]),
    (config) => {
        config.resolve.fallback = {
            buffer: require.resolve('buffer/'),
            timers: require.resolve("timers-browserify")
        };

        config.plugins.push(
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            })
        );

        return config;
    }
);
