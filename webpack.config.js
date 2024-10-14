const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FilemanagerWebpackPlugin = require('filemanager-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.html'),
      filename: 'index.html'
    }),
    new FilemanagerWebpackPlugin({
      events: {
        onStart: {
          delete: ['dist']
        }
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(s[ac]ss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff2?|[ot]tf|)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        type: 'asset/resource',
      },
    ]
  },
  devServer: {
    watchFiles: path.resolve(__dirname, 'src'),
    open: true,
    compress: true,
  }
};

module.exports = config;
