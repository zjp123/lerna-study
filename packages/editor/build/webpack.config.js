const path = require('path')
// const createVueLoaderOptions = require('./vue-loader.config')
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development'
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const  Visualizer  =  require ('webpack-visualizer-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  target: 'web',
  mode: 'production',
  // entry: isDev ? path.join(__dirname, '../lib/main-dev.js') : path.join(__dirname, '../lib/main-product.js'),
  entry: path.join(__dirname, '../lib/main-product.js'),
  // devtool: '#cheap-module-eval-source-map',
  output: {
    filename: 'my-editor.js',
    // libraryTarget: 'umd',
    // libraryExport: 'default',

    // libraryTarget: 'umd',
    // libraryExport: 'Quill',
    library: "my-editor",
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: path.join(__dirname, '../dist'),
    // publicPath: 'http://127.0.0.1:8000/public/'
  },
  module: {
    rules: [
      {
        test:/\.pug$/,
        loader: "pug-html-loader"
      },
      {
        test: /\.css/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
        ]
      },
      {
        test: /\.scss/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'sass-loader'
        ]
      },
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/,
      //   enforce: 'pre'
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        // exclude: /node_modules/
        exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve:{
      extensions: ['.js', '.json', '.jsx', '.css', '.vue'],
      modules:['../lib/', '../upload/', '../progress/', 'node_modules']
  },
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //       },
  //       chunks: 'all',
  //     },
  //   },
  // },
  plugins: [
    // new Visualizer(),
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      'window.Quill': 'quill/dist/quill.js',
      'Quill': 'quill/dist/quill.js'
    })
  ]
}

module.exports = config
