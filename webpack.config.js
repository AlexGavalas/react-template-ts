/* eslint-disable @typescript-eslint/no-var-requires, indent */
const path = require('path');

const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

const commonPlugins = [
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src/index.html'),
        favicon: path.resolve('src/assets/favicon.ico'),
    }),
];

const iconPath = path.resolve('src/assets/android-chrome-512x512.png');

const plugins = isProd
    ? [
          new CompressionPlugin({
              test: /\.js$/,
          }),
          new WorkboxPlugin.GenerateSW({
              clientsClaim: true,
              skipWaiting: true,
              inlineWorkboxRuntime: true,
              runtimeCaching: [
                  {
                      urlPattern: /\.(json|png|css)$/,
                      handler: 'NetworkFirst',
                  },
                  {
                      urlPattern: /\.(gz|js)$/,
                      handler: 'StaleWhileRevalidate',
                  },
              ],
          }),
          new WebpackPwaManifest({
              name: 'React Template',
              short_name: 'RT',
              description: 'My awesome react template',
              background_color: '#055',
              theme_color: '#055',
              start_url: '/',
              display: 'standalone',
              inject: true,
              ios: true,
              icons: [
                  {
                      src: iconPath,
                      sizes: [72, 96, 128, 144, 192, 384, 512],
                      destination: '/favicons',
                      purpose: 'any maskable',
                  },
                  {
                      src: iconPath,
                      sizes: [120, 152, 167, 180],
                      ios: true,
                      destination: '/favicons',
                  },
              ],
          }),
      ]
    : [new ReactRefreshWebpackPlugin()];

module.exports = {
    mode: process.env.NODE_ENV || 'development',
    entry: path.resolve('src/index.tsx'),

    // ! Important for the react-refresh HMR to work to set target=web
    target: 'web',

    // Don't use source maps for production
    ...(!isProd && { devtool: 'eval-cheap-source-map' }),

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: '[name].[contenthash].js',
        chunkFilename: 'chunk-[name].[contenthash].js',
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    !isProd && {
                        loader: 'babel-loader',
                        options: { plugins: ['react-refresh/babel'] },
                    },
                    'ts-loader',
                ].filter(Boolean),
                exclude: /node_modules/,
            },
        ],
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        port: 9000,
        proxy: {
            '*': 'http://localhost:3000',
        },
    },

    // Configure a simpler log output
    stats: {
        assetsSort: '!size',
        modules: false,
        runtimeModules: false,

        // Hide source maps from output
        excludeAssets: [/\.*\.map/],
    },

    plugins: plugins.concat(commonPlugins),
};
