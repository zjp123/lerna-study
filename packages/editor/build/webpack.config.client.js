const path = require('path')
const webpack = require('webpack')
// const createVueLoaderOptions = require('./vue-loader.config')

// const isDev = process.env.NODE_ENV === 'development'
const HTMLPlugin = require('html-webpack-plugin')

const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const  Visualizer  =  require ('webpack-visualizer-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

const config = {
  // target: 'web',
  mode: 'development',
  entry: path.join(__dirname, '../example/main.js'),
  devtool: '#cheap-module-eval-source-map',
  output: {
    filename: 'bundle.[hash:6].js',
    // libraryTarget: 'umd',
    // libraryExport: 'default',
    path: path.join(__dirname, '../dist'),
    // publicPath: 'http://127.0.0.1:8000/public/'
  },
  devServer: {
    port: 9000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    historyApiFallback: {
      index: '/public/index.html'
    },
    // historyApiFallback: true,
    hot: true
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
        options: {
          presets: ['@babel/preset-env']
        },
        exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/
        // exclude: /node_modules/
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
    new HTMLPlugin({
      template: path.join(__dirname, '../example/index.html')
    }),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      'window.Quill': 'quill/dist/quill.js',
      'Quill': 'quill/dist/quill.js'
    })
  ]
}

module.exports = config
