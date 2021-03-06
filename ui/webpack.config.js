// We are using node's native package 'path'
// https://nodejs.org/api/path.html

const path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};
// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'App.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },
  // Tell webpack to use html plugin
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  // Loaders configuration -> ADDED IN THIS STEP
  // We are telling webpack to use "babel-loader" for .js and .jsx files
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },

      {
      test: /\.less$/,
      use: [
        {
          loader: "style-loader"
        },
        {
          loader: "css-loader",
          options: {
            sourceMap: true,
            modules: true,
            localIdentName: "[local]___[hash:base64:5]"
          }
        },
        {
          loader: "less-loader"
        }
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
    },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  devServer: {
    port: 8888,
    proxy: {
      '/search': {
         target: {
            host: "0.0.0.0",
            protocol: 'http:',
            port: 8983
         },
         pathRewrite: {
            '^/search': ''
         }
      },
      '/summarization/summarize': {
         target: {
            host: "0.0.0.0",
            protocol: 'http:',
            port: 5000
         },
         pathRewrite: {
            '^/summarization/summarize': 'summarization/summarize'
         }
      }
   }
  },
};
