const { override, addBabelPlugin } = require('customize-cra');
const webpack = require('webpack');
const {InjectManifest} = require("workbox-webpack-plugin");

module.exports = override(
    addBabelPlugin([
        'styled-jsx/babel',
        {
            optimizeForSpeed: true,
            vendorPrefixes: true,
        },
    ]),
    (config, env) => {
        config.resolve.fallback = {
            buffer: require.resolve('buffer/'),
            timers: require.resolve("timers-browserify"),
            url: require.resolve("url/")
        };

        config.plugins.push(
            new webpack.ProvidePlugin({
                process: 'process/browser', // добавление полифилла для process
                Buffer: ['buffer', 'Buffer'],
            })
        );

        // Проверяем, что это production-сборка, где нужен сервис-воркер
        if (env === 'production') {
            config.plugins.push(
                new InjectManifest({
                    swSrc: './src/service-worker.js', // Ваш кастомный сервис-воркер
                    swDest: 'service-worker.js',      // Путь, куда будет помещен сгенерированный воркер
                })
            );
        }

        return config;
    }
);
